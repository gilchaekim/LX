app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};
//
((app) => {
	let api = app.cmm.api.api = {};
	//getFeature요청
	api.getFeature = async function (param) {
		return await app.util.callAPI({
			url: `${API_MAP}/api/map/wfs`,
			data: param,
			type: 'post'
		});
	};
})(app);



