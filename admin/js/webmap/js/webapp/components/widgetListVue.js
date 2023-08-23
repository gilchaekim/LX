app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.widgetList = new Vue({
		el: "#widgetList",
		mounted: function () {
			$("#widgetList").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});

			let widgetIdx = 0;
			$('.btnLeft').on({
				"click": function () {
					widgetIdx--;
					console.log(widgetIdx);
					$(this).closest('.group').removeClass('active').closest('.flex').children('.group').eq(widgetIdx).addClass('active')
				}
			})
			$('.btnRight').on({
				"click": function () {
					widgetIdx++;
					console.log(widgetIdx);
					$(this).closest('.group').removeClass('active').closest('.flex').children('.group').eq(widgetIdx).addClass('active')
				}
			})
		},
		data: {
			data: app.webapp.data,
			list: [],
			// 위젯 전체보기
			addAllList: [],
			delAllList: [],
			mode: ""
		},
		methods: {

			modeText: function () {
				let result;
				switch (this.mode) {
					case "toolbar":
						result = "위젯 선택 (툴바)"
						break;
					case "top":
						result = "위젯 선택 (상단)"
						break;
					case "bottom":
						result = "위젯 선택 (하단)"
						break;
					case "header":
						result = "위젯 선택 (헤더)"
						break;
					case "layer":
						result = "위젯 선택 (레이어)"
						break;
					case "all":
						result = "위젯 전체보기"
						break;
				}
				
				// 위젯 전체보기
				this.addAllList = [];
				this.delAllList = [];
				
				return result;
			},
			hide: function () {
				//$(".widgetSection .widgetBox").hide();
				$(".widgetSection").hide();
				$("#widgetList").hide();

				// 초기화 후 탭별로 있는 위젯 켜주기.
				$(".widgetSection .widgetBox").css("border-color", "#e9e9e9");
				let toolbar = this.data.mapTemplate.detailSetting.widgetTab.toolbar
				let cancleList = this.list.filter(e => !toolbar.includes(e));
				cancleList.forEach(e => {
					let idx = this.list.indexOf(e)
					this.list.splice(idx, 1);
				})
				toolbar.forEach(e => {
					if (!this.list.includes(e)) this.list.push(e);
					$(`#${e}Box`).css("border-color", "#436aeb");
				})
			},
			addWidget: function (widget, mode) {
				// 켜주기
				if (!this.list.includes(widget)) {
					$(event.target).closest('div').css("border-color", "#436aeb");
					this.list.push(widget);
					if (widget == 'landInfoWidget') app.webapp.components.landInfoWidgetModal.show();
					// 위젯 전체보기
					if(this.mode == 'all') {
						this.addAllList.push({name:widget, mode:mode});
						this.addAllList = [...new Set(this.addAllList.map(JSON.stringify))].map(JSON.parse);
					}
				}
				// 꺼주기
				else {
					$(event.target).closest('div').css("border-color", "#e9e9e9");
					let idx = this.list.indexOf(widget)
					this.list.splice(idx, 1);
					
					// 위젯 전체보기
					if(this.mode == 'all') {
						// 선택한 위젯에서 제거
						this.addAllList = this.addAllList.filter(e => e.name !== widget);
						// 선택 해제한 위젯
						this.delAllList.push({name:widget, mode:mode}) ;
						// 선택 해제한 위젯 중복제거
						this.delAllList = [...new Set(this.delAllList.map(JSON.stringify))].map(JSON.parse);
					}
				}

			},
			confirmWidget: function () {
				callConfirm("위젯을 추가/제거 하시겠습니까?", '선택한 해당 위젯이 추가/제거 됩니다', (result) => {
					// 위젯 전체보기
					if(this.mode == 'all'){
						this.applyWidget('toolbar');
						this.applyWidget('top');
						this.applyWidget('bottom');
						this.applyWidget('header');
						
					}else{
						this.applyWidget(this.mode);
					}
					
				})// 확인창
			},// applyWidget()
			applyWidget: function (mode) {
				//let mode = this.mode;
				let target;
				// 위젯별 클래스 명[className] / onOff여부[onOffYn](타임슬라이더나 피쳐폼 같은
				// 위젯) / ouiWidgetYn true : oui 위젯임, false : oui 위젯이
				// 아님(smt에서 생성한 위젯)
				let widgetClassName = app.webapp.data.widgetList;

				// 1.button SubElement
				// 2.widgetDiv SubElement

				// 선택한 위젯
				let checkList = this.list;
				
				// 이미 선택된 위젯 (적용하고 있는 위젯)
				let checkedList = app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbar;
				//checkedList = checkedList.filter(e => checkList.includes(e));

				// 추가 해야될 위젯 (선택한 위젯 - 이미 선택된 위젯)
				let addCheckList = checkList.filter(item => !checkedList.includes(item));
				
				// 1. 취소한 위젯 (이미 선택된 위젯 - 선택한 위젯)
				let cancelList = checkedList.filter(e => !checkList.includes(e));
				
				console.log("11111111  " + mode + " checkList : " + checkList);
				console.log("22222222  " + mode + " checkedList : " + checkedList);
				console.log("33333333  " + mode + " addCheckList : " + addCheckList);
				console.log("44444444  " + mode + " cancelList : " + cancelList);
				
				// 위젯 전체보기
				if(this.mode == 'all') {
					// 추가 해야될 위제 다시 셋팅
					if(this.addAllList !== undefined && this.addAllList.length > 0) {
						addCheckList = allModeWidgetList(mode, this.addAllList);
					}
					// 취소한 위젯 다시 셋팅
					if(this.delAllList !== undefined && this.delAllList.length > 0) {
						cancelList = allModeWidgetList(mode, this.delAllList);
					}
				}

				//	헤더 로직 
				if (mode == 'header') {
					// header나 top 이지만 +버튼에 안생기는 예외 위젯 (상단top 고려했을경우 필요)
					let exceptionWidget = app.webapp.data.headerTopExceptionWidget;

					// + 버튼 ui를 위젯 버튼으로 대체
					if (addCheckList.length > 0) {
						addCheckList.forEach(item => {
							let check = exceptionWidget.find(exItem => {
								return exItem == item;
							});
							if (check == undefined) {
								$(`#widget_${mode} ul.widget_${mode}_ul li button.tool`).parent()[0].outerHTML = createLiHtml(item, 'widget', mode);
							}
						});
					}

					if (cancelList.length > 0) {
						// 취소된 위젯은 다시 li로 변경
						cancelList.forEach(item => {
							let check = exceptionWidget.find(exItem => {
								return exItem == item;
							});
							if (check == undefined) {
								$(`#${item}_${widgetClassName[item].onOffYn ? 'Icon' : mode}`).remove();
								$(`#widget_${mode} ul.widget_${mode}_ul`).append(createLiHtml(item, 'origin', mode));
							}
						});
					}
				}
				//헤더 로직 End

				// 취소 위젯 UI 제거(왼쪽 위젯설정메뉴 에서 제거)
				cancelList.forEach((e, i) => {
					if (mode == "toolbar") {
						let toolbarWidget = app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbarWidget;
						$(`#${e}`).remove();
						// 5번째 위젯 위치를 4번 위젯 뒤로 붙이기.
						if (toolbarWidget.length >= 5) {
							let index = 4
							$target1 = $("#" + toolbarWidget[index]);
							$target2 = $("#" + toolbarWidget[index - 1]);
							$target1.insertAfter($($target2));
						}
					} else {
						mode == "bottom" ? $(`#${e}_${mode}`).hide() : ($(`#${e}_${mode}Icon`).length <= 0 ? $(`#${e}_${mode}`).remove() : null);
					}
					switch (e) {
						case "rotationControlWidget":
							$(".rotationTooltip").remove();
							break;
						case "timeSliderControlWidget":
							//$(`#timeSliderControlWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#timeSliderControlWidget_topIcon`).remove();
							app.webapp.components.sampleFrameVue[e] = false;
							break;
						case "featureAttributeFormWidget":
							$(`#featureAttributeFormWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#featureAttributeFormWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[e] = false;
							break;
						// case "bookMarkControlWidget_toolbarIcon":
						case "bookMarkControlWidget":
							$(`#bookMarkControlWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#bookMarkControlWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[e] = false;
							break;
						case "swiperControlWidget":
							//$(`#swiperControlWidget${mode}Icon`).hide();
							if (mode == "top") $(`#swiperControlWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[e] = false;
							break;
					}

					if (app.widget[e] && mode != "header") app.widget[e].remove();
					app.widget[e] && delete app.widget[e];

					let idx = app.webapp.data.webAppOptions.detailSetting.widgetTab[`${mode}Widget`].indexOf(e);

					// 배열 하나씩 제거.
					if (idx > -1) app.webapp.data.webAppOptions.detailSetting.widgetTab[`${mode}Widget`].splice(idx, 1);
					//= app.webapp.data.webAppOptions.detailSetting.widgetTab[`${mode}Widget`].filter(item => checkList.includes(item));

					//분석 위젯 분기처리 필요.
					$(`#${e}Box_${mode}`).hide();
					if (e == "printControlWidget") { $(`#printWidget_${mode}`).hide(); $(`#printWidget_${mode}`).remove() };
					// widget div 요소 꺼주기 요소 다 지우면 끌 필요 없음.
					mode == "toolbar" ? $(`#${e}`).hide() : $(`#${e}_${mode}`).hide()
					// widget  요소 지우기
					// if (mode == "top" && (e != "timeSliderControlWidget" || e != "featureAttributeFormWidget" || e != "bookMarkControlWidget")) {
					// 	mode =="bottom" ? $(`#${e}_${mode}`).hide() : $(`#${e}_${mode}`).remove();
					// }
					// else 

				})

				checkedList = checkedList.filter(e => checkList.includes(e));
				
				// 3. 취소한 위젯 배열에서 제거
				app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbar = app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbar.filter(e => !cancelList.includes(e));
				// 위치별 툴바 따로 관리
				app.webapp.data.webAppOptions.detailSetting.widgetTab[`${mode}Widget`] = app.webapp.data.webAppOptions.detailSetting.widgetTab[`${mode}Widget`].filter(e => checkList.includes(e));

				// 4. 이미 선택한 위젯 제외.
				checkList = [...new Set([...checkList, ...checkedList])]
				
				// 위젯 전체보기
				if(this.mode == 'all') checkList = addCheckList;

				// 5. 선택한 위젯 실행
				checkList.forEach((e, i) => {
					//분석 위젯 분기처리 필요.
					if (!app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbar.includes(e)) {
						target = '';
						// 위젯 div 요소 동적 생성해주기
						if (mode == "top") {
							let html = app.util.ouiDivTopCreate(e);
							$("#top_widget_div").append(html);
						}
						else if (mode == "toolbar") {
							let html = app.util.ouiDivToolbarCreate(e);
							let toolbarLength = app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbarWidget.length;
							//위젯을 그려주고 위젯 리스트에 넣기때문에 갯수보다 -1을 해주어야함.
							if (toolbarLength <= 4) {
								$("#toolbar_dep1").append(html); //위젯 개수를 헤아려 dep 나누어야함.	
							}
							else if (toolbarLength <= 9 && toolbarLength > 4) {
								$("#toolbar_dep2").append(html); //위젯 개수를 헤아려 dep 나누어야함.					
							}
							else {
								$("#toolbar_dep3").append(html); //위젯 개수를 헤아려 dep 나누어야함.
							}
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
							case "limsControlWidget":
								break;
							case "lsmdControlWidget":
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
							case "swiperControlWidget":
								if (mode != "toolbar") target = `#swiperControlWidget_${mode}`;
								$(`#swiperControlWidget_${mode}Icon`).show();
								break;
							case "zoomControlWidget":
								if (mode != "toolbar") target = `#zoomControlWidget_${mode}`;
								break;
						}
						// widget div 요소 켜주기
						target ? $(target).show() : $(`#${e}`).show();
						app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbar.push(e);
						// 위치별 툴바 따로 관리
						app.webapp.data.webAppOptions.detailSetting.widgetTab[`${mode}Widget`].push(e);

						// 위젯박스에 아이콘 보여주기
						$(`#${e}Box_${mode}`).show();
						
						let exceptList = ['spatialAnalysisWidget', 'analysisSumryWidget','analysisLcWidget','analysisPttrnWidget','analysisProximityWidget','analysisManageWidget','analysisCoordWidget','tocPopupWidget','layerStyleControlWidget','overlapWidget','landInfoWidget'];
						
						if (!exceptList.includes(e)) {
							// smt에서 만든 위젯이 아닌 경우 경우
							if (!(widgetClassName[e] != undefined && !widgetClassName[e].ouiWidgetYn)) {
								// 이미 타겟이 지정되어있는 위젯인지 확인(주소검색/ 행정구역)
								// ? 필요한가.
								let checkWidget = app.webapp.data.headerTopExceptionWidget.find(item => item == e);
								//if (checkWidget == undefined) {
								let pointInfo = JSON.parse(app.webmap.data.webmapView.userMapInfo.userMapScopeValue).mapCenter;
								target ? app.oui[e]().setTarget(target).build() : e != 'homeControlWidget' ? app.oui[e]().build() : app.oui[e]().setCenter( [pointInfo.x , pointInfo.y]).setZoom(pointInfo.zoom).build(); 

								//}
							}
						}
					}
				}); // checkList forEach문
			}
		}// method
	}); // vue
})(app);

