<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<%@ include file="/WEB-INF/jsp/webmap/include/webMapLink.jspf" %>
		
</head>
<body>
    <!--wrap-->
    <div id="wrap">
   		<div id ="test"></div>
        <!--header-->
        
       	<%@ include file="/WEB-INF/jsp/webmap/header.jsp" %>
        <!--//header-->
        <!--TOC-->
        <%@ include file="/WEB-INF/jsp/webmap/toc.jsp" %>        
        <!--//TOC-->
        <!--TOC-->
        <%@ include file="/WEB-INF/jsp/webmap/spatialAnalysis.jsp" %>        
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
            			<button type="button" class="loginWidgetBtn" id="loginWidgetBtn">
							<span class="hidden">로그인</span>
						</button>
                    </div>
                    <!--//searchArea-->
                    <div class="userInfo">
					    <%@ include file="/WEB-INF/jsp/cmm/components/alarmVue.jsp" %>     
				    </div>
                </div>
                <!--widget-->
				<div id="widget">
					<div class="flex">
						<div class="group active">
							<ul class="dep1">
								<li class="homeWidget" id="homeControlWidget"></li>
								<li class="basemapWidget">
									<button type="button" class="tool" id="baseMapTool">
										<span>배경지도</span>
									</button>
									<ul class="dep2">
										<li>
											<button type="button" class="tool type01" id="eMapBasic">
												<span>기본지도</span>
											</button>
										</li>
										<li>
											<button type="button" class="tool type02" id="eMapAIR">
												<span>영상지도</span>
											</button>
										</li>
										<li>
											<button type="button" class="tool type03" id="eMapWhite">
												<span>백지도</span>
											</button>
										</li>
									</ul>
								</li>
								<li class="divideWidget" style="display: none;">
									<button type="button" class="tool">
										<span>분할지도</span>
									</button>
									<ul class="dep2">
										<li>
											<button type="button" class="tool type01">
												<span>2분할</span>
											</button>
										</li>
										<li>
											<button type="button" class="tool type02">
												<span>3분할가로</span>
											</button>
										</li>
										<li>
											<button type="button" class="tool type03">
												<span>3분할세로</span>
											</button>
										</li>
										<li>
											<button type="button" class="tool type04">
												<span>4분할</span>
											</button>
										</li>
									</ul>
								</li>
								<li class="drawWidget" id="drawWidget">
									
								</li>
								<li class="measureWidget" id="measureWidget">

								</li>
								<li class="resetWidget" id="clearControlWidget"></li>
								<li class="printWidget" id="printWidget">
									
								</li>
								<li class="pnuGetterWidget" id="pnuGetterElement"></li>
							</ul>
							<!-- <div class="btnGroup">
				                <button type="button" class="btnLeft" disabled=""><span class="hidden">이전</span></button>
				                <button type="button" class="btnRight"><span class="hidden">다음</span></button>
				            </div> -->
						</div>
					</div>

					<!--zoom-->
					<div class="zoomWidget">
						<button type="button" class="btnZoom in" id="btnZoomIn">
							<span class="hidden">확대</span>
						</button>
						<div class="sliderArea">
							<div class="slideBar mapStyle"></div>
							<div class="tooltip">
								<!-- <ul>
									<li>읍면동</li>
									<li>시군구</li>
									<li>시도</li>
								</ul> -->
							</div>
						</div>
						<button type="button" class="btnZoom out" id="btnZoomOut">
							<span class="hidden">축소</span>
						</button>
					</div>
					<!--//zoom-->
				</div>
                <!--//widget-->


               <!--location-->
                <div class="location" id="location">
                    <!-- <span>경기도</span>
                    <span>안양시 동안구</span>
                    <span>평촌동</span> -->
                </div>
                <!--//location-->

				<div id="analysLegendWidget">
					<div class="analysLegend_displayDiv">
						<div class="analysLegend_colorDiv">
							<div class="analysLegend_style_div"></div>
							<div class="analysLegend_data_div"></div>
						</div>
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
                </div>
            </div>
            <!--//mapArea-->
            <%@ include file="/WEB-INF/jsp/webmap/optionTable.jsp" %>
        </div>
        <!--//mapContainer-->
    </div>
    <!--//wrap-->


	<!--modal 새 웹맵 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/newWebMapModalVue.jsp" %>
	<!--//modal-->
	
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
	<!-- 그리기 스타일 modal -->
	<%@ include file="/WEB-INF/jsp/webmap/components/drawStyleModalVue.jsp"%>	
	<!-- //modal -->
	
	<!-- modal 필드 계산 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/calculateFieldModalVue.jsp"%>
	<!-- //modal -->
	
	<!-- modal 필드 계산 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/analysisProgressModalVue.jsp"%>
	<!-- //modal -->
	
	<!-- modal 불법 건축물 리스트 -->
	<%@ include file="/WEB-INF/jsp/webmap/components/illgCnstModalVue.jsp" %>
	<!-- //modal -->
	</body>
		
	<script type="text/javascript" defer>
		app.cmm.data.mode = "webmap-detail";
		let param= {};
		param.userMapId  = userMapId
		param.userId  = userId;
		app.webmap.process.webMapDetail(param);
    </script>
		
	
	
	
</html>