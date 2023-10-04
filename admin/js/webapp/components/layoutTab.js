app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.layoutTab = {
		name : 'layout-tab',
		data : function() {
			return {
				data : app.webapp.data,
			}
		},
		methods : {
			layoutBoxClickEvent : function(id) {
				$(".layoutBoxClickEvent").removeClass('active');
	            $(`#${id}`).addClass('active');
	            app.webapp.data.webAppOptions.detailSetting.themaTab.style = app.webapp.data.mapTemplate.detailSetting.layoutTab[id].className;
			},
			layoutPenelBoxClickEvent : function(id){
				let size = $("#panelSizeBox").val()
				if(id=="userPer"){
					if(size){
						$(".userPer").css("width",size+"px");
						app.webapp.data.webAppOptions.detailSetting.themaTab.panelSize=size;
					}
					else{
						callAlert("select","픽셀을 입력해 주세요");
						return;
					}
				}
					$(".layoutPenelBoxClickEvent").removeClass('active');
		            $(`#${id}`).addClass('active');
					app.webapp.data.webAppOptions.detailSetting.themaTab.panel = id;
					if(id!="userPer") $(".userPer").css("width","");
					setTimeout(function(){
					 map && map.updateSize();	
					},400)
					
			}
		
		}
	}
})(app);