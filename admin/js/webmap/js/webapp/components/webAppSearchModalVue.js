app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
((app) => {
	app.webapp.components.webAppSearchModalVue = new Vue({
		el: "#webAppSearchModal",
		data: {
			mode: "", // map or app 구분하여 사용.
			keyword: "",
			currentPageNo: {
				all: "1",
				user: "1",
				share: "1"
			},
			webappTmplatTyCode : "",
			data: app.webapp.data,
			tabBtn: {
				classObj: {
					all: true,
					user: false,
					share: false
				},
			},
			styleObj: {
				display: "none",
			},
			tab: "user"  // 전체 all , 내 웹맵 : user, 공유 웹맵 : share
		},
		mounted: function () {
			$("#webAppSearchModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
		},
		methods: {
			detail: function (index) {
				let appObject = app.webapp.data.webappList.list[index];
				let param = {}
				param.webappTmplatId  = appObject.webappTmplatId ;
				param.userId = appObject.registerId; // 세션아이디 필요.
				callConfirm("웹앱 상세", "웹앱 상세보기로 이동하시겠습니까?", () => {
					//url 하나로 통일. webmap.do -> mapId 파라미터 전달. 웹맵 상세조회
					let url = `${contextPath}/webapp.do?webappTmplatId=${param.webappTmplatId}`
					window.location.href = url;
				})
			},
			tabShow: function (tab) {
				this.tabBtn.classObj['all'] = false;
				this.tabBtn.classObj['user'] = false;
				this.tabBtn.classObj['share'] = false;
				this.tabBtn.classObj[tab] = true;
				this.tab = tab;
				this.search(tab);
			},
			show: function () {
				this.styleObj.display = "block";
			},
			hide: function () {
				this.styleObj.display = "none";
			},
			remove: function (index) {
				callConfirm("해당 웹 앱을 삭제합니다.", "웹앱을 삭제하시겠습니까?", function () {
					let appObject = app.webapp.data.webappList.list[index];
					let param = {}
					param.webappTmplatId  = appObject.webappTmplatId ;
					param.userId = appObject.registerId; // 세션아이디 필요.
					app.cmm.api.webapp.remove(param).then(function (result) {
						app.webapp.components.webAppSearchModalVue.pagination(app.webapp.components.webAppSearchModalVue['currentPageNo'][app.webapp.components.webAppSearchModalVue.tab]);
					})
				});
			},
			pagination: function (page) {
				this['currentPageNo'][this.tab] = page;
				this.search(this.tab);
			},
			shareText: function (usePblonsipSeCode) {
				let result;
				switch (usePblonsipSeCode) { // 1(전체공유),5(부분공유),9(비공유))
					case "1":
						result = "전체공유"
						break;
					case "5":
						result = "부분공유"
						break;
					case "9":
						result = "비공유"
						break;
				}
				return result;
			},
			searchKeyword: function () {
				this.currentPageNo.all = 1
				this.currentPageNo.user = 1
				this.currentPageNo.share = 1
				this.keyword = $("#appSearchKeyword").val();
				this.search(this.tab);
			},
			search: function (tab) {
				let param = {}
				switch (tab) {
					case "all":
						param.userId = userId;
						param.pblonsipRefrnId = userId;
						break;
					case "user":
						param.userId = userId;
						break;
					case "share":
						param.pblonsipRefrnId = userId;
						break;
				}
				if(this.webappTmplatTyCode !="") param.webappTmplatTyCode = this.webappTmplatTyCode 
				param.searchKeyword = this.keyword;
				param.pageIndex = this['currentPageNo'][this.tab]
				param.pageSize = 3;
				app.cmm.api.webapp.search(param).then(function (result) {
					let webappList = app.webapp.components.webAppSearchModalVue.data.webappList = result.result
					let paginationInfo = app.webapp.data.paginationInfo.webappList
					paginationInfo.currentPageNo = app.webapp.components.webAppSearchModalVue.currentPageNo[app.webapp.components.webAppSearchModalVue.tab]; // 현재
					// 페이지번호
					paginationInfo.firstPageNo = 1; 											// 첫번째
					// 페이지번호
					paginationInfo.lastPageNo = webappList.pageInfo.totalPageIndex; 			// 마지막
					// 페이지번호
					paginationInfo.totalPageCount = webappList.pageInfo.totalPageIndex; 		// 페이지
					// 총 개수
					app.util.paging(paginationInfo);
					app.webapp.components.webAppSearchModalVue.show();
				})
			},
			activePage: function (page) {
				if (app.webapp.data.paginationInfo.webappList.currentPageNo == page) return true;
			}
		}

	});

})(app);

