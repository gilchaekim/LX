app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};
//
((app) => {
	
	let overlap = app.cmm.api.overlap = {};


	overlap.list = function(param) {
		return app.util.callAPI({
			url : `${API_SMT}/basemap/list`,
			data : param,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
			type : 'get'
		});
	};
	
	overlap.select = function(param) {
		return app.util.callAPI({
			url : `${API_SMT}/basemap/select`,
			data : param,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
			type : 'get'
		});
	};
	
	
	//드론영상 리스트 호출.
	overlap.listCall = function(param) {
		return app.util.postJson({
			url : `${contextPath}/overlapDroneList.do`,
			data : param,
			type : 'post'
		})
	};
	
	//드론영상 지도서비스 조회(WMS서비스 GetMap 요청)
	overlap.getFeatureInfoCall = function(param) {
		return app.util.postJson({
			url : `${contextPath}/overlapDroneFeatureInfoList.do`,
			data : param,
			type : 'post'
		})
	};
	
	//드론영상 지도서비스 조회(WMS서비스 GetMap 요청)영상 출력
	overlap.getDroneCall = function(param) {
		return app.util.postJson({
			url : `${contextPath}/overlapDroneView.do`,
			data : param,
			type : 'post'
		})
	};
	//바운딩 박스로 드론영상 서비스 목록 조회
	overlap.getDroneEnvelopCall = function(param) {
		return app.util.postJson({
			url : `${contextPath}/overlapDroneFeatureInfoByEnvelop.do`,
			data : param,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			type : 'post' 
		});
	};
	
	
	//시,시군구,읍면동 조회
	overlap.addrCall = function(param) {
		return app.util.postJson({
			url : `${contextPath}/addrList.do`,
			data : param,
			type : 'post' 
		})
	};
		
	
	
	
})(app);



