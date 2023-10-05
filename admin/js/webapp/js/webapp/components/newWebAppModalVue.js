app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webmap.components.newWebAppModalVue = new Vue({
		el: "#newWebAppModal",
		data: {
			data: app.webapp.data,
			
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
			$("#newWebAppModal").draggable({
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
				this.$refs.appTitleInput.value = "";
				this.$refs.appCnTextarea.value= "";
				this.imgDelete();
				this.editBox.classObj.active = false;
				this.styleObj.display = "none";
			},

			save: function () {
				callConfirm("새 웹앱만들기", '새로운 웹앱을 추가하시겠습니까?', () => {
					if (this.$refs.appTitleInput.value.trim() === "") {
						callAlert('fail', '제목은 필수입력값입니다.'); // 공통얼랏필요
						return;
					}
					let param = {};
					param.userId= userId
					param.webappTmplatSj = this.$refs.appTitleInput.value;
					param.webappTmplatCn = this.$refs.appCnTextarea.value; 
					param.webappTmplatTyCode  = this.data.webAppOptions.mapTmplatTyCode;
					param.imageFileData = this.$refs.thumImg.currentSrc;;
					param.usePblonsipSeCode = 9; 			// 1(전체공유),5(부분공유),9(비공유))
					param.useSttusSeCode = 1;               // 사용상태 구분 코드 (1(사용), 8, 9)
				    this.data.webAppOptions.detailSetting.mainTab.lyrList= app.webmap.data.webmapView.lyrList
				    
				    if (['STD','QUV','EDT'].includes(this.data.webAppOptions.mapTmplatTyCode)) {//위젯사용하는 템플릿에만 추가
				    	this.data.webAppOptions.detailSetting.widgetTab.toolbar.push('spatialAnalysisWidget');
				    	this.data.webAppOptions.detailSetting.widgetTab.topWidget.push('spatialAnalysisWidget');
				    }
				    
					param.detailSetting = this.data.webAppOptions.detailSetting;
					//app.webapp.components.detailSettingVue.$refs.mainTab.webmap
					app.cmm.api.webapp.insert(param).then(function (result) {
						console.log(result);
						callAlert('success', '저장이 완료되었습니다.');
						let webappTmplatId =result.result 
						let url = `${contextPath}/webapp.do?webappTmplatId=${webappTmplatId}`
						window.location.href = url;
						//app.webmap.components.newWebAppModalVue.hide();
						}
					)
					
				});
			}
		}
	});
})(app);
