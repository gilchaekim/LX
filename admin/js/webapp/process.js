app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.process = app.webapp.process || {};
((app) => {
	let process = app.webapp.process = {};

	process.appInit = (_userMapId) => {
		odf.init(`js/odf-config-wavus-${environmentType}.json`); //odf 배경지도 관련 초기 설정 옵션 json 파일
		userMapId = _userMapId;
		/*그리드 정보 가져오기*/
		app.oui.api.cqlInfoApi.changeOption({ userMapId: userMapId });
		app.oui.api.tocApi.changeOption({ userMapId: userMapId });
		app.oui.api.layerApi.changeOption({ userMapId: userMapId });
		const mapContainer = document.querySelector('#map');//맵컨테이너 생성
		/* 맵 초기 좌표 */
		const coord = new odf.Coordinate(276179.88560667867, 413632.9594010007);//전국중심 5186 좌표 기준 
		/* 지도 옵션 */
		const mapOption = {
			center: coord,
			zoom: 9,
			projection: mainProjection,
			basemap: {
				//vWorld : true,
				baroEMap: ['eMapAIR'],
			},
		};
		/* 지도생성 */
		let widgetTab;
		if(map){
			if(app.webapp.data.mapTemplate.type == 'SES' || app.webapp.data.mapTemplate.type == 'JOR'){
				widgetTab = app.webapp.data.defaultToolbarWidget;
				widgetTab.forEach((e)=>{
					app.oui[e]().remove();					
				})
			}  
			else{
				widgetTab = app.webapp.data.webAppOptions.detailSetting.widgetTab 
				let widgetList = Object.keys(widgetTab).filter(e =>
				(e.includes('Widget') && !e.includes('layer')));
				widgetList.forEach((v,j)=>{
					if(widgetTab[v].length != 0){
						widgetTab[v].forEach((element,i)=>{
							//if(element != 'overViewMapControlWidget' && element != 'addressSearchWidget' && element != 'administrativeDistrictSearchWidget' && element !=  'downloadControlWidget' && element !=  'printControlWidget')
							let widgetClassName = app.webapp.data.widgetList;
							if(widgetClassName[element] == undefined){
								app.oui[element]().remove();								
							}else {
								$(`#${element}_${widgetClassName[element].onOffYn ? 'Icon' : 'header'}`).remove();
								$(`#widget_header ul.widget_header_ul`).append(createLiHtml(element, 'origin'));
							}
						})
						
					}
				})
				
			}
		}
		map = new odf.Map(mapContainer, mapOption);
		
		if (widgetTab) {
			let toolWidgetList = widgetTab.toolbarWidget;
			if(app.webapp.data.mapTemplate.type != 'SES' && app.webapp.data.mapTemplate.type !='JOR'){
				//레이어위젯 실행.
				app.util.layerWidgetAdd(widgetTab.layerWidgetOption);
				//헤더위젯 실행.
				app.util.headerWidgetAdd(widgetTab.headerWidget);
				//상단위젯 실행.
				//스와이퍼, 타임슬라이더, 북마크, 오버뷰, 피쳐속성폼은 로직이 달라서 제외하고 빌드
				//let topWidgetList = widgetTab.topWidget.filter(e=> e == 'overViewMapControlWidget' || e == 'addressSearchWidget' || e == 'administrativeDistrictSearchWidget' || e == 'downloadControlWidget' || e == 'printControlWidget')
				app.util.TopToolbarBottomWidgetAdd(widgetTab.topWidget, 'top');
				//하단위젯 실행.
				app.util.TopToolbarBottomWidgetAdd(widgetTab.bottomWidget, 'bottom');				
			}
			else{
				toolWidgetList = widgetTab;
			}
			//툴바위젯 실행.
			app.util.TopToolbarBottomWidgetAdd(toolWidgetList, 'toolbar');
		}

		/* 초기 지도생성후 높이 부족으로 인해 지도가 화면에 꽉차지않는 문제 */
		/* ui 변경시 지도 리사이징 */
		const updateMapSize = () => {
			const mapArea = document.querySelector('.mapArea');
			map.setSize([mapArea.offsetWidth, mapArea.offsetHeight]);// 지도 리사이즈
		};
		updateMapSize();
		//배경지도 위젯
		// if (app.webapp.data.webAppOptions.detailSetting.layoutTab.titSec != '시리즈' && app.webapp.data.webAppOptions.detailSetting.layoutTab.titSec != '저널형') {

		// }
		//let toolbarWidget = app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbarWidget; //툴바 위젯

		//테마별 위젯 분기 편집(데이터 그리드 편집모드 O) / 표준  / 기본 (아무것도 x)
		switch (app.webapp.data.webAppOptions.detailSetting.layoutTab.titSec) {
			case "표준": //표준 템플릿
				//홈 위젯
				//app.oui.homeControlWidget().build();
				//TOC 위젯
				app.oui.tocWidget().build();
				app.widget.tocWidget.changeOptions([{
					type: 'grid'
					, options: {
						chart: true,        		//차트
						geomSearch: true,   		//공간검색
						attributeEditor: false, 	//설정
						modify: false,           	//편집모드 - 공간편집
						filter: true,           	//필터
						export: true,          	//추출
						delete: true,          	//편집모드 - 삭제
						insert: true,          	//편집모드 - 추가
						clear: true,            	//필터초기화 & 선택초기화
						editMode: false          	//편집모드        
					}
				}])
				//팝업 위젯 (지도상의 피쳐를 클릭하면 팝업나오게 하는 위젯)
				app.oui.popupWidget().build();
				//초기화 위젯
				/*
				app.oui.clearControlWidget().build();
				/*
				//widgetList 체크해주기.
				$("#homeControlWidget").show();
				$("#homeControlWidgetBox").css("border-color", "#436aeb");
				$("#clearControlWidget").show();
				$("#clearControlWidgetBox").css("border-color", "#436aeb");
				//* 위젯 리스트에 넣기 *
				layerWidget.push("tocWidget");
				toolbar.push("tocWidget");
				widgetList.push("tocWidget"); 
				/*
				toolbarWidget.push("homeControlWidget");
				toolbarWidget.push("clearControlWidget");
				toolbar.push("homeControlWidget"); 
				toolbar.push("clearControlWidget");
				widgetList.push("homeControlWidget"); 
				widgetList.push("clearControlWidget");
				*/
				break;
			case "간편보기": //간편보기 템플릿
				$("#toc").removeClass("active") //TOC 닫기.
				app.oui.tocWidget().build();
				//기본셋팅 위젯 없음.
				break;
			case "편집": //편집 템플릿
				let topWidget = app.webapp.data.webAppOptions.detailSetting.widgetTab.topWidget; //탑 위젯
				let toolbar = app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbar; //전체 위젯
				let layerWidget = app.webapp.data.webAppOptions.detailSetting.widgetTab.layerWidget; //TOC 위젯
				let widgetList = app.webapp.components.widgetList.list //위젯 리스트 컴포넌트
				//TOC 위젯
				app.oui.tocWidget().build();

				//피쳐속성 폼 위젯 기본셋팅
				if (!webappTmplatId && $('#featureAttributeFormWidget_topIcon').length <= 0 ) {
					let html = app.util.ouiDivTopCreate("featureAttributeFormWidget");
					$("#top_widget_div").append(html);
					app.oui.featureAttributeFormWidget().setTarget("#featureAttributeFormWidget_top").build();
					$("#featureAttributeFormWidgetBox").css("border-color", "#436aeb");
					//* 위젯 리스트에 넣기 *
					topWidget.push("featureAttributeFormWidget");
					widgetList.push("featureAttributeFormWidget");
					toolbar.push("featureAttributeFormWidget");
				}
				//* 위젯 리스트에 넣기 TOC *
				layerWidget.push("tocWidget");
				toolbar.push("tocWidget");
				widgetList.push("tocWidget");

				//팝업 위젯 (지도상의 피쳐를 클릭하면 팝업나오게 하는 위젯)
				app.oui.popupWidget().build();
				break;
			case "시리즈":
			case "저널":// 시리즈 템플릿
				app.webapp.data.defaultToolbarWidget.forEach(item => {
					let html = app.util.ouiDivToolbarCreate(item);
					$("#toolbar_dep1").append(html);
					if(item == 'homeControlWidget'){
						let zoomInfo = JSON.parse(app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.filter((e)=>e.active == 'active')[0].tabContent.contentValue.webmapInfo.userMapScopeValue).mapCenter;
						
						let contValue = app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.filter((e)=>e.active == 'active')[0].tabContent.contentValue;
						
						if(contValue.useYn == true){ 
	
						 zoomInfo.center = map.getProjection().project([contValue.center[0], contValue.center[1]], '4326')
						 zoomInfo.zoom = contValue.zoom;
						}else{
						 let JsonValue= JSON.parse(app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.filter((e)=>e.active == 'active')[0].tabContent.contentValue.webmapInfo.userMapScopeValue).mapCenter;
						 zoomInfo.center = [JsonValue.x, JsonValue.y]
						 zoomInfo.zoom = JsonValue.zoom
						}
						
						app.oui[item]().setCenter(zoomInfo.center).setZoom(zoomInfo.zoom).build();
					}else{
						app.oui[item]().build();
					}
					
					$(`#${item}`).show();
				});
				app.oui['tocWidget']().build();
				break;
		}
		/* 
		 * 현재 시연 대응으로 ODF로 기능을 구현합니다. 
		 * 추후 위젯으로 변경 예정입니다.
		 *  */

		/* 2뎁스가있는 툴바 공통 클릭 이벤트 */
		const toobarAddOnClickEvent = (tool) => {

			tool.addEventListener('click', () => {
				const siblingNodes = Array.from(tool.closest('li').parentElement.children); //이벤트툴의 형제 노드 배열화		
				siblingNodes.forEach((item) => {
					if (!item.classList.contains(tool.closest('li').classList[0])) { //이미열려있는 다른툴의 2뎁스 off
						item.classList.contains('active') && item.classList.remove('active');
					} else { //누른툴의 2뎁스 on off
						if (item.closest('li').classList.contains('active')) {
							item.closest('li').classList.remove('active');
						} else {
							item.closest('li').classList.add('active');
						}
					}
				});

			});
		};
	}
	/* 웹앱 상세 조회*/
	process.webAppDetail = async (param) => {
		app.cmm.api.webapp.select(param).
			then(res => {
				//app.webapp.data.webappView = {...res.result, ...app.webapp.data.webappView};
				let _shareList = app.webapp.data.webappView.shareList;
				app.webapp.data.webappView = res.result;
				app.webapp.data.webappView.shareList = _shareList;
				app.webapp.data.webappView.detailSetting = JSON.parse(res.result.detailSetting);
				$('title').text(webmapToolbarTemplate == 'lxp' ? '[웹앱] '+app.webapp.data.webappView.webappTmplatSj : '[응용지도] '+app.webapp.data.webappView.webappTmplatSj); //타이틀 웹맵명으로 변경
				$('#newWebAppView').hide();
				$('#detailSetting').toggleClass('active');
				app.webapp.data.mapTemplate = {};
				app.webapp.data.mapTemplate.detailSetting = app.webapp.data.webAppOptions.detailSetting = res.result.detailSetting
				app.webapp.data.mapTemplate.type = app.webapp.data.webAppOptions.mapTmplatTyCode = app.webapp.data.webAppOptions.detailSetting.layoutTab.webappTmplatTyCode;
				app.webapp.components.themaTab.mounted();
				return app.webapp.data.webAppOptions.detailSetting;
			}
			).then(detailSetting => {
				if (['JOR', 'SES'].includes(app.webapp.data.webAppOptions.mapTmplatTyCode)) {
					let panel = app.webapp.data.webAppOptions.detailSetting.themaTab.panel
					let style = app.webapp.data.webAppOptions.detailSetting.themaTab.style;
					let penelSize = app.webapp.data.webAppOptions.detailSetting.themaTab.panelSize
					$(".plusWidget").hide();
					$(".sampleFrame").show();
					$("#toc .toc.dep1.tocWidget").hide();

					/*레이아웃 헤더정보 클릭*/
					if (!style) style = "style01";
					style = style.charAt(style.length - 1);
					app.webapp.components.detailSettingVue.tabClickEvent('layoutTab');
					app.webapp.components.layoutTab.methods.layoutBoxClickEvent(`type0${style}`);
					/*맵 클릭*/
					//app.webapp.components.sampleFrameVue.clickTab(app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab[app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.length-1])
					let activeTab = app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.find(item => item.active == "active");
					app.webapp.components.sampleFrameVue.clickTab(activeTab);
					/*레이아웃 패널클릭*/
					if (panel && panel != 'userPer') { $("#" + panel).click(); }
					if (penelSize && panel == 'userPer') {
						$("#panelSizeBox").val() = penelSize;
						$("#userPer").click();
					}
					if (app.webapp.data.webAppOptions.mapTmplatTyCode == 'JOR') {
						app.util.setJorUiJs();
						/*현재 active된 탭 클릭.*/ //setTimeout 해결해야함...
						setTimeout(function () {
							$($(".cont .sectionArea li")[activeTab.tabSn]).click();
						})
					}
					let tabValue = app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.filter((e) => e.active == 'active')
						.filter((v) => v.tabContent.contentValue.useYn == true);
					let returnValue = tabValue.length == 0 ? null : tabValue[0].tabContent.contentValue
					return returnValue
				}
				else {
					app.webapp.components.detailSettingVue.$refs.mainTab.mapScope = app.webapp.data.webAppOptions.detailSetting.mainTab.mapScope;
					app.webmap.components.webMapSearchModalVue.webappMapView(detailSetting.mainTab.webmap, detailSetting.mainTab.webmap.userMapId);
					let res = app.webapp.data.webAppOptions.detailSetting.mainTab.mapScope ? app.webapp.data.webAppOptions.detailSetting.mainTab.mapScope : app.webapp.data.webAppOptions.detailSetting;
					return res;
				}
			}).then(res => {
				if (res == null){
					return app.cmm.api.webapp.selectShareList({ webappTmplatId: webappTmplatId, userId : app.webapp.data.webappView.registerId });
				} 
				let widgetTab = app.webapp.data.webAppOptions.detailSetting.widgetTab
				
				let mapIntervalCount = 0;
				let mapIntervalId = setInterval(function(){
					if (res.center && map) {
						clearInterval(mapIntervalId);
						let x = res.center[0];
						let y = res.center[1];
						let projection4326 = new odf.Projection({ EPSG: '4326' });
						let centerPoint = projection4326.unproject([x, y], mainProjection.split(":")[1]);
						map.getView().setCenter(centerPoint);
						map.setZoom(res.zoom);
					}
					if(mapIntervalCount == 20){
						clearInterval(mapIntervalId);
					}
				}, 500)
				
				
				let count = 0 ;
				let intervalId = setInterval(function(){
					if(Object.keys(app.widget).length > 0 && widgetTab){
						clearInterval(intervalId);
						//레이어위젯 실행.
						app.util.layerWidgetAdd(widgetTab.layerWidgetOption);
						//헤더위젯 실행.
						app.util.headerWidgetAdd(widgetTab.headerWidget);
						//상단위젯 실행.
						app.util.TopToolbarBottomWidgetAdd(widgetTab.topWidget, 'top');
						//툴바위젯 실행.
						app.util.TopToolbarBottomWidgetAdd(widgetTab.toolbarWidget, 'toolbar');
						//하단위젯 실행.
						app.util.TopToolbarBottomWidgetAdd(widgetTab.bottomWidget, 'bottom');
	
					}
					if(count == 60){
						clearInterval(intervalId);
					}
					count ++;
				}, 500);
				
				//웹맵 공유정보
				return app.cmm.api.webapp.selectShareList({ webappTmplatId: webappTmplatId, userId : app.webapp.data.webappView.registerId });
			}).then(res=>{
				let share = res.result
				app.webapp.data.webappView.shareList.webappTmplatShareList = share.list;
				app.webapp.data.webappView.shareList.list = share.list;
				app.webapp.data.webappView.shareList = { ...app.webapp.data.webappView.shareList, ...share.pageInfo }
				// pblonsipScopeSeCode":"공유범위구분코드 1(기관), 2(주소록), 3(사용자)
				app.webapp.data.webappView.shareList.webappTmplatShareUserList = app.webapp.data.webappView.shareList.webappTmplatShareList.filter(function (e) {
					return e.pblonsipScopeSeCode == 3
				})
				app.webapp.data.webappView.shareList.webappTmplatShareInstList = app.webapp.data.webappView.shareList.webappTmplatShareList.filter(function (e) {
					return e.pblonsipScopeSeCode == 1
				})
			}).catch(e=>{
				console.log(e);
				callAlert('error', '관리자에게 문의해주세요');
			});
	}



})(app);