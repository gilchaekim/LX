app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.spatialAnalysisWidgetModal = new Vue({
		el: "#spatialAnalysisWidgetModal",
		mounted: function () {
			$("#spatialAnalysisWidgetModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
		},
		data: {
			data: app.webapp.data
			, search: ''
			, currentCategoryId: '0'
			, analysisList: app.webapp.data.analysisInfoList
			, categoryList: app.webapp.data.analysisInfoList.filter((item, index) => {
				return (app.webapp.data.analysisInfoList.findIndex((i, idx) => {
					return item.categoryId === i.categoryId;
				}) === index)
			}).map(item => {
				return { categoryName: item.categoryName, categoryId: item.categoryId }
			})
			, checkedAnalysisList: []
		}
		, methods: {
			show: function () {
				$("#spatialAnalysisWidgetModal").show();
			},
			hide: function () {
			},
			onChangeCategory: function (evt) {
				let _categoryId = $(evt.target).val();
				this.currentCategoryId = _categoryId;
				//변경될때마다 데이터 다시 뿌리기
				this.analysisList = getAnalysisList(_categoryId, this.search); //테이블에 표출되는 분석목록
				let list = []; //[true, true. false , ...] 현재 표출된 분석 목록의 체크유무 확인
				this.analysisList.forEach(item => {
					if (this.checkedAnalysisList.includes(item.analysisId)) {
						list.push('check');
					} else {
						list.push('noCheck');
					}
				});

				//결과가 없는 경우 (카테고리 + 검색)
				if (list.length < 0) {
					$('#all').prop('checked', false);
					//전체 선택인 경우
				} else if (!list.find(item => item == 'noCheck')) {
					$('#all').prop('checked', true); //전체 선택 체크박스 체크되게 하기  
				} else if (!list.find(item => item == 'check')) {
					$('#all').prop('checked', false);//전체 선택 체크박스 체크해제되게 하기  
				}
			},
			checkedAll: function (evt) {
				console.dir(evt);
				let checkFlag = $(evt.target).is(':checked'); //true 전체선택, false 전체해제
				var checkBoxList = $(evt.target).parents('.analysisTable').find('.analysis td input[type="checkbox"]');
				for (var i = 0; i < checkBoxList.length; i++) {

					//1.전체선택인 경우 현재 테이블에 보여지는 분석을 모두 배열에 추가(이미 체크된 분석은 제외)
					//1-1 체크 전체 체크 
					let checkBox = $(checkBoxList[i]);
					//전체 선택시 이미 체크된 체크박스는 제외하고 data에 담기
					if (checkFlag && checkBox.is(':checked') == false) {
						this.checkedAnalysisList.push(checkBox.val());
						//전체 선택 해제 시 제외하기
					} else if (!checkFlag) {
						this.checkedAnalysisList = this.checkedAnalysisList.filter(item => {
							return item != checkBox.val()
						});
					}
					checkBox.prop('checked', checkFlag); //체크박스 전체 선택 / 전체 해제 
				}
			},
			//분석 옵션 적용
			applyAnalysisOption: function () {
				let anaylsisOption = {} //분석 옵션
				this.data.analysisInfoList.forEach(item => {
					if (this.checkedAnalysisList.includes(item.analysisId)) { //체크된애들 true
						anaylsisOption[item.analysisId] = true;
					} else {
						anaylsisOption[item.analysisId] = false;
					}
				});

				let list = [{ type: "spatialAnalysis", value: anaylsisOption }]
				//위젯 연결
				app.oui.spatialAnalysisWidget().setOptions(list).build();
				callAlert('success', '분석 옵션이 적용되었습니다.');
				//옵션창 닫기
				$('#spatialAnalysisWidgetModal .btnPopClose').click()
			}
			//검색 적용
			, searchAnalysis: function () {
				this.analysisList = getAnalysisList(this.categoryId, this.search);
			}

		}// method 
	}); // vue
})(app);

const getAnalysisList = (categoryId = '0', search = '', filter = '') => {
	let _categoryId = categoryId;
	let _analysisList = app.webapp.data.analysisInfoList; //전체 분석 목록

	//해당 카테고리 분석 목록만 표출
	if (categoryId != '0') {
		_analysisList = _analysisList.filter(item => item.categoryId == _categoryId);
	}

	if (search != '') {
		_analysisList = _analysisList.filter(item => item.analysisName.indexOf(search) != -1);
	}
	//전체 분석 리스트 (카테고리 id, 카테고리명을 분석 마다 넣어줌)
	return _analysisList;
}
