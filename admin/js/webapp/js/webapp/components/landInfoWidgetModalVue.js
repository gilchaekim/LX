app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.landInfoWidgetModal = new Vue({
		el: "#landInfoWidgetModal",
		mounted: function () {
			$("#landInfoWidgetModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
		},
		data: {
			data: app.webapp.data
			, currentGubn: 'build'
			, landInfoList: app.webapp.data.landInfoList
			, checkedLandInfoList: []
		}
		, methods: {
			show: function () {
				this.onChangeCategory()
				$("#landInfoWidgetModal").show();
			},
			hide: function () {
			},
			onChangeCategory: function (evt) {
				
				this.checkedLandInfoList = [];
				for (var key in app.webapp.data.webAppOptions.detailSetting.widgetTab.landInfoCheckedList) {
					let columnNm = key.substr(key.indexOf(evt+'Column_')+ (evt+'Column_').length);
					if (app.webapp.data.webAppOptions.detailSetting.widgetTab.landInfoCheckedList[key]) {
						this.checkedLandInfoList.push(columnNm);
					}
				};
				
				let _gubn;
				
				if (evt) {
					_gubn = evt.currentTarget.value;
				} else {
					_gubn = 'build';
				}
				
				this.currentGubn = _gubn;
				//변경될때마다 데이터 다시 뿌리기
				this.landInfoList = getLandInfoList(_gubn); //테이블에 표출되는 분석목록
				let list = []; //[true, true. false , ...] 현재 표출된 분석 목록의 체크유무 확인
				this.landInfoList.forEach(item => {
					if (this.checkedLandInfoList.includes(`${this.currentGubn}Column_${item.landColumnId}`)) {
						list.push('check');
					} else {
						list.push('noCheck');
					}
				});
			},
			checkedAll: function (evt) {
				console.dir(evt);
				if (this.currentGubn == $(evt.target).attr('id')) {
					let checkFlag = $(evt.target).is(':checked'); //true 전체선택, false 전체해제
					var checkBoxList = $(evt.target).parents('.analysisTable').find('.analysis td input[type="checkbox"]');
					for (var i = 0; i < checkBoxList.length; i++) {
						
						//1.전체선택인 경우 현재 테이블에 보여지는 분석을 모두 배열에 추가(이미 체크된 분석은 제외)
						//1-1 체크 전체 체크 
						let checkBox = $(checkBoxList[i]);
						//전체 선택시 이미 체크된 체크박스는 제외하고 data에 담기
						if (checkFlag && checkBox.is(':checked') == false) {
							this.checkedLandInfoList.push(checkBox.val());
							//전체 선택 해제 시 제외하기
						} else if (!checkFlag) {
							this.checkedLandInfoList = this.checkedLandInfoList.filter(item => {
								return item != checkBox.val()
							});
						}
						checkBox.prop('checked', checkFlag); //체크박스 전체 선택 / 전체 해제 
					}
				}
			},
			checkedFalseAll: function () {
				$('#landInfoWidgetModal').find('input[type="checkbox"]').prop('checked', false);
			},
			//부동산 옵션 적용 
			//0704 설정시 닫혀있는 탭 초기화?
			applyLandOption: function () {
				this.data.landInfoList.filter(item => item.landGubn == this.currentGubn).forEach(item => {
					if (this.checkedLandInfoList.includes(item.landColumnId)) { //체크된애들 true
						app.webapp.data.webAppOptions.detailSetting.widgetTab.landInfoCheckedList[item.landGubn+'Column_'+item.landColumnId] = true;
					} else {
						app.webapp.data.webAppOptions.detailSetting.widgetTab.landInfoCheckedList[item.landGubn+'Column_'+item.landColumnId] = false;
					}
				});
				
				//위젯 연결
				let applyGubnNm = this.currentGubn == 'build' ? '세움터' : '크라스';
				callAlert('success', `${applyGubnNm} 정보 옵션이 적용되었습니다.`);
				//옵션창 닫기
				//$('#landInfoWidgetModal .btnPopClose').click()
			}

		}// method 
	}); // vue
})(app);

const getLandInfoList = (gubn) => {
	let _gubn = gubn;
	let _landInfoList = app.webapp.data.landInfoList; //전체 분석 목록

	_landInfoList = _landInfoList.filter(item => item.landGubn == _gubn);

	//전체 분석 리스트 (카테고리 id, 카테고리명을 분석 마다 넣어줌)
	return _landInfoList;
}
