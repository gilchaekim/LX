app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};

((app) => {

	/* 작업알림 */
	// 작업알림 - 작업상세조회
	let ntice = app.cmm.api.ntice = {};
	
	ntice.getOpertNtcnDetail = async function (param) {
		return await app.util.callAPI({
			url: `${API_ANALS}/ntice/detail`,
			data: param,
			type: 'get'
		});
	};


})(app);