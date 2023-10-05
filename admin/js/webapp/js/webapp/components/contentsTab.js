app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.contentsTab = {
		name : 'contents-tab',
		data : function() {
			return {
				data : app.webapp.data,
			}
		},

		methods : {
			
		}
	}
})(app);