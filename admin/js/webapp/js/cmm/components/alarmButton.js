app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.components = app.cmm.components || {};
((app) => {
	
	app.cmm.components.alarmButton = {
		name : 'alarm-button',
		data : function() {
			return {
				data : app.cmm.data,
			}
		},

		methods : {
			alarmModalShowAndHide : function() {
				if(userMapId) {
					const alarmPop = document.querySelector(".alarmPop");
					if(alarmPop.style.display === "none") {
						alarmPop.style.display = "block" 
						app.cmm.process.setAlarmList();
					} else {
						document.querySelector('#alarm > div > div.cont > div').scrollTop = 0;
						alarmPop.style.display = "none";  
					}
				} else {
					callAlert('fali', "저장이 필요한 기능입니다.")
				}
			},
			
		}
	};
})(app);
