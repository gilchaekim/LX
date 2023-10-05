/**
 * 시도, 시군구, 읍면동 리스트 조회
 */
app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};

((app) => {
	
	let convergence = app.cmm.api.convergence = {};
	
	convergence.getCvgCountList = function (cvgAddrTypeCd, cvgCategoryCd) {

		const param = {
			cvgAddrTypeCd: cvgAddrTypeCd,
			cvgCategoryCd: cvgCategoryCd
		};
		
		return app.util.callAPI({
			url: `${API_SMT}/layer/cvg/count/list?userId=${userId}&crtfckey=${crtfckey}`,
			async: false,
			data: param,
			type: 'get'
		});
		
	};
	
})(app);
