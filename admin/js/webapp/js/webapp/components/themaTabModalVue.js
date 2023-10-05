app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.themaTabModalVue = new Vue({
		el: "#themaTabModalVue",
		mounted: function () {
			$("#themaTabModalVue").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
			  /* 웹앱 시리즈형 이벤트 */
		    $('.contextList > li').on({    
		        "click":function (){
		            let idx = $(this).index();
		            $(this).addClass('active').siblings().removeClass('active');
		            $('.contextCont').eq(idx).addClass('active').siblings('.contextCont').removeClass('active');
		        }
		    })
		},
		data: {
			data: app.webapp.data,
			theme : "theme01",
			list: [],
			mode: ""
		},
		methods: {
			show : function(){
				$("#themaTabModalVue").show();
			},
			hide : function(){
				$("#themaTabModalVue").hide();
			},
			themaBox : function(type){
				$(".box").removeClass("active");
				$(event.target).closest(".box").addClass("active");
				 this.theme = type;
			},
			applySES : function(){
				app.webapp.data.webAppOptions.detailSetting.themaTab.theme = this.theme;	
				let section = this.data.webAppOptions.detailSetting.themaTab.section;
				//callConfirm("현재 적용한 테마를 사용하시겠습니까?", '현재 테마를 적용합니다.', ()=>{
					section.fontColor = $('#sectionFontColorPicker').next().text();
					section.backgroundColor = $('#sectionBackColorPicker').next().text();
					if(section.backgroundColor =="#ffffff"){
						switch (this.theme){
							case 'theme01' :
								section.backgroundColor	= '#ffffff'
							break;
							case 'theme02' :
								section.backgroundColor	= '#2F5597'
							break;
							case 'theme03' :
								section.backgroundColor	= '#2F5597'
							break;
						}
					}
				//});
			},
			applyJOR : function(){
				//callConfirm("현재 적용한 테마를 사용하시겠습니까?", '현재 테마를 적용합니다.', ()=>{
					app.webapp.data.webAppOptions.detailSetting.themaTab.theme = this.theme;	
					let section = this.data.webAppOptions.detailSetting.themaTab.section;
					section.fontColor = $('#sectionFontColorPicker').next().text();
					section.backgroundColor = $('#sectionBackColorPicker').next().text();
				//})
			}
			
			
			
		}// method
	}); // vue
})(app);

