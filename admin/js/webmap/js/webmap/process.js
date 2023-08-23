'use strict';

app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.process = app.webmap.process || {};

((app) => {

	let process = app.webmap.process = {};

	// 레이어 상세 조회 (레이어 정보, 썸네일, 공유정보)
	process.lyrView = function () {
		app.cmm.api.layer.getLayerInfo(app.webmap.data.param.lyr).then(function (result) {
			if (result.result == null) {
				app.webmap.components.webLyrModalVue.hide();
				return alert("레이어 정보조회 실패");
			}
			//레이어 정보 조회 
			app.webmap.data.webLyr = result.result
			/*data 값과 일치화 , 대입하면 아래의 값들이 사라져서 vue 랜더링에서 error 발생.*/
			app.webmap.data.webLyr.shareList = []
			app.webmap.data.webLyr.instList = []
			app.webmap.data.webLyr.userList = []
		}).then(function () {
			//레이어 공유정보 조회
			app.webmap.data.param.share.ownerId = app.webmap.data.webLyr.registerId;
			app.webmap.data.param.share.lyrId = app.webmap.data.webLyr.lyrId
			app.cmm.api.layer.lyrShareList(app.webmap.data.param.share).then(function (result) {
				// pblonsipScopeSeCode":"공유범위구분코드 1(기관), 2(주소록), 3(사용자)
				app.webmap.components.webLyrModalVue.$data.shareList = app.webmap.data.webLyr.shareList = result.result
				app.webmap.data.webLyr.instList = app.webmap.data.webLyr.shareList.filter(function (e) {
					return e.pblonsipScopeSeCode == 1
				})
				app.webmap.data.webLyr.userList = app.webmap.data.webLyr.shareList.filter(function (e) {
					return e.pblonsipScopeSeCode == 3
				})
			})
		}).then(function () {
			//레이어 썸네일 조회
			app.cmm.api.layer.thumbnail(app.webmap.data.param.lyr).then(function (result) {
				if (result.result == null) {
					console.log("레이어 썸네일 없음")
				} else {
					app.webmap.components.webLyrModalVue.$data.base64 = app.webmap.data.webLyr.base64 = result.result.base64;
					app.webmap.components.webLyrModalVue.$forceUpdate();
				}
			})
		})

	};

	// 웹맵 수정 (제목, 설명, 썸네일)
	process.webMapDetailUpdate = (param) => {
		param.userId = userId
		app.cmm.api.webmap.update(param)
			.then(res => {
				return app.cmm.api.webmap.view({ userMapId: userMapId, userId: userId })
			})
			.then(res => {
				app.webmap.data.webmapView = { ...app.webmap.data.webmapView, ...res.result }
				app.webmap.data.webmapView.userMapInfo.originImageFileData = app.webmap.data.webmapView.userMapInfo.imageFileData;
			})
			.catch(e => {
				console.log(e);
				callAlert('error', '관리자에게 문의해주세요');
			});
	};

	//썸네일 삭제
	process.webMapDeleteThumbnail = (param) => {
		app.cmm.api.webmap.deleteThumbnail(param)
			.then(res => {
				return app.cmm.api.webmap.view({ userMapId: userMapId, userId: userId })
			})
			.then(res => {
				app.webmap.data.webmapView = { ...app.webmap.data.webmapView, ...res.result }
				app.webmap.data.webmapView.userMapInfo.originImageFileData = app.webmap.data.webmapView.userMapInfo.imageFileData;
			})
			.catch(e => {
				console.log(e);
				callAlert('error', '관리자에게 문의해주세요');
			});
	};

	/* 웹맵 상세 조회 ( 공유까지 ) */
	process.webMapView = async (param) => {
		let webmapView = {};
		app.cmm.api.webmap.view(param)
			.then(res => {
				webmapView = res.result;
				return app.cmm.api.webmap.selectShareList({ userMapId: userMapId })
			})
			.then(res => {
				if (webmapView !== null) {
					app.webmap.data.webmapView.userMapInfo = webmapView.userMapInfo;
					app.webmap.data.webmapView.tocGroup = webmapView.tocGroup;
					let share = res.result
					app.webmap.data.webmapView.shareList = { list: share.list };
					app.webmap.data.webmapView.shareList.userMapShareList = share.list;
					app.webmap.data.webmapView.shareList = { ...app.webmap.data.webmapView.shareList, ...share.pageInfo }
					// pblonsipScopeSeCode":"공유범위구분코드 1(기관), 2(주소록), 3(사용자)
					app.webmap.data.webmapView.shareList.userMapShareUserList = app.webmap.data.webmapView.shareList.userMapShareList.filter(function (e) {
						return e.pblonsipScopeSeCode == 3
					})
					app.webmap.data.webmapView.shareList.userMapShareInstList = app.webmap.data.webmapView.shareList.userMapShareList.filter(function (e) {
						return e.pblonsipScopeSeCode == 1
					})
					//app.webmap.data.webmapView.userMapInfo.originImageFileData = app.webmap.data.webmapView.userMapInfo.imageFileData;
					app.webmap.data.webmapView.lyrList = webmapView.tocGroup.filter(function (e) {
						return e.lyrId != "LR0000000000" //그룹일때 제외.
					});
				} else {
					app.webmap.data.webmapView.userMapInfo = {};
					app.webmap.data.webmapView.tocGroup = [];
					app.webmap.data.webmapView.shareList = res.result;
					//app.webmap.data.webmapView.userMapInfo.originImageFileData = "";
					app.webmap.data.webmapView.lyrList = [];
				}

			})
			.catch(e => {
				console.log(e);
				callAlert('error', '관리자에게 문의해주세요')
			})
		return await app.webmap.data.webmapView;
	}

	/* 웹맵 상세조회 TOC셋팅 및 해당 스코프 이동 웹맵 공유정보 조회*/
	process.webMapDetail = (param) => {
		let webmapView = {};
		$(".tocToggle").removeClass("active").addClass
		app.cmm.api.webmap.view(param)
			.then(res => {
				if (userId == '') {
					app.oui.api.layerApi.changeOption({ userId: res.result.userMapInfo.registerId });
					app.oui.api.columnInfoApi.changeOption({ userId: res.result.userMapInfo.registerId });
				}
				let view = res.result
				app.webmap.data.webmapView = { ...app.webmap.data.webmapView, ...view };
				webmapView = app.webmap.data.webmapView
				$('title').text(webmapToolbarTemplate == 'lxp' ? '[웹맵] ' + app.webmap.data.webmapView.userMapInfo.userMapSj : '[기본지도] ' + app.webmap.data.webmapView.userMapInfo.userMapSj); //타이틀 웹맵명으로 변경
				let userMapInfo = webmapView.userMapInfo
				let tocGroup = webmapView.tocGroup;

				// 레이어 리스트 LR0000000000 (그룹레이어) 제외.
				webmapView.lyrList = tocGroup.filter(function (e) {
					return e.lyrId != "LR0000000000"
				})
				$("#tocNm").text(userMapInfo.userMapSj);
				if (userMapInfo.userMapScopeValue) {
					let userMapScopeValue = JSON.parse(userMapInfo.userMapScopeValue);
					map.getView().setCenter([userMapScopeValue.mapCenter.x, userMapScopeValue.mapCenter.y]);
					map.setZoom(userMapScopeValue.mapCenter.zoom);
					let homeControlOption = {
						center: [userMapScopeValue.mapCenter.x, userMapScopeValue.mapCenter.y],
						zoom: userMapScopeValue.mapCenter.zoom,
					}
					app.oui.homeControlWidget().changeOption(homeControlOption);
					app.oui.process.refineTocContentList(tocGroup)
						.then(res => {
							res.forEach((item, i) => {
								if (item.linkedLayer) {
									//필터정보 있을 경우 필터  후 레이어 추가
									if (item.filter != null) {
										let queryParam = {
											condition: item.filter
											, odfId: item.odfLayerId
										}
										item.linkedLayer.defineQuery(queryParam);
									}
									item.linkedLayer.setMap(map);
									let onOffVal = item.onOffAt == 'Y' ? true : false;
									map.switchLayer(item.linkedLayer.getODFId(), onOffVal);
								}
							})
							app.widget.tocWidget.createContentList(res);

							//TOC켜기.
							if (!$(".tocToggle").hasClass("active") && app.widget.tocWidget) $(".tocToggle .tool").click();
						})
				}
				//웹맵 공유정보
				return app.cmm.api.webmap.selectShareList({ userMapId: userMapId })
			}).
			then(res => {
				let share = res.result
				app.webmap.data.webmapView.shareList.list = share.list;
				app.webmap.data.webmapView.shareList.userMapShareList = share.list;
				app.webmap.data.webmapView.shareList = { ...app.webmap.data.webmapView.shareList, ...share.pageInfo }
				// pblonsipScopeSeCode":"공유범위구분코드 1(기관), 2(주소록), 3(사용자)
				app.webmap.data.webmapView.shareList.userMapShareUserList = app.webmap.data.webmapView.shareList.userMapShareList.filter(function (e) {
					return e.pblonsipScopeSeCode == 3
				})
				app.webmap.data.webmapView.shareList.userMapShareInstList = app.webmap.data.webmapView.shareList.userMapShareList.filter(function (e) {
					return e.pblonsipScopeSeCode == 1
				})
			})
			.catch(e => {
				console.log(e);
				callAlert('error', '관리자에게 문의해주세요')
			})
	}
	/*포탈팀에서 레이어 불러오기 정보를 했을 경우 lyrId를 가지고 TOC에 레이어를 추가.*/
	process.preview = (lyrId) => {
		let param = { lyrId: lyrId };
		//레이어 상세 조회
		app.cmm.api.layer.getLayerInfo(param).catch(e => { throw { error: e.responseJSON } })
			.then(res => {
				let resJson = res.result
				let layerData = {
					...resJson,
					onOffAt: 'Y',
					lyrGroupSeCode: "02"
				}
				return layerData;
			})
			.then(res => {
				//레이어 TOC에 추가
				app.oui.process.refineTocContentList([res]).then((data) => {
					data[0].linkedLayer.setMap(map);
					data[0].linkedLayer.fit();
					app.widget.tocWidget.setContent(data[0]);
				});
				!$('.tocToggle').hasClass('active') && $('.tocToggle > .tool').click();

			})
	}
	process.webmapTocSave = (param) => {
		if (userMapId) {
			let userMap = app.webmap.data.webmapView.userMapInfo
			userMap.userMapScopeValue = app.util.getUserMapScopeValue();
			userMap.userId = userId;
			let tocList = app.widget.tocWidget.getContentList();
			let tocListConvert = app.util.tocListConvert(tocList);
			let param = {}
			param.userMap = userMap;
			tocListConvert.forEach(function (e, i) {
				if (!e.userMapId) tocListConvert[i].userMapId = userMapId;
			})
			param.tocs = tocListConvert;
			if (userMap.hasOwnProperty('originImageFileData')) {
				delete userMap.originImageFileData;
			}
			// 공유정보 추가 필요.
			app.cmm.api.webmap.process(param).then(function (result) {
				userMapId = result.result;
				callAlert('success', '저장이 완료되었습니다.');
			})
		}
		else {
			callAlert('새 웹맵', '새 웹맵을 등록해주세요.');
		}

	}

})(app);

