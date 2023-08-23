app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.components = app.cmm.components || {};
((app) => {
	app.cmm.components.alarmVue = new Vue({
		el : "#alarm",
		data : app.cmm.data,
		components : {
			'alarm-button' : app.cmm.components.alarmButton,
			'alarm-modal' : app.cmm.components.alarmModal,
		},
		created() {
			if(userMapId) {
				app.cmm.process.setAlarmList(); // 데이터 첫조회
			}
		},
		methods : {
	
		}
	});
})(app);