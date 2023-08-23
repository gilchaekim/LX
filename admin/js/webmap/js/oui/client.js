app = window.app || {};
app.oui = app.oui || {};
((app) => {
	let client = app.oui.client = {};
	// 업로드 api
	client.uploadClient = oui.HttpClient({
		baseURL: API_SPATIAL,
		// params: {registerId: 'test',},
	}, axiosErrorCallback );
	// 지오코딩 api
	client.geocodingClient = oui.HttpClient({
		baseURL: API_GEOCODING,
		// params: {registerId: 'test',},
	}, axiosErrorCallback);
	//주소정제 api
	client.addressClient = oui.HttpClient({
		baseURL: API_GEOCODING,
		//params: {registerId: 'test',},
	}, axiosErrorCallback);
	//행정구역경계 api
	client.administClient = oui.HttpClient({
		baseURL: API_GEOCODING,
	}, axiosErrorCallback);
	//지도 요청 api, 지오서버 , 바로e맵, vworld
	client.mapClient = oui.HttpClient({
		baseURL: API_MAP,
	}, axiosErrorCallback);
	//알람 api
	client.noticeClient = oui.HttpClient({
		baseURL: API_ANALS,
	}, axiosErrorCallback);
	//지오서버 요청 api
	client.layerClient = oui.HttpClient({
		baseURL: API_SMT,
	}, axiosErrorCallback);
	//배경지도
	client.basemapClient =  oui.HttpClient({
		baseURL: API_SMT,
	}, axiosErrorCallback);
	//분석 api
	client.analysisClient = oui.HttpClient({
		baseURL: API_ANALS,
	}, axiosErrorCallback);
	//북마크 조회 api
	client.bookmarkClient = oui.HttpClient({
		baseURL: API_SMT,
	}, axiosErrorCallback);
	//좌표 변환 api
	client.coordClient = oui.HttpClient({
		baseURL: API_COORD,
	}, axiosErrorCallback);
	//공통코드 api
	client.commonCodeClient = oui.HttpClient({
		baseURL: API_SMT,
	}, axiosErrorCallback);
	//cctv 조회 api url
	client.cctvClient = oui.HttpClient({
		baseURL: `https://openapi.its.go.kr:9443`,
	}, axiosErrorCallback);

	function axiosErrorCallback(response){
		let _data = response.data; //{url : ..., message : ...}
		if(response.status=="401"){
			callAlert('success', _data.message, function() {
				location.href =_data.url;
			}, true);
		}
		
	}
})(app);