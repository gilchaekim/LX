/**
 * 시도, 시군구, 읍면동 리스트 조회
 */
app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};

((app) => {
	
	let administ = app.cmm.api.administ = {};
	
	administ.getAddressList = function (addressType, param) {
		
		let addressApiUrl;
		
		if(addressType == "01") {
			addressApiUrl = `${API_GEOCODING}/administ/ctpv/list`;
		} else if(addressType == "02") {
			addressApiUrl = `${API_GEOCODING}/administ/sgg/list`;
		} else if(addressType == "03") {
			addressApiUrl = `${API_GEOCODING}/administ/emd/list`;
		}
		
		return app.util.callAPI({
			url: addressApiUrl,
			async: false,
			data: param,
			type: 'get'
		});
		
	};
	
})(app);
