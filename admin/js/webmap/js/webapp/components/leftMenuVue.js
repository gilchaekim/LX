app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.leftMenuVue = new Vue({
		el: "#header",
		data: {
			data: app.webapp.data,
		},

		methods: {
			defferSave: function () {
				app.webmap.components.newWebAppModalVue.show();
			},
			save: function () {
				if (webappTmplatId) {
					callConfirm("앱 템플릿 등록", "앱을 저장하시겠습니까?", () => {
						let webappView = app.webapp.data.webappView
						let param = {};
						param.webappTmplatId = webappTmplatId;
						param.userId = userId;
						param.webappTmplatSj = webappView.webappTmplatSj;
						param.webappTmplatCn = webappView.webappTmplatCn;
						param.webappTmplatTyCode = webappView.webappTmplatTyCode;
						param.imageFileData = webappView.thumbImageFileInfo;
						param.usePblonsipSeCode = webappView.usePblonsipSeCode;			// 1(전체공유),5(부분공유),9(비공유))
						param.useSttusSeCode = webappView.useSttusSeCode;             // 사용상태 구분 코드 (1(사용), 8, 9)
						param.detailSetting = this.data.webAppOptions.detailSetting;
						app.cmm.api.webapp.insert(param).then(function (result) {
							console.log(result);
							callAlert('success', '저장이 완료되었습니다.');

						}
						)
					})
				}
				else {
					app.webmap.components.newWebAppModalVue.show();
				}
			},
			webAppBtnClickEvent: function (id) {
				$(`#${id}`).closest('li').toggleClass('active').siblings('li').removeClass('active');
				$(`#${id}`).closest('.group').siblings('.group').find('li').removeClass('active');
			},

			newWebAppBtnClickEvent: function () {
				callConfirm('새 웹앱', '기존내용을 저장하지않으면 작업중인 내용은 사라집니다. 계속 진행하시겠습니까?', () => {
					//템플릿 선택화면으로 이동
					let url = `${contextPath}/webapp.do`
					window.location.href = url;

				})
				document.querySelector('#webAppBtn').click();
			},

			webAppSearchBtnClickEvent: function () {

//				app.webapp.components.webAppSearchModalVue.show();
				app.webapp.components.webAppSearchModalVue.search(app.webapp.components.webAppSearchModalVue.$data.tab);
				document.querySelector('#webAppBtn').click();

			},

			detailSettingBtnClickEvent: function (id) {
				if (app.webapp.data.webAppOptions.mapTmplatTyCode) {
					$(`#${id}`).closest('li').toggleClass('active').siblings('li').removeClass('active');
					$(`#${id}`).closest('.group').siblings('.group').find('li').removeClass('active');
					if ($(`#${id}`).closest('.detail').hasClass('active')) {
						$('#detailSetting').toggleClass('active');

					} else {
						$('#detailSetting').removeClass('active')
					}
					if(map){
						map.updateSize();						
					}

				} else {
					callAlert('fail', '웹앱을 생성하거나 불러오기 먼저 진행해주세요');
				}

			},

			previewBtnClickEvent: function (id) {
				let newHtml = $('#wrap').html();
				let url = location.origin;
				url = url + "/smt/myWebappPreview.do?webappTmplatId=" + webappTmplatId;
				if (webappTmplatId == '') {
					callAlert('fail', '미리보기를 전에 웹앱을 먼저 저장해주세요')
				} else {
					let width = screen.width * 0.8
					let height = screen.height * 0.8
					let childWindow = window.open(url, '', `width=${width}, height=${height}`);
					childWindow.addEventListener('load', function () {
						this.document.getElementById('header').style.display = 'none'
						this.document.getElementsByClassName('toc dep1 tocWidget')[0].style.display = 'none'
						setTimeout(() => {
							this.document.getElementsByClassName('plusWidget').forEach((e) => {
								e.style.display = 'none'
							})
						}, 100);
					})
				}
			},

			userInfoBtnClickEvent: function (id) {
				$(`#${id}`).closest('li').toggleClass('active').siblings('li').removeClass('active');
				$(`#${id}`).closest('.group').siblings('.group').find('li').removeClass('active');
				$(`#${id}`).siblings().toggle();
			},

			shareBtnClickEvent: function (id, userId) {
				let _check = app.util.checkLogin(userId);
				if (!_check) {
					return;
				}
				if (app.webapp.data.webAppOptions.mapTmplatTyCode) {
					$(`#${id}`).closest('li').toggleClass('active').siblings('li').removeClass('active');
					$(`#${id}`).closest('.group').siblings('.group').find('li').removeClass('active');

					//공유 팝업 
					putCntntsCnrsWebAppViewPop({ webappTmplatId: webappTmplatId, ownrId: userId });
				} else {
					callAlert('fail', '웹앱을 생성하거나 불러오기 먼저 진행해주세요');
				}
			},

			saveBtnClickEvent: function (id) {
				let tmpType = app.webapp.data.webAppOptions.mapTmplatTyCode;

				if (!tmpType) {
					callAlert('fail', '앱을 생성하거나 불러오기 먼저 진행해주세요');
				} else if (((tmpType == 'STD' || tmpType == 'EDT'|| tmpType == 'QUV') && (!app.webapp.data.webAppOptions.detailSetting.mainTab.webmap || !app.webapp.data.webAppOptions.detailSetting.mainTab.webmap.userMapId))
						|| ((tmpType == 'SES' || tmpType == 'JOR') && app.webapp.data.webAppOptions.detailSetting.sectionTab.mainTab.length <= 0)) {
					callAlert('fail', '지도 선택 후 저장 가능합니다.');
				} else {
					$(`#${id}`).closest('li').toggleClass('active').siblings('li').removeClass('active');
					$(`#${id}`).closest('.group').siblings('.group').find('li').removeClass('active');
				}
			},

			basicInfoBtnClickEvent: function (id) {
				if (app.webapp.data.webAppOptions.mapTmplatTyCode) {
					$(`#${id}`).closest('li').toggleClass('active').siblings('li').removeClass('active');
					$(`#${id}`).closest('.group').siblings('.group').find('li').removeClass('active');
					if (app.webapp.components.webAppDetailModalVue.basicInfo) {
						app.webapp.components.webAppDetailModalVue.hide();
					}
					else {
						app.webapp.components.webAppDetailModalVue.show();
						//디비 타기
						let _params = [];
						if (app.webapp.data.webAppOptions.mapTmplatTyCode == 'SES' || app.webapp.data.webAppOptions.mapTmplatTyCode == 'JOR') {
							let _webmapList = this.data.webAppOptions.detailSetting.sectionTab.mainTab.filter(item => item.tabContent.contentType == 'map'); //웹맵 탭중 맵을 사용하고 있는 탭만 필터
							//[{userId : ... , userMapId : ...}]
							_webmapList.forEach(item => {
								_params.push({ userMapId: item.tabContent.contentValue.userMapId, userId: userId });
							})

						} else {
							_params.push({ userMapId: app.webapp.data.webAppOptions.detailSetting.mainTab.webmap.userMapId, userId: userId });
						}
						app.webapp.components.webAppDetailModalVue.$refs.detailInfo.getLayerList(_params);
					}
				} else {
					callAlert('fail', '웹앱을 생성하거나 불러오기 먼저 진행해주세요');
				}
			},
		}
	});
})(app);