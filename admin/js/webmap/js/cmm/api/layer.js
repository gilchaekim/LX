app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};

((app) => {
	let layer = app.cmm.api.layer = {};

	layer.getContentDetail = function (param) {
		return app.util.callAPI({
			url: `${API_MAP}/layer/cn/select`,
			data: param,
			async: false,
			type: 'get'
		});
	};

	/* 레이어 정보 관리 */
	// 레이어 정보 관리 - 레이어 등록
	layer.insertLayerInfo = function (param) {
		return app.util.callAPI({
			url: `${API_SMT}/layer/info/insert`,
			data: param,
			async: false,
			type: 'post'
		});
	};

	//레이어 정보 관리 - 레이어 정보 조회
	layer.getLayerInfo = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/layer/info/select`,
			data: param,
			type: 'get'
		});
	};

	/* 웹레이어 다운로드*/
	layer.download = function (param) {
		return app.util.callAPI({
			url: `${API_ANALS}/layer/file/download`,
			data: param,
			type: 'post'
		});

	};
	/* 웹레이어 수정*/
	layer.update = function (param) {
		return app.util.callAPI({
			url: `${API_SMT}/layer/info/update`,
			data: param,
			type: 'post'
		});
	};

	/* 웹레이어 썸네일*/
	layer.thumbnail = function (param) {
		return app.util.callAPI({
			url: `${API_SMT}/layer/thumbnail/select`,
			data: param,
			type: 'get'
		});
	};
	/* 웹레이어 썸네일 저장(merge)*/
	layer.merge = function (param) {
		let url  = `${API_SMT}/layer/thumbnail/insert?crtfckey=${crtfckey}&lyrId=${param.lyrId}`;
		let data = {'imageFileData' : param.base64};

		return $.ajax({
			url : url,
			type : 'post', 
			dataType:"json",
			contentType : 'application/json',
			data : JSON.stringify(data)
		});
	}


	/* 웹레이어 썸네일 삭제(merge)*/
	layer.thumbnailDelete = function (param) {
		return app.util.callAPI({
			url: `${API_SMT}/layer/thumbnail/delete`,
			data: param,
			type: 'post'
		});
	}

	/* 웹레이어 공유 리스트*/
	layer.lyrShareList = function (param) {
		return app.util.callAPI({
			url: `${API_SMT}/layer/share/select`,
			data: param,
			type: 'get'
		});
	};
	
	layer.getAdminist = function (param) {
		let administUrl;
		if(param.code.substring(2) == '000'){
			administUrl = `${API_GEOCODING}/administ/ctpv`
			param.ctprvnCd = param.code.substring(0,2);
			delete param.code
		}else{
			administUrl = `${API_GEOCODING}/administ/sgg`;
			param.sigCd  = param.code;
			delete param.code
		}
		return app.util.callAPI({
			url: administUrl,
			data: param,
			type: 'get'
		});
	}
	
	/* 레이어 그룹 목록*/
	layer.getLayerGroupList = function (param) {
		return app.util.callAPI({
			url: `${API_LAYERGROUP}/lyrgrp/info/v2/list/`,
			data: param,
			type: 'get',
			async: false
		});
	};
})(app);

