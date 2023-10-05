<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>웹맵</title>
<%@ include file="/WEB-INF/jsp/webmap/include/webMapLink.jspf"%>
</head>
<body>
	<!--wrap-->
	<div id="wrap" class="webmap">
		<!--header-->
		<%@ include file="/WEB-INF/jsp/webmap/header.jsp"%>
		<!--//header-->
		<!--TOC-->
		<%@ include file="/WEB-INF/jsp/webmap/toc.jsp"%>
		<!--//TOC-->
		<!--TOC-->
		<%@ include file="/WEB-INF/jsp/webmap/spatialAnalysis.jsp"%>
		<!--//TOC-->
 
		<!--mapContainer-->
		<div class="mapContainer">
			<!--mapArea-->
			<div class="mapArea">
				<!--map-->
				<div id="map"></div>
				<!--//map-->
				<div id="userMenu">
					<!--searchArea-->
					<div id="searchAreaWidget"></div>
                    <div id="loginWidget">
            			<button type="button" class="loginWidgetBtn login_btn widgetBtn" id="loginWidgetBtn">
							<span class="hidden">로그인</span>
						</button>
                    </div>
					<!--//searchArea-->
					<div class="userInfo">
						<%@ include file="/WEB-INF/jsp/cmm/components/alarmVue.jsp"%>
					</div>
				</div>
				<!--widget-->
				<div id="widget">
					<div class="flex">
						<div class="group active" id="webmapToolGroup1">
							<ul class="dep1">
							
							</ul>
 							<div class="btnGroup">
                				<button type="button" class="btnLeft" disabled=""><span class="hidden">이전</span></button>
                				<button type="button" class="btnRight"><span class="hidden">다음</span></button>
            				</div> 
						</div>
						<div class="group" id="webmapToolGroup2">
							<ul class="dep1">
								
							</ul>
 							<div class="btnGroup">
				               	<button type="button" class="btnLeft"><span class="hidden">이전</span></button>
				               	<button type="button" class="btnRight"><span class="hidden">다음</span></button>
            				</div>
						</div>
						<div class="group" id="webmapToolGroup3">
							<ul class="dep1">
								
							</ul>
 							<div class="btnGroup">
				               	<button type="button" class="btnLeft"><span class="hidden">이전</span></button>
				               	<button type="button" class="btnRight"><span class="hidden">다음</span></button>
            				</div>
						</div>
						<div class="group" id="webmapToolGroup4">
							<ul class="dep1">
								
							</ul>
 							<div class="btnGroup">
				               	<button type="button" class="btnLeft"><span class="hidden">이전</span></button>
				               	<button type="button" class="btnRight"><span class="hidden">다음</span></button>
            				</div>
						</div>
						<div class="group" id="webmapToolGroup5">
							<ul class="dep1">
								
							</ul>
 							<div class="btnGroup">
				               	<button type="button" class="btnLeft"><span class="hidden">이전</span></button>
				               	<button type="button" class="btnRight" disabled=""><span class="hidden">다음</span></button>
            				</div>
						</div>
					</div>

					<!--zoom-->
					<div class="zoomWidget" id="zoomWidget">
						<button type="button" class="btnZoom in" id="btnZoomIn">
							<span class="hidden">확대</span>
						</button>
						<div class="sliderArea">
							<div class="slideBar mapStyle"></div>
						</div>
						<button type="button" class="btnZoom out" id="btnZoomOut">
							<span class="hidden">축소</span>
						</button>
					</div>
					<div class="tooltip">
								<ul>
									<li>읍면동</li>
									<li>시군구</li>
									<li>시도</li>
								</ul>
					</div>
					<!--//zoom-->
				</div>
				<div id="swiperDiv"></div>
				<div id="bookmarkDiv"></div>
				<!--//widget-->

				<div class="location" id="location">
				</div>
				<!-- 융복합 위젯 레이아웃 -->
				<%@ include file="/WEB-INF/jsp/webmap/convergenceWidget.jsp"%>

				<div id="analysLegendWidget">
					<div class="analysLegend_displayDiv">
						<div class="analysLegend_colorDiv">
							<div class="analysLegend_style_div"></div>
							<div class="analysLegend_data_div"></div>
						</div>
					</div>
				</div>
				<!-- 범례 -->
 				<div id="data-show-div">
 					<div class="data-show-div-img">
            			<img id="data-img" src=""> 
            		</div>
            	</div>
				<!--scaleWidget-->
				<div id="scaleWidget">
					
				</div>
				<!--//scaleWidget-->
                <div class="mousePosition-srs-select-div">
            		<select class="mousePosition-srs-select">
            			<option value="3857">EPSG:3857</option><option value="4004">EPSG:4004</option><option value="4019">EPSG:4019</option><option value="4326" selected>EPSG:4326</option><option value="5173">EPSG:5173</option><option value="5174">EPSG:5174</option><option value="5175">EPSG:5175</option><option value="5176">EPSG:5176</option><option value="5177">EPSG:5177</option><option value="5178">EPSG:5178</option><option value="5179">EPSG:5179</option><option value="5180">EPSG:5180</option><option value="5181">EPSG:5181</option><option value="5182">EPSG:5182</option><option value="5183">EPSG:5183</option><option value="5184">EPSG:5184</option><option value="5185">EPSG:5185</option><option value="5186">EPSG:5186</option><option value="5187">EPSG:5187</option><option value="5188">EPSG:5188</option>
            		</select>
            	</div>
                <div class="mousePositionControlWidget" id="mousePositionControlWidget">
                	<div class="mousePosition-srs-select-div">
                		<select> 
                			<option>test</option>
                		</select>
                	</div>
                </div>
				<div id="swiperBorderDiv">
				<button type="button" class="btnResize"><span class="hidden">영역조절</span></button>
				</div>
			</div>
			<!--//mapArea-->
			<%@ include file="/WEB-INF/jsp/webmap/optionTable.jsp"%>
		</div>
		<!--//mapContainer-->
	</div>
	<!--//wrap-->


	<!--modal 새 웹맵 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/newWebMapModalVue.jsp"%>
	<!--//modal-->

	<!-- modal 웹맵 검색 -->
	<%@ include
		file="/WEB-INF/jsp/webmap/components/webMapSearchModalVue.jsp"%>
	<!-- //modal -->

	<!-- modal 중첩영상 리스트 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/overlapListModalVue.jsp" %>
	<!-- //modal -->

	<!-- 레이어 상세보기 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/webLyrModalVue.jsp"%>

	<!-- modal 웹맵 상세 -->
	<%@ include
		file="/WEB-INF/jsp/webmap/components/webMapDetailModalVue.jsp"%>
	<!-- //modal -->
	
	<!-- 그리기 스타일 modal -->
	<%@ include file="/WEB-INF/jsp/webmap/components/drawStyleModalVue.jsp"%>	
	<!-- //modal -->
	
	<!-- modal 필드 계산 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/calculateFieldModalVue.jsp"%>
	<!-- //modal -->
	
	<!-- modal 필드 계산 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/analysisProgressModalVue.jsp"%>
	<!-- //modal -->
	
	<!-- modal 필드 계산 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/geoTiffSearchModalVue.jsp"%>
	<!-- //modal -->
	
	<!-- modal 불법 건축물 리스트 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/illgCnstModalVue.jsp" %>
	<!-- //modal -->
		
