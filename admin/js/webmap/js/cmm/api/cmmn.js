app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};
((app) => {
	
	let cmmn = app.cmm.api.cmmn = {};
	
	/* 공통 코드 조회 */
	//공통 코드 조회 - 공통 상세 코드 조회 
	cmmn.getCmmnCodeDetail = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/cmmn/code/detail`,
			data: param,
			type: 'get'
		});
	};

})(app);
