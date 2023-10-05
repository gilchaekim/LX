app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.sectionTab = {
		name: 'section-tab',
		data: function () {
			return {
				data: app.webapp.data,
			}
		},
		methods: {
			layoutBoxClickEvent: function (id) {
				$(`#${id}`).closest('.sectionArea').find('.layoutBox').removeClass('active');
				$(`#${id}`).addClass('active')
			},
			removeTab : function (item) {
				// 해당 아이템 삭제
				this.data.webAppOptions.detailSetting.sectionTab.mainTab = this.data.webAppOptions.detailSetting.sectionTab.mainTab.filter(tabInfo=>tabInfo.tabSn != item.tabSn);
				//삭제후 다른 탭 정보가 있는 경우
				if(item.active == "active" && this.data.webAppOptions.detailSetting.sectionTab.mainTab.length > 0 ){
					let _content = this.data.webAppOptions.detailSetting.sectionTab.mainTab[0];
					_content.active = "active";
					// 순서대로 sn값 부여
					app.webapp.components.sampleFrameVue.setTabSn();
					switch(this.data.webAppOptions.mapTmplatTyCode){
					case 'SES':
						// 화면에 표출되고 있는 탭일 경우 맨 위의 있는 탭을 활성화 시킨다.
						// 삭제 후 다른 탭이 없는 경우 다 초기화
						app.webapp.components.mainTabModalVue.currentTabInfo = _content;
						app.webapp.components.sampleFrameVue.clickTab(_content);
						break; 
					case 'JOR':
						$('.cont .sectionArea li')[_content.tabSn].click();
						break;
					}	
				//삭제 후 다른 탭정보가 없는 경우	
				}else if(item.active == "active" && this.data.webAppOptions.detailSetting.sectionTab.mainTab.length <= 0 ){
					$('#map').empty();
					$('#toolbar_dep1').empty();
				}
				
            	
			},
			tabAdd: function (type, item) {
				if (type == 'add' && $('.inputTabName').val().trim('') == '') {
					callAlert('fail', '탭제목을 입력해주세요.');
					return;
				}
				if (item == undefined) {
					item = {
						tabSn: 0,
						tabName: "",
						tabText: "",
						tabContent: {
							contentType: 'map',
							contentValue: Object.assign({},this.data.defaultSeriesContentValue['map'])
						},
						active: "active"
					};
				}
				app.webapp.components.mainTabModalVue.setCurrentTabInfo(type, item); //type = add or updata (추가 또는 삭제)

			}
		}
	}
})(app);