<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
<html lang="ko">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>웹앱</title>
		<%@ include file="/WEB-INF/jsp/webapp/include/webAppLink.jspf" %>
	</head>
	

	<body>
		<div id="wrap">
			<%@ include file="/WEB-INF/jsp/webapp/components/leftMenuVue.jsp" %>
				<%@ include file="/WEB-INF/jsp/webapp/components/detailSettingVue.jsp" %>
					<div class="mapContainer">
						<div class="mapArea">
							<%@ include file="/WEB-INF/jsp/webapp/components/newWebAppViewVue.jsp" %>
								<div id="app" style="background:#fafafa;">
									<%@ include file="/WEB-INF/jsp/webapp/components/sampleFrameVue.jsp" %>
								</div>
						</div>
					</div>
		</div>
		<!-- 위젯 리스트 팝업 -->
		<%@ include file="/WEB-INF/jsp/webapp/components/widgetListVue.jsp" %>
		<!-- 분석 리스트 팝업 -->
		<%@ include file="/WEB-INF/jsp/webapp/components/spatialAnalysisWidgetModalVue.jsp" %>
		<!-- 부동산정보 리스트 팝업 -->
		<%@ include file="/WEB-INF/jsp/webapp/components/landInfoWidgetModalVue.jsp" %>
		<!-- modal 웹맵 검색 -->
		<%@ include file="/WEB-INF/jsp/webmap/components/webMapSearchModalVue.jsp" %>
		<!-- //modal -->
		
		<!-- modal 중첩영상 리스트 -->
		<%@ include file="/WEB-INF/jsp/webmap/components/overlapListModalVue.jsp" %>
		<!-- //modal -->
		
		<!-- 레이어 상세보기 -->
		<%@ include file="/WEB-INF/jsp/webmap/components/webLyrModalVue.jsp" %>
	    <!-- modal 웹맵 상세 -->
		<%@ include file="/WEB-INF/jsp/webmap/components/webMapDetailModalVue.jsp" %>
	    <!-- //modal -->
		<!--modal 새 웹맵 -->
		<%@ include file="/WEB-INF/jsp/webmap/components/newWebMapModalVue.jsp" %>
		<!--//modal 메인탭 모달-->
		<%@ include file="/WEB-INF/jsp/webapp/components/mainTabModalVue.jsp" %>
		<!--//modal 태마 텝 모달-->
		<%@ include file="/WEB-INF/jsp/webapp/components/themaTabModalVue.jsp" %>
			<!--//modal 태마 텝 모달-->
		<%@ include file="/WEB-INF/jsp/webapp/components/webAppSearchModalVue.jsp" %>
			<!--//modal 웹앱 저장 모달-->
		<%@ include file="/WEB-INF/jsp/webapp/components/newWebAppModalVue.jsp" %>
		<!--//modal 웹앱 차트 모달-->
		<%@ include file="/WEB-INF/jsp/webapp/components/webAppChartModal.jsp" %>
			<!--modal 웹앱 상세 -->
		<%@ include	file="/WEB-INF/jsp/webapp/components/webAppDetailModalVue.jsp"%>
			<!--//modal -->
		<!--modal 그리기 스타일 -->
		<%@ include	file="/WEB-INF/jsp/webmap/components/drawStyleModalVue.jsp"%>
		<!--//modal -->	
			
		<div id="divPutCntntsCnrsViewPop"></div>
		</body>
		<script type="text/javascript" defer>
			setTimeout(()=>{
				 $("input").attr("title","input"); //openwax..
				 $("textarea").attr("title","title"); //openwax..					
			},200)
			let mode = "app-view"
			let webappTmplatId = "${webappTmplatId}";
			$('title').text(webmapToolbarTemplate == 'lxp' ? '웹앱' : '응용지도');
 			if(!window.location.port && webmapToolbarTemplate != 'lxp'){
				let scriptElement = document.createElement('script');
				scriptElement.setAttribute('type', 'text/javascript');
				scriptElement.setAttribute('src', `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}` );
				document.head.appendChild(scriptElement, document.head.lastChild);
				let scriptElement2 = document.createElement('script');
					scriptElement2.setAttribute('charset', 'UTF-8');
					if(location.protocol.includes('https')){
						scriptElement2.setAttribute('src', 'https://t1.daumcdn.net/mapjsapi/js/main/4.4.3/kakao.js');
					}
					else{
						scriptElement2.setAttribute('src', 'http://t1.daumcdn.net/mapjsapi/js/main/4.4.3/kakao.js');
					}
					document.head.appendChild(scriptElement2, document.head.lastChild);
			} 
			$("#appDefferSaveBtn").hide();
			if(webappTmplatId){
				mode = "app-detail"
				$("#appDefferSaveBtn").show();
				let param= {};
				param.webappTmplatId  = webappTmplatId
				param.userId  = userId;
// 				setTimeout(()=>{
				app.webapp.process.webAppDetail(param);					
// 				},200)
				if(viewMode == 'view'){
					app.webapp.data.viewMode = 'view';
					this.document.getElementById('header').style.display = 'none';
					this.document.getElementsByClassName('toc dep1 tocWidget')[0].style.display = 'none';
					let cnt = 1;
// 			 		let _interval = setInterval(()=>{
// 						//+가 있으면서  
// 						cnt++;
// 						if(this.document.getElementsByClassName('plusWidget')){
// 							this.document.getElementsByClassName('plusWidget').forEach((e)=>{
// 								e.style.display = 'none'});
// 							clearInterval(_interval);
// 						}
// 						if(cnt == 1000){
// 							clearInterval(_interval);
// 						}
// 					},100);  
			  }
			}
		</script>
</html>