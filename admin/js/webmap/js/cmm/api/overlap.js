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

})(app);



