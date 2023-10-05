app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.mainTabModalVue = new Vue({
		el: "#mainTabModalVue",
		mounted: function () {
			$("#mainTabModalVue").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});

		},
		data: {
			data: app.webapp.data,
			previewTabType: 'add', // 'add' or 'update' 추가 또는 수정
			previewTabInfo: {
				tabSn: null,
				tabName: "",
				tabText: "",
				tabContent: {
					contentType: 'map',
					contentValue: JSON.parse(JSON.stringify({ useYn: false, ...app.webapp.data.defaultSeriesContentValue['map'] }))
				},
				active: "active"
			},
			currentTabInfo: {
				tabSn: null,
				tabName: "",
				tabText: "",
				tabContent: {
					contentType: 'map',
					contentValue: JSON.parse(JSON.stringify({ useYn: false, ...app.webapp.data.defaultSeriesContentValue['map'] }))
				},
				active: "active"
			},
			tempTabInfo: {

			}
		},
		methods: {
			hide: function () {
				this.previewTabInfo = JSON.parse(JSON.stringify(this.currentTabInfo));
			},
			show: function () {
				$("#mainTabModalVue").show();
			},
			tabClickEvent: function (id) {
				$(`#${id}`).addClass('active').siblings('li').removeClass('active');
				$(`#${id}`).closest('.tabNav').siblings('.tabCont').eq($(`#${id}`).index()).addClass('active').siblings('.tabCont').removeClass('active');

			},
			// 탭추가 또는 탭 수정 클릭시 타는 함수
			setCurrentTabInfo: function (type, item) {
				let _item = JSON.parse(JSON.stringify(item));
				let _item2 = JSON.parse(JSON.stringify(item));
				this.currentTabInfo = _item;
				this.currentTabInfo.active = "active";

				this.previewTabType = type;
				this.previewTabInfo = _item2;
				this.previewTabInfo.active = "active";
				$(app.webapp.components.mainTabModalVue.$el).find('.tabList li').removeClass('active');
				$(app.webapp.components.mainTabModalVue.$el).find(`#${_item.tabContent.contentType}_tab`).addClass('active');
				$(app.webapp.components.mainTabModalVue.$el).find(`#${_item.tabContent.contentType}_tab`).click();
				app.webapp.components.mainTabModalVue.show();

				if (type == 'update') {
					app.webapp.components.sampleFrameVue.clickTab(_item);
				}
			},
			// 현재 컨텐츠 정보 셋팅 (웹맵 검색후 추가, 이미지 비디오 업로드 시 타는 함수)
			setContentValue: function (contentType, subType, data) {
				// 현재 적용된 컨텐츠 타입과 새로 적용할 컨텐츠 타입이 같은 경우 콘텐츠 타입 ㄹ구조를 변경하지 않아도됨
				// 다르면 구조를 변경해야함
				if (contentType != this.previewTabInfo.tabContent.contentType) {
					this.previewTabInfo.tabContent.contentType = contentType;
					this.previewTabInfo.tabContent.contentValue = JSON.parse(JSON.stringify(this.data.defaultSeriesContentValue[contentType]));
				}
				switch (contentType) {
					case 'map':
						this.previewTabInfo.tabContent.contentValue.userMapId = data.userMapId;
						this.previewTabInfo.tabContent.contentValue.userMapSj = data.userMapSj;
						this.previewTabInfo.tabContent.contentValue.webmapInfo = data;
						app.webmap.components.webMapSearchModalVue.hide();
						break;
					case 'img':
						if (subType == 'upload') {
						} else {

						}
						break;
				}
			},
			// 완료
			applyContent: function () {
				let tabName = $('#mainTabModalVue .tabList li.active').attr('id').split('_')[0]; // 현재
				// 탭추가
				// 팝업에
				// 활성화된
				// 탭이
				// 무엇인지
				// map,
				// img,
				// video,
				// weburl...
				let _tabContent = JSON.parse(JSON.stringify(this.data.defaultSeriesContentValue[tabName]));

				// 탭정보 목록
				let _tabInfoList = this.data.webAppOptions.detailSetting.sectionTab.mainTab;

				if (this.previewTabInfo.tabContent.contentType == 'map' && this.previewTabInfo.tabContent.contentValue.userMapId == '') {
					callAlert('fail', '컨텐츠를 입력해주세요.');
				} else {
					// 탭이 추가되어야 하는 경우
					if (this.previewTabType == 'add') {
						// _currentTabInfo.tabSn = 0;
						this.previewTabInfo.tabSn = 0;
						this.previewTabInfo.tabName = $('.inputTabName').val();

						this.currentTabInfo = JSON.parse(JSON.stringify(this.previewTabInfo));

						// this.current
						// let obj = {
						// tabSn: 0,
						// tabName: $('.inputTabName').val(),
						// tabText: "",
						// tabContent: this.currentTabInfo.tabContent,
						// active: "active"
						// };
						// 추가되는 탭이 active 되어야하므로 기존 ACTIVE 지우기
						// let _currentTabInfo =
						// JSON.parse(JSON.stringify(this.currentTabInfo));

						// 기존 탭의 순번 번경
						// this.data.mapTemplateInfo.find(item => {
						// return item.type == app.webapp.data.mapTemplate.type
						// }).detailSetting.sectionTab.mainTab.map((item,index)=>{
						// item.tabSn = index + 1;
						// return item;
						// });

						// 탭 목록에 탭 추가
						_tabInfoList.unshift(this.currentTabInfo);
						// 탭 이름 입력창 초기화
						$('.inputTabName').val("");
					} else {
						this.currentTabInfo = JSON.parse(JSON.stringify(this.previewTabInfo));
					}

					_tabInfoList = _tabInfoList.map((content, index) => {
						if (this.previewTabType == 'add') {
							if (index > 0) {
								content.tabSn = index;
								if (content.active == 'active') {
									content.active = "";
								}
							}
						} else {
							if (content.tabSn == this.currentTabInfo.tabSn) {
								content = JSON.parse(JSON.stringify(this.previewTabInfo));
							}
						}
						return content;
					});

					this.data.webAppOptions.detailSetting.sectionTab.mainTab = _tabInfoList;

					// this.currentTabInfo.tabContent
					switch (this.previewTabInfo.tabContent.contentType) {
						case 'map':
							// [변경필요] userId 받아와야함
							setWebmap({ userMapId: this.previewTabInfo.tabContent.contentValue.userMapId, userId: userId })
							this.currentTabInfo.chartContent = { chartChecked: false };
							this.previewTabInfo.chartContent = { chartChecked: false };							break;
						case 'img':
							// if ()
							break;
					}
					if (this.previewTabType == 'add') {
						this.previewTabType = 'update'; // 완료 후 팝업은 수정팝업이 됨.						
					}else{}
					// 탭추가 팝업 닫기
					//$('#mainTabModalVue').hide();
				}
			},
			mapScopeInit: function () {
				if (!this.previewTabInfo.tabContent.contentValue.userMapId ) {
					callAlert("select", "지도를 먼저 선택해주세요.");
					return;
				}
				if(this.previewTabInfo.tabContent.contentValue.userMapId != this.currentTabInfo.tabContent.contentValue.userMapId){
					callAlert("select", "완료 버튼 클릭 후에 시도해주세요.");
					return
				}
				let mapScopeMessage = {
					DRAWSTART_POINT: '지도 시작 좌표를 지도영역 내에서 클릭해주세요.'
				};
				// app.util.esc("mapScope");
				callAlert("success", "지도에서 지점을 클릭해 주세요.");
				app.core.draw.activate({
					type: 'Point',
					keepOn: false,
					clear: true,
					message: mapScopeMessage,
					callback: function (feature) {
						console.log("====" + feature.getCenterPoint() + "====")
						console.log("====" + map.getZoom() + "====")
						let projection5186 = new odf.Projection({ EPSG: mainProjection.split(':')[1] });
						if (app.webapp.data.webAppOptions.mapTmplatTyCode == "SES" || app.webapp.data.webAppOptions.mapTmplatTyCode == "JOR") {
							app.webapp.components.mainTabModalVue.previewTabInfo.tabContent.contentValue.center = projection5186.unproject(feature.getCenterPoint(), '4326')
							app.webapp.components.mainTabModalVue.previewTabInfo.tabContent.contentValue.zoom = map.getZoom();
							app.webapp.components.mainTabModalVue.previewTabInfo.tabContent.contentValue.useYn = true;
							app.webapp.components.mainTab.data().mapScope.useYn = true;
							if (app.webapp.components.mainTabModalVue.previewTabInfo.tabContent.contentValue.mapScopeFeature && map.getODFControls().get('draw').findDrawVectorLayer().getFeatures().length != 0) {
								map.getODFControls().get('draw').findDrawVectorLayer().removeFeature(app.webapp.components.mainTabModalVue.previewTabInfo.tabContent.contentValue.mapScopeFeature);
							}
							app.webapp.components.mainTabModalVue.previewTabInfo.tabContent.contentValue.mapScopeFeature = feature;
						} else {
							app.webapp.components.detailSettingVue.$refs.mainTab.mapScope.center = projection5186.unproject(feature.getCenterPoint(), '4326')
							app.webapp.components.detailSettingVue.$refs.mainTab.mapScope.zoom = map.getZoom();
							app.webapp.components.detailSettingVue.$refs.mainTab.mapScope.useYn = true;
							// detaionSetting에추가.
							app.webapp.data.webAppOptions.detailSetting.mainTab.mapScope = app.webapp.components.detailSettingVue.$refs.mainTab.mapScope
							app.webapp.components.detailSettingVue.$refs.mainTab.$forceUpdate();
							/* callback이 2번 도네.... */
							if (app.webapp.components.detailSettingVue.$refs.mainTab.mapScopeFeature && map.getODFControls().get('draw').findDrawVectorLayer().getFeatures().length != 0) {
								map.getODFControls().get('draw').findDrawVectorLayer().removeFeature(app.webapp.components.detailSettingVue.$refs.mainTab.mapScopeFeature);
							}
							app.webapp.components.detailSettingVue.$refs.mainTab.mapScopeFeature = feature;
						}
					}.bind(app.webapp.components.mainTab)
				});
			},
			mapScopeMove: function () {
				let projection4326 = new odf.Projection({ EPSG: '4326' });
				let center = projection4326.unproject(app.webapp.components.mainTabModalVue.previewTabInfo.tabContent.contentValue.center, mainProjection.split(':')[1])
				map.getView().setCenter(center);
				map.setZoom(app.webapp.components.mainTabModalVue.previewTabInfo.tabContent.contentValue.zoom);
			},
		}// method
	}); // vue
})(app);

