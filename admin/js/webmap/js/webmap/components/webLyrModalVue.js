app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
((app) =>{
	app.webmap.components.webLyrModalVue = new Vue({
		el : "#webLyrModal",
		data : {
			data : app.webmap.data,
			util : app.util,
			userMapId : userMapId,
			layerGroupSn : "",
			styleObj : {
				display : "none",
			},
			base64 :"", // 원본 데이터
			tabBtn : {
				classObj : {
					all : true,
					insts:false,
					users:false
				}
			},
			editBox :{
				classObj:{
					ncm : false, //레이어 별칭
					modify : false, //레이어 설명
					thumnail: false
				}
			},
			shareList: app.webmap.data.webLyr.shareList,
			tab : "all" // all : 전체, insts : 기관, users : 사용자
		},
		mounted : function(){
			if(userMapId){
				app.webmap.data.webLyr.tdLength =3;
			}
			$("#webLyrModal").draggable({
				containment:'parent',
				'scroll':false,
				handle: '.head'
			});
		},
		methods : {
			mouseover : function(){
				$(event.target).removeClass("grey2");
				$(event.target).addClass("black");
			},
			mouseleve : function(){
				$(event.target).removeClass("black");
				$(event.target).addClass("grey2");
			},
			download : function(format){
				//콘텐츠 정보 조회
				let _apiContent = app.cmm.api.layer.getContentDetail({
					cntntsId: app.webmap.data.webLyr.cntntsId
				}).responseJSON.result;
				let trgetTypeName =_apiContent.lyrOpertSpcNm + ':' + _apiContent.cntntsId;
				callConfirm("파일 다운로드",'파일을' +format+'형태로 다운로드 받으시겠습니까?',function(){
					//trgetTypeName = 'platform_dev:L100001595';
					let outputFormat = format;
					let type;
					switch (format){ 
					case "shape":
						type = "zip"
						break;
					case "csv":
						type = "csv"
						break;
					case "geojson":
						type = "geojson"
						break;
					}
					let filename = app.util.getTime() + '_' + trgetTypeName + '.' +type;
					let response = fetch(`${API_ANALS}/layer/file/download?crtfckey=${crtfckey}`, {
						method: "post", 
						headers: { "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8"},
						body: `trgetTypeName=${trgetTypeName}&outputFormat=${outputFormat}`}).
						then(function(result){
							if(result.status !=200){
								callAlert('fail','조회결과 존재하지 않습니다.');
							}
							return result.blob();
						}).then(function(blob){
							if (window.navigator && window.navigator.msSaveOrOpenBlob) {
						   		 window.navigator.msSaveOrOpenBlob(blob, filename);
						   		 } 
							else{
								 let a = document.createElement("a");
						   		 document.body.appendChild(a);
						   		 a.style = "display: none";
						   		 let url = window.URL.createObjectURL(blob);
						   		 a.href = url;
						   		 a.download = filename;
						   		 a.click();
								 URL.revokeObjectURL(a.href)
						   		 a.remove();
							}
						}).catch(function(e){
							return callAlert("select","조회 결과가 존재하지 않습니다.");
						})
				}
				)
			},
			modifyShow:function(tab){
				app.webmap.components.webLyrModalVue.editBox.classObj[tab] = true;
				if(tab=='modify'){
					$("#lyrDcEdit").val(app.webmap.components.webLyrModalVue.data.webLyr.lyrDc);
				}
				else if (tab =="ncm"){
					$("#lyrNcmEdit").val(app.webmap.components.webLyrModalVue.data.webLyr.lyrNcm);
				}
			},
			modifyHide : function(tab){
				this.editBox.classObj[tab] = false;
			},
			thumnailToggle : function(){
				this.editBox.classObj.thumnail === true ? this.editBox.classObj.thumnail = false : this.editBox.classObj.thumnail = true;  
			},
			modifyLyrDc : function(){
				callConfirm("레이어 정보","레이어 정보(설명)를 수정하시겠습니까?",function(){
					let param = {};
					param.userId  = $('#loginUserId').val();
					param.lyrId  = app.webmap.data.webLyr.lyrId
					// 'LR0000000039'
					param.lyrDc	= $("#lyrDcEdit").val();
					app.cmm.api.layer.update(param).then(function(result){
						app.webmap.components.webLyrModalVue.modifyHide('modify');
						app.webmap.components.webLyrModalVue.data.webLyr.lyrDc =$("#lyrDcEdit").val(); 
						callAlert('success','레이어 정보를 수정하였습니다.');
					})
				})
			},
			modifyLyrNcm : function(){
				callConfirm("레이어 정보","레이어 정보(별칭)를 수정하시겠습니까?",function(){
					let param = {};
					param.userId   = $('#loginUserId').val();
					param.lyrGroupSn = $(".layerGroupSn").attr("value");
					param.lyrId  = app.webmap.data.webLyr.lyrId
					param.lyrDc	= app.webmap.data.webLyr.lyrDc;
					param.userMapId	= userMapId;
					param.lyrNcm = $("#lyrNcmEdit").val();
					app.cmm.api.layer.update(param).then(function(result){
						app.webmap.components.webLyrModalVue.modifyHide('ncm');
						app.webmap.components.webLyrModalVue.data.webLyr.lyrNcm =$("#lyrNcmEdit").val(); 
						//적용된 별칭을 toc에도 적용
						callAlert('success','레이어 정보를 수정하였습니다.');
						app.widget.tocWidget.updateContent({updateInfo: { title: app.webmap.components.webLyrModalVue.data.webLyr.lyrNcm }, contentInfo: { contentId: $('.contentId').val() }});
					})
				})
			},
			imgUpload : function(e){
				$("#lyrThumnailUploadBtn").click();
			},
			imgToDataURL : function(e){
				const file = e.target.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					const tempImg = document.createElement("img");
					tempImg.src = e.target.result;
					tempImg.onload = () => {
						app.webmap.data.webLyr.base64 = app.util.imgResize(tempImg, 210, 140);
						app.webmap.components.webLyrModalVue.$forceUpdate();
					}
				}
				reader.readAsDataURL(file);
			},
			imgCurrentDisplay : function(){
				html2canvas(document.querySelector('#map'))
				.then((canvas) => {
					const tempImg = document.createElement("img");
					tempImg.src = canvas.toDataURL('image/png');
					tempImg.onload = () => {
					//	console.log("1");
						app.webmap.data.webLyr.base64 = app.util.imgResize(tempImg, 210, 140);
						app.webmap.components.webLyrModalVue.$forceUpdate();
					}
				})
			},
			imgDelete : function(){
				app.webmap.data.webLyr.base64 = null
				app.webmap.components.webLyrModalVue.$forceUpdate();
			},
			imgRecall : function(){
				app.webmap.data.webLyr.base64 =app.webmap.components.webLyrModalVue.$data.base64
				app.webmap.components.webLyrModalVue.$forceUpdate();
			},
			lyrTySeCodeText : function(lyrTySeCode){
				/* 0: 타일(Tif업로드) 1: 포인트 2: 라인 3: 폴리곤 4: GeoTIFF(포인트보간분석) */
					let result;
					switch (lyrTySeCode){ // 1(전체공유),5(부분공유),9(비공유))
					case "0":
						result="타일(Tif업로드)"
						break;
					case "1":
						result = "포인트"
						break;
					case "2":
						result = "라인"
						break;
					case "3":
						result = "폴리곤"
						break;
					case "4":
						result = "GeoTIFF(포인트보간분석)"
						break;
					}
					return result;
				},
			imgApply : function(){
				callConfirm("썸네일","썸네일을 등록하시겠습니까?",function(){
					let param={}
					param.lyrId  = app.webmap.data.webLyr.lyrId
					//thumbnailDelete
					if(app.webmap.data.webLyr.base64){
						param.base64 = app.webmap.data.webLyr.base64;
						app.cmm.api.layer.merge(param).then(function(result){
							app.webmap.components.webLyrModalVue.$data.base64 = app.webmap.data.webLyr.base64 = param.base64	
							app.webmap.components.webLyrModalVue.$forceUpdate();
							callAlert('success','썸네일이 저장되었습니다.');
						})
					}
					else{
						app.cmm.api.layer.thumbnailDelete(param).then(function(result){
							app.webmap.components.webLyrModalVue.$data.base64 = app.webmap.data.webLyr.base64 = param.base64	
							app.webmap.components.webLyrModalVue.$forceUpdate();
							callAlert('success','썸네일이 저장되었습니다.');
						})
					}
				
				})
			},
			show : function () {
				this.styleObj.display = "block";
				this.tab = 'all';
				let layerGroupSn = $(".layerGroupSn").attr("value");
				app.webmap.components.webLyrModalVue.layerGroupSn=layerGroupSn
				if(userMapId && $(".layerGroupSn").attr("value")!=""){
					$("#webLayerModalTd").attr("rowspan",3)
					$("#webLayerModalTd").attr("colspan",3)
				}
				else{
					$("#webLayerModalTd").attr("rowspan",2)
					$("#webLayerModalTd").attr("colspan",2)
				}
				
				
			},
			hide : function () {
				this.styleObj.display = "none";
				app.webmap.components.webLyrModalVue.layerGroupSn = "";
			},
			search : function(lyrId,lyrGroupSn){
				// lyrId = 'LR0000000039'
				app.webmap.data.param.lyr.lyrId = lyrId;
				app.webmap.data.param.share.lyrId = lyrId;
				if(lyrGroupSn){
					app.webmap.data.param.lyr.userMapId = userMapId
					app.webmap.data.param.lyr.lyrGroupSn = lyrGroupSn
					app.webmap.data.param.lyr.userId = userId
				} 
				app.webmap.process.lyrView();
			},
			shareText : function(usePblonsipSeCode){
				// 1(전체공유),5(부분공유),9(비공유)
				return app.webmap.components.webMapSearchModalVue.shareText(usePblonsipSeCode);
			},
			tabShow : function(tab){
				this.tabBtn.classObj['all']=false;
				this.tabBtn.classObj['insts']=false;
				this.tabBtn.classObj['users']=false;
				this.tabBtn.classObj[tab]= true;
				this.tab = tab;
				
				let key
				switch (tab){ 
				case "all":
					key = "shareList"
					break;
				case "insts":
					key = "instList"
					break;
				case "users":
					key = "userList"
					break;
				}
				this.shareList = app.webmap.data.webLyr[key]
				
			},
			shareCnt : function(tab){
				return app.webmap.data.webLyr[tab].length;
			}
		} 
	});
})(app);
