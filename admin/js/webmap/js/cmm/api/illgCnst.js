app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};

((app) => {
	
	let illgCnst = app.cmm.api.illgCnst = {};


	//불법 건축물 국토정보기본도(필지)_국공유지 서비스 목록 조회
	illgCnst.list = function(param) {
		return app.util.postJson({
			url : `${contextPath}/illgCnstInfo.do`,
			data : param,
			type : 'post'
		})
	};
	
	
})(app);