</body>
	<script src="<c:url value='/js/crpyto/jsencrypt.min.js'/>"></script>
	<script type="text/javascript">
	let layerId = "${layerId}";
	 $("input").attr("title","input"); //openwax..
	 $("textarea").attr("title","title"); //openwax..
	 $('title').text(webmapToolbarTemplate == 'lxp' ? '웹맵' : '기본지도');
		if(!window.location.port && webmapToolbarTemplate != 'lxp'){
			let scriptElement = document.createElement('script');
			scriptElement.setAttribute('type', 'text/javascript');
			scriptElement.setAttribute('src', `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}`);
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
		if(environmentType == 'dev' && webmapWidgetList.includes('roadView')){
			let scriptElement = document.createElement('script');
			scriptElement.setAttribute('type', 'text/javascript');
			scriptElement.setAttribute('src', `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}`);
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
	//웹맵 상세보기
	if(userMapId){
		app.cmm.data.mode = "webmap-detail";
		let param= {};
		param.userMapId  = userMapId
		param.userId  = userId;
		app.webmap.process.webMapDetail(param);
	}
	//웹맵 기본보기
	else{
		app.cmm.data.mode = "webmap-view";
		//다른 이름으로 저장 안보이게.
		$("#mapDefferSaveBtn").hide();
		//레이어 미리보기
		if(layerId){
			layerId = layerId.substring(1,layerId.length-1);
			layerId = layerId.split(', ');
			layerId.forEach((item,index)=>{
				app.webmap.process.preview(item);
			})
		}
	}
	if(viewMode == 'mapGale'){
		app.webmap.data.viewMode = 'view';
		//맵갤러리에서 사용하지 않을 메뉴 숨기기 (저장, 공유, 알림, 웹맵, 분석)
		this.document.querySelector('#header .webMap').style.display = 'none'; //웹앱
		this.document.querySelector('#header .analysis').style.display = 'none'; //공간분석
		this.document.querySelector('#header .save').style.display = 'none'; //저장
		//this.document.querySelector('#header .share').style.display = 'none'; //공유 [확인필요] 공유 추후에 주석 풀기
		this.document.querySelector('.btnAlarm').style.display = 'none';
	}
	
	/* 로그인 회원가입, 비밀번호찾기 메뉴이동 */
	function mapLoginMenu(menu){
		menu === 'join' ? $("#mapLoginForm").attr("action", "/portal/join/getStplatView.do") : $("#mapLoginForm").attr("action", "/portal/login/getAcntSearchView.do");
		$("#mapLoginForm").submit();
	}
	
	/* 로그인 */
	function getLogin() {
		// ======= 비밀번호 암호화 전송 관련 코드 [START] ======= //
		var publicKeyContent = `${ rsaCrpytoUtil.rawPublicKeyContent }`;
		var encrypt = new JSEncrypt();
		encrypt.setPublicKey(publicKeyContent);
		var encodedString = encrypt.encrypt($("#userPw").val());
		$("#userPasswordEncpt").val(encodedString);
		// ======= 비밀번호 암호화 전송 관련 코드 [END] ======= //
		$("#mapLoginForm").attr("action", "/portal/login/getLogin.do");
		$("input[name=returnUrl]").val(window.location.pathname);
		$("#mapLoginForm").submit();
	};
	//
    </script>
		
</html>