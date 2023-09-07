app = window.app || {};

((app) => {

	let util = app.util = {};
	
	util.queryStringToJSON = (qs) => {
	  //파라메터별 분리          
	  var pairs = qs.split('&');
	  
	  var result = {};//json 빈 객체

	  //각 파라메터별 key/val 처리
	  pairs.forEach(function(pair) {
	      pair = pair.split('=');//key=val 분리
	      result[pair[0]] = decodeURIComponent(pair[1] || '');
	  });

	  return JSON.parse(JSON.stringify(result));//json 객체를 문자열화해서 리턴
	}

	util.imgResize = (img, width, height) => {
		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas.getContext("2d").drawImage(img, 0, 0, width, height);
		const dataUrl = canvas.toDataURL();
		return dataUrl;
	};

	//yy--mm--dd
	util.getToday = () => {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month >= 10 ? month : `0${month}`;
		let day = date.getDate()
		day = day >= 10 ? day : `0${day}`;
		return `${year}-${month}-${day}`;
	}

	// 시분초 까지.
	util.getTime = () => {
		let result;
		let date = new Date();
		let year = date.getFullYear();
		let month = new String(date.getMonth() + 1);
		let day = new String(date.getDate());
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let second = date.getSeconds();
		result = year + "" + month + "" + day + hours + minutes + second
		return result
	}
	/*
	 * 설명 : 이미 적용되어 있는 위젯 아이콘은 다른 +버튼에서는 표출 X
	 * widgetName : list 창에 보여줄 위젯.
	 * return : 이미 적용되어 있다면 false.
	 * */
	util.widgetTabIf = (widgetName) => {
		let widgetTab = app.webapp.data.webAppOptions.detailSetting.widgetTab
		let result = true;
		let mode = app.webapp.components.widgetList.mode
		let toolbarWidget = { name: "toolbar", list: widgetTab.toolbarWidget }
		let headerWidget = { name: "header", list: widgetTab.headerWidget }
		let layerWidget = { name: "layer", list: widgetTab.layerWidget }
		let topWidget = { name: "top", list: widgetTab.topWidget }
		let bottomWidget = { name: "bottom", list: widgetTab.bottomWidget }
		let widgetList = [toolbarWidget, headerWidget, layerWidget, topWidget, bottomWidget]
		widgetList.forEach((e, i) => {
			if (e.name != mode && e.list.includes(widgetName)) {
				result = false
			}
		})
		return result;
	}



	/**
	 * param
	 * 		url
	 * 		data : json, not stringify
	 * 		masking
	 * 				true / false
	 * 				def true
	 * 
	 * return 
	 * 		Promise
	 */

	util.postJson = (param) => {
		return $.ajax({
			url: param.url,
			type: 'post',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(param.data),
		});
	}
	util.getToastUiEditor = function (target, text = '') {

		//초기화
		target.innerHTML = '';

		// TOAST EDITOR V2.3 적용
		let editor = new toastui.Editor({
			el: target,
			//previewStyle: 'vertical', //미리보기 스타일 tab, vertical
			initialEditType: 'wysiwyg', //표시할 초기 유형 warkdown 또는 wysiwyg
			hideModeSwitch: true, //모드 전환 탭 표시줄 숨김 = > true / 숨기지않음 false
			height: '250px', //높이 
			language: 'ko', //언어
			initialValue: text, //초기값 
			linkAttribute: {
				target: '_blank'
			},
			plugins: [toastui.Editor.plugin['colorSyntax']], //colorSyntax : 글씨색상
			usageStatistics: false, //Google analytics를 적용하여 오픈 소스 사용에 대한 통계를 수집할건지 여부
			toolbarItems: ['heading', 'bold', 'italic', 'strike', 'divider', 'table', 'image', 'link', 'divider', 'ul', 'ol'],
			//     toolbarItems: ['heading', 'bold', 'italic', 'strike', 'divider', 'ul', 'ol', 'divider', 'table', 'image', 'link']
			//	   toolbarItems: ['heading', 'bold', 'italic', 'strike', 'divider', 'hr', 'quote', 'divider', 'ul', 'ol', 'task', 'divider', 'table', 'image', 'link']
			//	   hooks: {
			//	   	addImageBlobHook: (blob)=>{
			//	   		console.dir(blob);
			//	   	}
			//	   }
			events: {
				change: function () {
					let _activeTab = app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.find(item => item.active)
					let _editor = app.webapp.data.editorObject[`tabSn_${_activeTab.tabSn}`];//editor 객체
					let _currentText = _editor.getHtml(); //현재 표출될 텍스트
					_activeTab.tabText = _currentText;
				}
			}
		});
		if (app.webapp.data.viewMode == 'view') {
			document.querySelector('.tui-editor-contents[contenteditable="true"]').setAttribute('contenteditable', false);
			$(".te-toolbar-section").hide();
			$("#inputTextSj").attr("disabled", true);
		}
		return editor;
	}

	/**
	 * str : 구문
	 * searchStr : 바꿀 문자열
	 * replaceStr : 대체 문자열
	 */
	util.replaceAll = function (str, searchStr, replaceStr) {
		return str.split(searchStr).join(replaceStr);
	}

	util.callAPI = (param) => {
		param.url = `${param.url}?crtfckey=${crtfckey}`
		return $.ajax({
			url: param.url,
			type: param.type,
			data: param.data,
			async: (param.async == undefined ? true : param.async),
			error: function () {
				callLoadingBar(false);
				callAlert('error', '관리자에게 문의해주세요');
			}

		});
	};
	
	util.callLxdtAPI = (param) => {
		return $.ajax({
			url: param.url,
			type: param.type,
			data: JSON.stringify (param.data),
			contentType: 'application/json',
			async: (param.async == undefined ? true : param.async),
			error: function () {
				callLoadingBar(false);
				callAlert('error', '관리자에게 문의해주세요');
			}

		});
	};

	util.callHTML = (param) => {
		return $.ajax({
			url: param.url,
			type: param.type,
			cache: param.cache,
			async: (param.async == undefined ? true : param.async)
		});
	};

	util.paging = (paginationInfo) => {
		let currentPageNo = Number(paginationInfo.currentPageNo); //현재 페이지 번호
		let firstPageNo = Number(paginationInfo.firstPageNo); // 첫번째 페이지 번호
		let lastPageNo = Number(paginationInfo.lastPageNo); // 마지막 페이지 번호
		let totalPageCount = Number(paginationInfo.totalPageCount); // 페이지 총 개수
		let pageSize = Number(paginationInfo.pageSize); // 하단에 보이는 페이지 개수

		//페이지 계산
		let ceilNum = Math.ceil(currentPageNo / pageSize) * pageSize //올림
		let floorNum = Math.floor(currentPageNo / pageSize) * pageSize//내림

		//다음 페이지 번호
		let nextPageNo = totalPageCount == currentPageNo ? currentPageNo : currentPageNo + 1;
		//let nextPageNo = (ceilNum + 1) > totalPageCount ? lastPageNo : (ceilNum + 1);

		//이전 페이지 번호
		/*let prevPageNo = (floorNum <= firstPageNo || currentPageNo == pageSize) ? firstPageNo
			: (floorNum == currentPageNo) ? currentPageNo - pageSize : floorNum;*/
		let prevPageNo = currentPageNo == 1 ? currentPageNo : currentPageNo - 1;

		//첫번째 페이지 번호
		firstPageNo = ceilNum - pageSize + 1;

		//마지막 페이지 번호
		lastPageNo = (ceilNum > totalPageCount) ? totalPageCount : ceilNum;

		let pages = [];
		for (var i = firstPageNo; i <= lastPageNo; i++) {
			pages.push(i);
		}

		paginationInfo.firstPageNo = firstPageNo;
		paginationInfo.lastPageNo = lastPageNo;
		paginationInfo.nextPageNo = nextPageNo;
		paginationInfo.prevPageNo = prevPageNo;
		paginationInfo.pages = pages;

	}

	/*OUI에서 리턴해주느 TOC LIST들을 API구조에 맞게 정제
	 * 1. 유저 아이디 추가
	 * 2. registerId 없으면 추가
	 * 3. layerId 명칭변경(->lyrId)
	 * 4. 스타일 정보 api에서 사용하는 JSON 구조에 맞게 변경
	 * 5. 팝업 정보 api에서 사용하는 JSON 구조에 맞게 변경
	 * 6. API에서 필요없는 속성들 제거
	 * */
	util.tocListConvert = (tocList) => {

		//tocList 저장 포멧으로 변경
		return tocList.map(content => {
			let saveFormat = {
				lyrGroupLevelCode: content.lyrGroupLevelCode,
				lyrGroupSeCode: content.lyrGroupSeCode,
				lyrSortOrdr: content.lyrSortOrdr,
				onOffAt: content.onOffAt,
				registerId: content.registerId,
				upperGroupId: content.upperGroupId,
				userId: userId//1. 유저 아이디 추가
			};

			//2. registerId 없으면 추가.
			if (!saveFormat.registerId) {
				saveFormat.registerId = userId;
			}

			//레이어 타입
			if (content.lyrGroupSeCode == "02") {

				//3. layerId 명칭변경(->lyrId)
				saveFormat.lyrId = content.layerId;
				//4. 스타일 저장 포멧으로 변경
				saveFormat.symbolCndCn = content.style ? JSON.stringify({
					serviceType: content.style.targetLayerService,
					styleObject: content.style.nowStyleObject.styleObject,
					opacity: content.style.nowStyleObject.opacity,
				}, (key, value) => {
					return typeof value === 'function' ? value.toString() : value;
				}) : null;

				//5. 팝업 저장 포멧으로 변경
				saveFormat.popupInfo = content.popup && content.popup.layerPopupEstbs ? {
					popupTyCode: content.popup.layerPopupEstbs.popupTyCode,
					lyrGroupSn: content.lyrSortOrdr,
					popupSj: content.popup.layerPopupEstbs.popupSj,
					lyrId: saveFormat.lyrId,
					userId: saveFormat.userId,
					detailList: content.popup.detailList ? content.popup.detailList.map(item => {
						return {
							columnNm: item.columnNm,
							columnOrdr: item.columnOrdr,
							indictAt: item.indictAt
						};
					}) : null
				} : null;

				if (content.flterCndCn != null && content.flterCndCn != "") {
					saveFormat.flterCndCn = content.flterCndCn;
				}
				saveFormat.lyrNcm = content.lyrNcm;


				return saveFormat;
			}
			//그룹 타입
			else {
				saveFormat.lyrGroupId = content.lyrGroupId;
				saveFormat.lyrGroupNm = content.lyrGroupNm;

				return saveFormat;
			}
		});
	};
	/*
	 * 헤더 위젯 실행(widgetList.js에서 가져옴)
	 * 
	 * 
	 * */
	util.headerWidgetAdd = (widgetList) => {
		if ($(`#widget_header ul.widget_header_ul`).length <= 0) {
			$(`#widget_header`).append(`<ul class="widget_header_ul"></ul>`);
		}
		if ($(`#widget_header ul.widget_header_ul li button.tool`).length <= 0) {
			widgetList.forEach(item => {
				$(`#widget_header ul.widget_header_ul`).append(createLiHtml(item, 'widget', 'header'));
			});
		} else {
			widgetList.forEach(item => {
				$(`#widget_header ul.widget_header_ul li button.tool`).parent()[0].outerHTML = createLiHtml(item, 'widget', 'header');
			});
		}
	}
	util.layerWidgetAdd = (layerWidgetOption) => {
		let layerWidgetList = ['attributeGrid', 'layerSearch', 'layerUpload', 'popupSet', 'styleSet'];
		layerWidgetList.forEach(e => {
			if (!layerWidgetOption[e]) {
				$(`#${e}OptionBtn`).click();
			}
		})
	};
	/*
	 * 상단, 툴바, 하단 위젯 실행. 
	 * 
	 * 
	 * */
	util.TopToolbarBottomWidgetAdd = (widgetList, mode) => {
		if (widgetList.length == 0) return;
		if (mode == "top") {
			$("#top_widget_div").html("")
		}
		widgetList.forEach(e => {
			let target = '';
			// 위젯 div 요소 동적 생성해주기
			if (mode == "top") {
				let html = app.util.ouiDivTopCreate(e);
				if (e !== 'spatialAnalysisWidget') $("#top_widget_div").append(html);
			}
			else if (mode == "toolbar") {
				let html = app.util.ouiDivToolbarCreate(e);
				let toolbarLength = app.webapp.data.tempToolbarList.length;
				//위젯을 그려주고 위젯 리스트에 넣기때문에 갯수보다 -1을 해주어야함.
				if (toolbarLength <= 4) {
					$("#toolbar_dep1").append(html); //위젯 개수를 헤아려 dep 나누어야함.	
				}
				else if (4 < toolbarLength && toolbarLength <= 9) {
					$("#toolbar_dep2").append(html); //위젯 개수를 헤아려 dep 나누어야함.					
				}
				else {
					$("#toolbar_dep3").append(html); //위젯 개수를 헤아려 dep 나누어야함.
				}
				app.webapp.data.tempToolbarList.push(e);
			}
			// 초기화 위젯 target 및 옵션 설정.
			switch (e) {
				case "addressSearchWidget":
					break;
				case "drawControlWidget":
					    odf.event.addListener(map,'contextmenu',(evt)=>{
				    	  $('#odf-draw-styleBox').css('display', 'none');
				        })
					break;
				case "printControlWidget":
					if (mode != "toolbar") target = `#printWidget_${mode}`;
					break;
				case "fullScreenControlWidget":
					if (mode != "toolbar") target = `#fullScreenControlWidget_${mode}`;
					break;
				case "downloadControlWidget":
					if (mode != "toolbar") target = `#downloadControlWidget_${mode}`;
					break;
				case "rotationControlWidget":
					if (mode != "toolbar") target = `#rotationControlWidget_${mode}`;
					break;
				case "timeSliderControlWidget":
					if (mode != "toolbar") target = `#timeSliderControlWidget_${mode}`;
					$(`#timeSliderControlWidget_${mode}Icon`).show();
					break;
				case "overViewMapControlWidget":
					if (mode != "toolbar") target = `#overViewMapControlWidget_${mode}`;
					break;
				case "featureAttributeFormWidget":
					if (mode != "toolbar") target = `#featureAttributeFormWidget_${mode}`;
					$(`#featureAttributeFormWidget_${mode}Icon`).show();
					break;
				case "bookMarkControlWidget":
					if (mode != "toolbar") target = `#bookMarkControlWidget_${mode}`;
					$(`#bookMarkControlWidget_${mode}Icon`).show();
					break;
				case "zoomControlWidget":
					if (mode != "toolbar") target = `#zoomControlWidget_${mode}`;
					break;
				case "swiperControlWidget":
					if (mode != "toolbar") target = `#swiperControlWidget_${mode}`;
					$(`#swiperControlWidget_${mode}Icon`).show();
					break;
				case "analysisSumryWidget":
					if (mode != "toolbar") target = `#analysisSumryWidget_${mode}`;
					$(`#analysisSumryWidget_${mode}Icon`).show();
					break;
				case "analysisLcWidget":
					if (mode != "toolbar") target = `#analysisLcWidget_${mode}`;
					$(`#analysisLcWidget_${mode}Icon`).show();
					break;
				case "analysisPttrnWidget":
					if (mode != "toolbar") target = `#analysisPttrnWidget_${mode}`;
					$(`#analysisPttrnWidget_${mode}Icon`).show();
					break;
				case "analysisProximityWidget":
					if (mode != "toolbar") target = `#analysisProximityWidget_${mode}`;
					$(`#analysisProximityWidget_${mode}Icon`).show();
					break;
				case "analysisManageWidget":
					if (mode != "toolbar") target = `#analysisManageWidget_${mode}`;
					$(`#analysisManageWidget_${mode}Icon`).show();
					break;
				case "analysisCoordWidget":
					if (mode != "toolbar") target = `#analysisCoordWidget_${mode}`;
					$(`#analysisCoordWidget_${mode}Icon`).show();
					break;
			}
			// widget div 요소 켜주기
			target ? $(target).show() : $(`#${e}`).show();
			// 위젯박스에 아이콘 보여주기
			$(`#${e}Box_${mode}`).show();
			if (target) {
				app.oui[e]().setTarget(target).build()
			}else if (['analysisSumryWidget','analysisLcWidget','analysisPttrnWidget','analysisProximityWidget','analysisManageWidget','analysisCoordWidget','tocPopupWidget','layerStyleControlWidget','overlapWidget','landInfoWidget','cvgControlWidget'].includes(e)){
			}else if (e != 'homeControlWidget') {
				// app.oui[e]().build()
			} else {
				let viewInfo = {};
				if (app.webapp.data.webAppOptions.mapTmplatTyCode == 'SES' || app.webapp.data.webAppOptions.mapTmplatTyCode == 'JOR') {

				} else {
					if (app.webapp.data.webAppOptions.detailSetting.mainTab.mapScope.useYn) {
						let tempScope = app.webapp.data.webAppOptions.detailSetting.mainTab.mapScope;
						let x = tempScope.center[0];
						let y = tempScope.center[1];
						let projection4326 = new odf.Projection({ EPSG: '4326' });
						let centerPoint = projection4326.unproject([x, y], mainProjection.split(":")[1]);
						viewInfo.center = centerPoint;
						viewInfo.zoom = tempScope.zoom
					} else {
						let tempScope2 = JSON.parse(app.webmap.data.webmapView.userMapInfo.userMapScopeValue).mapCenter;
						viewInfo.center = [tempScope2.x, tempScope2.y];
						viewInfo.zoom = tempScope2.zoom
					}
					app.oui[e]().setCenter(viewInfo.center).setZoom(viewInfo.zoom).build();

				}
			}

			//target ? e == 'timeSliderControlWidget' ? app.oui[e]().setTarget(target) :app.oui[e]().setTarget(target).build() : app.oui[e]().build();
		})
	}

	/*
	 * jh.kim
	 * 
	 * esc key event 지도영역 선택(웹앱) 종료할때.
	 * 
	 * */
	util.esc = function (param) {
		$(document).keyup(function (e) {
			if (e.keyCode == 27 && param == "mapScope") {
				app.core.draw.deactivate();
				param = "";
				return;
			}
		});
	}

	util.getUserMapScopeValue = () => {
		const scope = map.getView().calculateExtent();
		const mapCenter = map.getView().getCenter();
		const mapZoom = map.getView().getZoom();
		const strJson = {
			type: "extent",
			xmin: scope[0] + 1,
			ymin: scope[1] + 1,
			xmax: scope[2] - 1,
			ymax: scope[3] - 1,
			mapCenter: {
				x: mapCenter[0],
				y: mapCenter[1],
				zoom: mapZoom,
			},
			spatialReference: {
				wikd: mainProjection,
			},
		};
		const jsonData = JSON.stringify(strJson);
		return jsonData;
	}

	/*
	 * jh.kim oui div 동적생성(웹 앱에서 사용) : 상단 위젯에 필요한 div요소롤 동적으로 생성해준다.
	 * 
	 * 
	 * */
	util.ouiDivTopCreate = function (widgetName) {
		let result;
		switch (widgetName) {
			case "downloadControlWidget":
				result = `<li id="downloadControlWidget_top" class="overViewMapControlWidget topWidget">
					<button class="tool">
						<span>다운로드</span>
					</button> </li>`
				break;
			case "printControlWidget":
				result = `<li id="printWidget_top" class="printWidget topWidget" >
					<button class="tool">
						<span>프린트</span>
					</button> </li>`
				break;
			case "overViewMapControlWidget":
				result = `<li id="overViewMapControlWidget_top" class="overViewMapControlWidget topWidget">
		        		<button class="tool">
		        			<span>오버뷰</span>
		        	</button> </li>`
				break;
			case "fullScreenControlWidget":
				result = `<li id="fullScreenControlWidget_top" class="overViewMapControlWidget topWidget">
		        		<button class="tool">
		        			<span>전체화면</span>
		        		</button> </li>`
				break;
			case "rotationControlWidget":
				result = `<li id="rotationControlWidget_top" class="rotationControlWidget topWidget">
						<button class="tool">
		        			<span>나침반</span>
		        		</button> </li>`
				break;
			case "timeSliderControlWidget":
				result = `<li id="timeSliderControlWidget_topIcon" class="timeSliderControlWidget topWidget" onclick="app.webapp.components.sampleFrameVue.OnOffToWidget('timeSliderControlWidget','top')">
		        		<button class="tool">
		        			<span style="">타임슬라이더</span>
		        		</button> </li>`
				break;
			case "featureAttributeFormWidget":
				result = `<li id="featureAttributeFormWidget_topIcon" class="featureAttributeFormWidget topWidget" onclick="app.webapp.components.sampleFrameVue.OnOffToWidget('featureAttributeFormWidget','top')">
						<button class="tool">
		        			<span>피쳐속성폼</span>
		        		</button> </li>`
				break;
			case "bookMarkControlWidget":
				result = `<li id="bookMarkControlWidget_topIcon" class="bookMarkControlWidget topWidget" onclick="app.webapp.components.sampleFrameVue.OnOffToWidget('bookMarkControlWidget','top')">
						<button class="tool">
		    			<span>북마크</span>
							</button> </li>`
				break;
			case "spatialAnalysisWidget":
				result = `<li id="spatialAnalysisWidget_top" class="spatialAnalysisWidget topWidget">
					<button class="tool">
	    			<span>공간분석</span>
						</button> </li>`
				break;
			case "swiperControlWidget":
				result = `<li id="swiperControlWidget_topIcon" class="swiperControlWidget topWidget" onclick="app.webapp.components.sampleFrameVue.OnOffToWidget('swiperControlWidget','top')">
				<button class="tool">
					<span>스와이프</span>
				</button> </li>`
				break;
			case "tocPopupWidget":
				result = `<li id="tocPopupWidget_topIcon" class="tocPopupWidget topWidget">
				<button class="tool" id="tocPopupBtn">
					<span>지도TOC</span>
				</button> </li>`
				break;
			case "layerStyleControlWidget":
				result = `<li id="layerStyleControlWidget_topIcon" class="layerStyleControlWidget topWidget">
				<button class="tool" id="layerStyleBtn">
					<span>레이어Style</span>
				</button> </li>`
				break;
			case "overlapWidget":
				result = `<li id="overlapWidget_topIcon" class="overlapWidget topWidget">
				<button class="tool" id="overlapBtn">
					<span>중첩 영상</span>
				</button> </li>`
				break;
			case "landInfoWidget":
				result = `<li id="landInfoWidget_topIcon" class="landInfoWidget topWidget">
					<button class="tool landInfoWidget_pointBtn">
						<span>부동산정보</span>
					</button> </li>`
					break;
			case "cvgControlWidget":
				result = `<li id="cvgControlWidget_topIcon" class="cvgControlWidget topWidget">
					<button class="tool cvgControlWidget_pointBtn">
						<span>융복합 데이터</span>
					</button> </li>`
					break;
				

			//				
			//				<div id="location" class="location"></div>
			//				<div class="searchArea" id="searchAreaWidget"></div>
			//				

		}
		return result;
	}
	util.ouiWebmapToolbarCreate = function (widgetName) {
		let result;
		switch (widgetName) {
			case "homeControlWidget":
				result = `<li class="homeWidget" id="homeControlWidget"></li>`
				break;
			case "roadViewWidget":
				result = `<li class="roadViewWidget" id="roadViewWidget" >
					<button id="linkRoadView">
					<span>로드뷰</span>
					</button>
				</li>`
				break;
			case "clearControlWidget":
				result = `<li class="resetWidget" id="clearControlWidget" ></li>`
				break;
			case "moveControlWidget":
				result = `<li class="moveControlWidget" id="moveControlWidget"></li>`
				break;
			case "basemapWidget":
				result = `<li class="basemapWidget" id="basemapWidget"></li>`
			case "mapWidget":
				result = `<li class="basemapWidget" id="basemapWidget"></li>`
				break;
			case "divideMapWidget":
				result = `<li class="divideWidget" id="divideMapWidget"></li>`
				break;
			case "drawControlWidget":
				result = `<li class="drawWidget" id="drawControlWidget" ></li>`
				break;
			case "limsControlWidget":
				result = `<li class="limsControlWidget" id="limsControlWidget" ></li>`
				break;
			case "printControlWidget":
				result = `<li class="printWidget" id="printWidget"></li>`
				break;
			case "downloadControlWidget":
				result = `<li class="downloadWidget" id="downloadWidget"></li>`
				break;
			case "pnuGetterWidget":
				result = `<li class="pnuGetterWidget" id="pnuGetterElement"></li>`
				break;
			case "estateWidget":
				result = `<li class="estateWidget" id="estateWidget"></li>`
				break;
			case "lsmdControlWidget":
				result = `<li class="lsmdControlWidget" id="lsmdControlWidget"></li>`
				break;
			case "measureControlWidget":
				result = `<li class="measureWidget" id="measureControlWidget"> </li>`
				break;
			case "fullScreenControlWidget":
				result = `<li class="fullScreenControlWidget" id="fullScreenControlWidget"></li>`
				break;
			case "rotationControlWidget":
				result = `<li class="rotationControlWidget" id="rotationControlWidget"></li>`
				break;
			case "bookmarkControlWidget":
				result = `<li class="bookMarkWidget" id="bookMarkControlWidget">
									<button id="bookMarkBtn" class="ico_bookmark">
										<span>북마크</span>
									</button>
								</li>`
				break;
			case "cctvControlWidget":
				result = `<li class="cctvControlWidget" id="cctvControlWidget"></li>`;
				break;
			case "swiperControlWidget":
				result = `<li class="swiperWidget" id="swiperWidget">
					<button id="swiperBtn" class="swiper_widget_btn">
						<span>스와이프</span>
					</button>
				</li>`
				break;
			case "dataAddWidget":
				result = `<li class="dataAddWidget" id="dataAddWidget" >
					<button id="dataAddBtn" class="data_add_widget_btn">
						<span>데이터<br/>추가</span>
					</button>
				</li>`
				break;
			case "geoCodingWidget":
				result = `<li class="geoCodingWidget" id="geoCodingWidget" >
					<button id="geoCodingBtn" class="geoCoding_widget_btn">
						<span>지오코딩</span>
					</button>
				</li>`
				break;
			case "tocPopupWidget":
				result = `<li class="tocPopupWidget" id="tocPopupWidget" >
					<button id="tocPopupBtn" class="toc_popup_widget_btn">
						<span>TOC</span>
					</button>
				</li>`
				break;
			case "layerStyleControlWidget":
				result = `<li class="layerStyleControlWidget" id="layerStyleControlWidget" >
					<button id="layerStyleBtn" class="layer_detail_pop_btn">
						<span>레이어<br/>스타일</span>
					</button>
				</li>`
				break;
			case "analysisSumryWidget":
				result = `<li class="analysisSumryWidget analysisWidgetClass" id="analysisSumryWidget" >
					<button class="analysisSumryWidget_onoffBtn">
						<span class="analysisSumryWidget_onoffBtnSpan">데이터<br/>요약 정보</span>
					</button>
					<div class="analysisSegListDiv">
						<button class="analysisSumryWidget_agBtn" id="analysisSumryWidget_sumry_ag">
							<span class="analysisSumryWidget_agBtnSpan">포인트집계</span>
						</button>
						<button class="analysisSumryWidget_joinBtn" id="analysisSumryWidget_sumry_join">
							<span class="analysisSumryWidget_joinBtnSpan">조인피처</span>
						</button>
						<button class="analysisSumryWidget_nrbyBtn" id="analysisSumryWidget_sumry_nrby">
							<span class="analysisSumryWidget_nrbyBtnSpan">주변요약</span>
						</button>
						<button class="analysisSumryWidget_rangeBtn" id="analysisSumryWidget_sumry_range">
							<span class="analysisSumryWidget_rangeBtnSpan">범위내요약</span>
						</button>
						<button class="analysisSumryWidget_centerBtn" id="analysisSumryWidget_sumry_center">
							<span class="analysisSumryWidget_centerBtnSpan">중심 및</br>분산요약</span>
						</button>
					</div>
				</li>`
				break;
			case "analysisLcWidget":
				result = `<li class="analysisLcWidget analysisWidgetClass" id="analysisLcWidget" >
					<div class="analysisLcWidgetContent">
						<button class="analysisLcWidget_onoffBtn">
							<span class="analysisLcWidget_onoffBtnSpan">위치찾기<br/>분석</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisLcWidget_searchLegacyBtn" id="analysisSumryWidget_lc_searchLegacy">
								<span class="analysisLcWidget_searchLegacyBtnSpan">기존 위치<br/>찾기</span>
							</button>
							<button class="analysisLcWidget_searchNewBtn" id="analysisLcWidget_lc_searchNew">
								<span class="analysisLcWidget_searchNewBtnSpan">새 위치<br/>파생</span>
							</button>
							<button class="analysisLcWidget_searchCenterBtn" id="analysisLcWidget_lc_searchCenter">
								<span class="analysisLcWidget_searchCenterBtnSpan">중심찾기</span>
							</button>
							<button class="analysisLcWidget_searchSimilarBtn" id="analysisLcWidget_lc_searchSimilar">
								<span class="analysisLcWidget_searchSimilarBtnSpan">유사한<br/>위치 찾기</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "analysisPttrnWidget":
				result = `<li class="analysisPttrnWidget analysisWidgetClass" id="analysisPttrnWidget" >
					<div class="analysisPttrnWidgetContent">
						<button class="analysisPttrnWidget_onoffBtn">
							<span class="analysisPttrnWidget_onoffBtnSpan">공간패턴<br/>분석</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisPttrnWidget_densityBtn" id="analysisPttrnWidget_pttrn_density">
								<span class="analysisPttrnWidget_densityBtnSpan">밀도 계산</span>
							</button>
							<button class="analysisPttrnWidget_hotspotBtn" id="analysisPttrnWidget_pttrn_hotspot">
								<span class="analysisPttrnWidget_hotspotBtnSpan">핫 스팟</span>
							</button>
							<button class="analysisPttrnWidget_gatherPointsBtn" id="analysisPttrnWidget_pttrn_gatherPoints">
								<span class="analysisPttrnWidget_gatherPointsBtnSpan">포인트<br>군집</span>
							</button>
							<button class="analysisPttrnWidget_interpolatePointsBtn" id="analysisPttrnWidget_pttrn_interpolatePoints">
								<span class="analysisPttrnWidget_interpolatePointsBtnSpan">포인트<br/>내삽 찾기</span>
							</button>
							<button class="analysisPttrnWidget_searchOutliersBtn" id="analysisPttrnWidget_pttrn_searchOutliers">
								<span class="analysisPttrnWidget_searchOutliersBtnSpan">이상치<br/>찾기</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "analysisProximityWidget":
				result = `<li class="analysisProximityWidget analysisWidgetClass" id="analysisProximityWidget" >
					<div class="analysisProximityWidgetContent">
						<button class="analysisProximityWidget_onoffBtn">
							<span class="analysisProximityWidget_onoffBtnSpan">근접도<br/>분석</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisProximityWidget_connectDestinationBtn" id="analysisProximityWidget_proximity_connectDestination">
								<span class="analysisProximityWidget_connectDestinationBtnSpan">출발지와<br/>목적지연결</span>
							</button>
							<button class="analysisProximityWidget_bufferBtn" id="analysisProximityWidget_proximity_buffer">
								<span class="analysisProximityWidget_bufferBtnSpan">버퍼 생성</span>
							</button>
							<button class="analysisProximityWidget_drivingAreaBtn" id="analysisProximityWidget_proximity_drivingArea">
								<span class="analysisProximityWidget_drivingAreaBtnSpan">운전시간<br/>영역 생성</span>
							</button>
							<button class="analysisProximityWidget_findNearestPointBtn" id="analysisProximityWidget_proximity_findNearestPoint">
								<span class="analysisProximityWidget_findNearestPointBtnSpan">최근접<br/>위치찾기</span>
							</button>
							<button class="analysisProximityWidget_findPathBtn" id="analysisProximityWidget_proximity_findPath">
								<span class="analysisProximityWidget_findPathBtnSpan">경로계획</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "analysisManageWidget":
				result = `<li class="analysisManageWidget analysisWidgetClass" id="analysisManageWidget" >
						<button class="analysisManageWidget_onoffBtn">
							<span class="analysisManageWidget_onoffBtnSpan">데이터<br/>관리 분석</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisManageWidget_dsslveBtn" id="analysisManageWidget_manage_dsslve">
								<span class="analysisManageWidget_dsslveBtnSpan">경계 디졸브</span>
							</button>
							<button class="analysisManageWidget_extrcBtn" id="analysisManageWidget_manage_extrc">
								<span class="analysisManageWidget_extrcBtnSpan">데이터 추출</span>
							</button>
							<button class="analysisManageWidget_dvsionBtn" id="analysisManageWidget_manage_dvsion">
								<span class="analysisManageWidget_dvsionBtnSpan">공간 분할<br/>생성</span>
							</button>
							<button class="analysisManageWidget_mergeBtn" id="analysisManageWidget_manage_merge">
								<span class="analysisManageWidget_mergeBtnSpan">레이어 병합</span>
							</button>
							<button class="analysisManageWidget_eraseBtn" id="analysisManageWidget_manage_erase">
								<span class="analysisManageWidget_eraseBtnSpan">레이어 중첩</br>(지우기)</span>
							</button>
							<button class="analysisManageWidget_intsctBtn" id="analysisManageWidget_manage_intsct">
								<span class="analysisManageWidget_intsctBtnSpan">레이어 중첩</br>(교차)</span>
							</button>
							<button class="analysisManageWidget_unionBtn" id="analysisManageWidget_manage_union">
								<span class="analysisManageWidget_unionBtnSpan">레이어 중첩</br>(유니온)</span>
							</button>
							<button class="analysisManageWidget_clusteringBtn" id="analysisManageWidget_manage_clustering">
								<span class="analysisManageWidget_clusteringBtnSpan">클러스터링</span>
							</button>
							<button class="analysisManageWidget_arBtn" id="analysisManageWidget_manage_ar">
								<span class="analysisManageWidget_arBtnSpan">면적 계산</span>
							</button>
							<button class="analysisManageWidget_ltBtn" id="analysisManageWidget_manage_lt">
								<span class="analysisManageWidget_ltBtnSpan">길이 계산</span>
							</button>
						</div>
				</li>`
				break;
			case "analysisCoordWidget":
				result = `<li class="analysisCoordWidget analysisWidgetClass" id="analysisCoordWidget" >
					<div class="analysisCoordWidgetContent">
						<button class="analysisCoordWidget_onoffBtn">
							<span class="analysisCoordWidget_onoffBtnSpan">좌표변환</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisCoordWidget_fileBtn" id="analysisCoordWidget_coord_file">
								<span class="analysisCoordWidget_fileBtnSpan">파일 좌표</span>
							</button>
							<button class="analysisCoordWidget_singleBtn" id="analysisCoordWidget_coord_single">
								<span class="analysisCoordWidget_singleBtnSpan">단일 좌표</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "overlapWidget":
				result = `<li class="overlapWidget" id="overlapWidget" >
					<button id="overlapBtn">
						<span>중첩 영상</span>
					</button>
				</li>`
				break;
			case "landInfoWidget":
				result = `<li class="landInfoWidget" id="landInfoWidget" >
					<div class="landInfoWidgetContent">
						<button class="landInfoWidget_onoffBtn">
							<span class="landInfoWidget_onoffBtnSpan">부동산 정보</span>
						</button>
						<div class="landSegListDiv">
							<button class="landInfoWidget_pointBtn">
								<span class="landInfoWidget_pointSpan">지점</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "cvgControlWidget":
				result = `<li class="cvgControlWidget" id="cvgControlWidget" >
					<div class="cvgControlWidgetContent">
						<button class="cvgControlWidget_onoffBtn">
							<span class="landInfoWidget_onoffBtnSpan">융복합 데이터</span>
						</button>
					</div>
				</li>`
				break;
			case "illgCnstWidget":
				result = `<li class="illgCnstWidget" id="illgCnstWidget" >
					<button id="illgCnst_onoffBtnSpan" class="illg_cnstWidget_btn">
						<span id='illgCnstWidget_span'>불법 건축물</span>
					</button>
				</li>`
				break;		
		}
		return result;
	}


	util.ouiDivToolbarCreate = function (widgetName) {
		let result;
		switch (widgetName) {
			case "homeControlWidget":
				result = `<li class="homeWidget" id="homeControlWidget" style="display:none;"></li>`
				break;
			case "currentViewControlWidget":
				result = `<li class="currentViewWidget" id="currentViewControlWidget" style="display:none;"></li>`
				break;
			case "roadViewWidget":
				result = `<li class="roadViewWidget" id="roadViewWidget" style="display:none;"></li>`
				break;
			case "clearControlWidget":
				result = `<li class="resetWidget" id="clearControlWidget" style="display:none;"></li>`
				break;
			case "moveControlWidget":
				result = `<li class="moveControlWidget" id="moveControlWidget" style="display:none;"></li>`
				break;
			case "basemapWidget":
				result = `<li class="basemapWidget" id="basemapWidget" style="display:none;"></li>`
				break;
			case "divideMapWidget":
				result = `<li class="divideWidget" id="divideMapWidget" style="display:none;"></li>`
				break;
			case "drawControlWidget":
				result = `<li class="drawWidget" id="drawControlWidget" style="display:none;"></li>`
				break;
			case "limsControlWidget":
				result = `<li class="limsControlWidget" id="limsControlWidget" style="display:none;"></li>`
				break;
			case "lsmdControlWidget":
				result = `<li class="lsmdControlWidget" id="lsmdControlWidget" style="display:none;"></li>`
				break;
			case "measureControlWidget":
				result = `<li class="measureWidget" id="measureControlWidget" style="display:none;"> </li>`
				break;
			case "fullScreenControlWidget":
				result = `<li class="fullScreenControlWidget" id="fullScreenControlWidget" style="display:none;"></li>`
				break;
			case "rotationControlWidget":
				result = `<li class="rotationControlWidget" id="rotationControlWidget" style="display:none;"></li>`
				break;
			case "bookMarkControlWidget":
				result = `<li id="bookMarkControlWidget_toolbarIcon" class="bookMarkControlWidget"
							onclick="app.webapp.components.sampleFrameVue.OnOffToWidget('bookMarkControlWidget','toolbar')" style="display:none;">
							<div class="clearControl_clearControlContent">
								<button class="clearControl_clearBtn">
									<span class="clearControl_clearBtnSpan">북마크</span>
								</button>
							</div></li>`
				break;
			case "cctvControlWidget":
				result = `<li class="cctvControlWidget" id="cctvControlWidget" style="display:none;"></li>`;
				break;
			case "analysisSumryWidget":
				result = `<li class="analysisSumryWidget analysisWidgetClass" id="analysisSumryWidget" >
					<div class="analysisSumryWidgetContent">
						<button class="analysisSumryWidget_onoffBtn">
							<span class="analysisSumryWidget_onoffBtnSpan">데이터<br/>요약 정보</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisSumryWidget_agBtn" id="analysisSumryWidget_sumry_ag">
								<span class="analysisSumryWidget_agBtnSpan">포인트집계</span>
							</button>
							<button class="analysisSumryWidget_joinBtn" id="analysisSumryWidget_sumry_join">
								<span class="analysisSumryWidget_joinBtnSpan">조인피처</span>
							</button>
							<button class="analysisSumryWidget_nrbyBtn" id="analysisSumryWidget_sumry_nrby">
								<span class="analysisSumryWidget_nrbyBtnSpan">주변요약</span>
							</button>
							<button class="analysisSumryWidget_rangeBtn" id="analysisSumryWidget_sumry_range">
								<span class="analysisSumryWidget_rangeBtnSpan">범위내요약</span>
							</button>
							<button class="analysisSumryWidget_centerBtn" id="analysisSumryWidget_sumry_center">
								<span class="analysisSumryWidget_centerBtnSpan">중심 및</br>분산요약</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "analysisLcWidget":
				result = `<li class="analysisLcWidget analysisWidgetClass" id="analysisLcWidget" >
					<div class="analysisLcWidgetContent">
						<button class="analysisLcWidget_onoffBtn">
							<span class="analysisLcWidget_onoffBtnSpan">위치찾기<br/>분석</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisLcWidget_searchLegacyBtn" id="analysisSumryWidget_lc_searchLegacy">
								<span class="analysisLcWidget_searchLegacyBtnSpan">기존 위치<br/>찾기</span>
							</button>
							<button class="analysisLcWidget_searchNewBtn" id="analysisLcWidget_lc_searchNew">
								<span class="analysisLcWidget_searchNewBtnSpan">새 위치<br/>파생</span>
							</button>
							<button class="analysisLcWidget_searchCenterBtn" id="analysisLcWidget_lc_searchCenter">
								<span class="analysisLcWidget_searchCenterBtnSpan">중심찾기</span>
							</button>
							<button class="analysisLcWidget_searchSimilarBtn" id="analysisLcWidget_lc_searchSimilar">
								<span class="analysisLcWidget_searchSimilarBtnSpan">유사한<br/>위치 찾기</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "analysisPttrnWidget":
				result = `<li class="analysisPttrnWidget analysisWidgetClass" id="analysisPttrnWidget" >
					<div class="analysisPttrnWidgetContent">
						<button class="analysisPttrnWidget_onoffBtn">
							<span class="analysisPttrnWidget_onoffBtnSpan">공간패턴<br/>분석</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisPttrnWidget_densityBtn" id="analysisPttrnWidget_pttrn_density">
								<span class="analysisPttrnWidget_densityBtnSpan">밀도 계산</span>
							</button>
							<button class="analysisPttrnWidget_hotspotBtn" id="analysisPttrnWidget_pttrn_hotspot">
								<span class="analysisPttrnWidget_hotspotBtnSpan">핫 스팟</span>
							</button>
							<button class="analysisPttrnWidget_gatherPointsBtn" id="analysisPttrnWidget_pttrn_gatherPoints">
								<span class="analysisPttrnWidget_gatherPointsBtnSpan">포인트<br>군집</span>
							</button>
							<button class="analysisPttrnWidget_interpolatePointsBtn" id="analysisPttrnWidget_pttrn_interpolatePoints">
								<span class="analysisPttrnWidget_interpolatePointsBtnSpan">포인트<br/>내삽 찾기</span>
							</button>
							<button class="analysisPttrnWidget_searchOutliersBtn" id="analysisPttrnWidget_pttrn_searchOutliers">
								<span class="analysisPttrnWidget_searchOutliersBtnSpan">이상치<br/>찾기</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "analysisProximityWidget":
				result = `<li class="analysisProximityWidget analysisWidgetClass" id="analysisProximityWidget" >
					<div class="analysisProximityWidgetContent">
						<button class="analysisProximityWidget_onoffBtn">
							<span class="analysisProximityWidget_onoffBtnSpan">근접도<br/>분석</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisProximityWidget_connectDestinationBtn" id="analysisProximityWidget_proximity_connectDestination">
								<span class="analysisProximityWidget_connectDestinationBtnSpan">출발지와<br/>목적지연결</span>
							</button>
							<button class="analysisProximityWidget_bufferBtn" id="analysisProximityWidget_proximity_buffer">
								<span class="analysisProximityWidget_bufferBtnSpan">버퍼 생성</span>
							</button>
							<button class="analysisProximityWidget_drivingAreaBtn" id="analysisProximityWidget_proximity_drivingArea">
								<span class="analysisProximityWidget_drivingAreaBtnSpan">운전시간<br/>영역 생성</span>
							</button>
							<button class="analysisProximityWidget_findNearestPointBtn" id="analysisProximityWidget_proximity_findNearestPoint">
								<span class="analysisProximityWidget_findNearestPointBtnSpan">최근접<br/>위치찾기</span>
							</button>
							<button class="analysisProximityWidget_findPathBtn" id="analysisProximityWidget_proximity_findPath">
								<span class="analysisProximityWidget_findPathBtnSpan">경로계획</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			case "analysisManageWidget":
				result = `<li class="analysisManageWidget analysisWidgetClass" id="analysisManageWidget" >
					<button class="analysisManageWidget_onoffBtn">
						<span class="analysisManageWidget_onoffBtnSpan">데이터<br/>관리 분석</span>
					</button>
					<div class="analysisSegListDiv">
						<button class="analysisManageWidget_dsslveBtn" id="analysisManageWidget_manage_dsslve">
							<span class="analysisManageWidget_dsslveBtnSpan">경계 디졸브</span>
						</button>
						<button class="analysisManageWidget_extrcBtn" id="analysisManageWidget_manage_extrc">
							<span class="analysisManageWidget_extrcBtnSpan">데이터 추출</span>
						</button>
						<button class="analysisManageWidget_dvsionBtn" id="analysisManageWidget_manage_dvsion">
							<span class="analysisManageWidget_dvsionBtnSpan">공간 분할<br/>생성</span>
						</button>
						<button class="analysisManageWidget_mergeBtn" id="analysisManageWidget_manage_merge">
							<span class="analysisManageWidget_mergeBtnSpan">레이어 병합</span>
						</button>
						<button class="analysisManageWidget_eraseBtn" id="analysisManageWidget_manage_erase">
							<span class="analysisManageWidget_eraseBtnSpan">레이어 중첩</br>(지우기)</span>
						</button>
						<button class="analysisManageWidget_intsctBtn" id="analysisManageWidget_manage_intsct">
							<span class="analysisManageWidget_intsctBtnSpan">레이어 중첩</br>(교차)</span>
						</button>
						<button class="analysisManageWidget_unionBtn" id="analysisManageWidget_manage_union">
							<span class="analysisManageWidget_unionBtnSpan">레이어 중첩</br>(유니온)</span>
						</button>
						<button class="analysisManageWidget_clusteringBtn" id="analysisManageWidget_manage_clustering">
							<span class="analysisManageWidget_clusteringBtnSpan">클러스터링</span>
						</button>
						<button class="analysisManageWidget_arBtn" id="analysisManageWidget_manage_ar">
							<span class="analysisManageWidget_arBtnSpan">면적 계산</span>
						</button>
						<button class="analysisManageWidget_ltBtn" id="analysisManageWidget_manage_lt">
							<span class="analysisManageWidget_ltBtnSpan">길이 계산</span>
						</button>
					</div>
				</li>`
				break;
			case "analysisCoordWidget":
				result = `<li class="analysisCoordWidget analysisWidgetClass" id="analysisCoordWidget" >
					<div class="analysisCoordWidgetContent">
						<button class="analysisCoordWidget_onoffBtn">
							<span class="analysisCoordWidget_onoffBtnSpan">좌표변환</span>
						</button>
						<div class="analysisSegListDiv">
							<button class="analysisCoordWidget_fileBtn" id="analysisCoordWidget_coord_file">
								<span class="analysisCoordWidget_fileBtnSpan">파일 좌표</span>
							</button>
							<button class="analysisCoordWidget_singleBtn" id="analysisCoordWidget_coord_single">
								<span class="analysisCoordWidget_singleBtnSpan">단일 좌표</span>
							</button>
						</div>
					</div>
				</li>`
				break;
			// case "featureAttributeFormWidget":
			// 	result = `<li id="featureAttributeFormWidget_toolbarIcon" class="resetWidget"
			// 					onclick="app.webapp.components.sampleFrameVue.OnOffToWidget('featureAttributeFormWidget','toolbar')" style="display:none;">
			// 						<div class="clearControl_clearControlContent">
			// 							<button class="clearControl_clearBtn">
			// 								<span class="clearControl_clearBtnSpan">속성피쳐폼</span>
			// 							</button>
			// 						</div>
			// 			 </li>`
			// 	break;
		}
		return result;
	}

	/*
	 * jh.kim ColorPicker 셋. 같은 함수 반복이라 함수로 추출.
	 * 
	 * */
	util.setColorPicker = (id, color) => {
		$(`#${id}`).ColorPicker({
			color: color,
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$(`#${id}`).css('backgroundColor', '#' + hex);
				$(`#${id}`).next().text(`#${hex}`);
			}
		});
	}


	util.setJorUiJs = () => {
		let currentIdx = 0;
		$(document).on("click", ".cont .sectionArea li", function () {
			let idx = $(this).index();
			let topVal = $('.articleArea .articleList .context').eq(idx).position().top - $('.articleArea .articleList .context').eq(0).position().top;
			$('.articleList').animate({ scrollTop: topVal }, 400)
		});

		$(document).on("click", ".articleList .context.section", function () {
			let idx = $(this).index();
			let topVal = $('.articleArea .articleList .context').eq(idx).position().top - $('.articleArea .articleList .context').eq(0).position().top;
			$('.articleList').animate({ scrollTop: topVal }, 400)
		});

		let currentFocus = function (i) { // 상하버튼과 페이지네이션 클래스 토글
			$('.articleArea .articleList .context').eq(i).addClass('active').siblings().removeClass('active');
			$('.sectionArea li').eq(i).addClass('active').siblings('li').removeClass('active');
			let _check = app.webapp.components.mainTabModalVue.currentTabInfo.tabSn != undefined ? app.webapp.components.mainTabModalVue.currentTabInfo.tabSn : 0;
			if (i != _check) {
				app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab = app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.map(item => {
					if (item.tabSn == i) {
						item.active = "active";
						app.webapp.components.mainTabModalVue.currentTabInfo = item;
						app.webapp.components.sampleFrameVue.clickTab(item);
					} else {
						item.active = "";
					}
					return item;
				})
			}
		}

		$(".articleList").scroll(function () {
			let contPosTop = [];
			for (let i = 0; i < $('.articleArea .articleList .context').length; i++) { //콘텐츠 position().top 값을 contPosTop 에 저장
				let topVal = $('.articleArea .articleList .context').eq(i).position().top - $('.articleArea .articleList .context').eq(0).position().top + $('.articleArea .articleList .context').eq(i).outerHeight() - 40;
				contPosTop.push(topVal);
			}
			let currentTop = $(this).scrollTop(); // 현재 스크롤값

			$.each(contPosTop, function (i) { // 스크롤값을 콘텐츠 높이값과 비교하면서 높으면 해당 인덱스 값 currentIdx에 저장
				if (currentTop < contPosTop[i]) {
					currentIdx = i;
					return false;
				}
			});
			currentFocus(currentIdx) //중간일때 해당 스크롤에 맞는 콘텐츠로 포커스
		});

		// $(".articleList").scroll(function () {

		// });
	}


	/*
		* jh.kim 두개의 배열 비교
		* 
		* param 1 배열 []
		* param 2 배열 []
		* return : 차이점 return []
		* */

	util.arr_diff = function (a1, a2) {

		let a = [], diff = [];

		for (var i = 0; i < a1.length; i++) {
			a[a1[i]] = true;
		}

		for (var i = 0; i < a2.length; i++) {
			if (a[a2[i]]) {
				delete a[a2[i]];
			} else {
				a[a2[i]] = true;
			}
		}

		for (let k in a) {
			diff.push(k);
		}

		return diff;
	}

	/*
	* 로그인 체크
	* 
	* param userId
	* return : 차이점 return []
	* */
	util.checkLogin = function (userId) {
		let _check = true;
		if (userId == '') {
			_check = false;
			callAlert('fail', '로그인 후 이용해주세요.');
		}
		return _check;
	}
	/*
	* 권한 체크
	* 
	* 
	* return : true(권한있음)/false(권한없음)
	* */
	util.checkAuthority = function (param) {
		return param === $('#loginUserId').val();
	}
})(app);