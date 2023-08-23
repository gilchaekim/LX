app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.webAppDetailModalVue = new Vue({
		el : "#webAppDetailModal",
		data : {
			basicInfo : false,
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
			data : app.webapp.data,
		},
		components : {
			'detail-info-tab' : app.webapp.components.detailInfoTab,
			'share-info-tab' : app.webapp.components.shareInfoTab,
		},
		mounted : function() {
			$("#webAppDetailModal").draggable({
				containment:'parent',
				'scroll':false,
				handle: '.head'
			});
		},
		methods : {
			show : function () {
				if(webappTmplatId) {
					this.styleObj.display = "block";	
					this.basicInfo = true;
				} else {
					callAlert('fali', "저장이 필요한 기능입니다.")
				}

			},
			hide : function () {
				this.styleObj.display = "none";
				this.basicInfo = false;
				$("#basicInfoBtn").closest('li').toggleClass('active').siblings('li').removeClass('active');
				$("#basicInfoBtn").closest('.group').siblings('.group').find('li').removeClass('active');
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
