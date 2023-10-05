app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};
//
((app) => {
	
	let webmap = app.cmm.api.webmap = {};

	/* 웹맵 권한 체크*/
	webmap.selectWebmapAuth = function(param) { 
		return $.ajax({
			url : `${API_SMT}/webmap/info/auth`,
			data : param,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
			type : 'get',
			async : false
		});
	};
	
	/* 웹맵 저장*/
	webmap.process = function(param) { 
		let url;
		param.userMap.userMapId ? url= `${API_SMT}/webmap/info/insert/process?userMapId=${param.userMap.userMapId}&userId=${userId}&crtfckey=${crtfckey}`: url= `${API_SMT}/webmap/info/insert/process?userId=${userId}&crtfckey=${crtfckey}`    
		/*TODO querystring 형식으로 공통항목 전송 */
		return $.ajax({
			url : url,
			type : 'post', 
			dataType:"json",
			contentType : 'application/json',
			data : JSON.stringify(param)
		});
	};

	/* 웹맵 검색*/
	webmap.search = function(param) {
		return app.util.callAPI({
			url : `${API_SMT}/webmap/info/list`,
			data : param,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
			type : 'get'
		});
	};

	/* 웹맵 삭제*/
	webmap.remove = function(param) {
		return app.util.callAPI({
			url : `${API_SMT}/webmap/info/delete`,
			data : param,
			type : 'post'
		});
	};

	/* 웹맵 상세*/
	webmap.view = async function(param) {
		return await app.util.callAPI({
			url : `${API_SMT}/webmap/info/select`,
			data : param,
			type : 'get'
		});
	};

	/* 웹맵 수정*/
	webmap.update = async function(param) {
		return await app.util.callAPI({
			url : `${API_SMT}/webmap/info/update`,
			data : param,
			type : 'post'
		});
	};

	webmap.deleteThumbnail = async function(param) {
		return await app.util.callAPI({
			url : `${API_SMT}/webmap/thumbnail/delete`,
			data : param,
			type : 'post'
		});
	};

	/* 웹맵 공유목록 조회 */
	webmap.selectShareList = async function(param) {
		return await app.util.callAPI({
			url : `${API_SMT}/webmap/share/list`,
			data : param,
			type : 'get'
		});
	};
})(app);



