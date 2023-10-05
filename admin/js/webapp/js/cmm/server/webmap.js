app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.server = app.cmm.server || {};

((app) => {
	
	let webmap = app.cmm.server.webmap = {};
	//웹맵 저장.
	webmap.save = function(data) {
		return app.util.postJson({
			url : `${contextPath}/webmap/save.do`,
			data : data
		})
	};

})(app);


