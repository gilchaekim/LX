app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
((app) => {
	app.webmap.components.webMapDetailModalVue = new Vue({
		el : "#webMapDetailModal",
		data : {
			styleObj : {
				display : "none",
			},
			detailInfoTab : {
				classObj : {
					active : true
				}
			},
			shareInfoTab : {
				classObj : {
					active : false
				}
			},
			data : app.webmap.data,
		},
		components : {
			'share-info-tab' : app.webmap.components.shareInfoTab,
			'detail-info-tab' : app.webmap.components.detailInfoTab,
		},
		mounted : function() {
			$("#webMapDetailModal").draggable({
				containment:'parent',
				'scroll':false,
				handle: '.head'
			});
		},
		methods : {
			show : function () {
				if(userMapId) {
					this.styleObj.display = "block";
					let _userId = $('#loginUserId').val();
					
					let _path = location.pathname.split('/smt/')[1];
					
					switch(_path){
						case 'preview.do':
						case 'webapp.do':
						case 'myWebappPreview.do':
						case 'getMapGaleView.do':
							//기본정보 수정 못함 / 공유현황 조회못함
							$('#webMapDetailModal .btnEdit').hide();
							$('#webMapDetailModal .tabContWrap.type04 .tabNav.type01 li:nth-child(2)').hide();
							break;
						case 'webmap.do':  
							if(_userId == ""){
								$('#webMapDetailModal .btnEdit').hide();
							}else{
								let _isWebmapAuth = app.cmm.api.webmap.selectWebmapAuth({crtfckey : crtfckey, userMapId : userMapId, userId : _userId}).responseJSON.result;					
								if(!_isWebmapAuth){
									$('#webMapDetailModal .btnEdit').hide();
								}else{
									//웹맵 권한 이 있을 경우 썸네일 제목등을 수정할 수있다.
									$('#webMapDetailModal .btnEdit').show();													
								}
								if(!app.webapp && app.webmap.data.webmapView.userMapInfo.registerId != _userId){
									$('#webMapDetailModal .tabContWrap.type04 .tabNav.type01 li:nth-child(2)').hide();
								}else{						
									$('#webMapDetailModal .tabContWrap.type04 .tabNav.type01 li:nth-child(2)').show();
								}
							}	
						    break;
					}
					
				} else {
					callAlert('fali', "저장이 필요한 기능입니다.")
				}
			},
			hide : function () {
				this.styleObj.display = "none";
			},
			tabShow : function (tab) {
				if(tab === 'detail') {
					this.detailInfoTab.classObj.active = true;
					this.shareInfoTab.classObj.active = false;
					this.$refs.detailInfo.show();
					this.$refs.shareInfo.hide();
				} else {
					this.detailInfoTab.classObj.active = false;
					this.shareInfoTab.classObj.active = true;
					this.$refs.detailInfo.hide();
					this.$refs.shareInfo.show();
				}
			},
		}	
	});
})(app);
