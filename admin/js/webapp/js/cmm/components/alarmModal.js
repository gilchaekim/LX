app = window.app || {};
app.cmm = app.cmm || {};
app.cmm.components = app.cmm.components || {};
((app) => {

	app.cmm.components.alarmModal = {
		name: 'alarm-modal',
		data: function () {
			return {
				data: app.cmm.data,
			}
		},

		methods: {
			close: function () {
				document.querySelector('#alarm > div > div.cont > div').scrollTop = 0;
				this.$el.style.display = "none";
			},

			setGrid: function (opertNtcnId, lyrNm, opertProcessSeCode, opertCn) {
				if(opertProcessSeCode == '5'){
					app.cmm.process.setGeocodingGrid(opertNtcnId, lyrNm);					
				}else{
					//작업실패
					callAlert('fail', opertCn);
				}
			},

			setToc: function (opertNtcnSn, lyrNm) {
				app.cmm.process.publishLayer({ opertNtcnSn: opertNtcnSn, lyrNm: lyrNm });
			},

			deleteAlarm: function (opertNtcnId) {
				callConfirm("알림을 삭제하시겠습니까?", '삭제된 알림은 목록에서 제거됩니다.', (result) => {
					$('.btnOpTableClose').trigger('click');
					app.widget.geocodingGridWidget && app.widget.geocodingGridWidget.addTo(false);
					app.cmm.process.deleteAlarm(opertNtcnId);
				});

			},
			infinityScroll: function (event) {

				let endHeight = event.target.scrollHeight - event.target.offsetHeight
				let currentHeight = event.target.scrollTop;
				if (endHeight === currentHeight && app.cmm.data.alarmData.pageInfo.totalPageIndex !== app.cmm.data.alarmData.pageInfo.pageIndex) {
					app.cmm.process.setAlarmList(app.cmm.data.alarmData.pageInfo.pageIndex + 1);
				}
			}
		}
	}

})(app);