// 동적 버튼 생성 (파마리터 : 위젯명 , 타입('widget', 'origin'))
const createLiHtml = (widgetNm, type = 'origin', mode) => {
	let widgetClassName = app.webapp.data.widgetList;
	let functionNm = widgetNm.slice(0, widgetNm.indexOf('Widget')); // 예)
	// tocWidget
	// ->
	// toc
	let html_button = type == 'widget' ?
		`<li id="${widgetNm}_${widgetClassName[widgetNm].onOffYn ? 'Icon' : mode}" class="${widgetClassName[widgetNm].className}" onclick=${widgetClassName[widgetNm].onOffYn ? `app.webapp.components.sampleFrameVue.OnOffToWidget('${widgetNm}','${mode}')` : ''} >
				${widgetClassName[widgetNm].onOffYn || !widgetClassName[widgetNm].ouiWidgetYn ?
			`<div class="${functionNm}_content">
					<button class="${functionNm}_btn widgetBtn">
						<span class="${functionNm}_span headerTxt">${widgetClassName[widgetNm].name}</span>
						${widgetNm == 'webMapUserInfoWidget' ? '<span class="new">0</span>' : ''}
					</button>
					${widgetClassName[widgetNm].subElement != undefined ? widgetClassName[widgetNm].subElement : ''}
				</div>`	: ''}
			</li>` : `<li>
			<button type="button" class="tool">
				<img src="/smt/images/widget/ico-tool-add.png">
				<img src="/smt/images/widget/ico-tool-add-hover.png">
				<span>추가</span>
			</button>
		</li>`;
	return html_button;
};

// 현재 모드에서 선택한 위젯 리스트 (파마리터 : 현재 모드, 선택한 모든 위젯)
const allModeWidgetList = (mode, allWidgetList) => {
	// 현재 mode의 선택한 위젯 - json 형태
	let addModeCheckList = allWidgetList.filter(e => e.mode.includes(mode));
	let addModeCheckWidgetNmList = [];
	addModeCheckList.forEach(el => {
		Object.keys(el).forEach(function(key){
			if(key == "name") addModeCheckWidgetNmList.push(el[key]);
		});
	});
	return addModeCheckWidgetNmList;
};