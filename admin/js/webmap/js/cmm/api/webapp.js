app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};
//
((app) => {
	
	let webapp = app.cmm.api.webapp = {};

	/* 웹앱 검색*/
	webapp.search =  async function(param) {
		return await app.util.callAPI({
			url : `${API_SMT}/webapp/tmplat/list`,
			data : param,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
			type : 'get'
		});
	};
	/* 웹앱 삭제*/
	webapp.remove = async function(param) {
		return await app.util.callAPI({
			url : `${API_SMT}/webapp/tmplat/delete`,
			data : param,
			type : 'post'
		});
	};
	/* 웹앱 상세조회*/
	webapp.select = async function(param) {
		return await app.util.callAPI({
			url : `${API_SMT}/webapp/tmplat/select`,
			data : param,
			type : 'get'
		});
	};
	/* 웹맵 공유목록 조회 */
	webapp.selectShareList = async function(param) {
		return await app.util.callAPI({
			url : `${API_SMT}/webapp/tmplat/share/list`,
			data : param,
			type : 'get'
		});
	};
	/* 웹앱 템플릿 등록 및 수정*/
	webapp.insert = async function(param) {
		/*imageFileData : body로 받기 .*/
		let url;
		let JsonParam = {}
		let webappTmplatCn = param.webappTmplatCn ? param.webappTmplatCn : '';
		if(param.webappTmplatId){
			url= `${API_SMT}/webapp/tmplat/insert?&webappTmplatCn=${webappTmplatCn}&webappTmplatId=${param.webappTmplatId}&userId=${param.userId}&crtfckey=${crtfckey}&webappTmplatSj=${param.webappTmplatSj}&webappTmplatTyCode=${param.webappTmplatTyCode}&usePblonsipSeCode=${param.usePblonsipSeCode}&useSttusSeCode=${param.useSttusSeCode}`
		}
		else{
			url= `${API_SMT}/webapp/tmplat/insert?webappTmplatCn=${webappTmplatCn}&userId=${param.userId}&crtfckey=${crtfckey}&webappTmplatSj=${param.webappTmplatSj}&webappTmplatTyCode=${param.webappTmplatTyCode}&usePblonsipSeCode=${param.usePblonsipSeCode}&useSttusSeCode=${param.useSttusSeCode}`	
		}
  		JsonParam.detailSetting=param.detailSetting;
		JsonParam.imageFileData = param.imageFileData
		return $.ajax({
			url : url,
			type : 'post',
			data : JSON.stringify(JsonParam),
			dataType:"json",
			contentType : 'application/json',
		});
	};
	
})(app);



