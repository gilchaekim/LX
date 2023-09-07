app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
((app) => {
	app.webmap.components.newWebMapModalVue = new Vue({
		el: "#newWebMapModal",
		data: {
			styleObj: {
				display: "none",
			},
			editBox: {
				classObj: {
					active: false,
				},
			},
			uploadBtn: {
				classObj: {
					black: false,
					grey2: true,
				},
			},
			currentDisplayBtn: {
				classObj: {
					black: false,
					grey2: true,
				},
			},
			deleteBtn: {
				classObj: {
					black: false,
					grey2: true,
				},
			},
			noImgDiv: {
				styleObj: {
					display: "block",
				}
			},
			thumImg: {
				styleObj: {
					display: "none",
				},
			}
		},
		mounted: function () {
			$("#newWebMapModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
		},
		methods: {
			editBoxShowAndHide: function (e) {
				this.editBox.classObj.active === true ? this.editBox.classObj.active = false : this.editBox.classObj.active = true;
			},

			imgUpload: function (e) {
				this.$refs.imgRealUploadBtn.click();
			},

			imgToDataURL: function (e) {
				const file = e.target.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					const thumImg = this.$refs.thumImg;
					const tempImg = document.createElement('img');
					tempImg.src = e.target.result;
					tempImg.onload = () => {
						thumImg.src = app.util.imgResize(tempImg, 210, 140);
					}
					this.noImgDiv.styleObj.display = "none";
					this.thumImg.styleObj.display = "block";
				};
				reader.readAsDataURL(file);
			},

			imgCurrentDisplay: function (e) {
				html2canvas(document.querySelector('#map'))
					.then((canvas) => {
						const thumImg = this.$refs.thumImg;
						const tempImg = document.createElement('img');
						tempImg.src = canvas.toDataURL('image/png');
						tempImg.onload = () => {
							thumImg.src = app.util.imgResize(tempImg, 210, 140);
						}
						this.thumImg.styleObj.display = "block";
						this.noImgDiv.styleObj.display = "none";
					})
			},

			imgDelete: function () {
				this.$refs.thumImg.src = "";
				this.thumImg.styleObj.display = "none";
				this.noImgDiv.styleObj.display = "block";
			},

			uploadBtnMouseOver: function () {
				this.uploadBtn.classObj.black = true;
				this.uploadBtn.classObj.grey2 = false;
			},

			uploadBtnMouseLeave: function () {
				this.uploadBtn.classObj.black = false;
				this.uploadBtn.classObj.grey2 = true;
			},

			currentDisplayBtnMouseOver: function () {
				this.currentDisplayBtn.classObj.black = true;
				this.currentDisplayBtn.classObj.grey2 = false;
			},

			currentDisplayBtnMouseLeave: function () {
				this.currentDisplayBtn.classObj.black = false;
				this.currentDisplayBtn.classObj.grey2 = true;
			},

			deleteBtnMouseOver: function () {
				this.deleteBtn.classObj.black = true;
				this.deleteBtn.classObj.grey2 = false;
			},

			deleteBtnMouseLeave: function () {
				this.deleteBtn.classObj.black = false;
				this.deleteBtn.classObj.grey2 = true;
			},

			show: function () {
				this.styleObj.display = "block";
			},

			hide: function () {
				this.$refs.mapTitleInput.value = "";
				this.$refs.mapCnTextarea.value = "";
				this.imgDelete();
				this.editBox.classObj.active = false;
				this.styleObj.display = "none";
			},

			save: function () {
				callConfirm("새 웹맵만들기", '새로운 웹맵을 추가하시겠습니까? 새로운 웹맵 페이지로 이동합니다.', () => {
					if (app.webmap.components.newWebMapModalVue.$refs.mapTitleInput.value.trim() === "") {
						callAlert('fail', '제목은 필수입력값입니다.'); // 공통얼랏필요
						return;
					}
					let userMap = {
						useSttusSeCode: 1, 	// 사용상태 구분 코드 (1(사용), 8, 9)
						usePblonsipSeCode: 9, // 사용공유 구분코드(예: //
						// 1(전체공유),5(부분공유),9(비공유))
						userMapSj: this.$refs.mapTitleInput.value, // 맵이름
						userMapCn: this.$refs.mapCnTextarea.value, // 맵설명
						userMapNcm: this.$refs.mapCnTextarea.value, // 맵설명,
						imageFileData: this.$refs.thumImg.currentSrc, // 썸네일 이미지
						userMapScopeValue: app.util.getUserMapScopeValue(),
						userId: userId,
						userMapId: null
					}
					let tocList = app.widget.tocWidget.getContentList();
					let tocListConvert = app.util.tocListConvert(tocList);

					let param = {};
					param.userMap = userMap
					param.tocs = tocListConvert;
					// 공유정보 추가 필요.
					app.cmm.api.webmap.process(param).then(function (result) {
					//	console.log(result);
						userMapId = result.result;
						callAlert('success', '저장이 완료되었습니다.');
						app.webmap.components.newWebMapModalVue.hide();
						//url 하나로 통일. webmap.do -> mapId 파라미터 전달. 웹맵 상세조회
						//웹앱 저장위젯을 사용한 경우 
						if (app.webapp != undefined) {
							userMap.userMapId = userMapId;
							setWebMapDetail(userMap, userMapId);

						} else {
							let url = `${contextPath}/webmap.do?mapId=${userMapId}`
							window.location.href = url;
						}
					});
				});
			}
		}
	});
})(app);


	// //1.웹맵 상세정보 셋팅 
	// app.webmap.process.webMapView({ userId: userId, userMapId: userMapId });

	// app.webapp.components.detailSettingVue.$refs.mainTab.webmap = userMap;
	// app.webmap.components.webMapSearchModalVue.hide();
	// //템플릿 레이아웃 타입
	// /*맵 선택시 변경 레이아웃 1번 적용. 미리 선택한 스타일이 있을 경우는 선택한 레이아웃 따라가기.*/
	// if (!app.webapp.data.webAppOptions.detailSetting.themaTab.style) {
	// 	app.webapp.data.webAppOptions.detailSetting.themaTab.style = "style01";
	// }

	// let param = {};
	// param.userMapId = userMapId
	// //%%%%%%%%%%%%%%%%
	// // userMapId = param.userMapId;
	// param.userId = "lxuser";
	// app.cmm.api.webmap.view(param)
	// 	.then(res => {
	// 		$('.sampleFrame').show();
	// 		// 웹앱 클래스 생성
	// 		return new Promise(
	// 			function (resolve, reject) {
	// 				app.webapp.process.appInit(userMapId);
	// 				resolve(res);
	// 			}
	// 		);
	// 	})
	// 	.then(res => {
	// 		let webmapView = res.result;
	// 		webmapView = app.webmap.data.webmapView = res.result;
	// 		let userMapInfo = webmapView.userMapInfo
	// 		let tocGroup = webmapView.tocGroup;
	// 		if (userMapInfo.userMapScopeValue) {
	// 			let userMapScopeValue = JSON.parse(userMapInfo.userMapScopeValue);
	// 			map.getView().setCenter([userMapScopeValue.mapCenter.x, userMapScopeValue.mapCenter.y]);
	// 			map.setZoom(userMapScopeValue.mapCenter.zoom);
	// 			app.oui.process.refineTocContentList(tocGroup)
	// 				.then(res => {
	// 					res.forEach((item, i) => {
	// 						if (item.linkedLayer) {
	// 							//필터정보 있을 경우 필터  후 레이어 추가
	// 							if (item.filter != null) {
	// 								let queryParam = {
	// 									condition: item.filter
	// 									, odfId: item.odfLayerId
	// 								}
	// 								item.linkedLayer.defineQuery(queryParam);
	// 							}
	// 							item.linkedLayer.setMap(map);
	// 							let onOffVal = item.onOffAt == 'Y' ? true : false;
	// 							map.switchLayer(item.linkedLayer.getODFId(), onOffVal);
	// 						}
	// 					})
	// 					let style = app.webapp.data.webAppOptions.detailSetting.themaTab.style;
	// 					style = style.charAt(style.length - 1)
	// 					app.widget.tocWidget.createContentList(res);
	// 					$("#tocNm").text(userMapInfo.userMapSj);
	// 					app.webapp.components.layoutTab.methods.layoutBoxClickEvent(`type0${style}`);
	// 					app.cmm.process.setAlarmList(); // 알람첫조회
	// 					map.updateSize();
	// 				})
	// 		}
	// 	});