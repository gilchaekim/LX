app = window.app || {};
app.cmm = app.cmm || {}; 
app.cmm.api = app.cmm.api || {};

((app) => {
	
	let usermap = app.cmm.api.usermap = {};
	
	/* 사용자 지도 작업 알림 관리 */
	// 사용자 지도 작업 알림 관리 - 사용자 지도 작업 알림 조회
	usermap.getOpertNtcn = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/usermap/opertntcn/select`,
			data: param,
			type: 'get'
		});
	};

	// 사용자 지도 작업 알림 관리 - 사용자 지도 작업 알림 등록
	usermap.putOpertNtcnId = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/usermap/opertntcn/insert`,
			data: param,
			type: 'post'
		});
	};

	//사용자 지도 작업 알림 관리 - 사용자 지도 작업 알림 삭제
	usermap.deleteOpertNtcnId = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/usermap/opertntcn/delete`,
			data: param,
			type: 'post'
		});
	};

	//사용자 지도 작업 알림 관리 - 사용자 지도 작업 알림 목록 조회
	usermap.getAlarmList = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/usermap/opertntcn/list`,
			data: param,
			type: 'get'
		});
	};

	//사용자 지도 작업 알림 관리 - 사용자 지도 작업 알림 대기열 목록 조회
	usermap.getAlarmQueue = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/usermap/opertntcn/queue`,
			data: param,
			type: 'get'
		});
	};

	//사용자 지도 작업 알림 관리 - 사용자 지도 작업알림 상태 변경
	usermap.updateOpertNtcnStats = async function (param) {
		return await app.util.callAPI({
			url: `${API_SMT}/usermap/opertntcn/stats`,
			data: param,
			type: 'post'
		});
	};

})(app);

