<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<div class="popup sm" style="width: 535px; display: none;" id="widgetList">
		<!--head-->
		<div class="head blue">
			<strong class="titPop" v-text="modeText()"></strong>
			<div class="btnGroup">
				<button type="button" class="btnPopClose" @click="hide()">
					<span class="hidden">팝업 닫기</span>
				</button>
			</div>
		</div>
		<!--//head-->
		<!--cont-->
		<div class="cont">
			<div class="inner cScroll" style="max-height: 650px;">
			
				<!-- header Widget div -->
				<div class="widgetSection" id="headerWidgetListDiv" style="display:none;">
					<div style="background:#e9e9e9; height:30px; line-height:30px; text-align:center; font-size:20px;">
						헤더
					</div>
					<!--헤더 section-->
					<section class="section type02" id="headerWidgetList">
						<div class="titSec">
							<strong>헤더</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<div class="widgetBox header" id="webMapInfoWidgetBox"
									@click="addWidget('webMapInfoWidget','header')">
									<!-- css적용. -->
									<button type="button" class="widget layerSearch">
										<span class="imgBox">
											<img src="/smt/images/widget/기본정보.png" alt="웹맵 기본정보" />
										</span>
										<span class="txt">
											<span>기본 정보</span>
										</span>
									</button>
								</div>
								<div class="widgetBox header" id="loginWidgetBox"
									@click="addWidget('loginWidget','header')">
									<!-- css적용. -->
									<button type="button" class="widget layerSearch">
										<span class="imgBox">
											<img src="/smt/images/widget/기본정보.png" alt="로그인" />
										</span>
										<span class="txt">
											<span>로그인</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<!--//widgetList-->
					</section>
					<!--//헤더 section-->
				</div>
				<!-- //header Widget div -->
				
				<!-- top Widget div -->
				<div class="widgetSection" id="topWidgetListDiv" style="display:none;">
					<div style="background:#e9e9e9; height:30px; line-height:30px; text-align:center; font-size:20px;">
						상단
					</div>
					<!--제어 section-->
					<section class="section type02" id="controlWigetList">
						<div class="titSec">
							<strong>제어</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<!-- //[필독] 분석 아용 할 때 주석제거 필요 -->
								<div class="widgetBox" style="display:none; margin-top: 10px;" id="spatialAnalysisWidgetBox"
									@click="addWidget('spatialAnalysisWidget','top')">
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/공간분석.png" alt="공간분석"/>
										</span>
										<span class="txt">
											<span>공간분석</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="bookMarkControlWidgetBox">
								<!-- css적용. -->
									<button type="button" class="widget zoom" @click="addWidget('bookMarkControlWidget','top')">
										<span class="imgBox">
											<img src="/smt/images/widget/북마크.png" alt="북마크" />
										</span>
										<span class="txt">
											<span>북마크</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="overViewMapControlWidgetBox">
									<!-- css적용. -->
									<button type="button" class="widget zoom" @click="addWidget('overViewMapControlWidget','top')">
										<span class="imgBox">
											<img src="/smt/images/widget/오버뷰.png" alt="오버뷰" />
										</span>
										<span class="txt">
											<span>오버뷰</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="swiperControlWidgetBox">
									<!-- css적용. -->
									<button type="button" class="widget zoom" @click="addWidget('swiperControlWidget','top')">
										<span class="imgBox">
											<img src="/smt/images/widget/스와이프.png" alt="스와이퍼" />
										</span>
										<span class="txt">
											<span>스와이프</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="timeSliderControlWidgetBox" style="display:none;"
									@click="addWidget('timeSliderControlWidget','top')">
									<!-- css적용. -->
									<button type="button" class="widget divMap">
										<span class="imgBox">
											<img src="/smt/images/widget/타임슬라이더.png" alt="타임 슬라이드" />
										</span>
										<span class="txt">
											<span>타임슬라이드</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<!--//widgetList-->
					</section>
					<!--//제어 section-->
					
					<!--검색 section-->
					<section class="section type02" id="searchWigetList">
						<div class="titSec">
							<strong>검색</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<div class="widgetBox" @click="addWidget('addressSearchWidget','top')" id="addressSearchWidgetBox">
									<!-- css적용. -->
									<button type="button" class="widget search">
										<span class="imgBox">
											<img src="/smt/images/widget/검색.png" alt="주소 검색" />
										</span>
										<span class="txt">
											<span>주소 검색</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" @click="addWidget('administrativeDistrictSearchWidget','top')" id="administrativeDistrictSearchWidgetBox">
									<!-- css적용. -->
									<button type="button" class="widget boundary">
										<span class="imgBox">
											<img src="/smt/images/widget/행정경계표시.png" alt="행정경계 표시" />
										</span>
										<span class="txt">
											<span>행정경계<br />표시
											</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="landInfoWidgetBox" @click="addWidget('landInfoWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="부동산정보" />
										</span>
										<span class="txt">
											<span>부동산정보</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<!--//widgetList-->
					</section>
					<!--//검색 section-->
					
					<!--저장 section-->
					<section class="section type02" id="storeWigetList">
						<div class="titSec">
							<strong>저장</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<div class="widgetBox" id="downloadControlWidgetBox"
									@click="addWidget('downloadControlWidget','top')">
									<!-- css적용. -->
									<button type="button" class="widget save">
										<span class="imgBox">
											<img src="/smt/images/widget/저장.png" alt="저장"/>
										</span>
										<span class="txt">
											<span>저장</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="printControlWidgetBox" style="display:none;"
									@click="addWidget('printControlWidget','top')">
									<!-- css적용. -->
									<button type="button" class="widget print">
										<span class="imgBox">
											<img src="/smt/images/widget/인쇄.png" alt="인쇄"/>
										</span>
										<span class="txt">
											<span>인쇄</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<!--//widgetList-->
					</section>
					<!--저장 section-->
					
					<!--편집 section-->
					<section class="section type02" id="editWigetList">
						<div class="titSec">
							<strong>편집</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<div class="widgetBox" id="gridWidgetBox">
									<!-- css적용. -->
									<button type="button" class="widget slider">
										<span class="imgBox">
											<img src="/smt/images/widget/ico-widget-slider.png" alt="슬라이더" />
										</span>
										<span class="txt">
											<span>속성테이블</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="featureAttributeFormWidgetBox" style="display:none;"
									@click="addWidget('featureAttributeFormWidget','top')">
									<!-- css적용. -->
									<button type="button" class="widget form">
										<span class="imgBox">
											<img src="/smt/images/widget/피쳐속성폼.png" alt="피쳐속성 폼" />
										</span>
										<span class="txt">
											<span>피쳐속성<br />폼
											</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="tocPopupWidgetBox" @click="addWidget('tocPopupWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="지도TOC" />
										</span>
										<span class="txt">
											<span>지도TOC</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="layerStyleControlWidgetBox" @click="addWidget('layerStyleControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="레이어 Style" />
										</span>
										<span class="txt">
											<span>레이어 Style</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<!--//widgetList-->
					</section>
					<!--//편집 section-->
					
					<!--분석 section-->
					<section class="section type02" id="mapviewWigetList">
						<div class="titSec">
							<strong>데이터</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<!-- remove 함수 만들어지면 @click="addWidget('basemapWidget')" -->
								<div class="widgetBox" id="overlapWidgetBox" @click="addWidget('overlapWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="중첩 영상" />
										</span>
										<span class="txt">
											<span>중첩 영상</span>
										</span>
									</button>
								</div>
							</div>
						</div>
					</section>
				</div>
				<!-- //top Widget div -->
				
				<!-- toolbar Widget div -->
				<div class="widgetSection" id="toolbarWidgetListDiv" style="display:none;">
					<div style="background:#e9e9e9; height:30px; line-height:30px; text-align:center; font-size:20px;">
						툴바
					</div>
					<!--제어 section-->
					<section class="section type02" id="mapviewWigetList">
						<div class="titSec">
							<strong>제어</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<div class="widgetBox" id="homeControlWidgetBox"
									@click="addWidget('homeControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/홈.png" alt="홈"/>
										</span>
										<span class="txt">
											<span>홈</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="currentViewControlWidgetBox"
									@click="addWidget('currentViewControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/현재위치.png" alt="현재위치"/>
										</span>
										<span class="txt">
											<span>현재위치</span>
										</span>
									</button>
								</div>
								
								<div class="widgetBox" id="roadViewWidgetBox"
									@click="addWidget('roadViewWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/로드뷰.png" alt="로드뷰" />
										</span>
										<span class="txt">
											<span>로드뷰</span>
										</span>
									</button>
								</div>							
	
								<div class="widgetBox" id="clearControlWidgetBox"
									@click="addWidget('clearControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/초기화.png" alt="초기화" />
										</span>
										<span class="txt">
											<span>초기화</span>
										</span>
									</button>
								</div>
	
								<div class="widgetBox" style="display:none;" id="fullScreenControlWidgetBox"
									@click="addWidget('fullScreenControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/전체화면.png" alt="전체화면"/>
										</span>
										<span class="txt">
											<span>전체화면</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="moveControlWidgetBox"
									@click="addWidget('moveControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget prev">
										<span class="imgBox">
											<img src="/smt/images/widget/이동이전.png" alt="이동" />
										</span>
										<span class="txt">
											<span>이동</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="divideMapWidgetBox">
									<!-- css적용. -->
									<button type="button" class="widget divMap" @click="addWidget('divideMapWidget','toolbar')">
										<span class="imgBox">
											<img src="/smt/images/widget/분할지도.png" alt="분할지도" />
										</span>
										<span class="txt">
											<span>분할지도</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="drawControlWidgetBox"
									@click="addWidget('drawControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget draw">
										<span class="imgBox">
											<img src="/smt/images/widget/그리기.png" alt="그리기" />
										</span>
										<span class="txt">
											<span>그리기</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="measureControlWidgetBox"
									@click="addWidget('measureControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget measure">
										<span class="imgBox">
											<img src="/smt/images/widget/측정.png" alt="측정" />
										</span>
										<span class="txt">
											<span>측정</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" style="display:none;" id="rotationControlWidgetBox"
									@click="addWidget('rotationControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget compass">
										<span class="imgBox">
											<img src="/smt/images/widget/회전.png" alt="나침반" />
										</span>
										<span class="txt">
											<span>회전/나침반</span>
										</span>
									</button>
								</div>
							</div>
						<!--//widgetList-->
					</section>
					<!--//제어 section-->
					
					<!--지도뷰 section-->
					<section class="section type02" id="mapviewWigetList">
						<div class="titSec">
							<strong>지도뷰</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<!-- remove 함수 만들어지면 @click="addWidget('basemapWidget')" -->
								<div class="widgetBox" id="basemapWidgetBox" @click="addWidget('basemapWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="배경지도" />
										</span>
										<span class="txt">
											<span>배경지도</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="cctvControlWidgetBox"
									@click="addWidget('cctvControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/icon_cctv.png" alt="CCTV"/>
										</span>
										<span class="txt">
											<span>CCTV</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="lsmdControlWidgetBox"
									@click="addWidget('lsmdControlWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/연속지적도.png" alt="연속도"/>
										</span>
										<span class="txt">
											<span>연속도</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<!--//widgetList-->
					</section>
					<!--//지도뷰 section-->

					<!--분석 section-->
					<section class="section type02" id="mapviewWigetList">
						<div class="titSec">
							<strong>분석</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<!-- remove 함수 만들어지면 @click="addWidget('basemapWidget')" -->
								<div class="widgetBox" id="analysisSumryWidgetBox" @click="addWidget('analysisSumryWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="데이터 요약 분석" />
										</span>
										<span class="txt">
											<span>데이터 요약 분석</span>
										</span>
									</button>
								</div>
								<!-- remove 함수 만들어지면 @click="addWidget('basemapWidget')" -->
								<div class="widgetBox" id="analysisLcWidgetBox" @click="addWidget('analysisLcWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="위치찾기 분석" />
										</span>
										<span class="txt">
											<span>위치찾기 분석</span>
										</span>
									</button>
								</div>
								<!-- remove 함수 만들어지면 @click="addWidget('basemapWidget')" -->
								<div class="widgetBox" id="analysisPttrnWidgetBox" @click="addWidget('analysisPttrnWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="공간패턴 분석" />
										</span>
										<span class="txt">
											<span>공간패턴 분석</span>
										</span>
									</button>
								</div>
								<!-- remove 함수 만들어지면 @click="addWidget('basemapWidget')" -->
								<div class="widgetBox" id="analysisProximityWidgetBox" @click="addWidget('analysisProximityWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="근접도 분석" />
										</span>
										<span class="txt">
											<span>근접도 분석</span>
										</span>
									</button>
								</div>
								<!-- remove 함수 만들어지면 @click="addWidget('basemapWidget')" -->
								<div class="widgetBox" id="analysisManageWidgetBox" @click="addWidget('analysisManageWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="데이터관리 분석" />
										</span>
										<span class="txt">
											<span>데이터관리  분석</span>
										</span>
									</button>
								</div>
								<!-- remove 함수 만들어지면 @click="addWidget('basemapWidget')" -->
								<div class="widgetBox" id="analysisCoordWidgetBox" @click="addWidget('analysisCoordWidget','toolbar')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/배경지도.png" alt="좌표변환" />
										</span>
										<span class="txt">
											<span>좌표변환</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<!--//widgetList-->
					</section>
					<!--//분석 section-->
					
				</div>
				<!-- //toolbar Widget div -->
				
				<!-- bottom Widget div -->
				<div class="widgetSection" id="bottomWidgetListDiv" style="display:none;">
					<div style="background:#e9e9e9; height:30px; line-height:30px; text-align:center; font-size:20px;">
						하단
					</div>
					<!--지도뷰 section-->
					<section class="section type02" id="mapviewWigetList">
						<div class="titSec">
							<strong>지도뷰</strong>
						</div>
						<!--widgetList-->
						<div class="widgetList type02">
							<div class="inner">
								<div class="widgetBox" id="scaleControlWidgetBox"
									@click="addWidget('scaleControlWidget','bottom')">
									<!-- css적용. -->
									<button type="button" class="widget accInput">
										<span class="imgBox">
											<img src="/smt/images/widget/축척입력.png" alt="축척입력"/>
										</span>
										<span class="txt">
											<span>축적입력</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="mousePositionControlWidgetBox"
									@click="addWidget('mousePositionControlWidget','bottom')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/마우스좌표표시.png" alt="좌표표시" />
										</span>
										<span class="txt">
											<span>좌표표시</span>
										</span>
									</button>
								</div>
								<div class="widgetBox" id="zoomControlWidgetBox"
									@click="addWidget('zoomControlWidget','bottom')">
									<!-- css적용. -->
									<button type="button" class="widget bgMap">
										<span class="imgBox">
											<img src="/smt/images/widget/확대축소.png" alt="확대/축소" />
										</span>
										<span class="txt">
											<span>확대/축소</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<!--//widgetList-->
					</section>
					<!--지도뷰 section-->
				</div>
				<!-- //bottom Widget div -->
				
				<div class="btnArea flex sb" style="margin-top: 20px;">
					<button type="button" class="btn black2 lg" @click="hide()">
						<span>취소</span>
					</button>
					<button type="button" class="btn blue lg" @click="confirmWidget()">
						<span>저장</span>
					</button>
				</div>
			</div>
			<!--//head-->
			<!--cont-->
		</div>
	</div>