app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.sampleFrameVue = new Vue({
		el: ".sampleFrame",
		components: {
			'alarm-button': app.cmm.components.alarmButton,
			'alarm-modal': app.cmm.components.alarmModal,
			'widgetArea': app.webapp.components.widgetArea,
		},
		data: {
			widgetIdx: 0,
			layerList: [],
			data: app.webapp.data,
			currentTabText: '',
			timeSliderControlWidget: false, //타임슬라이더 버튼 클릭시 show 여부.
			featureAttributeFormWidget: false, //피쳐속성 폼 여부.
			bookMarkControlWidget: false, // 북마크 여부
			chartChecked: false, //차트 사용여부
			chartTargetLayer: '', //차트 타겟 레이어
			isSortablejs: false, //sortablejs 활성화 여부 true = 활성화
			sortablejsObj: ''
		},
		updated() {
			this.$nextTick(function () {
				map && map.updateSize();
				let chartTrue = false;
				let sectionTab = app.webapp.data.webAppOptions.detailSetting.sectionTab;
				let sequence = 0;
				//섹션탭 탭 순서조정 관련
				if ($('.sortList')[0] != undefined && !this.isSortable) {
					this.sortablejsObj = new Sortable($('.sortList')[0], {
						group: 'item',
						handle: '.handle',
						animation: 150,
						fallbackOnBody: true,
						swapThreshold: 0.65,
						onEnd: function ({ oldIndex, newIndex, to }) {
							//목록이 순서가 변경되면 순번 및 데이터 위치 변경하기
							for (var i = 0; i < $(to).children().length; i++) {
								let _tabSn = $(to).children().eq(i).find('.tabSn').val(); //0번의 경우 : 0번째에 위치한 tabSn 
								let _tabContent = sectionTab.mainTab.find(item => item.tabSn == _tabSn); //0번째의 경우 0번째에 위치한 탭정보
								//1.기존 컨텐츠에서 _tabContent제거 
								sectionTab.mainTab = sectionTab.mainTab.filter(item => item.tabSn != _tabSn);
								//2.tabContent 배열 맨뒤에 추가 
								sectionTab.mainTab.push(_tabContent);
							}
							//순서대로 sn값 부여
							app.webapp.components.sampleFrameVue.setTabSn();
							//섞인 돔을 다시 원상복구하는 코드
							const isAfter = newIndex < oldIndex;
							$('.sortList')[0].insertBefore(
								$(`.sortList .item:nth-child(${newIndex + 1})`)[0],
								$(`.sortList .item:nth-child(${oldIndex + 1 + (isAfter)})`)[0]
							)

							//저널형인 경우 해당 active위치로 이동
							//let _activeTabSn = app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.find(item=>item.active=="active").tabSn;
							if (app.webapp.data.webAppOptions.mapTmplatTyCode == 'JOR') {
								sectionTab.mainTab = sectionTab.mainTab.map(item, index => {
									item.active = "";
									return item;
								});
								let _content = sectionTab.mainTab[0];
								_content.active = "active";
								$('.cont .sectionArea li')[0].click();
							}
						}
					});
				}

				if (sectionTab && sectionTab.mainTab.length > 0) {
					chartTrue = sectionTab.mainTab.find(item => item.active).chartContent.chartChecked;
					//this.chartChecked = chartTrue;
				}
				if (chartTrue) {
					let chartContent = sectionTab.mainTab.find(item => item.active).chartContent;
					if(!(this.chartTargetLayer == undefined &&  chartContent.chartTargetLayer == undefined)){
					if (this.chartTargetLayer != chartContent.chartTargetLayer) {
						let changeLayerInfo = app.widget.tocWidget.getLayerList().find(e => e.layerId == this.chartTargetLayer);
						app.webapp.components.mainTabModalVue.currentTabInfo.chartContent =
						{
							...app.webapp.components.mainTabModalVue.currentTabInfo.chartContent,
							chartTargetLayer: this.chartTargetLayer,
							typeNames: `${changeLayerInfo.linkedLayer.getInitialOption().params.layer}`,
							srsName: map.getView().projection_.getCode()
						};
						chartContent = sectionTab.mainTab.find(item => item.active).chartContent;
					}
					//let layerList = chartContent.layerList
					let layerList = this.layerList;
					let layerInfo = layerList.find(e => e.layerId == chartContent.chartTargetLayer);
					if (app.widget && app.widget.chartWidget) {
						//app.widget.chartWidget.remove();
					}

					/*=============*/
					let dataList = [];
					app.oui.api.mapApi.getData({
						service: 'wfs',
						version: '1.0.0',
						request: 'getFeature',
						srsName: chartContent.srsName,
						typeNames: chartContent.typeNames,
						outputFormat: 'application/json',
					}, features => {
						features.forEach((e) => {
							let featureJson = e.getProperties()
							delete featureJson['geometry']
							dataList.push(featureJson);
						})
						app.oui.api.columnInfoApi.changeOption({ lyrId: layerInfo.layerId }),
							app.oui.api.columnInfoApi.columnInfoFunction('select', {}, (res) => {
								if (res instanceof Error == false) {
									let filteredDataList = [];
									let columnInfo = res.filter((value => value.useAt == 'Y'));
									if (columnInfo.length != 0) {
										dataList.forEach((item) => {
											columnInfo.forEach((u) => {
												if (u.columnNcm != u.columnNm) {
													item[u.columnNcm] = item[u.columnNm];
													delete item[u.columnNm];
												}
											})
											filteredDataList.push(item);
										})
									} else {
										filteredDataList = dataList;
									}
									let type;
									if (viewMode == 'view') {
										type = 'show'
										chartContent.chartObject.width = "auto";
										/* 차트 jsp chartWidgetArea 구조 변경시 children 태그 변경*/
										$('#chartShowDiv').length == 0 ? '' : app.oui.chartWidget().remove();
										if (app.webapp.data.webAppOptions.mapTmplatTyCode == 'JOR') {
											let JORtarget = $(".context.section.active .chartTab").children()[0].id
											JORtarget = `#${JORtarget}`;
											app.oui.chartWidget().setTarget(JORtarget).build(filteredDataList, type, chartContent.chartObject);
										} else {
											let SEStarget = $(".contextCont.cScroll.active").children().children()[1].id;
											SEStarget = `#${SEStarget}`;
											app.oui.chartWidget().setTarget(SEStarget).build(filteredDataList, type, chartContent.chartObject);
										}
									} else {
										type = 'ui'
										app.widget.chartWidget ?app.widget.chartWidget.remove() : '';
										app.oui.chartWidget().setTarget("#chartWidgetArea").build(filteredDataList, type, chartContent.chartObject);
									}
								}
								//$("#chartShowDiv").css("width","auto");
							});
					})
					}
					/*=============*/
				} //end if

				if (sectionTab && this.data.mapTemplate.type && sectionTab.mainTab.length > 0) {
					let _mapTemplateInfo = app.webapp.data.webAppOptions;
					let _currentText
					switch (_mapTemplateInfo.mapTmplatTyCode) {
						case 'JOR':
							//맨마지막 값 css 초기화
							for (var i = 0; i < $('.articleList').children().length; i++) {
								$('.articleList').children().eq(i).css('margin-bottom', '0px');
							}
							$('.articleList').children().last().css('margin-bottom', '430px');

							_mapTemplateInfo.detailSetting.sectionTab.mainTab.forEach((item, index) => {
								let _target = app.webapp.data.textEditorTarget;// 텍스트 에디터 표출 타겟
								if ($(_target)[index]) {
									let _editor = app.util.getToastUiEditor($(_target)[index], item.tabText);
									this.data.editorObject[`tabSn_${index}`] = _editor;
									_editor.setHtml(item.tabText);
								}

							});

							break;
						case 'SES':
							let _activeTab = _mapTemplateInfo.detailSetting.sectionTab.mainTab.find(item => item.active);
							if (_mapTemplateInfo.detailSetting.sectionTab.mainTab.length != 0) {
								_currentText = _activeTab.tabText; //현재 표출될 텍스트
								_mapTemplateInfo.detailSetting.sectionTab.mainTab.find(item => item.active).tabText = _currentText;
							}
							else {
								_currentText = ""
							}
							let _editorTarget = app.webapp.data.textEditorTargetActive;// 텍스트 에디터 표출 타겟
							let _editor = app.util.getToastUiEditor($(_editorTarget)[0], _currentText);
							this.data.editorObject[`tabSn_${_activeTab.tabSn}`] = _editor;
							_editor.setHtml(_currentText);

							break;
					}
					if (_mapTemplateInfo.mapTmplatTyCode == 'JOR' || _mapTemplateInfo.mapTmplatTyCode == 'SES') {
						let currentTabInfo = app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.find(item => item.active == "active");
						if (currentTabInfo) {
							app.webapp.components.mainTabModalVue.currentTabInfo = currentTabInfo;
							//editor && editor.setHtml(app.webapp.components.mainTabModalVue.currentTabInfo.tabText);
						}
					}
				}
			});
		},
		mounted: function () {
			$("#featureAttributeFormWidgetDiv").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
			$("#timeSliderControlWidget_header").draggable({
				containment: 'parent',
				'scroll': false,
			});
			$("#timeSliderControlWidget_top").draggable({
				containment: 'parent',
				'scroll': false,
			});

		}
		,
		methods: {
			updateTabName: function (e) {
				app.webapp.components.mainTabModalVue.currentTabInfo.tabName = e.target.value;
			},
			setTabSn: function () {
				this.data.webAppOptions.detailSetting.sectionTab.mainTab = this.data.webAppOptions.detailSetting.sectionTab.mainTab.map((item, index) => {
					item.tabSn = index;
					return item;
				});
			},
			getIndex: function (list, id) {
				return list.findIndex((e) => e.tabText == id);
			},
			updateTabText: function (e) {
				this.currentTabText = e.target.value;
			},
			clickTab: function (item) {
				let mainTab = this.data.webAppOptions.detailSetting.sectionTab.mainTab;
				mainTab.forEach((content, index) => {
					if (this.event) {
						odf.event.removeListener(this.event);
					}
					//this.data.webAppOptions.detailSetting.sectionTab.mainTab.forEach((content, index) => {
					if (content.tabSn == item.tabSn) {
						content.active = "active";
					} else {
						content.active = "";
					}
					//});
					switch (item.tabContent.contentType) {
						case 'map':
							if (item.tabContent.contentValue.userMapId != "") {
								setWebmap({ userMapId: item.tabContent.contentValue.userMapId, userId: userId })
							} else {
								$('#map').empty();
								$('#toolbar_dep1').empty();
							}
							break;
					}
					this.layerList = item.chartContent != undefined && item.layerList ? item.layerList : [];
					this.chartChecked = item.chartContent != undefined && item.chartContent.chartChecked ? item.chartContent.chartChecked : false;
					this.chartTargetLayer = item.chartContent != undefined && item.chartContent.chartTargetLayer != '' ? item.chartContent.chartTargetLayer : ''
					if (map) {
						//지도 줌, 좌표 설정
						this.event = odf.event.addListener(map, 'postcompose', (evt) => {
							if (item.tabContent.contentValue.useYn == true) {
								let newCenter = map.getProjection().project(item.tabContent.contentValue.center, '4326');
								map.setCenter(newCenter);
								map.setZoom(item.tabContent.contentValue.zoom)
							}
						}, false)
					}


				})
			},
			btnLeft: function () {
				/*퍼블에서 준 ui.js 발췌. 툴바 5개이상일때 넘기는 버튼*/
				this.widgetIdx--;
				$(event.target).closest('.group').removeClass('active').closest('.flex').children('.group').eq(this.widgetIdx).addClass('active')
			},
			btnRight: function () {
				this.widgetIdx++;
				$(event.target).closest('.group').removeClass('active').closest('.flex').children('.group').eq(this.widgetIdx).addClass('active')
			},
			optionTableHide: function () {
				$("#optionTable").hide();
				map.updateSize();
			},
			widgetListShow: function (tab) {
				app.webapp.components.detailSettingVue.$refs.widgetTab.widgetListShow(tab);
			},
			infoShow: function () {
				$('.tipDesc').css('display') === 'none' ? $('.tipDesc').show() : $('.tipDesc').hide();
			},
			link: function () {
				if ($('#sampleLogo').attr('src') === '#') {
					return;
				}
				window.open($('#sampleLogo').attr('src'), '', "fullscreen = yes");

			},
			widgetHide: function (widgetName, mode) {
				app.widget[widgetName].remove();
				if (widgetName == 'featureAttributeFormWidget') $("#featureAttributeFormWidgetDiv .popup").hide();
				this[widgetName] = false;
			},
			OnOffToWidget: function (widgetName, mode) {
				if (this[widgetName]) {
					app.widget[widgetName].remove();
					if (widgetName == 'featureAttributeFormWidget') {
						$("#featureAttributeFormWidgetDiv .popup").hide();
						$('.sampleFrame .toolGroup ul li.featureAttributeFormWidget > .tool').removeClass('active');
					}
					this[widgetName] = false;
				} else {
					//웹맵 저장 위젯의 경우(oui 위젯이 아님)
					if (widgetName == 'webMapSaveWidget') {
						$(".webMapSave_content ul").toggleClass('hidden');
						if ($(".webMapUserInfo_content .userPop.hidden").length <= 0) {
							$(".webMapUserInfo_content .userPop").toggleClass('hidden');
						}
					} else if (widgetName == 'webMapUserInfoWidget') {
						$(".webMapUserInfo_content .userPop").toggleClass('hidden');
						if ($(".webMapSave_content ul.hidden").length <= 0) {
							$(".webMapSave_content ul").toggleClass('hidden');
						}
					} else {
						if (widgetName == 'timeSliderControlWidget') {
							app.oui[widgetName]().build();
						}
						app.widget[widgetName].addTo(map);
						if (widgetName == 'featureAttributeFormWidget') $('.sampleFrame .toolGroup ul li.featureAttributeFormWidget > .tool').addClass('active');
						this[widgetName] = true;
					}
				}
			},
			checkLayerList: function () {
				if (app.widget.tocWidget != undefined && app.widget.tocWidget.getLayerList().length != 0) {
					this.layerList = app.widget.tocWidget.getLayerList()
				} else {
					this.layerList = [];
				}
				app.webapp.components.mainTabModalVue.currentTabInfo.chartContent.chartChecked = this.chartChecked
				this.chartChecked == true ? app.webapp.components.mainTabModalVue.currentTabInfo.layerList = this.layerList : null;
			},
			loadChartWidget: function () {
				if (this.chartTargetLayer != '') {
					let layerInfo = this.layerList.find(e => e.layerId == this.chartTargetLayer);
					if (app.webapp.components.mainTabModalVue.currentTabInfo.chartContent &&
						app.webapp.components.mainTabModalVue.currentTabInfo.chartContent.chartChecked && app.webapp.components.mainTabModalVue.currentTabInfo.chartContent.srsName != ''
						&& app.webapp.components.mainTabModalVue.currentTabInfo.chartContent.typeNames != '') {
						app.webapp.components.mainTabModalVue.currentTabInfo.chartContent = app.webapp.components.mainTabModalVue.currentTabInfo.chartContent;
					} else {
						app.webapp.components.mainTabModalVue.currentTabInfo.chartContent =
						{
							...app.webapp.components.mainTabModalVue.currentTabInfo.chartContent,
							chartTargetLayer: this.chartTargetLayer,
							layerList: this.layerList,
							typeNames: `${layerInfo.linkedLayer.getInitialOption().params.layer}`,
							srsName: map.getView().projection_.getCode()
						}
						if (layerInfo.linkedLayer.getProperties().option.defaultType != 'geoserver') {
							callAlert('fail', '지오서버에 발행된 레이어만 차트 설정이 가능합니다.');
						}
					}
					let chartObject = {};
					if (app.webapp.components.mainTabModalVue.currentTabInfo.chartContent && app.webapp.components.mainTabModalVue.currentTabInfo.chartContent.chartChecked) {
						chartObject = app.webapp.components.mainTabModalVue.currentTabInfo.chartContent.chartObject;
					}
					let dataList = [];
					app.oui.api.mapApi.getData({
						service: 'wfs',
						version: '1.0.0',
						request: 'getFeature',
						srsName: app.webapp.components.mainTabModalVue.currentTabInfo.chartContent.srsName,
						typeNames: app.webapp.components.mainTabModalVue.currentTabInfo.chartContent.typeNames,
						outputFormat: 'application/json',
					}, features => {
						features.forEach((e) => {
							let featureJson = e.getProperties()
							delete featureJson['geometry']
							dataList.push(featureJson);
						})
						app.oui.api.columnInfoApi.changeOption({ lyrId: layerInfo.layerId }),
							app.oui.api.columnInfoApi.columnInfoFunction('select', {}, (res) => {
								let filteredDataList = [];
								let columnInfo = res.filter((value => value.useAt == 'Y'));
								if (columnInfo.length != 0) {
									dataList.forEach((item) => {
										columnInfo.forEach((u) => {
											if (u.columnNcm != u.columnNm) {
												item[u.columnNcm] = item[u.columnNm];
												delete item[u.columnNm];
											}
										})
										filteredDataList.push(item);
									})
								} else {
									filteredDataList = dataList;
								}
								let type;
								if (viewMode == 'view') {
									type = 'show'
								} else {
									type = 'ui'
								}
								app.oui.chartWidget().build(filteredDataList, type, chartObject);
								$('#webAppChartModal').show();
							});
					})
				}
			},

		}
	});
})(app);
