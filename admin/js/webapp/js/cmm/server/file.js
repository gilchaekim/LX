app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.server = app.cmm.server || {};

((app) => {
	
	let file = app.cmm.server.file = {};
	/* 지오코딩 결과 파일 관리 */
	//지오코딩 결과 파일 관리  - 지오코딩 결과 파일 등록 
	//NAS에서 지오코딩 결과 파일 다운로드 api 아님
	file.readGeoFile = async function (param) {
		return await app.util.callAPI({
			url: `${contextPath}/file/geocording/read.do`,
			data: param,
			type: 'get'
		});
	}
	
	/* 지오코딩 결과 파일 관리 */
	//지오코딩 결과 파일 관리  - 지오코딩 결과 파일 등록 
	//NAS에서 지오코딩 결과 파일 다운로드 api 아님
	file.getDipImgBase64 = async function (param) {
		return await app.util.callAPI({
			url: `${contextPath}/file/img/getDipImgBase64.do`,
			data: param,
			type: 'get'
		});
	}
})(app);


