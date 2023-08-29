app = window.app || {};
app.oui = app.oui || {};
app.widget = app.widget || {};
((app) => {

	let widget = app.widget || {};
	let _oui = app.oui || {};
	
	//데이터 추가
	_oui.dataAddWidget = () => {
		_target = "#modal-layerUpload";
		return {
			build: () => {
				widget.dataAddWidget = new oui.DataAddWidget({
					target: document.querySelector(_target)
				});
			},
			addTo: () => {
				widget.dataAddWidget.addTo();
			}
		}
	}
	
	//지오코딩
	_oui.geoCodingWidget = () => {
		_target = "#modal-layerUpload";
		return {
			build: () => {
				widget.geoCodingWidget = new oui.GeoCodingWidget({
					target: document.querySelector(_target)
				});
			},
			addTo: () => {
				widget.geoCodingWidget.addTo();
			}
		}
	}
	
	//로그인
	_oui.loginWidget = () => {
		_target = "#loginWidget";
		return {
			build: () => {
				widget.loginWidget = new oui.LoginWidget({
					options: {
					},
					target: document.querySelector(_target)
				})
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
			addTo: (map) => {
				widget.loginWidget.addTo(map);
			},
			remove: function () {
				widget.loginWidget.remove()
			}
		}
	}
	
	// 타임슬라이더
	_oui.timeSliderControlWidget = () => {
		_target = "#timeSliderControlWidget_top";
		return {
			build: () => {
				/* TOC에서 레이어 리스트 가져오기. */
				let option = {}
				let layers;
				layers = (app.widget.tocWidget && app.widget.tocWidget.getLayerList()) || []; // 위젯에서
				// 사용할
				// odf
				// 레이어
				// 객체
				let tocLayerList = []
				layers.forEach((e, i) => {
					if (e.linkedLayer.getInitialOption().params.service == 'wfs') {
						tocLayerList.push({ layer: e.linkedLayer, layerNm: e.title }) // 위젯						
					}
					// 내에서
					// selectbox에서
					// 표출될
					// layerNm
					// 과
					// 사용할
					// layer
					// 객체
					// object
				})
				option.layerList = tocLayerList;
				option.alertList = {
					customAlert: (message) => {
						callAlertMessage(message);
					},
					customErrorAlert: (message) => {
						callAlert('error', message);
					}
				}
				widget.timeSliderControlWidget = new oui.TimeSliderControlWidget({
					options: option,
					target: document.querySelector(_target), // dom element
					// 타겟
				})
				// widget.timeSliderControlWidget.addTo(map);
			},
			setTarget: function (target) { // 동적으로 dom element 타겟 변경시키는 함수
				_target = target;
				return this;
			},
			remove: function () {
				widget.timeSliderControlWidget.remove()
			}
		}
	}

	// 회전/나침반
	_oui.rotationControlWidget = () => {
		_target = "#rotationControlWidget";
		return {
			build: () => {
				widget.rotationControlWidget = new oui.RotationControlWidget({
					target: document.querySelector(_target), // dom element
					// 타겟
				})
				widget.rotationControlWidget.addTo(map);
				let dl = `<dl class="rotationTooltip"> Shift+Alt+드래그 <br/>클릭시 정북 이동 </dl>`; // 툴팁
				// 내용
				$(".rotationControl_rotationControlContent").append(dl);
			},
			setTarget: function (target) { // 동적으로 dom element 타겟 변경시키는 함수
				_target = target;
				return this;
			},
			remove: function () {
				widget.rotationControlWidget.remove()
			}
		}
	}

	// 오버뷰 위젯
	_oui.overViewMapControlWidget = () => {
		_target = "#overViewMapControlWidget";
		_targetOption = "#overViewMapControlWidgetOption"
		return {
			build: () => {
				widget.overViewMapControlWidget = new oui.OverViewMapControlWidget({
					options: { element: document.querySelector(_targetOption) }, // 오버뷰
					// 지도를
					// 생성할
					// element
					// 타겟
					target: document.querySelector(_target), // 오버뷰 widget을
					// 생성할 element
					// 타겟
				});
				widget.overViewMapControlWidget.addTo(map);
			},
			setTarget: function (target) { // 동적으로 dom element 타겟 변경시키는 함수
				_target = target;
				return this;
			},
			setTargetOptioin: function (targetOption) { // 동적으로 dom element 타겟
				// 변경시키는 함수
				_targetOption = targetOption;
				return this;
			},
			remove: function () {
				widget.overViewMapControlWidget.remove()
			}
		}
	}
	// 북마크 위젯
	_oui.bookMarkControlWidget = () => {
		_target = "#bookMarkControlWidget";
		return {
			build: () => {
				// api 통신 시
				// 사용자 id 옵션
				let bookmarkApi = app.oui.api.bookmarkApi;
				widget.bookMarkControlWidget = new oui.BookMarkControlWidget({
					options: {
						closeEventCallback: () => {
							//document.getElementsByClassName('bookMarkControl_bookMarkControlContent')[0].style.display = 'none'
						},
					},
					api: bookmarkApi,
					target: document.querySelector(_target)
				})
				// widget.bookMarkControlWidget.addTo(map);
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
			addTo: (map) => {
				widget.bookMarkControlWidget.addTo(map);
			},
			remove: function () {
				widget.bookMarkControlWidget.remove()
			}
		}
	}
	// 이동컨트롤 위젯
	_oui.moveControlWidget = () => {
		_target = "#moveControlWidget";
		return {
			build: () => {
				widget.moveControlWidget = new oui.MoveControlWidget({
					target: document.querySelector(_target)
				})
				widget.moveControlWidget.addTo(map);
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
			remove: function () {
				widget.moveControlWidget.remove()
			}
		}
	}

	// 전체화면 위젯
	_oui.fullScreenControlWidget = () => {
		_target = "#fullScreenControlWidget";
		return {
			build: () => {
				widget.fullScreenControlWidget = new oui.FullScreenControlWidget({
					target: document.querySelector(_target)
				})
				widget.fullScreenControlWidget.addTo(map);
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
			remove: function () {
				widget.fullScreenControlWidget.remove()
			}
		}
	}


	// 다운로드 위젯
	_oui.downloadControlWidget = () => {
		_target = "#downloadWidget";
		return {
			build: () => {
				widget.downloadControlWidget = new oui.DownloadControlWidget({
					target: document.querySelector(_target),
				});
				widget.downloadControlWidget.addTo(map);
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
			remove: function () {
				widget.downloadControlWidget.remove()
			}

		}
	}
	// 배경지도 위젯
	_oui.basemapWidget = () => {
		return {
			build: () => {
				widget.basemapWidget = new oui.BasemapWidget({
					odf: odf,
					target: document.querySelector('#basemapWidget'),
					api: {
						// 배경지도 조회 api
						getBasemapList: app.oui.api.basemapApi.getBasemapList,
					},
					options: {
						useImage: true,// 이미지 사용여부
						toolboxPosition: 'left',// toolbox 표현 방향
						thema: 'gallary',
						// 사용할 배경지도만 필터링
						// filter: (bcrnMapId/*배경지도id*/) => {
						// let tailNumber = Number(bcrnMapId.substring(10));
						// if (tailNumber >= 2 && tailNumber <= 18) {
						// return true;
						// }
						// return false;
						// },
						alertList: {
							customAlert: (message) => {
								callAlertMessage(message);
							},
							customErrorAlert: (message) => {
								callAlert('error', message);
							}
						},
						proxyObject: {
							proxyURL: "/smt/proxyUrl.jsp",
							proxyParam: "url"
						},
						directClose: true,
					},
					// 사용할 배경지도만 필터링
					// filter: (bcrnMapId) => {
					// let tailNumber = Number(bcrnMapId.substring(10));
					// if (tailNumber >= 2 && tailNumber <= 18) {
					// return true;
					// }
					// return false;
					// }
				});
				widget.basemapWidget.addTo(map);
			},
			remove: () => {
				widget.basemapWidget.remove();
			}
		};
	}

	// 분할지도 위젯
	_oui.divideMapWidget = () => {
		return {
			build: () => {
				widget.divideMapWidget = new oui.DivideMapWidget({
					odf: odf,
					target: document.querySelector('#divideMapWidget'),
					api: {

					},
					options: {
						alertList: {
							customAlert: (message) => {
								callAlertMessage(message); // 메세지 표출 커스텀 함수
							},
							customErrorAlert: (message) => {
								callAlert('error', message); // 메세지 표출 커스텀 함수
							}
						},
						toolboxPosition: 'left', // 툴바위치 옵션
						// 홈 위젯 생성 옵션
						// home: {
						// 	center: [276179.88560667867, 413632.9594010007],
						// 	zoom: 9
						// },
						// scale: {
						// 	options: {
						// 		size: 150,
						// 		scaleInput: true,
						// 	},
						// },
						// toc 위젯 생성 옵션
						toc: {
							groupHeight: 38,
							layerHeight: 38,
							getContentList: () => {
								return app.widget.tocWidget.getContentList(false);
							}
						},
						// 배경지도 위젯 생성 옵션
						basemap: {
							api: {
								// 배경지도 조회 api
								getBasemapList: app.oui.api.basemapApi.getBasemapList,
							},
							options: {
								//								// 사용할 배경지도만 필터링
								//								filter: (bcrnMapId/* 배경지도id */) => {
								//									let tailNumber = Number(bcrnMapId.substring(10));
								//									if (tailNumber >= 2 && tailNumber <= 15) {
								//										return true;
								//									}
								//									return false;
								//								}
								useImage: true,// 이미지 사용여부
								toolboxPosition: 'left',// toolbox 표현 방향
								thema: 'gallary',
								proxyObject: {	//20230419 분할지도 프록시 옵션추가
									proxyURL: "/smt/proxyUrl.jsp",
									proxyParam: "url"
								},
							}

						},
						// 분할지도 생성옵션
						divideMap: {
							// config : {
							// dualMap : {
							// divType : 'horizonal'//'vertical'=>수직분할 /
							// 'horizonal'=>수평분할
							// },
							// threepleMap : {
							// divType : 'complex-04'//'vertical'=>수직분할 /
							// 'horizonal'=>수평분할 //
							// 'complex-01'|'complex-02'|'complex-03'|'complex-04'
							// => 복합형
							// },
							// quadMap : {
							// divType : 'horizonal'//'vertical'=>수직분할 /
							// 'horizonal'=>수평분할 // 'complex' => 복합형
							// },
							// }
						},
						// 분할지도 on/off 상태 변화시 호출되는 콜백
						beforeChangeStatus: (dMapKey, dMapFlag) => {
							// dMapKey =>dualMap(2분할), quadMap(3분할)
							// dMapFlag =>true(on), false(off)
							let displayTarget = document.querySelectorAll('.mapArea #userMenu, .mapArea #widget, .mapArea #location, .mapArea #scaleWidget');

							if (dMapFlag) {
								// 위젯들 비활성화
								displayTarget.forEach(elem => {
									elem.style.display = 'none';
								});
								// toc 비활성화
								document.querySelectorAll('#toc .tocWidget').forEach(elem => {
									if (!elem.classList.contains('hide')) {
										elem.classList.add('hide');
									}
								});
								// toc 열고닫는 버튼 활성화
								document.querySelectorAll('#toc .btnTocHide').forEach(elem => {
									elem.setAttribute('disabled', true);
								});
								// 레이어 상세 닫기
								document.querySelectorAll('#toc #layerDetailDiv').forEach(elem => {
									if (elem.classList.contains('active')) {
										elem.classList.remove('active');
									}
								});
							} else {
								// 위젯들 활성화
								displayTarget.forEach(elem => {
									elem.style.display = '';
								});
								// toc 활성화
								document.querySelectorAll('#toc .tocWidget').forEach(elem => {
									if (elem.classList.contains('hide')) {
										elem.classList.remove('hide');
									}
								});
								// toc 열고닫는 버튼 비활성화
								document.querySelectorAll('#toc .btnTocHide').forEach(elem => {
									elem.removeAttribute('disabled');
								});
							}
						},
					}
				});
				widget.divideMapWidget.addTo(map);
			},
			remove: function () {
				widget.divideMapWidget.remove()
			}
		};
	}

	_oui.zoomControlWidget = () => {
		let _target = '#zoomWidget';
		return {
			build: () => {
				widget.zoomControlWidget = new oui.ZoomControlWidget({
					options: { minZoom: 8, maxZoom: 23 },
					target: document.querySelector(_target)
				});
				widget.zoomControlWidget.addTo(map);
				$('#widget .zoomControl_sliderDiv').hover(function () { $('#widget .tooltip').toggle() });
				$("input").attr("title", "input"); //openwax..
			},
			setTarget: function (target) {
				_target = target
				return this;
			},
			remove: function () {
				widget.zoomControlWidget.remove()
			},
			changeOptions: (options) => {
				widget.zoomControlWidget.changeOptions(options)
			},
		}
	}

	// 홈이동위젯
	_oui.homeControlWidget = () => {
		// default Option
		let _target = '#homeControlWidget';
		let _center = [276179.88560667867, 413632.9594010007];
		let _zoom = 9;
		return {
			setTarget: function (target) {
				_target = target
				return this;
			},
			setCenter: function (center) {
				_center = center;
				return this;
			},
			setZoom: function (zoom) {
				_zoom = zoom;
				return this;
			},
			build: () => {
				widget.homeControlWidget = new oui.HomeControlWidget({
					options: { center: _center, zoom: _zoom },
					target: document.querySelector(_target)
				});
				widget.homeControlWidget.addTo(map);
				document.getElementsByClassName('homeControl_moveHomeSpan')[0].innerText = '홈'
			},
			remove: function () {
				widget.homeControlWidget.remove()
			},
			changeOption: (options) => {
				widget.homeControlWidget.changeOption(options);
			}
		}
	}
	// 현재위치 위젯
	_oui.currentViewControlWidget = () => {
		// default Option
		let _target = '#currentViewControlWidget';
		let _center = [205892.3383966012, 360075.0304862621];
		let _zoom = 18;
		return {
			setTarget: function (target) {
				_target = target
				return this;
			},
			setCenter: function (center) {
				_center = center;
				return this;
			},
			setZoom: function (zoom) {
				_zoom = zoom;
				return this;
			},
			build: () => {
				widget.currentViewControlWidget = new oui.CurrentViewControlWidget({
					options: { center: _center, zoom: _zoom },
					target: document.querySelector(_target)
				});
				widget.currentViewControlWidget.addTo(map);
				document.getElementsByClassName('currentViewControl_moveCurrentViewSpan')[0].innerText = '현재위치'
			},
			remove: function () {
				widget.currentViewControlWidget.remove()
			}
		}
	}
	// 좌표표시위젯
	_oui.mousePositionControlWidget = () => {
		let _target = '#mousePositionControlWidget'
		return {
			build: () => {
				widget.mousePositionControlWidget = new oui.MousePositionControlWidget({
					target: document.querySelector(_target),
				});
				widget.mousePositionControlWidget.addTo(map)
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
			remove: function () {
				widget.mousePositionControlWidget.remove()
			}
		}
	}

	_oui.popupWidget = () => {
		return {
			build: () => {
				widget.popupWidget = new oui.PopupWidget({
					odf: odf
					, api: {
						// 별칭 및 컬럼 정보 조회
						columnInfoFunction: app.oui.api.columnInfoApi.columnInfoFunction,
						// 공통코드조회
						getCommonCode: app.oui.api.commonCodeApi.commonCodeFunction,
						// 상세공통코드 조회 aixos.all
						getAllDetailCode: app.oui.api.commonCodeApi.getAllDetailCode,
						getLayerList: (callback) => {
							callback(app.widget.tocWidget.getLayerList());
						}
					}, options: {
						//  getIsActivateOption: () => {
						//  	//팝업 비활성화할 조건 입력
						//  	return {
						//  		popupDisplay: { isActivateOption: false, condition: [{ layerId: "LR0000035701" }, { layerId: "LR0000035251", title: "[면]제주도_서귀포시_읍면동" }, { jobClCode: "00" }] }
						//  	}
						//  },
						draggable: true,
						setAddInfoHtml: async (popupInfo) => {
							let dipImgInfo = popupInfo.find(item => item.columnNm == 'image_file');
							if (dipImgInfo != undefined && dipImgInfo.attributeValue != '') {
								// q드라이브에서 조회
								// app.cmm.server.file.getDipImgBase64({fileNm :
								// dipImgInfo.attributeValue}).then(res=>{
								// return `<img src=${res}>`;
								// });
								let dipImgBase64 = await app.cmm.server.file.getDipImgBase64({ fileNm: dipImgInfo.attributeValue });
								return `
								<table>
									<colgroup>
										<col style="width:50%;">
										<col style="width:auto;">
									</colgroup>
									<tbody>
										<tr>
											<th>이미지</th>
											<td><img class="dipImg" src=data:image/gif;base64,${dipImgBase64}></td>
										</tr>
									</body>
								</table>`;
							}
						},

						//					      getIsActivateOption : () =>{
						//					       // TODO팝업 비활성화 레이어 설정 옵션
						//					       return {
						//					        popupDisplay : {
						//					         isActivateOption : false, 
						//					         condition : [{layerId: "LR0000034189"}]
						//					        }
						//					       }
						//					      },
					},
					map: map
				});
			},
			remove: function () {
				widget.popupWidget.remove()
			}
		}
	}

	_oui.administrativeDistrictSearchWidget = () => {
		let _target = ".location";
		return {

			setTarget: function (target) {
				_target = target;
				return this;
			},
			build: () => {
				widget.administrativeDistrictSearchWidget = new oui.AdministrativeDistrictSearchWidget({
					odf,
					target: document.querySelector(_target),
					options: {
						useLi: false, // li 사용 여부(default 값 : false)
						useHilight: true,// 하이라이트 레이어 사용 여부
						clearHilightLayerFlagMove: true,// 지도 이동시 하이라이트 레이어
						// 클리어(기본값 false)
						// styleObject: {// 하이라이트 레이어 스타일. 없으면 기본 스타일 적용
						// text: {
						// fill: {
						// color: "#858484ff",
						// },
						// font: "normal bold 16px 굴림",
						// },
						// fill: { color: [255, 255, 255, 0.4] },
						// stroke: { color: [241, 189, 29, 0.82], width: 2 },
						// },
						// 알림옵션
						alertList: {
							// 사용자 정의 알림 메세지 정의
							customAlert: (message) => {
								callAlertMessage(message);
							},
							customErrorAlert: (message) => {
								callAlert('error', message);
							}
						}
					},
					api: {
						// 단건 행정구역 정보 조회 function
						geometrySearch: app.oui.api.administApi.geometrySearch,
						// 행정구역 유형별 정의
						// 시도 목록 조회 function
						ctpvAdministrativeDistrictSearch: app.oui.api.administApi.ctpvAdministrativeDistrictSearch,
						// 시군구 목록 조회 function
						sggAdministrativeDistrictSearch: app.oui.api.administApi.sggAdministrativeDistrictSearch,
						// 읍면동 목록 조회 function
						emdAdministrativeDistrictSearch: app.oui.api.administApi.emdAdministrativeDistrictSearch,
						// 리 목록 조회 function
						liAdministrativeDistrictSearch: app.oui.api.administApi.liAdministrativeDistrictSearch,
						coordSearch: app.oui.api.addressApi.coordSearch,
					}
				});
				widget.administrativeDistrictSearchWidget.addTo(map);
				// 초기화 버튼 클릭시 행정구역 하이라이트 제거 function 호출하도록 function 연결
				// clearControlWidget.addToClearFunction(administrativeDistrictSearchWidget.clear);
			},
			remove: function () {
				widget.administrativeDistrictSearchWidget.remove()
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
						// 지도 이동시 하이라이트 레이어 초기화 활성화(기본값 false)
						// clearHilightLayerFlagMove: true,
						// 지도 이동시 검색결과 날리기 활성화(기본값 false)
						// clearResultFlagMove: true,
						// 알림옵션
						alertList: {
							// 사용자 정의 알림 메세지 정의
							customAlert: (message) => {
								callAlertMessage(message);
							},
							// 사용자 정의 로딩바 시작 function
							startLoadingBar: (message) => {
								callTargetLoadingBar(document.querySelector('#searchAreaWidget>div'), message, true);
							},
							// 사용자 정의 로딩바 종료 function
							endLoadingBar: (message) => {
								callTargetLoadingBar(document.querySelector('#searchAreaWidget'), message, false);
							},
							customErrorAlert: (message) => {
								callAlert('error', message);
							}
						}
					},
					api: {
						// 기초구역번호 검색 function
						basicSearch: app.oui.api.addressApi.basicSearch,
						// 건물명 검색
						bldSearch: app.oui.api.addressApi.bldSearch,
						// 경위도 좌표 검색 function
						coordSearch: app.oui.api.addressApi.coordSearch,
						// 통합검색 function
						intSearch: app.oui.api.addressApi.intSearch,
						// 지번 검색 function
						jibunSearch: app.oui.api.addressApi.jibunSearch,
						// PNU 검색 function
						pnuSearch: app.oui.api.addressApi.pnuSearch,
						// POI 검색 function
						poiSearch: app.oui.api.addressApi.poiSearch,
						// 도로명주소 검색 (주소정제 이용) function
						roadSearch: app.oui.api.addressApi.roadSearch,
						// 행안부 도로명 주소 검색 api 이용 function
						roadApiSearch: app.oui.api.addressApi.roadApiSearch,
					}
				});
				widget.addressSearchWidget.addTo(map);
				// 초기화 버튼 클릭시 주소검색 하이라이트 제거 function 호출하도록 function 연결
				// clearControlWidget.addToClearFunction(addressSearchWidget.clalarmLoadingear);
			},
			remove: function () {
				widget.addressSearchWidget.remove()
			}
		}
	};
	_oui.tocWidget = () => {
		return {
			build: () => {
				let _checkOption = (app.webapp == undefined && viewMode == 'mapGale') || (app.webapp != undefined) ? false : true;
				widget.tocWidget = new oui.TOCWidget({
					odf: odf,
					target: document.querySelector('#tocWidget'),
					api: {
						getGroupId: app.oui.api.tocApi.getGroupId,
					},
					options: {
						maxDepth: 3,
						toc: {
							analsLegend: _checkOption,	//공간분석 범례
							layerUpload: _checkOption,
							addGroup: _checkOption,
							popupSet: _checkOption,
							deleteAll: _checkOption,
							setGroupName: _checkOption,
							setLayerNcm: _checkOption,
							delete: _checkOption,
							// 팝업 x
						},
						//특정레이어 스타일 , popup 등 ,, toc 기능 활성화 및 비활성화 
						//  getIsActivateOption: () => {
						//  	//사용여부
						//  	return {
						//  		styleSet: { isActivateOption: false, condition: [{ jobClCode: "00" }] }
						//  	}
						//  },
						// setContentsElement: (contentInfo) => {
						// 	return contentInfo.lyrClSeCode == '03' ? '<button>허허</button>' : null;
						// },
						callbackUpdateTocInfo: (updateInfo) => {
							console.dir(updateInfo);
						},
						//사용자 임의에 따라 유효성 체크 할수있도록
						validationCheck: {
							layerUpload: () => {
								let _userId = userId; //수정필요 아이디값 받아와야함
								let _mapId = userMapId;
								let _message = "";

								let _validationState = true;
								if (_userId == "") {
									_validationState = false;
									_message = "로그인이 필요합니다.";
								} else if (_mapId == "") {
									_validationState = false;
									_message = "웹맵을 저장해주세요.";
								} else if (app.widget.tocWidget.getLayerList().length >= tocMaxNum) {
									_validationState = false;
									_message = `레이어 목록에 레이어를 ${tocMaxNum}개까지만 추가할 수 있습니다.`;
								}
								// 맵이 저장되어있고 유저 아이디가 있어야 업로드가능
								return { validationState: _validationState, message: _message }
							}
						},
						alertList: {
							customAlert: (message) => {
								// (1)그룹추가시 사용
								callAlertMessage(message);
							},
							customErrorAlert: (message) => {
								callAlert('error', message);
							}
						},
						groupHeight: 55,
						layerHeight: 75,
						// toc 상세 창 영역 지정
						layerDetailTargetElemnet: '#layerDetailWidget',
						// 상세 버튼 클릭시 호출
						setLayerDetail: (flag/*
												 * true=>toc 상세 on, fasle=>toc
												 * 상세 off
												 */, layerInfo) => {
							document.getElementById('layerTile').innerHTML = '';
							
							if (flag) {
								
								//레이어스타일 pop -> 탭화
					    		$('#layerDetailDiv').css({ 'width':'', 'height':'100%', 'left':'', 'top':'', 'position':'relative' });
					    		$('#layerDetailDiv').draggable().draggable('option', 'disabled',true);
					    		$('.layerDetail_tabList > li:eq(1)').show();
								$('#lyrDetailBtn').show();
								$('#layerStyle_mouse').removeClass('clickActive');
								
								if ($('#toc > .toc.dep1').css('left') !== '0px' || $('#toc > .toc.dep1').css('top') !== '0px') {
									let dep1_left = $('#toc > .toc.dep1').css('left');
									let dep1_top = $('#toc > .toc.dep1').css('top');
									$('#toc > .toc.dep1').css({'left':'', 'top':'' });
									$('#toc > .toc').css({'left':dep1_left, 'top':dep1_top });
								}
								
								//toc가 팝업인 경우
								if($('#toc').css('width') == '0px') {
									$('#toc').draggable().draggable('option', 'disabled', false);
									$('#toc > .toc.dep1').draggable().draggable('option', 'disabled', true);
								}
					    		
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
						layerDeleteCallback: () => {
							document.querySelector('#optionTable').style.display = 'none';
							window.setTimeout(function () { map.updateSize() }, '100');
						},
						popup: {
							api: {
								// 팝업정보조회
								selectPopupInfo: app.oui.api.layerApi.selectPopupInfo,
								// 컬럼정보조회 옵션값 변경
								columnInfoOptionChange: app.oui.api.columnInfoApi.changeOption,
								// 별칭 및 컬럼 정보 조회
								columnInfoFunction: app.oui.api.columnInfoApi.columnInfoFunction,
								// 공통코드조회
								getCommonCode: app.oui.api.commonCodeApi.commonCodeFunction,
								// 상세공통코드 조회 aixos.all
								getAllDetailCode: app.oui.api.commonCodeApi.getAllDetailCode
							},
							options: {
								alertList: {
									customAlert: (message) => {
										callAlertMessage(message);
									},
									customErrorAlert: (message) => {
										callAlert('error', message);
									}
								}
							}
						},
						style: {
							options: {
								imageUrl: 'js/oui/images/widget',
								alertList: {
									customAlert: (message) => {
										callAlertMessage(message);
									},
									startLoadingBar: (message) => {
										callLoadingBar({ message, status: true });
									},
									endLoadingBar: (message) => {
										callLoadingBar({ status: false });
									},
									customErrorAlert: (message) => {
										callAlert('error', message);
									}
								},
							},
							// api: userImageApi,
							api: {
								// 사용자정의 이미지 조회 function
								selectSymbol: app.oui.api.layerApi.selectSymbol,
								// 사용자정의 이미지 추가 function
								insertSymbol: app.oui.api.layerApi.insertSymbol,
								// 사용자정의 이미지 삭제 function
								deleteSymbol: app.oui.api.layerApi.deleteSymbol,
								// 별칭 및 컬럼 정보 조회
								selectColumn: app.oui.api.columnInfoApi.selectColumn,
							}
						},
						layerSearch: {
							options: {
								pageSize: 20,
								pageIndex: 1,
								getAddLayerInfo: app.oui.process.getAddLayerInfo, // 추가버튼
								// 클릭한
								// 레이어의
								// 정보,
								removeLayerCallback: ({ layerId }) => {
									// data = {layerId : 'LR000000001'}
									// 레이어가 삭제된후에 실행되는 콜백함수
									// 다른작업이 필요없으면 사용하지 않아도되지만
									// toc갱신 및 지도 재작업이 필요한 경우 여기서 해주어야한다.
									// 0.콘텐츠제거
									app.widget.tocWidget.removeContent([{ type: 'layerId', id: layerId }]);
									// 1.지도에서 제거
									app.widget.tocWidget.getLayerList().forEach(item => {
										if (item.layerId == layerId) {
											map.removeLayer(item.odfLayerId);
										}
									})
								},
								alertList: {
									startLoadingBar: (message) => {
										callTargetLoadingBar(document.querySelector('#modal-layerSearch'), message, true);
									},
									endLoadingBar: (message) => {
										callTargetLoadingBar(document.querySelector('#modal-layerSearch'), message, false);
									},
									customAlert: (message) => {
										callAlertMessage(message);
									},
									customErrorAlert: (message) => {
										callAlert('error', message);
									},
									// 사용자 정의 알림 메세지 정의
									customConfirm: (message, callback) => {
										// 확인창 띄우기
										callConfirm('해당 레이어를 삭제하시겠습니까?', '', function () {
											callback();
										});
									}
								}
							},
							api: {
								getLayerList: app.oui.api.layerApi.getLayerList,
								removeLayer: app.oui.api.layerApi.removeLayer,
								getNavInfo: app.oui.api.getNavInfo,
								getTypeNavList: app.oui.api.layerSearchTypeApi.getLayerSearchTypeList
							}
						},
						layerUpload: {
							options: {
								uploadTypeList: ["shp", "geocoding", "web", "dxf"],  // uploadTypeList
								// 1 : 웹
								// 레이어
								// 업로드 2
								// 파일레이어
								// 업로드 3
								// 엑셀
								// 업로드 4
								// dxf
								// 업로드
								// 1 : 웹
								// 레이어
								// 업로드 2
								// 파일레이어
								// 업로드 3
								// 엑셀
								// 업로드 4
								// dxf
								// 업로드
								// 1 : 웹 레이어 업로드 2
								// 파일레이어 업로드 3 엑셀 업로드
								// defaultUploadType : "shp" //처음 표출할 업로드 화면
								errorCallback: function (message) {
									callLoadingBar({ status: false });
								},
								webLayerOptions: {
									proxyURL: '/smt/proxyUrl.jsp',
									proxyParam: "url"
								},
								alertList: {
									startLoadingBar: (message) => {
										callTargetLoadingBar(document.querySelector('#modal-layerUpload'), message, true);
									},
									endLoadingBar: (message) => {
										callTargetLoadingBar(document.querySelector('#modal-layerUpload'), message, false);
									},
									customAlert: (message) => {
										callAlertMessage(message);
									},
									customErrorAlert: (message, subMessage) => {
										callAlert('error', { message: message, subMessage: subMessage });
									}
								},
								geocodingOptions: {
									//size : {xlsxAndXls : 0.1 , csvAndTxt : 0.2},
									//limitNumber :  {xlsxAndXls : 30 , csvAndTxt : 40},
									async: true
									, targetSrid: mainProjection.split(':')[1]
								},
								shpUploadOptions: {
									//size : {zip : 1},
									//동기 발행 클릭 시 타는 함수
									onClickPublish: function () {
										callLoadingBar({ status: true, message: "레이어를 업로드중입니다" });
									}
								},
								dxfFileUploadOptions: {
									//size : {dxf : 1},
									//동기 발행 클릭 시 타는 함수
									onClickPublish: function () {
										callLoadingBar({ status: true, message: "레이어를 업로드중입니다" });
									}
								}

							},
							api: {
								publishFileLayer: app.oui.api.uploadApi.publishFileLayer,
								geocodingLayer: app.oui.api.geocodingApi.geocodingLayer,
								uploadWebLayer: app.oui.api.layerApi.uploadWebLayer,
								publishDXFFile: app.oui.api.uploadApi.publishDXFFile,
								getCommonCode: app.oui.api.layerUploadCodeApi.getAllDetailCode
							}
						},
						grid: {
							options: {
								gridCallback: function (e) {
									// smt 프로젝트 내에서 처리할 dom event들을 callback으로
									// 받아서 oui 에서 처리
									document.querySelector('#optionTable').style.display = 'block';
									app.widget.geocodingGridWidget && app.widget.geocodingGridWidget.addTo(false);
									document.getElementsByClassName('titOpTable')[0].innerText = e.title;
									window.setTimeout(function () { map.updateSize() }, '100');
								},
								alertList: {
									customAlert: (message) => {
										callAlertMessage(message);
									},
									customErrorAlert: (type, message) => {
										callAlert(type, message);
									},
									startLoadingBar: (message) => {
										callTargetLoadingBar(document.querySelector('#gridWidget'), message, true);
									},
									// 사용자 정의 로딩바 종료 function
									endLoadingBar: (message) => {
										callTargetLoadingBar(document.querySelector('#gridWidget'), message, false);
									},
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
									chart: true, // 차트 위젯 생성여부
									geomSearch: true, // 공간검색 사용여부
									attributeEditor: app.webapp == undefined && viewMode == 'mapGale' ? false : true, // 속성설정
									// 사용여부
									editMode: app.webapp == undefined && viewMode == 'mapGale' ? false : true, // 편집모드
									// 사용여부
									modify: true, // 피쳐편집 사용여부
									filter: true, // 조건식편집기 사용여부
									export: true, // 추출 사용여부
									delete: true, // 피쳐삭제 사용여부
									insert: true, // 피쳐 추가 사용여부
									clear: true, // 초기화 버튼 사용여부
								},
								conditionFilterOption: {
									thema: 'table', // 조건식편집기 thema
								},
								attributeEditorOption: {

								},
								chartOption: {
									// chartCreateMode : 'show',
									// createObject : {
									// title : '차트타이틀',
									// chartType : 'piechart',
									// targetCol : '읍면동',
									// value : 'base_year',
									// targetElement : '',
									// width : '1000px',
									// height : '600px',
									// },
									label: false,
									legend: true,
									legendPosition: 'right',
									//									customColor : {
									//										colorList : [[255,219,219],[255,191,191],[255,159,159],[255,128,128],[255,96,96],[255,64,64],[255,32,32],[255,0,0]],
									//										colorLegend :  [3,24.714285714285715,46.42857142857143,68.14285714285714,89.85714285714286,111.57142857142858,133.2857142857143,155],										
									//									},
									applyCallback: (object) => {
										console.log(object)
									},
									getData: (obj) => {
										console.log(obj)
									}
								},
							},
							api: {// 데이터 조회 (mode에 따라 layer(feature 정보),
								// object(일반 json 정보))
								// 지오서버 데이터 조회
								getData: app.oui.api.mapApi.getData,
								// 지오서버 업로드
								updateData: app.oui.api.mapApi.updateData,
								// 공통코드조회
								getCommonCode: app.oui.api.commonCodeApi.commonCodeFunction,
								// 상세공통코드 조회 aixos.all
								getAllDetailCode: app.oui.api.commonCodeApi.getAllDetailCode,
								// 별칭 및 컬럼 정보 조회
								columnInfoFunction: app.oui.api.columnInfoApi.columnInfoFunction,
								// 컬럼정보조회 옵션값 변경
								columnInfoOptionChange: app.oui.api.columnInfoApi.changeOption,
								// 레이어 다운로드 api
								downloadLayer: app.oui.api.layerDownloadApi.downloadLayer,
								// //cql 정보 조회
								cqlInfoFunction: app.oui.api.cqlInfoApi.cqlInfoFunction,
								// //cql 옵션 변경
								cqlInfoOptionChange: app.oui.api.cqlInfoApi.changeOption,
								// //cql 옵션 조회
								getCqlInfoOption: app.oui.api.cqlInfoApi.getOption,
							},
							target: document.querySelector('#gridWidget'),
						},
					}
				});
				widget.tocWidget.addTo(map);
			},
			getAttributesInfo: () => {
				return widget.tocWidget.getAttributesInfo();
			},
		}
	};

	_oui.featureAttributeFormWidget = () => {
		let _target = "#featureAttributeFormWidget"
		return {
			setTarget: function (target) {
				_target = target;
				return this;
			},
			build: () => {
				widget.featureAttributeFormWidget = new oui.FeatureAttributeFormWidget({
					odf: odf,
					map: map,
					target: document.querySelector(_target),
					options: {
						getIsActivateOption: () => {
							//국가 공간정보 비활성화  jobClCode: "00"
							let _disableLayer = app.widget.tocWidget.getLayerList().filter(item => item.jobClCode == 00).map(item => {
								return { cntntsId: item.cntntsId }
							});
							return {
								//피쳐속성폼 비활성화 isActivateOption : 활성화 여부 , condition : 활성화/비활성화 시킬 조건 (api옵션의 getLayerList에 콜백시키는 layerList 정보에있는 조건으로만 필터시킬 수 있음) 
								featureAttributeForm: { isActivateOption: false, condition: _disableLayer }
							}
						},
						alertList: {
							startLoadingBar: (message) => {
								callTargetLoadingBar(document.querySelector('#featureAttributeFormWidgetDiv'), '피쳐청보를</br>저장 중입니다.', true);
							},
							endLoadingBar: (message) => {
								callTargetLoadingBar(document.querySelector('#featureAttributeFormWidgetDiv'), message, false);
							},
							customAlert: (message) => {
								callAlertMessage(message);
							},
							customErrorAlert: (message) => {
								callAlert('error', message);
							},
							// 사용자 정의 알림 메세지 정의
							customConfirm: (message, callback) => {
								// 확인창 띄우기
								callConfirm(message, '', function () {
									callback();
								});
							}
						},
						callbackRemoveFeature: (feature) => {
							app.widget.featureAttributeFormWidget.remove();
							$("#featureAttributeFormWidgetDiv .popup").hide();
							$('.sampleFrame .toolGroup ul li.featureAttributeFormWidget > .tool').removeClass('active');
							app.webapp.components.sampleFrameVue.OnOffToWidget('featureAttributeFormWidget', 'top')
						},
						callbackSaveFeature: (feature) => {
							app.widget.featureAttributeFormWidget.remove();
							$("#featureAttributeFormWidgetDiv .popup").hide();
							$('.sampleFrame .toolGroup ul li.featureAttributeFormWidget > .tool').removeClass('active');
							app.webapp.components.sampleFrameVue.OnOffToWidget('featureAttributeFormWidget', 'top');
						},
						callbackClickFeature: () => {
							if (app.webapp.components.sampleFrameVue.featureAttributeFormWidget) {
								$("#featureAttributeFormWidgetDiv .popup").show();
								// app.webapp.components.sampleFrameVue.featureAttributeFormWidget
								// = false;
							}
						},
						errorCallback: () => {
							$('.sampleFrame .toolGroup ul li.featureAttributeFormWidget > .tool').removeClass('active');
						}
					},
					api: {
						// 지오서버 데이터 조회
						getData: app.oui.api.mapApi.getData,
						getLayerList: (callback) => {
							let layerList = app.widget.tocWidget.getLayerList().map(item => {
								return {
									linkedLayer: item.linkedLayer,
									layerNm: item.title,
									layerId: item.layerId,
									cntntsId: item.cntntsId
								}
							})
							callback(layerList);
						},
						// 별칭 및 컬럼 정보 조회
						columnInfoFunction: app.oui.api.columnInfoApi.columnInfoFunction,
						// 상세공통코드 조회 aixos.all
						getAllDetailCode: app.oui.api.commonCodeApi.getAllDetailCode,
						// 피쳐 업데이트
						updateData: app.oui.api.mapApi.updateData,
					}
				});
			},
			remove: function () {
				widget.featureAttributeFormWidget.remove()
			}
		}
	}






	_oui.spatialAnalysisWidget = () => {
		let _spatialAnalysis = undefined;
		return {
			build: () => {
				// 분석 위젯
				widget.spatialAnalysisWidget = new oui.SpatialAnalysisWidget({
					odf,
					target: document.querySelector('#spatialAnalysisWidget'),
					options: {
						//동기 발행 클릭 시 타는 함수
						onClickPublish: function () {
							callLoadingBar({ status: true, message: "레이어를 업로드중입니다" });
						},
						// 바로발행 디폴트값
						publishDirect: false,
						// isUse: {
						// publishDirectElement: {
						// ag: false,//데이터 요약분석 - 포인트 집계
						// join: false,//데이터 요약분석 - 조인 피처
						// nrby: false,//데이터 요약분석 - 주변 요약
						// range: false,//데이터 요약분석 - 범위 내 요약
						// center: false,//데이터 요약분석 - 중심 및 분산 요약
						// searchLegacy: false,//위치 찾기 분석 - 기존 위치 찾기
						// searchNew: false,//위치 찾기 분석 - 새 위치 파생 분석
						// searchCenter: false,//위치 찾기 분석 - 중심 찾기
						// searchSimilar: false,//위치 찾기 분석 - 유사한 위치 찾기
						// density: false,//공간 패턴 분석 - 밀도맵
						// hotspot: false,//공간 패턴 분석 - 핫스팟 찾기
						// gatherPoints: false,//공간 패턴 분석 - 군집 찾기
						// searchOutliers: false,//공간 패턴 분석 - 이상치 찾기 분석
						// connectDestination: false,//근접도 분석 - 출발지와 목적지 연결
						// buffer: false,//근접도 분석 - 버퍼 생성
						// drivingArea: false,//근접도 분석 - 운전시간 영역 생성
						// findNearestPoint: false,//근접도 분석 - 최근접 위치 찾기
						// findPath: false,//근접도 분석 - 경로 계획
						// dsslve: false,//데이터 관리 분석 - 경계 디졸브 실행
						// dvsion: false,//데이터 관리 분석 - 공간 분할
						// merge: false,//데이터 관리 분석 - 레이어 병합
						// 'ovrlay/erase': false,//데이터 관리 분석 - 레이어 중첩(지우기)
						// 'ovrlay/intsct': false,//데이터 관리 분석 - 레이어 중첩(교차)
						// 'ovrlay/union': false,//데이터 관리 분석 - 레이어 중첩(유니온)
						// clustering: false,//데이터 관리 분석 - 클러스터링
						// ar: false,//데이터 관리 분석 - 면적 계산
						// lt: false,//데이터 관리 분석 - 길이 계산
						// }
						// },
						// 분석 상세 정보를 표현할 element
						detailTarget: document.querySelector('#spatialAnalysisDetailWidget'),
						// 분석 결과 grid를 표출할 element
						gridTarget: document.querySelector('#gridWidget'),
						isAnalysisType: "",
						// 특정 분석을 선택했을때 콜백함수
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

							document.querySelector('#selectedAnalysisName').innerHTML = app.oui.data.spatialAnalysisWidget[param.analysisGroup].child[analysisType].name;
							document.querySelector('#optionTable').style.display = 'none';
							
							this.isAnalysisType = analysisType;
							
							app.sectionNumbering();
							
							if(["calculateField"].includes(analysisType)) {
								
								setTimeout(function() {
									app.calculateFieldInit();
								}, 1);
								
							}
							
							map.updateSize();
						},
						// 분석 실행 전 호출
						beforeAnalysis: (params) => {

							if(this.publishDirect.checked == false) app.webmap.components.analysisProgressModalVue.show();
							
							// 분석 그리드가 열려있는 상태가 아니라면 그리드 위젯 초기화							
							if (!document.querySelector('#gridWidget').querySelector('.spatialAnalysisGrid-box')) {
								app.widget.tocWidget.removeGrid();
							}
							
						},
						// 분석 완료 후 호출
						afterAnalysis: (params, state/*
														 * true=>분석 성공, false=>
														 * 분석 실패
														 */) => {
							
							if (state === false) {

							} else if (state === true) {
								if (!['extrc'/* 데이터 추출 */, 'connectDestination'/*
																				 * 출발지와
																				 * 목적지
																				 * 연결
																				 */, 'findPath'/* 경로계획 */, 'severalDeparturesFindPath' /* 다중 출발지 경로 분석 */, 'severalDestinationFindPath' /* 다중 목적지 경로 분석 */, 'predictPath' /* 경로 예측 */, 'file',/* 파일좌표변환 */ 'single'/* 단일좌표변환 */].includes(params.analysisType)) {
									$('#spatialAnalysisDetailDiv .btnTocHide').trigger("click");
									if (params.param.direct) {
										document.querySelector('#optionTable').style.display = 'block';
									}
									map.updateSize();
								}
							}
							
							if(this.publishDirect.checked == false) {
								app.webmap.components.analysisProgressModalVue.clearProgressEvent();
								app.webmap.components.analysisProgressModalVue.update(100);
								setTimeout(function(){ app.webmap.components.analysisProgressModalVue.hide(); }, 1000);
							}

						},
						// 그리드 창 열리거나 닫혔을때 처리
						setGrid: function (flag/* true면 열린거, false면 닫힌거 */) {
							map.updateSize();
						},
						// 프로그래스 알림
						alertList: {
							startLoadingBar: (message) => {
								app.webmap.components.analysisProgressModalVue.hide(); // 공간분석 로딩바 숨기기
								callLoadingBar({ message: message, status: true });
							},
							endLoadingBar: (test) => {
								app.webmap.components.analysisProgressModalVue.hide(); // 공간분석 로딩바 숨기기
								callLoadingBar({ status: false });
							},
							customAlert: (message) => {
								app.webmap.components.analysisProgressModalVue.hide(); // 공간분석 로딩바 숨기기
								callAlertMessage(message);
							},
							customErrorAlert: (message) => {
								app.webmap.components.analysisProgressModalVue.hide(); // 공간분석 로딩바 숨기기
								callAlert('error', message);
							}
						},
						// 유효성 검사
						validationCheck: {
							// //바로 발행 권한이 있는지 check function, true 또는 false 반환
							publishDirect: () => {
								let reVal = {
									validationState: true,
									message: '',
								};

								// userMapId가 있는지 check
								if (!userMapId) {
									reVal.validationState = false;
									reVal.message = '바로발행은 webmap이 저장된 상태에서 가능합니다.';
								} else if (app.widget.tocWidget.getLayerList().length >= tocMaxNum) {
									reVal.validationState = false;
									reVal.message = `레이어 목록에 레이어를 ${tocMaxNum}개까지만 추가할 수 있습니다.`;
								}

								return reVal;
							},
						}, spatialAnalysis: _spatialAnalysis
					},
					api:
					{
						// 발행 관련 api
						selectNotice: app.oui.api.noticeApi.selectNotice,// 알림api
						insertLayer: app.oui.api.layerApi.insertLayer,// 레이어api
						publishGeojsonLayer: app.oui.api.uploadApi.publishGeojsonLayer,// 업로드
						// api

						// 주소 검색 api
						addressSearch: app.oui.api.addressApi.intSearch,
						// 단건 행정구역 정보 조회 function
						geometrySearch: app.oui.api.administApi.geometrySearch,
						// 시도 목록 조회 function
						ctpvAdministrativeDistrictSearch: app.oui.api.administApi.ctpvAdministrativeDistrictSearch,
						// 시군구 목록 조회 function
						sggAdministrativeDistrictSearch: app.oui.api.administApi.sggAdministrativeDistrictSearch,
						// 읍면동 목록 조회 function
						emdAdministrativeDistrictSearch: app.oui.api.administApi.emdAdministrativeDistrictSearch,
						// 리 목록 조회 function
						liAdministrativeDistrictSearch: app.oui.api.administApi.liAdministrativeDistrictSearch,


						// 별칭 및 컬럼 정보 조회
						selectColumn: app.oui.api.columnInfoApi.selectColumn,

						// filter 정보 조회(webmapID와 레이어 그룹순번으로 조회 (저장된 값 조회))
						// selectFilter: app.oui.api.cqlInfoApi.selectFilter,
						// filter 정보 조회(TOC에서 조회 (수정중인 현재 WEBMAP에 적용된 정보 조회))
						selectFilter: (params/* {} */, callback) => {

							let layerList = app.widget.tocWidget.getLayerList();

							if (layerList.length <= 0) {
								callback({ flterCndCn: undefined });
								return;
							}

							let filteredLayerList = layerList.filter(layer => layer.layerId === params.lyrId);
							if (filteredLayerList.length > 0) {
								callback({
									flterCndCn: filteredLayerList[0].filter
								});
							}
						},
						// 분석실행
						runAnalysis: app.oui.api.analysisApi.runAnalysis,
						// 좌표변환 관련 api 사용
						convertCoord: app.oui.api.coordApi.convertCoord,
						// //특정 레이어 목록 조회 (webmapid로 조회)
						// getLayerList: app.oui.api.tocApi.getLayerList,
						// 특정 레이어 목록 조회(toc에서 조회)
						getLayerList: (params/* {} */, callback) => {

							try {
								let layerList = app.widget.tocWidget.getLayerList();
								let analysisId = params.analysisId;
								if (layerList.length <= 0) {
									callback([]);
									return;
								}
								// toc에서 레이어 리스트 뽑아서 vector레이어이면서 cluster레이어가 아닌
								// 경우, WEB레이어일 경우 제외
								// 추출
								let resultLayerList = layerList.filter(layer => {
									// 웹 레이어 타입 제외
									if (layer.linkedLayer.getInitialOption().type === 'api') {
										// 또는 이 조건
										// if(layer.lyrClCode==='MPD013' &&
										// layer.lyrClSeCode==='11'){
										return false;
									}
									//클러스터 제외
									if (layer.linkedLayer.getInitialOption().params.service === 'cluster') {
										return false;
										//포인트 내삽의 경우 제외
									}
									if (layer.lyrClCode === 'MPD011' && layer.lyrClSeCode === '15') {
										return false;
									}
									//dxf 그룹발행 레이어 제외
									if (layer.lyrTySeCode == '5') {
										return false;
									}
									//국가공간정보 제외
									//									if (layer.jobClCode === '00') {
									//										return false;
									//									}
									return true;
								});
								let filteredLayerList;
								// 필터링 함수가 정의되어있다면 필터링하여 레이어 반환
								if (params.geometryType) {
									filteredLayerList = resultLayerList.filter(layer => {
										let geometryType = layer.svcTySeCode == 'F' ? layer.linkedLayer.getAttributes(['geometry'])[0].geometryType.toLowerCase() : layer.linkedLayer.getProperties().geometryType.toLowerCase();
										//let geometryType = layer.linkedLayer.getAttributes(['geometry'])[0].geometryType.toLowerCase(); //WMS
										//let geometryType = layer.linkedLayer.getProperties().geometryType.toLowerCase(); //WFS
										if (params.geometryType.includes(geometryType)) {
											return true;
										} else {
											return false;
										}
									});
								} else {
									filteredLayerList = resultLayerList
								}

								let reVal = filteredLayerList.map(layer => {

									return {
										layerId: layer.layerId,
										lyrGroupSn: layer.lyrGroupSn,
										lyrNm: layer.title,
										typeName: layer.linkedLayer.getInitialOption().params.layer,
										geometryType: layer.lyrTySeCode === '1' ? 'point' : layer.lyrTySeCode === '2' ? 'linestring' : 'polygon',
									};
								})
								callback(reVal);
							}
							catch (e) {
								callback(new Error('[API Error] 레이어 목록 조회중 에러가 발생하였습니다.'));
							}
						},
					}
				});
				widget.spatialAnalysisWidget.addTo(map);
			}, setOptions: function (list) {
				// list = [{ type : "spatialAnalysis", value : {as : true , bbb
				// : false}];
				list.forEach(item => {
					if (item.type == 'spatialAnalysis') {
						_spatialAnalysis = item.value;
					}
				});
				return this;
			},
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
						selectNotice: app.oui.api.noticeApi.selectNotice,
						publishGeojsonLayer: app.oui.api.uploadApi.publishGeojsonLayer,
						// 사용자 직접 위치 수정 위치검색
						getAddressFromPoi: app.oui.api.addressApi.getAddressFromPoi
					},
					map: map,
					options: {
						errorCallback: function () {
							callLoadingBar({ status: false });
						},
						//동기 발행 클릭 시 타는 함수
						onClickPublish: function () {
							callLoadingBar({ status: true, message: "레이어를 업로드중입니다" });
						},
						gridHeight: '390px',
						alertList: {
							customErrorAlert: (message) => {
								callAlert('error', message);
							}
						}
					}
				});
			},
			remove: function () {
				widget.geocodingGridWidget.remove()
			}
		}
	};

	_oui.pnuGetterWidget = () => {

		return {
			build: () => {
				// 토지이용조회 widget 추가
				widget.pnuGetterWidget = new oui.PNUGetterWidget({
					options: {
						callback: function () { },
						linkUrl: 'http://eum.go.kr/web/ar/lu/luLandDet.jsp?isNoScr=script&mode=search&add=land',
						// parsePNU : 'test',
					},
					api: {
						getAddressFromPoi: app.oui.api.addressApi.getAddressFromPoi,
					},
					target: document.querySelector('#pnuGetterElement')
				});
				widget.pnuGetterWidget.addTo(map);
				document.getElementsByClassName('pnuGetter_searchSpan')[0].innerText = '토지이용'
			},
			remove: function () {
				widget.pnuGetterWidget.remove()
			}
		}
	};

	// 일필지 조회
	_oui.estateWidget = () => {

		return {
			build: () => {
				// 토지이용조회 widget 추가
				widget.estateWidget = new oui.PNUGetterWidget({
					options: {
						callback: function () { },
						linkUrl: "/portal/estate/getEstateInfoView.do",
						parsePNU: '?pnu',
					},
					api: {
						getAddressFromPoi: app.oui.api.addressApi.getAddressFromPoi,
					},
					target: document.querySelector('#estateWidget')
				});
				widget.estateWidget.addTo(map);
				document.querySelector('#estateWidget .pnuGetter_searchSpan').innerText = '일필지'
			},
			remove: function () {
				widget.estateWidget.remove()
			}
		}
	};

	_oui.clearControlWidget = () => {

		return {
			build: () => {
				// 초기화 위젯

				widget.clearControlWidget = new oui.ClearControlWidget({
					target: document.querySelector('#clearControlWidget')
				});
				widget.clearControlWidget.addTo(map);
			},
			remove: function () {
				widget.clearControlWidget.remove()
			}
		}
	}
	_oui.drawControlWidget = () => {
		return {
			build: () => {
				widget.drawControlWidget = new oui.DrawControlWidget({
					options: {
						rightClickDelete: true,
						callback: function () {
							app.widget.measureControlWidget ? app.widget.measureControlWidget.removeHelpTooltip() : null;
						}
					},
					target: document.querySelector('#drawControlWidget')
				});
				widget.drawControlWidget.addTo(map);
			},
			remove: function () {
				widget.drawControlWidget.remove()
			}
		}
	}

	_oui.measureControlWidget = () => {
		return {
			build: () => {
				widget.measureControlWidget = new oui.MeasureControlWidget({
					options: {
						rightClickDelete: true,
						callback: function () {
							app.widget.drawControlWidget ? app.widget.drawControlWidget.removeToolTip() : null;
						}
					},
					api: {
						getAddressFromPoi: app.oui.api.addressApi.getAddressFromPoi
					},
					target: document.querySelector('#measureControlWidget')
				});
				widget.measureControlWidget.addTo(map);
			},
			remove: function () {
				widget.measureControlWidget.remove()
			}
		}
	}
	_oui.printControlWidget = () => {
		let _target = '#printWidget';
		return {
			build: () => {
				widget.printControlWidget = new oui.PrintControlWidget({

					target: document.querySelector(_target)
				});
				widget.printControlWidget.addTo(map);
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
			remove: function () {
				widget.printControlWidget.remove()
			}
		}
	}

	_oui.scaleControlWidget = () => {
		return {
			build: () => {
				widget.scaleControlWidget = new oui.ScaleControlWidget({
					options: {
						size: 150,
						scaleInput: (viewMode == 'webmap' || viewMode == 'mapGale') ? false : true,
						//scaleInput: true,
						alertList: {
							customAlert: (message) => {
								callAlertMessage(message);
							},
						}
					},
					target: document.querySelector('#scaleWidget')
				});
				widget.scaleControlWidget.addTo(map);
			},
			remove: function () {
				widget.scaleControlWidget.remove()
			}
		}
	}

	_oui.cctvControlWidget = () => {
		return {
			build: () => {
				widget.cctvControlWidget = new oui.CCTVControlWidget({
					options: {
						alertList: {
							customAlert: (message) => {
								callAlertMessage(message);
							},
						},
						callback: (cctvLayer) => {
							let cctvStyle = odf.StyleFactory.produce({
								image: {
									icon: {
										opacity: 1,
										scale: 1,
										src: '/smt/images/widget/CCTV.png',
									}
								}
							});
							cctvLayer.setStyle(cctvStyle);
						},
						directClose: false,
					},
					api: {
						getCCTVData: app.oui.api.cctvApi.getCCTVData,
					},
					target: document.querySelector('#cctvControlWidget')
				})
				widget.cctvControlWidget.addTo(map);
			},
			getCCTVLayer: () => {
				return widget.cctvControlWidget.getCCTVLayer();
			},
			remove: function () {
				widget.cctvControlWidget.remove()
			}
		}
	}

	_oui.swiperControlWidget = () => {
		_target = "#swiperDiv";
		return {
			build: () => {
				let layerList = app.widget.tocWidget.getLayerList().map((element) => {
					return { layerNm: element.title, layer: element.linkedLayer }
				});
				widget.swiperControlWidget = new oui.SwiperControlWidget({
					options: {
						layerList: layerList,
						createCallback: function () {
							viewMode == 'webmap' ? document.getElementById('swiperBorderDiv').style.display = 'block' : '';
							viewMode == 'webmap' ? document.getElementsByClassName('swiperControl_swiperControlContent')[0].style.display = 'none' : ''
							document.querySelectorAll('#toc .tocWidget').forEach(elem => {
								if (!elem.classList.contains('hide')) {
									elem.classList.add('hide');
								}
							});
							map.updateSize()
							document.querySelectorAll('#toc .btnTocHide').forEach(elem => {
								elem.setAttribute('disabled', true);
							});
						},
						removeCallback: function () {
							viewMode == 'webmap' ? document.getElementById('swiperBorderDiv').style.display = 'none' : ''
							document.querySelectorAll('#toc .tocWidget').forEach(elem => {
								if (elem.classList.contains('hide')) {
									elem.classList.remove('hide');
								}
							});
							map.updateSize()
							// toc 열고닫는 버튼 비활성화
							document.querySelectorAll('#toc .btnTocHide').forEach(elem => {
								elem.removeAttribute('disabled');
							});
						},
					},
					api: {
						getBasemapList: app.oui.api.basemapApi.getBasemapList,
					},
					target: document.querySelector(_target)
				});

			},
			addTo: () => {
				widget.swiperControlWidget.addTo(map);
			},
			remove: () => {
				widget.swiperControlWidget.remove();
			},
			setSliderValue: (value) => {
				widget.swiperControlWidget.setSliderValue(value);
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
			remove: function () {
				widget.swiperControlWidget.remove()
			}
		}
	}
	// 차트 위젯 샘플
	_oui.chartWidget = () => {
		let _target = '#chartWidgetArea';
		return {
			build: (data, mode, createObj) => {
				let variableObj = {};
				variableObj = {
					chartCreateMode: mode,
					createObject: { ...createObj },// ,width : "auto"
				};
				widget.chartWidget = new oui.ChartWidget({
					data: data,
					options: {
						...variableObj,
						applyCallback: function (obj) {
							console.log(obj);
							let currentTabSn = app.webapp.components.mainTabModalVue.currentTabInfo.tabSn;
							let templateNm = app.webapp.data.webAppOptions.mapTmplatTyCode;


							app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.forEach((v) => {
								if (v.tabSn == currentTabSn) {
									let newObj = {
										chartChecked: true,
										chartObject: obj,
									}
									v.chartContent = {
										...v.chartContent,
										...newObj
									}
								}
							})
						}
					},
					//					target : $(_target)[0]
					target: document.querySelector(_target),
				});
				widget.chartWidget.addTo(map);
			},
			remove: () => {
				widget.chartWidget.remove();
			},
			getObject: () => {
				return widget.chartWidget.getObject();
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},
		}
	}

	_oui.roadViewWidget = () => {
		let _target = '#roadViewWidget';
		return {
			build: () => {
				widget.roadViewWidget = new oui.RoadViewWidget({
					options: {
						alertList: {
							customAlert: (message) => {
								callAlertMessage(message);
							},
							customErrorAlert: (message) => {
								callAlert('success', message);
							}
						},
					},
					target: document.querySelector(_target)
				})
				widget.roadViewWidget.addTo(map);
			},
			remove: () => {
				widget.roadViewWidget.remove();
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},

		}
	}

	_oui.limsControlWidget = () => {
		let _target = '#limsControlWidget';
		return {
			build: () => {
				widget.limsControlWidget = new oui.LimsControlWidget({
					options: {
						baseUrl: limsBaseUrl,
						airUrl: limsAirUrl,
						projection: mainProjection,
						baseAuthkey: limsBaseAuthKey,
						airAuthkey: limsAirAuthKey,
						alertList: {
							customAlert: (message) => {
								callAlertMessage(message);
							},
							customErrorAlert: (message) => {
								callAlert('success', message);
							}
						},
						proxyObject: {
							proxyURL: "/smt/proxyUrl.jsp",
							proxyParam: "url"
						},
					},
					target: document.querySelector(_target)
				})
				widget.limsControlWidget.addTo(map);
			},
			remove: () => {
				widget.limsControlWidget.remove();
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},

		}
	}

	_oui.lsmdControlWidget = () => {
		let _target = '#lsmdControlWidget';
		return {
			build: () => {
				widget.lsmdControlWidget = new oui.LsmdControlWidget({
					options: {
						type: lsmdType,
						baseUrl: lsmdBaseUrl,
						airUrl: lsmdAirUrl,
						projection: mainProjection,
						baseAuthkey: lsmdBaseAuthKey,
						airAuthkey: lsmdAirAuthKey,
						alertList: {
							customAlert: (message) => {
								callAlertMessage(message);
							},
							customErrorAlert: (message) => {
								callAlert('success', message);
							}
						},
						proxyObject: {
							proxyURL: "/smt/proxyUrl.jsp",
							proxyParam: "url"
						},
					},
					target: document.querySelector(_target)
				})
				widget.lsmdControlWidget.addTo(map);
			},
			remove: () => {
				widget.lsmdControlWidget.remove();
			},
			setTarget: function (target) {
				_target = target;
				return this;
			},

		}
	}
})(app);



