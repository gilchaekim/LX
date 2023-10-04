app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.mainTab = {
		name : 'main-tab',
		data : function() {
			return {
				data : app.webapp.data,
				mapScopeFeature : '',
				webmap:{
					userMapId:"",
					userMapSj:""
				},
				mapScope : {
					useYn : false
				}
			}
		},

		methods : {
			webMapSearchClickEvent : function() {
				app.webmap.components.webMapSearchModalVue.show("app");
				app.webmap.components.webMapSearchModalVue.search(app.webmap.components.webMapSearchModalVue.$data.tab);
			},
			mapScopeInit : function(){
				
				if(!userMapId){
					callAlert("select","지도를 먼저 선택해주세요.");
					return;
				}
				let mapScopeMessage = {
						DRAWSTART_POINT : '지도 시작 좌표를 지도영역 내에서 클릭해주세요.'};
//					app.util.esc("mapScope");
					alert('지도에서 지점을 클릭해 주세요.');
					app.core.draw.activate({
						type:'Point',
						keepOn : false,
						clear : true,
						message: mapScopeMessage,
						callback : function(feature) {
							console.log("===="+feature.getCenterPoint()+"====")
							console.log("===="+map.getZoom()+"====")
							let projection5186 = new odf.Projection({ EPSG: mainProjection.split(':')[1]});
							if(app.webapp.data.webAppOptions.mapTmplatTyCode == "SES" || app.webapp.data.webAppOptions.mapTmplatTyCode == "JOR"){
								app.webapp.components.mainTabModalVue.currentTabInfo.tabContent.contentValue.center = projection5186.unproject(feature.getCenterPoint(),'4326')
								app.webapp.components.mainTabModalVue.currentTabInfo.tabContent.contentValue.zoom = map.getZoom();
								app.webapp.components.mainTabModalVue.currentTabInfo.tabContent.contentValue.useYn = true;
								if(app.webapp.components.mainTabModalVue.currentTabInfo.tabContent.contentValue.mapScopeFeature &&  map.getODFControls().get('draw').findDrawVectorLayer().getFeatures().length!=0){
									map.getODFControls().get('draw').findDrawVectorLayer().removeFeature(app.webapp.components.mainTabModalVue.currentTabInfo.tabContent.contentValue.mapScopeFeature);
								}
								app.webapp.components.mainTabModalVue.currentTabInfo.tabContent.contentValue.mapScopeFeature = feature;
							}else{
								app.webapp.components.detailSettingVue.$refs.mainTab.mapScope.center = projection5186.unproject(feature.getCenterPoint(),'4326')
								app.webapp.components.detailSettingVue.$refs.mainTab.mapScope.zoom = map.getZoom();
								app.webapp.components.detailSettingVue.$refs.mainTab.mapScope.useYn = true;
								//detaionSetting에추가.
								app.webapp.data.webAppOptions.detailSetting.mainTab.mapScope = app.webapp.components.detailSettingVue.$refs.mainTab.mapScope
								app.webapp.components.detailSettingVue.$refs.mainTab.$forceUpdate();
								/*callback이 2번 도네....*/
								if(app.webapp.components.detailSettingVue.$refs.mainTab.mapScopeFeature &&  map.getODFControls().get('draw').findDrawVectorLayer().getFeatures().length!=0){
									map.getODFControls().get('draw').findDrawVectorLayer().removeFeature(app.webapp.components.detailSettingVue.$refs.mainTab.mapScopeFeature);
								}
								app.webapp.components.detailSettingVue.$refs.mainTab.mapScopeFeature = feature;
							}
						}.bind(app.webapp.components.mainTab)
					});
			},
			mapScopeMove : function(){
				let projection4326 = new odf.Projection({ EPSG: '4326' });
				let center= projection4326.unproject(app.webapp.components.detailSettingVue.$refs.mainTab.mapScope.center,mainProjection.split(':')[1])
				map.getView().setCenter(center);
				map.setZoom(app.webapp.components.detailSettingVue.$refs.mainTab.mapScope.zoom);
			},
			apply : function(){
				let mapScope = app.webapp.data.webAppOptions.detailSetting.mainTab.mapScope={}
				mapScope.useYn = true; 
				mapScope.center = this.mapScope.center;
				mapScope.zoom =this.mapScope.zoom;
			}
		}
	};
})(app);