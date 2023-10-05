app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
((app) => {
	app.webmap.components.detailInfoTab = {
		name : 'detail-info-tab',
		data : function() {
			return {
				data : app.webmap.data,
				util : app.util,
				classObj : {
					active : true,
				},
				noImgDiv : {
					styleObj : {
						display: "block",
					}
				},
				thumImg : {
					styleObj : {
						display : "block",
					},
				}
			}
		},

		methods : {
			shareText : function(usePblonsipSeCode){
				return app.webmap.components.webLyrModalVue.shareText(usePblonsipSeCode);
			},
			show : function () {
				this.classObj.active = true;
			},
			hide : function () {
				this.classObj.active = false;
			},
		
			editBoxShow : function(mode) {
				const editBox = event.target.nextElementSibling;
				editBox.classList.contains('active') === false ? editBox.classList.add('active') : editBox.classList.remove('active');
				if(mode =="mapSj"){
					$("#userMapSjEditBox").val(this.data.webmapView.userMapInfo.userMapSj);	
				}
				else if(mode=="userMapCn"){
					$("#userMapCnEditBox").val(app.webmap.data.webmapView.userMapInfo.userMapCn);
				}
			},
			
			editBoxHide : function(event) {
				event.target.tagName === "SPAN" ? event.target.parentElement.parentElement.classList.remove('active') : event.target.parentElement.classList.remove('active');
			},
			mouseover : function(){
				$(event.target).removeClass("grey2");
				$(event.target).addClass("black");
			},
			mouseleave : function(){
				$(event.target).removeClass("black");
				$(event.target).addClass("grey2");
			},
			imgUpload : function(e) {
				this.$refs.imgRealUploadBtn.click();
			},
			
			imgToDataURL : function(e) {
				const file = e.target.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					const thumImg = document.querySelector('#webMapDetailThum');
					const tempImg = document.createElement('img');
					tempImg.src = e.target.result;
					tempImg.onload = () => {
						thumImg.src = app.util.imgResize(tempImg, 210, 140);
						thumImg.onload = () => {
							let param =  app.webmap.data.webmapView.userMapInfo;
							param.imageFileData = thumImg.currentSrc;
						}
						
					}
				};
				reader.readAsDataURL(file);
			},
			
			imgCurrentDisplay : function(e) {
				html2canvas(document.querySelector('#map'))
					.then((canvas) => {
						const thumImg = document.querySelector('#webMapDetailThum');
						const tempImg = document.createElement('img');
						tempImg.src = canvas.toDataURL('image/png');
						tempImg.onload = () => {
							thumImg.src = app.util.imgResize(tempImg, 210, 140);
							thumImg.onload = () => {
								let param =  app.webmap.data.webmapView.userMapInfo;
								param.imageFileData = thumImg.currentSrc;
							}
						}

					})
			},
			
			imgDelete : function() {
				document.querySelector('#webMapDetailThum').src = "";
				app.webmap.data.webmapView.userMapInfo.imageFileData = "";
			},
			
			updateUserMapSj : function(event) {
				const editBox = event.target.tagName === "SPAN" ? event.target.parentElement.parentElement : event.target.parentElement;
				const inputBox = editBox.firstElementChild;
				callConfirm("웹맵 제목","웹맵 제목을 수정하시겠습니까?", () => {
					if(inputBox.value.trim()) {
						let param =  app.webmap.data.webmapView.userMapInfo;
						param.userMapSj = inputBox.value;
						param.imageFileData = app.webmap.data.webmapView.userMapInfo.originImageFileData;
						app.webmap.process.webMapDetailUpdate(param);
						editBox.classList.remove('active');
						$('title').text("[웹맵] "+inputBox.value); //타이틀 웹맵명으로 변경
						$('.tocWidget .titToc').text(inputBox.value); //toc 위 웹맵명도 변경
					} else {
						callAlert('fail', '웹맵 제목을 입력하세요');
					}
				});
			},
			
			imgApply : function() {
				callConfirm("썸네일", '썸네일 이미지를 적용하시겠습니까?', (result)=> {
					let param =  app.webmap.data.webmapView.userMapInfo;
					let currentSrc = document.querySelector('#webMapDetailThum').currentSrc;
					if(currentSrc) { //수정
						app.webmap.process.webMapDetailUpdate(param);
					} else { //삭제
						app.webmap.process.webMapDeleteThumbnail(param);
					}
				});
				
			},
			
			imgRevert : function() {
				if(app.webmap.data.webmapView.userMapInfo.originImageFileData) {
					document.querySelector('#webMapDetailThum').src = app.webmap.data.webmapView.userMapInfo.originImageFileData;
					app.webmap.data.webmapView.userMapInfo.imageFileData = app.webmap.data.webmapView.userMapInfo.originImageFileData; 				
				} else {
					document.querySelector('#webMapDetailThum').src = "";
					app.webmap.data.webmapView.userMapInfo.imageFileData = "";
				}
			},
			
			updateUserMapCn : function() {
				const editBox = event.target.tagName === "SPAN" ? event.target.parentElement.parentElement : event.target.parentElement;
				const textArea = editBox.firstElementChild;
				callConfirm("웹맵 내용","웹맵 내용을 수정하시겠습니까?", () => {
					if(textArea.value.trim()) {
						let param =  app.webmap.data.webmapView.userMapInfo;
						param.imageFileData = app.webmap.data.webmapView.userMapInfo.originImageFileData;
						param.userMapCn = textArea.value;
						app.webmap.process.webMapDetailUpdate(param);
						editBox.classList.remove('active');
					} else {
						callAlert('fail', '웹맵 상세를 입력하세요');
					}
				});
			},
		}
	};


})(app);
