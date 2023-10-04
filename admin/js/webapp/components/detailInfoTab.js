app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.detailInfoTab = {
		name : 'detail-info-tab',
		data : function() {
			return {
				data : app.webapp.data,
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
				},
				webmapInfoList : [] //[{userMapId : '' , tocGroup : '' , active : 'active' } , ... ]
			}
		},

		methods : {
			//현재 보여줄 레이어 가져오기
			getCurrentLayerList : function(){
				let _layerInfoList = this.webmapInfoList.find(item=>{
					return item.active == "active"
				}).tocGroup;
				return _layerInfoList				
			},
			//상세정보 클릭시 타는 함수 (웹앱 관련된 웹맵 레이어 정보 조회)
			getLayerList : function(data){
				//[{userId : ... , userMapId : ...}]
				
				//1.맵정보만 필터
				//let _webmapList = data.filter(item=>item.tabContent.contentType == 'map'); //웹맵 탭중 맵을 사용하고 있는 탭만 필터
				let _webmapInfoList = this.webmapInfoList;
				//맵 아이디 toc 정보 매칭
				//[{userMapId : '' , tocGroup : '' , active : 'active' } , ... ]
				//data는 시리즈 저널형 콘텐츠 리스트
				Promise.all(data.map(content => {
					//[수정필요] 아이디 받아오기
					return app.cmm.api.webmap.view({userMapId : content.userMapId , userId : content.userId});	
				})).then(response => {
					response.forEach((item, idx)=>{
						_webmapInfoList.push({
					        userMapId : item.result.userMapInfo.userMapId,
					        tocGroup : item.result.tocGroup,
					        active : idx == 0 ? "active" : ''
					    });
					})
				})	
			},
			//탭 클릭시 타는 함수
			onClickLayerTab : function(item){
				//item => 해당 탭의 컨텐츠 정보
				//클릭한 탭(맵)의 정보로 webmapInfoList의 active 바꿔주기
				this.webmapInfoList = this.webmapInfoList.map(webmapInfo=>{
					if(webmapInfo.userMapId == item.tabContent.contentValue.userMapId){
						webmapInfo.active = "active";
					}else{
						webmapInfo.active = "";						
					}
					return webmapInfo;
				})
				
			},
			//레이어 탭 사용여부 체크 
			useLayerTab : function(){
				//data는 시리즈 저널형 콘텐츠 리스트
				return (this.data.webAppOptions.mapTmplatTyCode == 'SES' || this.data.webAppOptions.mapTmplatTyCode == 'JOR') 
					&& this.webmapInfoList.length > 0&& this.data.webAppOptions.detailSetting.sectionTab.mainTab.filter(item=>item.tabContent.contentType == 'map').length > 0   ? true : false;
			},
			//레이어 탭 중, 활성화시킬 탭 인지 여부 체크
			isActiveTab : function(item){
				//item == 해당 탭(웸맵) 콘텐츠 정보 (웹맵은 무엇인지, 탭제목, 탭내용 등 이있음) 
				//활성화 시킬 레이어 탭 찾기 
				let _webmap = this.webmapInfoList.find(webmapInfo=>{
					return webmapInfo.active == "active"; 
				})
				return item.tabContent.contentValue.userMapId == _webmap.userMapId ? 'active' : ""
			},
			//레이어 탭 설정
			setLayerTab : function(){
				return this.data.webAppOptions.detailSetting.sectionTab.mainTab.filter(item=>item.tabContent.contentType == 'map');
			},
			shareText : function(usePblonsipSeCode){
				return 1;
				//return app.webmap.components.webLyrModalVue.shareText(usePblonsipSeCode);
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
				if(mode =="webappTmplatSj"){
					$("#userAppSjEditBox").val(this.data.webappView.webappTmplatSj);	
				}
				else if(mode=="webappTmplatCn"){
					$("#userAppTmplatCnBox").val(this.data.webappView.webappTmplatCn);
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
					const thumImg = document.querySelector('#webappDetailThum');
					const tempImg = document.createElement('img');
					tempImg.src = e.target.result;
					tempImg.onload = () => {
						thumImg.src = app.util.imgResize(tempImg, 210, 140);
						thumImg.onload = () => {
							$("#webappDetailThum").attr("src",thumImg.currentSrc);
//							let param =  app.webapp.data.webappView;
//							param.thumbImageFileInfo = thumImg.currentSrc;
						}
						
					}
				};
				reader.readAsDataURL(file);
			},
			
			imgCurrentDisplay : function(e) {
				html2canvas(document.querySelector('#map'))
					.then((canvas) => {
						const thumImg = document.querySelector('#webappDetailThum');
						const tempImg = document.createElement('img');
						tempImg.src = canvas.toDataURL('image/png');
						tempImg.onload = () => {
							thumImg.src = app.util.imgResize(tempImg, 210, 140);
							thumImg.onload = () => {
//								$("#webappDetailThum").attr("src",thumImg.currentSrc);
								app.webapp.data.webappView.thumbImageFileInfo = thumImg.currentSrc;
//								let param =  app.webapp.data.webappView;
//								param.thumbImageFileInfo = 
							}
						}

					})
			},
			
			imgDelete : function() {
				document.querySelector('#webappDetailThum').src = "";
				app.webapp.data.webappView.thumbImageFileInfo = "";
			},
			updateTmplatSj : function(event) {
				const editBox = event.target.tagName === "SPAN" ? event.target.parentElement.parentElement : event.target.parentElement;
				const inputBox = editBox.firstElementChild;
				callConfirm("웹앱 제목","웹앱 제목을 수정하시겠습니까?", () => {
					if(inputBox.value.trim()) {
							let param =  app.webapp.data.webappView
							param.userId = param.registerId;
							param.webappTmplatSj = inputBox.value;
							app.cmm.api.webapp.insert(param)
							editBox.classList.remove('active');
					 } else {
							callAlert('fail', '웹앱 상세를 입력하세요');
						}
					
				});
			},
			imgApply : function() {
				callConfirm("썸네일", '썸네일 이미지를 적용하시겠습니까?', (result)=> {
					let param =  app.webapp.data.webappView
					let currentSrc = document.querySelector('#webappDetailThum').currentSrc;
					param.userId = param.registerId;
					param.imageFileData = currentSrc
					app.cmm.api.webapp.insert(param)
//					if(currentSrc) { //수정
//						app.cmm.api.webapp.insert(param)
//					} else { //삭제
//						app.webmap.process.webMapDeleteThumbnail(param);
//					}
				});
				
			},
			
			imgRevert : function() {
				if(app.webapp.data.webappView.thumbImageFileInfo) {
					document.querySelector('#webappDetailThum').src = app.webapp.data.webappView.thumbImageFileInfo
					//app.webmap.data.webmapView.userMapInfo.imageFileData = app.webmap.data.webmapView.userMapInfo.originImageFileData; 				
				} else {
					document.querySelector('#webappDetailThum').src = "";
					app.webapp.data.webappView.thumbImageFileInfo = "";
				}
			},
			
			updateTmplatCn : function() {
				const editBox = event.target.tagName === "SPAN" ? event.target.parentElement.parentElement : event.target.parentElement;
				const textArea = editBox.firstElementChild;
				callConfirm("웹앱 내용","웹앱 내용을 수정하시겠습니까?", () => {
					if(textArea.value.trim()) {
						let param =  app.webapp.data.webappView
						param.userId = param.registerId;
						param.webappTmplatCn = textArea.value;
						app.cmm.api.webapp.insert(param)
						editBox.classList.remove('active');
					} else {
						callAlert('fail', '웹앱 상세를 입력하세요');
					}
				});
			},
		}
	};


})(app);
