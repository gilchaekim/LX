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


				<!--location-->
				<div class="location" id="location">
					<!-- <span>경기도</span>
                    <span>안양시 동안구</span>
                    <span>평촌동</span> -->
				</div>
				<!--//location-->
				<div class="location" style="
				position: absolute;
    			right: 625px;
    			top: 67px;
				height: 38px;
				display: flex;
				background-color: #fff;
				box-shadow: 0.5px 0.9px 4px 0 rgba(0, 0, 0, 0.27);
				border-radius: 3px;
				width: 0px;
				">
					
					<div class="cont" >
						<div class="inner" style="padding: 10px; background-color: white; border-radius: 3px; width: 527px; display:none;" id="cvgWidget1">
							<div class="tabContWrap type03">
								<div class="tabNav">
									<ul class="tabList cvgMenu01">
										<li data-menu-id="cvg_01" class="">인덱스</li>
										<li data-menu-id="cvg_02"class="">행정구역</li>
										<li data-menu-id="cvg_03"class="">도형</li>
									</ul>
								</div>
							</div>

							<div class="tabContWrap type03" style="margin-top:10px; display: none;" id="cvg_01">
								<div class="tabNav">
									<ul class="tabList cvgMenu02">
										<li data-menu-id="1" class="">1:1,000</li>
										<li data-menu-id="2" class="">1:5,000</li>
										<li data-menu-id="3" class="">1:25,000</li>
										<li data-menu-id="4" class="">1:50,000</li>
										<li data-menu-id="5" class="">1:250,000</li>
									</ul>
								</div>
							</div>
							<!-- 데이터 조회해오는 js 는 oui꺼 못쓰고 회원가입시 지역선택 함수 참조해서 써야할듯-->
							<div class="selectAdministrativeDistrict_frame spatialAnalysis_flex" style="margin-top:10px; display: none;" id="cvg_02">
								<select id="customCtpv" class="ctpv spatialAnalysis_selectAdministrativeDistrict_select  spatialAnalysis_hasTooltip" data-required="false" data-name="시군구 선택">
									<option value="">시도 선택</option></select>
								</select>
								<select id="customSgg" class="sgg spatialAnalysis_selectAdministrativeDistrict_select  spatialAnalysis_hasTooltip" data-required="false" data-name="읍면동 선택">
									<option value="">시군구 선택</option>
								</select>
								<select id="customEmd" class="emd spatialAnalysis_selectAdministrativeDistrict_select  spatialAnalysis_hasTooltip" data-required="false" data-name="리 선택">
									<option value="">읍면동 선택</option></select>
							</div>

							<div class="tabContWrap type03" style="margin-top:10px; display: none;" id="cvg_03">
								<div class="tabNav cvgMenu03">
									<ul class="tabList">
										<li data-menu-id="1" class="">점</li>
										<li data-menu-id="2" class="">선</li>
										<li data-menu-id="3" class="">사각형</li>
										<li data-menu-id="4" class="">원</li>
										<li data-menu-id="5" class="">버퍼</li>
									</ul>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div class="location" style="
				position: absolute;
    			right: 230px;
    			top: 190px;
				height: 38px;
				display: flex;
				background: #fff;
				box-shadow: 0.5px 0.9px 4px 0 rgba(0, 0, 0, 0.27);
				border-radius: 3px;
				width : 0px;
				">
				<div class="layerSearch_layerMenu" id="cvgWidget2" style="display: none;">
					<style>
						.convergenceWidget2 dd {
							background-color: #fff !important;
						}
						.convergenceWidget2 {
							width: 150px !important;
						}
						.border-top-radius-3{
							border-radius: 3px 3px 0px 0px !important;
						}
						.border-bottom-radius-3{
							border-radius: 0px 0px 3px 3px !important;
						}

						.convergenceWidget2 > dd > span {
							font-size: 14px;
						}
						.convergenceWidget2 .active{
							background-color: #2f5597 !important;
							color : #fff;
						}
					</style>

					<dl class="layerSearch_filter convergenceWidget2">
						<input type="hidden" id="cvgSrchPolygon" value=""/>
						<!-- <dt>필터</dt> -->
						<dd class="border-top-radius-3" data-cvg-type-code="01" >
							<span>공공측량</span>
						</dd>
						<dd class=""  data-cvg-type-code="02" >
							<span>수치지도</span>
						</dd>
						<dd class=""  data-cvg-type-code="03" >
							<span>항공사진</span>
						</dd>
						<dd class=""  data-cvg-type-code="04" >
							<span>DEM</span>
						</dd>
						<dd class="border-bottom-radius-3"  data-cvg-type-code="05" >
							<span>사용자 레이어</span>
						</dd>
					</dl>
				</div>
				</div>
				<div class="location"  style="
				position: absolute;
    			right: 238px;
    			top: 190px;
				height: 38px;
				display: flex;
				background: #fff;
				box-shadow: 0.5px 0.9px 4px 0 rgba(0, 0, 0, 0.27);
				border-radius: 3px;
				">
					<div class="cont" id="cvgWidget3" style="display: none;">
						<div class="inner cScroll" style="max-height: 650px; padding: 20px; background-color: white; border-radius: 3px;">
							<section class="section type02">
								<div class="titSec" style="margin-bottom: 20px;">
									<strong><span id="cvgTitleNm"></span> 목록</strong>
									<button class="modal_close" style="right: 5px; position:absolute; background-color: #2f5597;"><span> × </span></button>
								</div>
								
								<div class="tabContWrap type03">
									<div class="tabNav">
										<ul class="tabList"></ul>
									</div>
									<div class="tabCont active">
										<div class="table txt-center cScroll" style="height: 232px;">
											<table>
												<caption>레이어 목록</caption>
												<colgroup>
													<col style="width: 50px;">
													<col style="width: 225px;">
													<col style="width: 50px;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">선택</th>
														<th scope="col">레이어 명</th>
														<th scope="col">비고</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td><input type="checkbox" name="test"/></td>
														<td>구멍여러개</td>
														<td><div class="icoBox"><i class="ico ico-plane"></i></div></td>
													</tr>
													<tr>
														<td><input type="checkbox" name="test"/></td>
														<td>wgs84정보로하기</td>
														<td><div class="icoBox"><i class="ico ico-dot"></i></div></td>
													</tr>
													<tr>
														<td><input type="checkbox" name="test"/></td>
														<td>레이어 별칭</td>
														<td><div class="icoBox"><i class="ico ico-dot"></i></div></td>
													</tr>
													<tr>
														<td><input type="checkbox" name="test"/></td>
														<td>레이어 별칭</td>
														<td><div class="icoBox"><i class="ico ico-dot"></i></div></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>


									<div class="btnArea" style="margin-top: 20px;">
										<button type="button" class="btn" style="width: 100%;justify-content: center; background-color: #2f5597;"><span>데이터 병합</span></button></div>
								</div>
								</section>
						</div>
					</div>
				</div>

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
		if(environmentType == 'dev' && webmapWidgetList.includes('roadView')){
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