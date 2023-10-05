app = window.app || {};
app.cmm = app.cmm || {};

((app) => {

	app.cmm.data = {
			
		// 작업 알림 데이터
		alarmData : {
			etcDay : [],
			today : {},
			pageInfo : {
				pageSize : 10,
				pageIndex: 1,
			    totalCount: 0
			}
		},

	}

})(app);
