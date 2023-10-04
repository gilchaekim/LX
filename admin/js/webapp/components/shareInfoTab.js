app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.shareInfoTab = {
		name : 'share-info-tab',
		data : function() {
			return {
				tab : "all", // all : 전체, insts : 기관, users : 사용자
				data : app.webapp.data,
				classObj : {
					active : false,
				},
				tabBtn : {
					classObj : {
						all : true,
						insts:false,
						users:false
					}
				}
			}
		},
		
		methods : {
			pblonsipScopeSeCode :function(pblonsipRefrnId){
				// pblonsipScopeSeCode 공유범위구분코드 1(기관), 2(주소록), 3(사용자)
				let result;
				switch(pblonsipRefrnId){
					case "1":
					  result="기관";
					  break;
					case "2":
					  result="주소록";
					  break;
					case "3":
					  result="사용자";
					  break;
				}
				return result;
			} ,
			show : function () {
				this.classObj.active = true;
			},
			hide : function () {
				this.classObj.active = false;
			},
			tabShow : function (tab) {
				this.tabBtn.classObj['all']=false;
				this.tabBtn.classObj['insts']=false;
				this.tabBtn.classObj['users']=false;
				this.tabBtn.classObj[tab]= true;
				this.tab = tab;
				
				let key
				switch (tab){ 
				case "all":
					key = "webappTmplatShareList"
					break;
				case "insts":
					key = "webappTmplatShareInstList"
					break;
				case "users":
					key = "webappTmplatShareUserList"
					break;
				}
				app.webapp.data.webappView.shareList.list = app.webapp.data.webappView.shareList[key]
			},
		}
	};
})(app);
