app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.api = app.cmm.api || {};
//
((app) => {
	
	let landInfo = app.cmm.api.landInfo = {};


	landInfo.list = function(param) {
		return app.util.callLxdtAPI({
			url : `/smt/proxyUrl.jsp?url=http://10.10.20.74:9999/services/astbank/dklx/landInfoBaseMap`,
			data : param,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
			type : 'post'
		});
	};


})(app);



