app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
((app) => {

	app.webmap.components.webMapSearchModalVue = new Vue({
		el: "#webMapSearchModal",
		data: {
			mode: "", // map or app 구분하여 사용.
			keyword: "",
			currentPageNo: {
				all: "1",
				user: "1",
				share: "1"
			},
			data: app.webmap.data,
			checkWebapp: app.webapp != undefined ? true : false,
			tabBtn: {
				classObj: {
					all: true,
					user: false,
					share: false
				},
			},
			styleObj: {
				display: "none",
			},
			tab: app.webapp == undefined ? "all" : 'user'  // 전체 all , 내 웹맵 :
															// user, 공유 웹맵 :
															// share
		},
		mounted: function () {
			$("#webMapSearchModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
		},
		methods: {
			webappMapView: function (webmap, userMapId) {
				// 1.웹맵 상세정보 셋팅
				app.webmap.process.webMapView({ userId: userId, userMapId: userMapId }).then(res => {
					// 웹맵 넣어주기 detailsetting일경우 넣어 주기.
					// app.webapp.data.webAppOptions.mapTmplatTyCode 표준, 편집, 기본
					// 일경우만
					if (['STD', 'QUV', 'EDT'].includes(app.webapp.data.webAppOptions.mapTmplatTyCode)) {
						app.webapp.components.detailSettingVue.$refs.mainTab.webmap = app.webapp.data.webAppOptions.detailSetting.mainTab.webmap = webmap;
					}
					app.webmap.components.webMapSearchModalVue.hide();

					let param = {};
					param.userMapId = webmap.userMapId;
					param.userId = userId;
					setWebmap(param); // userId, userMapId
				});

			},
			detail: function (index) {
				let webmap = app.webmap.data.webmapList.list[index];
				let userMapId = webmap.userMapId;
				if (this.mode == "app") {
					callConfirm("웹맵 선택", "메인 지도로 이 웹맵을 선택하시겠습니까?", () => {
						if (app.webapp.data.mapTemplate.type != 'SES' && app.webapp.data.mapTemplate.type != 'JOR') {
							this.webappMapView(webmap, userMapId);
						} else {
							// 시리즈 저널형의 경우 바로 지도를 셋팅하지 않음.
							app.webapp.components.mainTabModalVue.setContentValue('map', '', webmap);
						}
					})
				}
				else {
					callConfirm("웹맵 상세", "웹맵 상세보기로 이동하시겠습니까?", () => {
						// url 하나로 통일. webmap.do -> mapId 파라미터 전달. 웹맵 상세조회
						let url = `${contextPath}/webmap.do?mapId=${userMapId}`
						window.location.href = url;
					})
				}

			},
			tabShow: function (tab) {
				this.tabBtn.classObj['all'] = false;
				this.tabBtn.classObj['user'] = false;
				this.tabBtn.classObj['share'] = false;
				this.tabBtn.classObj[tab] = true;
				this.tab = tab;
				this.search(tab);
			},
			show: function (mode) {
				this.mode = mode == undefined ? this.mode : mode;
				this.styleObj.display = "block";
			},
			hide: function () {
				this.styleObj.display = "none";
			},
			remove: function (index) {
				callConfirm("delete", "웹맵을 삭제하시겠습니까?", function () {
					let mapObject = app.webmap.data.webmapList.list[index];
					let param = {}
					param.userMapId = mapObject.userMapId;
					param.userId = mapObject.registerId; // 세션아이디 필요.
					app.cmm.api.webmap.remove(param).then(function (result) {
						app.webmap.components.webMapSearchModalVue.pagination(app.webmap.components.webMapSearchModalVue['currentPageNo'][app.webmap.components.webMapSearchModalVue.tab]);
					})
				});
			},
			pagination: function (page) {
				this['currentPageNo'][this.tab] = page;
				this.search(this.tab);
			},
			shareText: function (usePblonsipSeCode) {
				let result;
				switch (usePblonsipSeCode) { // 1(전체공유),5(부분공유),9(비공유))
					case "1":
						result = "전체공유"
						break;
					case "5":
						result = "부분공유"
						break;
					case "9":
						result = "비공유"
						break;
				}
				return result;
			},
			searchKeyword: function () {
				this.currentPageNo.all = 1
				this.currentPageNo.user = 1
				this.currentPageNo.share = 1
				this.keyword = $("#mapSearchKeyword").val();
				this.search(this.tab);
			},
			search: function (tab) {
				let param = {}
				switch (tab) {
					case "all":
						param.userId = $('#loginUserId').val();
						param.pblonsipRefrnId = $('#loginUserId').val();
						break;
					case "user":
						param.userId = $('#loginUserId').val();
						break;
					case "share":
						param.pblonsipRefrnId = $('#loginUserId').val();
						break;
				}
				param.searchKeyword = this.keyword;
				param.pageIndex = this['currentPageNo'][this.tab]
				param.pageSize = 3;
				app.cmm.api.webmap.search(param).then(function (result) {
					let webmapList = app.webmap.components.webMapSearchModalVue.data.webmapList = result.result
					let paginationInfo = app.webmap.data.paginationInfo.webmapList
					paginationInfo.currentPageNo = app.webmap.components.webMapSearchModalVue.currentPageNo[app.webmap.components.webMapSearchModalVue.tab]; // 현재
					// 페이지번호
					paginationInfo.firstPageNo = 1; 											// 첫번째
					// 페이지번호
					paginationInfo.lastPageNo = webmapList.pageInfo.totalPageIndex; 			// 마지막
					// 페이지번호
					paginationInfo.totalPageCount = webmapList.pageInfo.totalPageIndex; 		// 페이지
					// 총 개수
					app.util.paging(paginationInfo);
					app.webmap.components.webMapSearchModalVue.show()
				})
			},
			activePage: function (page) {
				if (app.webmap.data.paginationInfo.webmapList.currentPageNo == page) return true;
			}
		}

	});

})(app);

function setWebmap(param) {
	// 템플릿 레이아웃 타입 (시리즈/저널형 제외)
	/* 맵 선택시 변경 레이아웃 1번 적용. 미리 선택한 스타일이 있을 경우는 선택한 레이아웃 따라가기. */
	let style = app.webapp.data.webAppOptions.detailSetting.themaTab.style;
	if (!style) {
		style = "style01";
	}
	style = style.charAt(style.length - 1);
	userMapId = param.userMapId;
	app.cmm.api.webmap.view(param)
		.then(res => {
			$('.sampleFrame').show();
			// 웹앱 클래스 생성
			return new Promise(
				function (resolve, reject) {
					app.webapp.process.appInit(userMapId);
					resolve(res);
				}
			)
		})
		.then(res => {
			let webmapView = res.result;
			webmapView = app.webmap.data.webmapView = res.result;
			let userMapInfo = webmapView.userMapInfo
			let tocGroup = webmapView.tocGroup;
			
			let _centerX = '';
			let _centerY = '';
			let _zoom = '';
			if(app.webapp.components.mainTabModalVue.currentTabInfo.tabContent.contentValue.zoom){
				let _cntntsVal = app.webapp.components.mainTabModalVue.currentTabInfo.tabContent.contentValue; 
				let _projectionCenter = map.getProjection().project(_cntntsVal.center, '4326');
				_centerX =_projectionCenter[0];
				_centerY =_projectionCenter[1];
				_zoom = _cntntsVal.zoom;
			}else if(userMapInfo.userMapScopeValue){
				let userMapScopeValue = JSON.parse(userMapInfo.userMapScopeValue);
				_centerX = userMapScopeValue.mapCenter.x;
				_centerY = userMapScopeValue.mapCenter.y;
				_zoom = userMapScopeValue.mapCenter.zoom;
			}
	
			if (userMapInfo.userMapScopeValue) {
				map.getView().setCenter([_centerX, _centerY]);
				map.setZoom(_zoom);
				app.oui.process.refineTocContentList(tocGroup)
					.then(res => {
						res.forEach((item, i, array) => {
							if (item.linkedLayer) {
								// 필터정보 있을 경우 필터 후 레이어 추가
								if (item.filter != null) {
									let queryParam = {
										condition: item.filter
										, odfId: item.odfLayerId
									}
									item.linkedLayer.defineQuery(queryParam);
								}
								item.linkedLayer.setMap(map);
								map.setZIndex(item.odfLayerId, array.length - i);
								let onOffVal = item.onOffAt == 'Y' ? true : false;
								map.switchLayer(item.linkedLayer.getODFId(), onOffVal);
							}
						})
						app.widget.tocWidget && app.widget.tocWidget.createContentList(res);
						if (app.webapp.data.mapTemplate.type != 'SES' && app.webapp.data.mapTemplate.type != 'JOR') {
							$("#tocNm").text(userMapInfo.userMapSj);
							app.webapp.components.layoutTab.methods.layoutBoxClickEvent(`type0${style}`);
							app.cmm.process.setAlarmList(); // 알람첫조회
						}
						map.updateSize();
						
						//레이어스타일 위젯 레이어 클릭이벤트
					    odf.event.addListener(map, 'click', (evt) => {
					    	if ($('#layerStyle_mouse').hasClass('clickActive')) {
					    		let feature = map.selectFeatureOnClick(evt);
					    		if (feature.length > 0) {
					    			let clickODFId = feature[0].layer.getODFId();	//클릭한 피쳐의 레이어 odfId
					    			let nowODFId = $('#layerDetailWidget').find('.contentId').val();	//현재 선택되어 있는 레이어 odfId
					    			if (clickODFId !== nowODFId) {
					    				$('#layerStyle_layerSelect').val(`${clickODFId}`).trigger('change');
					    				$('#layerStyle_mouse').addClass('clickActive');
					    			}
					    		}
					    	}

					    });
					    $("#layerDetailDiv").find('.btnTocClose').attr('id', 'btnTocClose_toc');
					    
						let bLayerList = app.widget.tocWidget.getContentList().filter(function(obj){
						     return obj.odfLayerId !== undefined
						}); 
						let aLayerList = app.widget.tocWidget.getContentList().filter(function(obj){
						     return obj.odfLayerId !== undefined
						}); 
						
						//toc변경감지
						setInterval(function(){
							aLayerList =  app.widget.tocWidget.getContentList().filter(function(obj){
							     return obj.odfLayerId !== undefined
							}); 
							if ($('#layerDetailDiv').css('height') == '600px' && $('#layerDetailDiv').hasClass('active')) {
								
								let compare = true;
								if (aLayerList.length !== bLayerList.length ) {
									compare = false;
								} else {
									for (var i=0; i<bLayerList.length ; i++) {
										if (bLayerList[i].contentId !== aLayerList[i].contentId) {
											compare = false;
											break;
										}
									}
								}
								
								if (!compare) {
									$('#btnTocClose_toc').click();
									$('#layerStyleBtn').click();
								}
							}
							bLayerList = app.widget.tocWidget.getContentList().filter(function(obj){
							     return obj.odfLayerId !== undefined
							}); 
						},1000);
					    
					    //로그인 위젯 이벤트
						$(document).on('click','.login_btn.widgetBtn', function () {
							//로그인 여부 체크
							if ($('#loginUserId').val() !== '') {
								callAlertMessage('이미 로그인 되어 있습니다.');
								return;
							}
							let html = 
								`<div id="modal-loginWidget" class="modal_modal modal_open" style="top: 80px; left: 75%; width: 350px; height: auto; z-index: 99999999;">
									<div>
										<div class="modal_head">
											<span>로그인</span>
											<button class="modal_close" onclick="$('#modal-loginWidget').remove();">
												<span> × </span>
											</button>
										</div>
										<div class="modal_content">
											<form class="toc_groupAddForm" id="mapLoginForm" method="post">
												<input type="hidden" name="returnUrl" value="">
												<div class="toc_addGroupBox">
													<table>
														<tbody>
															<tr>
																<td>
																	<input type="text" placeholder="ID 입력" id="userId" name="userId" onkeyup="javascript:if(event.keyCode==32) {removeSpaceBar()}" class="toc_groupInput">
																</td>
															</tr>
															<tr>
																<td>
																	<input type="password" placeholder="비밀번호 입력" id="userPw" name="userPw" onkeyPress="javascript:if(event.keyCode==13) {getLogin()}" class="toc_groupInput">
																	<input type="hidden" id="userPasswordEncpt" name="userPasswordEncpt" />
																</td>
															</tr>
														</tbody>
													</table>
													<div class="toc_validBox">
														<a type="button" title="회원가입" onclick="mapLoginMenu('join');" style="cursor:pointer;">회원가입</a> 
														<a type="button" title="아이디/비밀번호 찾기" onclick="mapLoginMenu('find');" style="cursor:pointer;">아이디/비밀번호 찾기</a> 
													</div>
													<div class="toc_btnArea">
														<button class="toc_btnAddGroup" value="로그인" onclick="getLogin();">
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>`;
							$('body').append(html);
							$('#modal-loginWidget').draggable();
							
						});
						
					    //레이어탭 닫을 시 레이어상세설정 버튼 클릭으로 닫도록
						$(document).on('click','#btnTocClose_toc', function () {
							let nowODFId = $('#layerDetailWidget').find('.contentId').val();
							let lyrList = app.widget.tocWidget.getContentList().filter(function(obj){
							     return obj.odfLayerId !== undefined
							}); 
							for(let i=0; i < lyrList.length ; i++) {
								if (lyrList[i].odfLayerId == nowODFId) $(`.toc_btnLayerDetail:eq(${i})`).click();
							}
						});
						
						//웹앱 중첩영상 클릭이벤트
						//중첩영상 위젯 button
						$(document).on('click','#overlapBtn', function () {
							app.webmap.components.overlapListModalVue.search();
						})
						
					})
			}
		});
}