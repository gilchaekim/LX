app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
((app) => {

	app.webapp.components.webAppChartModalVue = new Vue({
		el: "#webAppChartModal",
		data: {
			mode: "", // map or app 구분하여 사용.
			keyword: "",
			webappTmplatTyCode : "",
			data: app.webapp.data,
			styleObj: {
				display: "none",
			},
		},
		mounted: function () {
			$("#webAppChartModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
		},
		methods: {
			show: function () {
				this.styleObj.display = "block";
			},
			hide: function () {
				app.oui.chartWidget().remove()
				this.styleObj.display = "none";
			},
		}

	});

})(app);

