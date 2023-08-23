app = window.app || {};
app.cmm = app.cmm || {};
((app) => {

	let process = app.cmm.process = {};
	//getFeature요청

	//알람목록 데이터셋
	process.setAlarmList = (pageIndex = 1, pageSize = 10) => {
		//현재 알람 api가 수정일기준으로 정렬한 목록을 줍니다. 
		//그러므로 작업등록일이 아닌 완료된 시점으로 알림목록을 만듭니다.
		let param = { userId: userId, userMapId: userMapId, opertProcessSeCode: '5', pageIndex: pageIndex, pageSize: pageSize };
		app.cmm.api.usermap.getAlarmList(param)
			.then(res => {
				const today = app.util.getToday();
				//오늘 날짜 알림 배열 생성
				const alarmArray = [];
				const todayAlarmArray = res.result.list.filter(item => {
					let alarmDay = item.updtDt.substring(0, item.updtDt.indexOf(" "));
					if (!app.webapp && alarm.opertDeleteAt !== "Y") { //앱빌더에는 알람 x
						if (today === alarmDay) {
							return item; //오늘 날짜 알림은 todayAlarmArray 에 리턴
						} else {
							alarmArray.push(item); // 그외 alarmArray 에 리턴
						}
					}
				});

				//오늘이 아닌 날짜 배열 만들기 (중복 제거한 날짜 리스트 구해오기) ex) ['2021-12-06', '2021-12-05']
				const dayArray = alarmArray.map(item => {
					return item.updtDt.substring(0, item.updtDt.indexOf(" "));
				}).filter((day, index, array) => {
					return array.indexOf(day) === index;
				});

				//오늘이 아닌 날짜에 해당하는 알림 배열 넣어주기
				const etcDayArray = [];
				for (let i = 0; i < dayArray.length; i++) {
					let filtering = alarmArray.filter(item => {
						let alarmDay = item.updtDt.substring(0, item.updtDt.indexOf(" "));
						return alarmDay === dayArray[i];
					});
					filtering.length > 0 && etcDayArray.push({ alarm: filtering, date: dayArray[i], });
				}
				//첫조회시
				if (pageIndex === 1) {
					if (todayAlarmArray.length !== 0) {
						app.cmm.data.alarmData.today = {
							todayAlarmArray: todayAlarmArray,
							date: today,
						}
					} else {
						app.cmm.data.alarmData.today = {
							todayAlarmArray: [],
							date: today,
						}
					}
					app.cmm.data.alarmData.etcDay = etcDayArray;
				} else { //스크롤시
					//오늘날짜

					if (todayAlarmArray.length !== 0) {
						let beforeArray = app.cmm.data.alarmData.today.todayAlarmArray
						app.cmm.data.alarmData.today.todayAlarmArray = [...beforeArray, ...todayAlarmArray];
					}
										//현재 알림에 표출되고 있는 오늘 이외 날짜
					let beforeEtcArray = app.cmm.data.alarmData.etcDay;
					let afterEtcArray = [];
					let etcDateArray = [];
					//이전 데이터에 새로운 데이터 날짜에맞게 셋팅
					if(beforeEtcArray.length > 0 ){
						beforeEtcArray.forEach((item, index) => {
							let obj = {};
							for (let i = 0; i < etcDayArray.length; i++) {
								if (item.date === etcDayArray[i].date) {
									obj.alarm = [...item.alarm, ...etcDayArray[i].alarm];
									obj.date = item.date;
									beforeEtcArray[index] = (obj);
								} 
								//알림에 표출되고 있는 오늘 이외 데이터에 없는 날짜인 경우
								else if(beforeEtcArray.length -1  === index && item.date !== etcDayArray[i].date){
									etcDateArray.push(etcDayArray[i]);
								}
							}
						});//알림에 표출되고있는 오늘 이외 날짜에 데이터 추가 
					}else{
						etcDateArray = etcDayArray;
					}

					afterEtcArray = [... etcDateArray, ...beforeEtcArray];
					//다합쳐진 날짜들 정렬
					afterEtcArray.sort((a, b) => {
						let dateA = new Date(a['date']).getTime();
						let dateB = new Date(b['date']).getTime();
						return dateA < dateB ? 1 : -1;
					});
					app.cmm.data.alarmData.etcDay = afterEtcArray;
				}

				app.cmm.data.alarmData.pageInfo = res.result.pageInfo;
				let totalPageIndex = res.result.pageInfo.totalCount / res.result.pageInfo.pageSize;
				if (Number.isInteger(totalPageIndex)) {
					app.cmm.data.alarmData.pageInfo.totalPageIndex = totalPageIndex;
				} else {
					app.cmm.data.alarmData.pageInfo.totalPageIndex = parseInt(totalPageIndex) + 1;
				}
			})
			.catch(e => {
				console.log(e)
				callAlert('error', '관리자에게 문의해주세요');
				callLoadingBar({ status: false });
			});
	};

	//oui에서 던저주는 작업 알림 번호 분기 처리
	//동기는 callLoading 호출 
	//비동기는 알림목록에 등록
	process.receiveOpertNtcnInfo = (opertNtcnInfo) => {
		let param = { ...opertNtcnInfo, userMapId: userMapId, userId: userId, registerId: userId, updusrId: userId };
		let apiResult = {}; // api 통신결과 저장용
		app.cmm.api.ntice.getOpertNtcnDetail(param)
			.then(response => {
				apiResult = response.result;
				param = { ...param, ...apiResult, groupCode: apiResult.opertClCode, detailCode: apiResult.opertSeCode };
				return app.cmm.api.cmmn.getCmmnCodeDetail({groupCode: apiResult.opertClCode, detailCode: apiResult.opertSeCode});
			})
			.then(response => {
				apiResult = response.result[0];
				param = { ...param, ...apiResult };
				if (param.groupCode === 'MPD010') {
					app.cmm.process.syncProcess(param)
				}
				else if (!opertNtcnInfo.svcTySeCode) {
					param.opertCn = param.opertProcessCn;
					app.cmm.process.asyncProcess(param);// 모래시계 회전하는 처리
				} else {
					app.cmm.process.syncProcess(param); //화면멈추는 동기처리
				}
			})
			.catch(e => {
				console.log(e);
				callAlert('error,', "관리자에게 문의해주세요");
				callLoadingBar({ status: false });
			})
	};

	//작업알림 처리(비동기처리) - 알림 목록에 등록되는 비동기 처리 수행
	process.asyncProcess = (param) => {
		let apiResult = {}; // api 통신결과 저장용
		let intervalID;//작업알림 재조회및 중지용
		const alarmBtnDiv = document.querySelector(".btnAlarmDiv");
		const alarmBtn = document.querySelector(".btnAlarm");
		alarmBtnDiv.classList.add('loading');//알람 UI회전 시작
		alarmBtn.classList.add('loading');//알람 UI회전 시작
		param.opertClSeCode = param.opertSeCode; 
		app.cmm.api.usermap.putOpertNtcnId(param)
			.then(response => {
				apiResult = response.result;
				param = { ...param, ...apiResult };
				return app.cmm.api.usermap.getOpertNtcn(param);
			})
			.then(response => {
				param.opertProcessSeCode = response.result.opertProcessSeCode;
				if (param.opertProcessSeCode == "1") { //작업중
					intervalID = setInterval(() => { //TODO 5. 조회후 작업중이면 작업 알림 상세 반복조회( 3초 인터벌 등록 )
						app.cmm.api.ntice.getOpertNtcnDetail(param)
							.then(response => {
								param.opertProcessSeCode = response.result.opertProcessSeCode;
								if (param.opertProcessSeCode !== "1") { //작업종료
									apiResult = response.result;
									param = { ...param, ...apiResult };
									clearInterval(intervalID); // 작업종료에따른 인터벌 제거
									param.fileNm = response.result.opertProcessCn;
									param.groupCode === "MPD013" && response.result.opertProcessSeCode == "5" && app.cmm.api.geofile.insertGeoFileResult(param)//지오코딩이라면 결과 파일등록

									return app.cmm.api.usermap.updateOpertNtcnStats(param)
										.then(response => { //TODO 6. 작업 상태 변경
											app.cmm.process.setAlarmList(); //알람 리스트 재생성
											document.querySelector(".alarmPop").style.display = "block";
											return app.cmm.api.usermap.getAlarmQueue(param)
										})
										.then(response => {
											if (response.result.pageInfo.totalCount === 0) {
												alarmBtn.classList.remove('loading');
												alarmBtnDiv.classList.remove('loading');
											}
										})
								}
							})
							.catch(e => {
								console.log(e);
								clearInterval(intervalID);
								callAlert('error', '관리자에게 문의해주세요');
								callLoadingBar({ status: false });
								alarmBtn.classList.remove('loading');//알람 UI회전 종료
								alarmBtnDiv.classList.remove('loading');//알람 UI회전 종료
							});
					}, 3000);
				} else { 					
					//작업완료 상태라면 바로 알람 셋
					param.fileNm = response.result.opertProcessCn;
					app.cmm.process.setAlarmList(); //알람 리스트 재생성
					alarmBtn.classList.remove('loading');//알람 UI회전 종료
					alarmBtnDiv.classList.remove('loading');//알람 UI회전 종료
					document.querySelector(".alarmPop").style.display = "block";
					if(param.opertProcessSeCode === "8"){ //작업 실패
						//callAlert('error', param.opertProcessCn);
					}else if(param.opertProcessSeCode === "5"){//작업 성공
						param.groupCode === "MPD013" && app.cmm.api.geofile.insertGeoFileResult(param) //지오코딩이라면 결과 파일등록						
					}
				}
			})
			.catch(e => {
				console.log(e);
				callAlert('error', '관리자에게 문의해주세요');
				callLoadingBar({ status: false });
				alarmBtn.classList.remove('loading');//알람 UI회전 종료
				alarmBtnDiv.classList.remove('loading');//알람 UI회전 종료
			})
	};

	//작업알림 처리(동기처리) - 알림 목록에 등록되지않는 것에대한 처리
	process.syncProcess = (param) => {
		let apiResult = {}; // api 통신결과 저장용
		let intervalID;//작업알림 재조회및 중지용

		app.cmm.api.ntice.getOpertNtcnDetail(param)
			.then(response => {
				if (response.result.opertProcessSeCode == "1") { //작업중
					intervalID = setInterval(() => { //TODO 5. 조회후 작업중이면 작업 알림 상세 반복조회( 3초 인터벌 등록 )
						app.cmm.api.ntice.getOpertNtcnDetail(param)
							.then(response => {
								if (response.result.opertProcessSeCode != "1") { //작업종료
									clearInterval(intervalID); // 작업종료에따른 인터벌 제거
									//레이어 발행
									if (response.result.opertProcessSeCode == '5') {
										app.cmm.process.publishLayer(param);
									} else if (response.result.opertProcessSeCode == '8') {
										callAlert('error', response.result.opertProcessCn);
										callLoadingBar({ status: false });
									}
								}
							})
							.catch(e => {
								console.log(e)
								clearInterval(intervalID);
								callLoadingBar({ status: false });
								callAlert('error', '레이어 업로드중 오류가 발생했습니다.')
							})
					}, 3000);
				} else {
					if (response.result.opertProcessSeCode == "8") {
						callAlert('error', response.result.opertProcessCn);
						callLoadingBar({ status: false });
					} else {
						//레이어 발행
						app.cmm.process.publishLayer(param);
					}
				}
			})
			.catch(e => {
				console.log(e);
				callLoadingBar({ status: false });
			});
	}

	//레이어발행
	process.publishLayer = async (param) => {
		//TODO 1. 작업알림 상세조회
		app.cmm.api.ntice.getOpertNtcnDetail(param)
			.then(res => {
				try {

					let paramList = [];
					res.result.layers.forEach(item => {
						paramList.push({
							...item, //레이어정보
							...param, //oui에서 주는 정보 또는 알림모달에서 주는 정보
							registerId: userId,
							userId: userId,
							jobClCode: '01',
							onOffAt: 'Y',
							usePblonsipSeCode: "9",
							lyrPosesnSeCode: "1"
						});
					});
					//	
					//					if (['1', '2', '3'].includes(param.lyrTySeCode)) {//점/선/면
					//						param.svcTySeCode = 'F';
					//					} else 
					if ('4' === param.lyrTySeCode) {//geoTiff
						param.svcTySeCode = 'M';
					}
					if (param.lyrClCode == "MPD013" && param.lyrClSeCode == "03") {
						param.cntmSeCode = param.srid;
					}

					let insertLayerInfoList = [];


					//1.레이어 정보 insert
					for (let item of paramList) {
						try {
							insertLayerInfoList.push(app.cmm.api.layer.insertLayerInfo(item));
						} catch (e) {
							callAlert('error', '관리자에게 문의해주세요');
							callLoadingBar({ status: false });
						}
					}

					let insertLayerIdList = insertLayerInfoList.map(item => {
						return JSON.parse(JSON.stringify(item)).responseJSON.result;
					});

					//2.레이어 정보 가져오기 
					Promise.all(insertLayerIdList.map(
						param => app.cmm.api.layer.getLayerInfo(param)
					)).then(response => {
						let layerInfoList = response.map(item => {
							let layerInfo = item.result;
							//dxf 그룹발행이 아닌 경우 해당 레이어 명에 1,2,3 을 붙여 구분시켜줌 
							if (layerInfo.lyrClCode == "MPD013" && layerInfo.lyrClSeCode == "06" && layerInfo.svcTySeCode == "F") {
								layerInfo.lyrNm = `${layerInfo.lyrTySeCode == '1' ? '[점]' : (layerInfo.lyrTySeCode == '2' ? '[선]' : '[면]')} ${layerInfo.lyrNm}`;
							}
							return { ...layerInfo, contentId: layerInfo.lyrId, title: layerInfo.lyrNm, lyrGroupSeCode: "02" }
						});

						Promise.all(layerInfoList.map(async (param) => {
							if (['MPD011', 'MPD012', 'MPD016', 'MPD017'].includes(param.lyrClCode)/*분석레이어 발행일 경우*/
								&& ['1', '2', '3'].includes(param.lyrTySeCode)/*점/선/면 타입(타일, GeoTIFF 타입 제외)*/) {

								let _content = app.cmm.api.layer.getContentDetail({
									cntntsId: param.cntntsId
								}).responseJSON.result;
								param.typeName = _content.lyrOpertSpcNm + ':' + _content.cntntsId;

								let _param = {
									service: 'wfs',
									version: '1.0.0',
									request: 'GetFeature',
									typeNames: param.typeName,
									outputFormat: 'application/json'
								};
								return app.cmm.api.api.getFeature(_param).catch(e => { throw { error: e.responseJSON } })
									.then(async (res) => {
										let style = oui.SpatialAnalysisWidget.getAnalysisStyle(res.features, param.lyrClCode, param.lyrClSeCode);
										param.style = style;
										param.lyrGroupSeCode = "02";

										//TOC에 추가 
										await app.oui.process.refineTocContentList([param]).then((data) => {
											data[0].linkedLayer.setMap(map);
											data[0].linkedLayer.fit();
											app.widget.tocWidget.setContent(data[0]);
										});
										if (app.webapp == undefined) {
											!$('.tocToggle').hasClass('active') && document.querySelector('.tocToggle > .tool').click();
										}
										document.querySelector('.btnOpTableClose').click();
										callLoadingBar({ status: false });
									});
							} else {
								param.lyrGroupSeCode = "02";
								//TOC에 추가 
								await app.oui.process.refineTocContentList([param]).then((data) => {
									data[0].linkedLayer.setMap(map);
									data[0].linkedLayer.fit();
									app.widget.tocWidget.setContent(data[0]);
								});
								!$('.tocToggle').hasClass('active') && $('.tocToggle > .tool').click();
								$('.btnOpTableClose').click();
								callLoadingBar({ status: false });
							}
						}));

					});

				} catch (e) {
					callLoadingBar(false)
					callAlert('error', '관리자에게 문의해주세요');
					callLoadingBar({ status: false });
				}
			})

	};

	//지오코딩 그리드 결과 표출
	process.setGeocodingGrid = (opertNtcnId, lyrNm) => {

		//TODO 1. 지오코딩파일 결과 조회
		app.cmm.api.geofile.getGeoFileResult({ opertNtcnId: opertNtcnId })
			.then(res => {
				return app.cmm.server.file.readGeoFile(res.result);
			})//TODO 2. read 파일
			.then(geoData => {
				if(geoData.errorMessage){
					callAlert('error', geoData.errorMessage);
				}else{
					geoData.lyrNm = lyrNm;
					app.widget.geocodingGridWidget && app.widget.geocodingGridWidget.addTo(false);
					app.oui.geocodingGridWidget().setGeoData(geoData).build();
					app.widget.geocodingGridWidget.addTo(true);
					document.querySelector('#optionTable').style.display = 'block';
					document.querySelector('.titOpTable').innerText = lyrNm;	
				}
			})
			.then(res => {
				map.updateSize();
			})
			.catch(e => {
				console.log(e)
				callAlert('error', '관리자에게 문의해주세요');
			});
	};


	//작업알림 삭제
	process.deleteAlarm = (opertNtcnId) => {
		let param = { updusrId: userId, opertNtcnId: opertNtcnId, userMapId: userMapId }
		app.cmm.api.usermap.deleteOpertNtcnId(param)
			.then(res => {
				app.cmm.process.setAlarmList();
			})
			.catch(e => {
				console.log(e);
				callAlert('error', '관리자에게 문의해주세요');
			});
	};
})(app);
