 app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.detailSettingVue = new Vue({
		el : "#detailSetting",
		data : {
			data : app.webapp.data,
		},
		components : {
			'layout-tab' : app.webapp.components.layoutTab,
			'section-tab' : app.webapp.components.sectionTab,
			'thema-tab' : app.webapp.components.themaTab,
			'widget-tab' : app.webapp.components.widgetTab,
			'contents-tab' : app.webapp.components.contentsTab,
			'main-tab' : app.webapp.components.mainTab
		},
		methods : {
			hide : function(id) {
				if(typeof webAppMap === 'string') {
					$(`#${id}`).closest('.toc').toggleClass('hide');
				}
				
			},
			tabClickEvent : function(id){
				$(`#${id}`).addClass('active').siblings('li').removeClass('active');	
				$(`#${id}`).closest('.tabNav').siblings('.tabCont').eq($(`#${id}`).index()).addClass('active').siblings('.tabCont').removeClass('active');
				/*콘텐츠 테마 열기..*/
			},
			themeText : function(){
				if(!app.webapp.data.webAppOptions.detailSetting.layoutTab) return;
				let result =""
				switch (app.webapp.data.webAppOptions.detailSetting.layoutTab.titSec){
					case  "표준":
						 result = "상세설정(표준 템플릿)"
					     break;
					case  "간편보기":
						 result = "상세설정(간편보기 템플릿)"
					     break;
					case  "편집":
						 result = "상세설정(편집 템플릿)"
					     break;
					case  "시리즈":
						 result = "상세설정(시리즈 템플릿)"
					     break;
					case  "저널":
						 result = "상세설정(저널형 템플릿)"
					     break;
				}
				return result;
			}
		}
	});
})(app);