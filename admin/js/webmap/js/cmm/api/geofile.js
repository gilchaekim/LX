app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};

((app) => {
	
	let geofile = app.cmm.api.geofile = {};
/* 지오코딩 결과 파일 관리 */
//지오코딩 결과 파일 관리  - 지오코딩 결과 파일 등록 
	geofile.insertGeoFileResult = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/geofile/insert`,
			data: { // 테스트 임시 데이터
				registerId: userId,
				opertNtcnId: param.opertNtcnId,
				resultFlpth: `${filePath}`,
			},
			type: 'post'
		});
	};
	//지오코딩 결과 파일 관리  - 지오코딩 결과 파일 조회
	geofile.getGeoFileResult = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/geofile/select`,
			data: param,
			type: 'get'
		});
	};
})(app);