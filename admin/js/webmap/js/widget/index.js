app = window.app || {};
app.oui = app.oui || {};
((app) => {

	let widget = app.widget || {};
	let _oui = app.oui || {};

	//홈이동위젯
	_oui.homeControlWidget = () => {
		//default Option
		let _target = '#homeControlWidget';
		let _center = [276179.88560667867, 413632.9594010007];
		let _zoom = 9;
		return {
			setTarget: function (target) {
				_target = document.querySelector(target);
				return this;
			},
			setCenter: function (center) {
				_center = options;
				return this;
			},
			setZoom: function (zoom) {
				_zoom = options;
				return this;
			},
			build: () => {
				widget.homeControlWidget = new oui.HomeControlWidget({
					options: { center: _center, zoom: _zoom },
					target: document.querySelector(_target)
				});
				widget.homeControlWidget.addTo(map);
				document.getElementsByClassName('homeControl_moveHomeSpan')[0].innerText = '홈'
			}
		}
	}

	_oui.tocWidget = () => {
		return {

			build: () => {
				widget.tocWidget = new oui.TOCWidget({
					odf: odf,
					target: document.querySelector('#tocWidget'),
					api: {
						getGroupId: app.widget.api.tocApi.getGroupId,
					},
					options: {
						alertList: {
							customAlert: (message) => {
								//(1)그룹추가시 사용
								callAlertMessage(message);
							}
						},
						groupHeight: 55,
						layerHeight: 75,
						//toc 상세 창 영역 지정
						layerDetailTargetElemnet: '#layerDetailWidget',
						//상세 버튼 클릭시 호출
						setLayerDetail: (flag/*true=>toc 상세 on, fasle=>toc 상세 off*/, layerInfo) => {
							document.getElementById('layerTile').innerHTML = '';
							if (flag) {
								document.getElementById('layerTile').innerHTML = layerInfo.title;
								document.getElementById('layerDetailDiv').classList.add('active');
								if (document.getElementById('layerDetailDiv').classList.contains('hide')) {
									document.getElementById('layerDetailDiv').classList.remove('hide');
								}
							} else {
								document.getElementById('layerDetailDiv').classList.remove('active');
							}
							map.updateSize();
						},
						style: {
							options: {
								imageUrl: 'http://10.0.0.219:3001/oui',
								alertList: {
									customAlert: (message) => {
										callAlertMessage(message);
									}
								},
							},
							// api: userImageApi,
							api: {
								//사용자정의 이미지 조회 function
								selectSymbol: app.widget.api.layerApi.selectSymbol,
								//사용자정의 이미지 추가 function
								insertSymbol: app.widget.api.layerApi.insertSymbol,
								//사용자정의 이미지 삭제 function
								deleteSymbol: app.widget.api.layerApi.deleteSymbol,
								//별칭 및 컬럼 정보 조회
								selectColumn: app.oui.api.columnInfoApi.selectColumn,
							}
						},
						layerSearch: {
							options: {
								holdDataSeCode: 0,
								pageSize: 20,
								pageIndex: 1,
								getAddLayerInfo: app.widget.process.getAddLayerInfo, //추가버튼 클릭한 레이어의 정보,
								removeLayerCallback: ({ layerId }) => {
									//data = {layerId : 'LR000000001'}
									//레이어가 삭제된후에 실행되는 콜백함수
									//다른작업이 필요없으면 사용하지 않아도되지만
									//toc갱신 및 지도 재작업이 필요한 경우 여기서 해주어야한다.
									//0.콘텐츠제거
									app.widget.tocWidget.removeContent([{ type: 'layerId', id: layerId }]);
									//1.지도에서 제거
									app.widget.tocWidget.getLayerList().forEach(item => {
										if (item.layerId == layerId) {
											map.removeLayer(item.odfLayerId);
										}
									})
								},
								alertList: {
									customAlert: (message) => {
										callAlertMessage(message);
									},
									//사용자 정의 알림 메세지 정의
									customConfirm: (message, callback) => {
										//확인창 띄우기
										callConfirm('해당 레이어를 삭제하시겠습니까?', '', function () {
											callback();
										});
									}
								},
								layerTypeList: [
									{
										typeNm: "전체",
										lyrTySeCode: ""
									},
									{
										typeNm: "점",
										lyrTySeCode: "1"
									},
									{
										typeNm: "선",
										lyrTySeCode: "2"
									},
									{
										typeNm: "면",
										lyrTySeCode: "3"
									},
									{
										typeNm: "GeoTiff",
										lyrTySeCode: "4"
									}
								]
							},
							api: {
								getLayerList: app.widget.api.layerApi.getLayerList,
								removeLayer: app.widget.api.layerApi.removeLayer,
								getNavList: app.widget.api.layerSearchSubNavCodeApi.getAllDetailCode
							}
						},
						layerUpload: {
							options: {
								// uploadTypeList : ["1","2"], // uploadTypeList 1 : 웹 레이어 업로드 2
								// 파일레이어 업로드 3 엑셀 업로드
								// defaultUploadType : "1" //처음 표출할 업로드 화면
								alertList: {
									startLoadingBar: app.widget.process.startLoadingBar,
									endLoadingBar: app.widget.process.endLoadingBar,
									customAlert: (message) => {
										callAlertMessage(message);
									}
								},
								geocodingOptions: {
									async: true
									, targetSrid: 5186
								},
								fileUploadOptions: {
								}
							},
							api: {
								selectNotice: app.widget.api.noticeApi.selectNotice,
								insertLayer: app.widget.api.layerApi.insertLayer,
								publishFileLayer: app.widget.api.uploadApi.publishFileLayer,
								geocodingLayer: app.widget.api.geocodingApi.geocodingLayer,
								publishWebLayer: (result) => {
									console.dir(result);
								}
							}
						},
						grid: {
							options: {
								gridCallback: function (e) {
									document.querySelector('#optionTable').style.display = 'block';
									app.widget.geocodingGridWidget && app.widget.geocodingGridWidget.addTo(false);
									document.getElementsByClassName('titOpTable')[0].innerText = e.title;
									window.setTimeout(function () { map.updateSize() }, '100');
								},
								alertList: {
									customAlert: (message) => {
										callAlertMessage(message);
									}
								},
								pagination: true,
								pageSize: 100,
								rowSelection: 'multiple',
								sortable: true,
								filter: true,
								mode: 'layer',
								gridHeight: '306px',
								gridWidth: '',
								cellWidth: '',
								createOption: {
									chart: true,
									geomSearch: true,
									attributeEditor: true,
									modify: true,
									filter: true,
									csv: true,
									delete: true,
									insert: true,
									clear: true,
									editMode: true
								}
							},
							api: {//데이터 조회 (mode에 따라 layer(feature 정보), object(일반 json 정보))
								//지오서버 데이터 조회
								getData: app.widget.api.mapApi.getData,
								//지오서버 업로드
								updateData: app.widget.api.mapApi.updateData,
								//공통코드조회
								getCommonCode: app.widget.api.commonCodeApi.commonCodeFunction,
								//상세공통코드 조회 aixos.all
								getAllDetailCode: app.widget.api.commonCodeApi.getAllDetailCode,
								//별칭 및 컬럼 정보 조회
								columnInfoFunction: app.widget.api.columnInfoApi.columnInfoFunction,
								//컬럼정보조회 옵션값 변경
								columnInfoOptionChange: app.widget.api.columnInfoApi.changeOption,
								//레이어 다운로드 api
								downloadLayer: app.widget.api.layerDownloadApi.downloadLayer,
								// //cql 정보 조회 
								cqlInfoFunction: app.widget.api.cqlInfoApi.cqlInfoFunction,
								// //cql 옵션 변경
								cqlInfoOptionChange: app.widget.api.cqlInfoApi.changeOption,
							},
							target: document.getElementById('gridWidget'),
						},
					}
				});
				widget.tocWidget.addTo(map);
			}
		}
	};

	_oui.administrativeDistrictSearchWidget = () => {
		return {
			build: () => {
				widget.administrativeDistrictSearchWidget = new oui.AdministrativeDistrictSearchWidget({
					odf,
					target: document.querySelector('.location'),
					options: {
						useLi: false, //li 사용 여부(default 값 : false)
						useHilight: true,//하이라이트 레이어 사용 여부  
						clearHilightLayerFlagMove: true,//지도 이동시 하이라이트 레이어 클리어(기본값 false)
						// styleObject: {// 하이라이트 레이어 스타일. 없으면 기본 스타일 적용
						//   text: {
						//     fill: {
						//       color: "#858484ff",
						//     },
						//     font: "normal bold 16px 굴림",
						//   },
						//   fill: { color: [255, 255, 255, 0.4] },
						//   stroke: { color: [241, 189, 29, 0.82], width: 2 },
						// },
						//알림옵션
						alertList: {
							//사용자 정의 알림 메세지 정의
							customAlert: (message) => {
								callAlertMessage(message);
							},
						}
					},
					api: {
						//단건 행정구역 정보 조회  function
						geometrySearch: app.widget.api.administApi.geometrySearch,
						//행정구역 유형별 정의
						//시도 목록 조회 function
						ctpvAdministrativeDistrictSearch: app.widget.api.administApi.ctpvAdministrativeDistrictSearch,
						//시군구 목록 조회 function
						sggAdministrativeDistrictSearch: app.widget.api.administApi.sggAdministrativeDistrictSearch,
						//읍면동 목록 조회 function
						emdAdministrativeDistrictSearch: app.widget.api.administApi.emdAdministrativeDistrictSearch,
						//리 목록 조회 function
						liAdministrativeDistrictSearch: app.widget.api.administApi.liAdministrativeDistrictSearch,
						coordSearchFunction: app.widget.api.addressApi.coordSearch,
					}
				});
				widget.administrativeDistrictSearchWidget.addTo(map);
				//초기화 버튼 클릭시 행정구역 하이라이트 제거 function 호출하도록 function 연결
				//clearControlWidget.addToClearFunction(administrativeDistrictSearchWidget.clear);
			}
		}
	};

	_oui.addressSearchWidget = () => {

		return {
			build: () => {
				// 주소 검색 위젯
				widget.addressSearchWidget = new oui.AddressSearchWidget({
					odf,
					target: document.querySelector('#searchAreaWidget'),
					options: {
						pagineType: 'countable'/* 일발페이징 */,// unbounded(스크롤페이징)
						styleObject: {
							image: {
								circle: {
									radius: 10,
									fill: { color: [255, 255, 255, 0.4] },
									stroke: { color: [241, 189, 29, 0.82], width: 2 },
								},
							},
							fill: { color: [255, 255, 255, 0.4] },
							stroke: { color: [241, 189, 29, 0.82], width: 2 },
						},
						//지도 이동시 하이라이트 레이어 초기화 활성화(기본값 false)
						clearHilightLayerFlagMove: true,
						//지도 이동시 검색결과 날리기 활성화(기본값 false)
						//clearResultFlagMove: true,
						//알림옵션
						alertList: {
							//사용자 정의 알림 메세지 정의
							customAlert: (message) => {
								callAlertMessage(message);
							},
							//사용자 정의 로딩바 시작 function
							startLoadingBar: (message) => {
								callTargetLoadingBar(document.querySelector('#searchAreaWidget>div'), message, true);
							},
							//사용자 정의 로딩바 종료 function
							endLoadingBar: (message) => {
								callTargetLoadingBar(document.querySelector('#searchAreaWidget'), message, false);
							},
						}
					},
					api: {
						//기초구역번호 검색 function
						basicSearch: app.widget.api.addressApi.basicSearch,
						//건물명 검색
						bldSearch: app.widget.api.addressApi.bldSearch,
						//경위도 좌표 검색 function
						coordSearch: app.widget.api.addressApi.coordSearch,
						//통합검색 function
						intSearch: app.widget.api.addressApi.intSearch,
						//지번 검색 function
						jibunSearch: app.widget.api.addressApi.jibunSearch,
						//PNU 검색 function
						pnuSearch: app.widget.api.addressApi.pnuSearch,
						//POI 검색 function
						poiSearch: app.widget.api.addressApi.poiSearch,
						//도로명주소 검색 (주소정제 이용) function
						roadSearch: app.widget.api.addressApi.roadSearch,
						//행안부 도로명 주소 검색 api 이용 function
						roadApiSearch: app.widget.api.addressApi.roadApiSearch,
					}
				});
				widget.addressSearchWidget.addTo(map);
				//초기화 버튼 클릭시 주소검색 하이라이트 제거 function 호출하도록 function 연결
				//clearControlWidget.addToClearFunction(addressSearchWidget.clear);
			}
		}
	};

	_oui.spatialAnalysisWidget = () => {
		return {
			build: () => {
				//분석 위젯 
				widget.spatialAnalysisWidget = new oui.SpatialAnalysisWidget({
					odf,
					target: document.querySelector('#spatialAnalysisWidget'),
					options: {
						//바로발행 디폴트값
						publishDirect: false,
						//분석 상세 정보를 표현할 element
						detailTarget: document.querySelector('#spatialAnalysisDetailWidget'),
						//분석 결과 grid를 표출할 element
						gridTarget: document.querySelector('#gridWidget'),
						//특정 분석을 선택했을때 콜백함수
						selectAnalysis: function (param) {
							let analysisGroup = param.analysisGroup;
							let analysisType = param.analysisType;
							let analysisName = param.analysisName;
							let target = document.querySelector('#spatialAnalysisDetailDiv');

							if (!target.classList.contains('active')) {
								target.classList.add('active');
							}
							if (target.classList.contains('hide')) {
								target.classList.remove('hide');
							}

							document.querySelector('#selectedAnalysisName').innerHTML = analysisName;
							document.querySelector('#optionTable').style.display = 'none';
							map.updateSize();
						},
						//그리드 창 열리거나 닫혔을때 처리
						setGrid: function (flag/*true면 열린거, false면 닫힌거*/) {
							map.updateSize();
						},
						//프로그래스 알림
						alertList: {
							startLoadingBar: (message) => {
								callLoadingBar({ message: message, status: true });
							},
							endLoadingBar: (test) => {
								callLoadingBar({ status: false });
							},
							customAlert: (message) => {
								callAlertMessage(message);
							}
						},
					},
					api:
					{
						//발행 관련 api
						selectNotice: app.widget.api.noticeApi.selectNotice,//알림api
						insertLayer: app.widget.api.layerApi.insertLayer,//레이어api
						publishGeojsonLayer: app.widget.api.uploadApi.publishGeojsonLayer,//업로드 api

						//주소 검색 api
						addressSearch: app.widget.api.addressApi.intSearch,
						//단건 행정구역 정보 조회  function
						geometrySearch: app.widget.api.administApi.geometrySearch,
						//시도 목록 조회 function
						ctpvAdministrativeDistrictSearch: app.widget.api.administApi.ctpvAdministrativeDistrictSearch,
						//시군구 목록 조회 function
						sggAdministrativeDistrictSearch: app.widget.api.administApi.sggAdministrativeDistrictSearch,
						//읍면동 목록 조회 function
						emdAdministrativeDistrictSearch: app.widget.api.administApi.emdAdministrativeDistrictSearch,
						//리 목록 조회 function
						liAdministrativeDistrictSearch: app.widget.api.administApi.liAdministrativeDistrictSearch,

						//별칭 및 컬럼 정보 조회
						selectColumn: app.widget.api.columnInfoApi.selectColumn,

						//filter 정보 조회 
						selectFilter: app.widget.api.cqlInfoApi.selectFilter,



						//분석실행
						runAnalysis: (params/*{} */, callback) => {
							//분석 그리드가 열려있는 상태가 아니라면 그리드 위젯 초기화
							if (!document.querySelector('#gridWidget').querySelector('.spatialAnalysisGrid-box')) {
								document.querySelector('#gridWidget').innerHTML = "";
							}

							//분석 api 실행  
							app.widget.api.analysisApi.runAnalysis(params/*{} */, callback);

							//파일 다운로드일 경우에는 그리드 열리지 않음
							if (!['extrc'/*데이터 추출*/, 'connectDestination'/*출발지와 목적지 연결*/, 'findPath'/*경로계획*/].includes(params.analysisType)) {
								$('#spatialAnalysisDetailDiv .btnTocHide').trigger("click");
								if (params.param.direct) {
									document.querySelector('#optionTable').style.display = 'block';
								}
								map.updateSize();
							}
						},
						//좌표변환 관련 api 사용
						convertCoord: (params/*{} */, callback) => {
							//분석 api 실행  
							app.widget.api.coordApi.convertCoord(params/*{} */, callback);
						},
						//특정 레이어 목록 조회
						getLayerList: (params/*{} */, callback) => {

							let layerList = app.widget.tocWidget.getLayerList();
							//toc에서 레이어 리스트 뽑아서 vector레이어이면서 cluster레이어가 아닌 경우 추출

							if (!layerList) {
								callback([]);
								return;
							}

							let vectorLayerList = layerList.filter(layer => {
								if (layer.odfLayerId.includes('vector')) {
									if (layer.linkedLayer.getInitialOption().params.service === 'cluster') {
										return false;
									}
									return true;
								}
							});
							let filteredLayerList;
							//필터링 함수가 정의되어있다면 필터링하여 레이어 반환
							if (params.geometryType) {
								filteredLayerList = vectorLayerList.filter(layer => {
									let geometryType = layer.linkedLayer.getAttributes(['geometry'])[0].geometryType.toLowerCase();
									if (params.geometryType.includes(geometryType)) {
										return true;
									} else {
										return false;
									}
								});
							} else {
								filteredLayerList = vectorLayerList
							}
							let reVal = filteredLayerList.map(layer => {
								return {
									layer: layer.linkedLayer,
									layerId: layer.odfLayerId,
									title: layer.title,
									typeName: layer.linkedLayer.getInitialOption().params.layer,
									geometryType: layer.lyrTySeCode === '1' ? 'point' : layer.lyrTySeCode === '2' ? 'line' : 'polygon',
								};
							})

							callback(reVal);
						},
					}
				});
				widget.spatialAnalysisWidget.addTo(map);
			}
		}
	}

	_oui.geocodingGridWidget = () => {
		let _geoData;
		return {
			setGeoData: function (geoData) {
				_geoData = geoData;
				return this;
			},
			build: () => {
				widget.geocodingGridWidget = new oui.GeocodingGridWidget({
					odf: odf,
					data: _geoData,
					target: document.getElementById("gridWidget"),
					api: {
						selectNotice: app.widget.api.noticeApi.selectNotice,
						insertLayer: app.widget.api.layerApi.insertLayer,
						publishGeojsonLayer: app.widget.api.uploadApi.publishGeojsonLayer,
						//사용자 직접 위치 수정 위치검색
						getAddressFromPoi: app.widget.api.addressApi.getAddressFromPoi
					},
					map: map,
					options: {
						gridHeight: '306px',
						alertList: {
							startLoadingBar: app.widget.process.startLoadingBar,
							endLoadingBar: app.widget.process.endLoadingBar
						}
					}
				});
			}
		}
	};

	_oui.pnuGetterWidget = () => {

		return {
			build: () => {
				//토지이용조회 widget 추가
				widget.pnuGetterWidget = new oui.PNUGetterWidget({
					options: { callback: function () { }, linkUrl: 'http://eum.go.kr/web/ar/lu/luLandDet.jsp?isNoScr=script&mode=search&add=land', },
					api: {
						getAddressFromPoi: app.widget.api.addressApi.getAddressFromPoi,
					},
					target: document.querySelector('#pnuGetterElement')
				});
				widget.pnuGetterWidget.addTo(map);
				document.getElementsByClassName('pnuGetter_searchSpan')[0].innerText = '토지이용'
			}
		}
	};

	_oui.clearControlWidget = () => {

		return {
			build: () => {
				//초기화 위젯

				widget.clearControlWidget = new oui.ClearControlWidget({
					target: document.querySelector('#clearControlWidget')
				});
				widget.clearControlWidget.addTo(map);
			}
		}
	}
})(app);









