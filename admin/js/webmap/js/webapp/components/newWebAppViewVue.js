app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.newWebAppViewVue = new Vue({
		el: "#newWebAppView",
		data: {
			data: app.webapp.data,
		},

		methods: {
//			templateClickEvent: function (template) {
//				$(`#${template.type}`).addClass('active').siblings('.temp').removeClass('active');
//				app.webapp.data.mapTemplate = template;
//			},
			initWebApp: function (template) {
				$(`#${template.type}`).addClass('active').siblings('.temp').removeClass('active');
				app.webapp.data.mapTemplate = template;
				if (app.webapp.data.mapTemplate) {
					app.webapp.data.webAppOptions.mapTmplatTyCode = app.webapp.data.mapTemplate.type;
					app.webapp.data.webAppOptions.detailSetting = app.webapp.data.mapTemplate.detailSetting;
					app.webapp.data.webAppOptions.detailSetting.theme = app.webapp.data.mapTemplate.className;
					//app.webapp.data.webAppOptions.detailSetting.widgetTab.landInfoCheckedList = app.webapp.data.landInfoCheckedList;
					callAlert("success", "생성이 완료 되었습니다.", () => {
						this.hide();
						$('.detail > .tool').trigger('click');
						switch (app.webapp.data.webAppOptions.detailSetting.layoutTab.titSec) {
							case "표준": //표준 템플릿
								break;
							case "간편보기": //간편보기 템플릿
								break;
							case "편집": //편집 템플릿
								break;
							case "시리즈": // 시리즈 템플릿
								app.webapp.components.detailSettingVue.tabClickEvent("layoutTab");
								$("#type01").addClass("active");
								app.webapp.data.webAppOptions.detailSetting.themaTab.style = app.webapp.data.mapTemplate.detailSetting.layoutTab['type01'].className;
								app.util.setColorPicker('sectionBackColorPicker', '#ffffff');
								app.util.setColorPicker('sectionFontColorPicker', '#333');
								/* v-if or v-show로 조건절 주는것보다는 가독성이 편할 것 같음. 추후 조건문 처리해도됨...*/
								$("#app .sampleFrame").show();
								$("#toc").hide();
								$("#alarm").hide();
								$("#widget_header").hide();
								$("#sectionTabBar").show();
								break;
							case "저널": //저널 템플릿
								app.webapp.components.detailSettingVue.tabClickEvent("layoutTab");
								$("#type01").addClass("active");
								app.webapp.data.webAppOptions.detailSetting.themaTab.style = app.webapp.data.mapTemplate.detailSetting.layoutTab['type01'].className;
								app.util.setColorPicker('sectionBackColorPicker', '#f5f5f5');
								app.util.setColorPicker('sectionFontColorPicker', '#333');
								app.util.setJorUiJs();
								$("#app .sampleFrame").show();
								$("#toc").hide();
								$("#alarm").hide();
								$("#widget_header").hide();
								break;
						}

					});
				} else {
					callAlert("fail", "템플릿을 먼저 선택해주세요");
				}
			},
			hide: function () {
				$('#newWebAppView').hide();
			},
		}
	});
})(app);
