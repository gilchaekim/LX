<link rel="stylesheet" href="<c:url value='/lib/toastui/codemirror.min.css'/>" />
<link rel="stylesheet" href="<c:url value='/lib/toastui/toastui-editor.min.css'/>" />
<link rel="stylesheet" href="<c:url value='/lib/toastui/tui-color-picker.min.css'/>" />
<script type="text/javascript" src="<c:url value='/lib/toastui/toastui-editor-all.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/toastui/toastui-editor-plugin-color-syntax.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/toastui/ko-kr.js'/>"></script>
 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<div class="sampleFrame"
		v-bind:class="[data.webAppOptions.detailSetting.theme,data.webAppOptions.detailSetting.themaTab.style ]"
		style="display:none">
		<div class="head" v-bind:style="{'background' : data.webAppOptions.detailSetting.themaTab.head.backgroundColor}">
			<div class="logo" v-bind:src="data.webAppOptions.detailSetting.themaTab.head.logoLink" id="sampleLogo"
				@click="link" style="cursor: pointer; height: 43px; max-width: 50px;">
				<img style="height:100%; width:100%;"
					v-bind:src="data.webAppOptions.detailSetting.themaTab.head.logoToDataURL" alt="로고URL"/>
			</div>
			<strong class="mainTit"
				v-bind:style="{'color' : data.webAppOptions.detailSetting.themaTab.head.fontColor}">{{data.webAppOptions.detailSetting.themaTab.head.title}}</strong>
			<b class="subTit"
				v-bind:style="{'color' : data.webAppOptions.detailSetting.themaTab.head.fontColor}">-{{data.webAppOptions.detailSetting.themaTab.head.subTitle}}</b>
			<div class="flex">
				<button type="button" class="btnTip white" @click="infoShow"><span
						class="hidden">팁</span><span>!</span></button>
				<div class="tipDesc" style="display:none;">
					<p>{{data.webAppOptions.detailSetting.themaTab.head.info}}</p>
				</div>
			</div>
			
			<div id="widget_header" class="toolGroup">
			<template v-if="data.viewMode!='view'">
				<ul class="widget_header_ul">
					<li>
						<button type="button" class="plusWidget tool">
							<img src="/smt/images/widget/ico-tool-add.png" alt="이미지">
							<img src="/smt/images/widget/ico-tool-add-hover.png" alt="이미지">
							<span>추가</span>
						</button>
					</li>
				</ul>
			</template>
			</div>
		
		</div>

		<!--  contextArea -->
		<template
			v-if="data.webAppOptions.detailSetting.sectionTab && data.webAppOptions.detailSetting.layoutTab.titSec=='시리즈'">
			<div class="contextArea" v-bind:class="data.webAppOptions.detailSetting.themaTab.theme" id="sectionTabBar">
				<!--contextNav-->
				<div class="contextNav">
					<!--contextList -->
					<ul class="contextList">
						<template v-for="(item) in data.webAppOptions.detailSetting.sectionTab.mainTab">
							<li v-if="item.active=='active'" v-bind:class="item.active"
								v-bind:style="{'color' : data.webAppOptions.detailSetting.themaTab.section.fontColor,'background' :  data.webAppOptions.detailSetting.themaTab.section.backgroundColor, 'border' : '1px solid' + data.webAppOptions.detailSetting.themaTab.section.backgroundColor}">
								{{item.tabName}}</li>
							<li v-else v-bind:style="{'color' : data.webAppOptions.detailSetting.themaTab.section.fontColor}"
								@click="clickTab(item)">
								{{item.tabName}}</li>
						</template>
					</ul>
					<!-- contextList -->
				</div>
				<!--//contextNav-->
			</div>
		</template>

		<!--  contextArea -->

		<!--cont-->
		<div class="cont">
			<template v-if="data.webAppOptions.detailSetting && data.webAppOptions.detailSetting.sectionTab && data.webAppOptions.detailSetting.layoutTab.titSec=='저널'">
				<div class="sectionArea"
					:style="{'background' : data.webAppOptions.detailSetting.themaTab.section.backgroundColor}"
					:class="data.webAppOptions.detailSetting.themaTab.theme">
					<ul>
						<template v-for="(item) in data.webAppOptions.detailSetting.sectionTab.mainTab">
							<li :class="item.active">
								<string class="tit">{{item.tabName}}</string>
							</li>
						</template>
					</ul>
				</div>
			</template>
			<!--tocArea-->
			<div class="tocArea"
				v-bind:class='[ data.webAppOptions.detailSetting.themaTab.per ,data.webAppOptions.detailSetting.themaTab.panel]'>
				<template v-if="data.webAppOptions.detailSetting && data.webAppOptions.detailSetting.sectionTab && data.webAppOptions.detailSetting.layoutTab.titSec=='저널'">
					<div class="articleArea" style="width: 100%;">
						<div class="articleList cScroll">
							<span class="areaTxt text" v-if="data.webAppOptions.detailSetting.sectionTab.mainTab.length <= 0">텍스트 영역</span>
							<div style="height:100%;" class="context section" v-bind:class="item.active"
								v-for="(item,index) in data.webAppOptions.detailSetting.sectionTab.mainTab">
								<p class="title"><input type="text" :value="item.tabName" @input="updateTabName($event)" id="inputTextSj" style="width:100%"/></p>
								<div class="desc"></div>
								<button type="button" class="btnModify">
									<span class="hidden">수정</span>
								</button>   
								<div class="chartTab">
									<template v-if="data.viewMode">
									<div v-bind:id="'chartWidgetArea'+index">
									
									<!-- 차트 위젯 넣어줄 부분. -->
									
									</div>
									</template>
				<template v-else>
								<input type="checkbox" class="chartCheck" value="차트사용" v-model="chartChecked" @change="checkLayerList">차트사용</input>
								<div class="chartContentTab">
										<template v-if="chartChecked"> 
											<template v-if="layerList.length==0"> <br><br>
												<span>지도를 먼저 설정하여주세요.</span> 
											</template> 
											
											<template v-else> 
												<label class="chartLabel">레이어</label> 
												<select class="chartLayerSelect" v-model="chartTargetLayer" title="레이어">
													<option :key="i" :value="item.layerId" v-for="(item, i) in layerList">{{item.title}}
													</option>
												</select>
											<button class="setChartBtn" @click="loadChartWidget">차트설정</button>
											</template> 
										</template>
									</div>
				</template>
								</div>
							</div>
						</div>
					</div>
				</div>
				</template>
				<template
					v-if="data.webAppOptions.detailSetting.sectionTab && data.webAppOptions.detailSetting.layoutTab.titSec=='시리즈'">
					<span class="areaTxt text" v-if="data.webAppOptions.detailSetting.sectionTab.mainTab.length <= 0">텍스트 영역</span>
					<div class="contextCont cScroll" style="width:98%" v-bind:class="item.active"
						v-for="(item,index) in data.webAppOptions.detailSetting.sectionTab.mainTab">
						<div class="inner">
							<div class="context">
								<p class="title"><input type="text" :value="item.tabName" @input="updateTabName($event)" id="inputTextSj" style="width:100%;"/></p>
								<div class="desc">
<!-- 								<textarea @input="updateTabText" v-model="item.tabText"></textarea> -->
<!-- 								<textarea  @input="updateTabText" v-model="data.webAppOptions.detailSetting.sectionTab.mainTab[getIndex(data.webAppOptions.detailSetting.sectionTab.mainTab,item.tabText)].tabText"></textarea> -->
								</div>
							</div>
						</div>
						<div class="chartTab">
							<template v-if="data.viewMode">
							  <div v-bind:id="'chartWidgetArea'+index">
								<!-- 차트 위젯 넣어줄 부분. -->
							  </div>
							</template>
							<template v-else>
							 	<input type="checkbox" class="chartCheck" value="차트사용" v-model="chartChecked" @change="checkLayerList">차트사용</input>
							</template>
						
						<div class="chartContentTab">
							<template v-if="chartChecked && !data.viewMode">
								<template v-if="layerList.length==0">
									<br></br>
									<span>지도를 먼저 설정하여주세요 </span>
								</template>
								<template v-else>
								<label class="chartLabel">레이어</label>
								<select class="chartLayerSelect" v-model="chartTargetLayer" title="레이어">
									<option :key="i" :value="item.layerId" v-for="(item, i) in layerList" >{{item.title}}</option>
								</select>
								<button class="setChartBtn" @click="loadChartWidget" >차트 설정</button>
								</template>   
							</template>
						</div>
					</div>
				</template>
				
				<div id="toc" class="active">
					<!-- toc 1뎁스-->
					<div class="toc dep1 tocWidget">
						<div class="inner">
							<!--head-->
							<div class="head">
								<strong id="tocNm" class="titToc" title="웹앱 명">웹맵 명</strong>
								<div class="btnGroup">
									<button type="button" class="btnTocHide">
										<span class="hidden">숨기기</span>
									</button>
								</div>
							</div>
							<!--//head-->
							<!--cont-->
							<div class="cont cScroll" style="max-height: 100%;">
								<div class="inner" id="tocWidget"></div>
							</div>
							<!--//cont-->
						</div>
					</div>
					<!--// toc 1뎁스-->
					<!-- toc 2뎁스-->
					<div class="toc dep2 popupWidget" id="layerDetailDiv">
						<div class="inner">
							<!--head-->
							<div class="head">
								<div class="titBox">
									<strong class="titToc" id="layerTile"></strong>
									<button type="button" class="btnTip" id="lyrDetailBtn">
										<span class="hidden">팁</span><span>!</span>
									</button>
								</div>
								<div class="btnGroup">
									<button type="button" class="btnTocHide">
										<span class="hidden">숨기기</span>
									</button>
									<button type="button" class="btnTocClose">
										<span class="hidden">숨기기</span>
									</button>
								</div>
							</div>
							<!--//head-->
							<!--cont-->
							<div class="cont cScroll">
								<div class="inner" id="layerDetailWidget"></div>
							</div>
							<!--//cont-->
						</div>
					</div>
					<!--// toc 2뎁스-->
				</div>
				<!-- 분석 -->
				<%@ include file="/WEB-INF/jsp/webmap/spatialAnalysis.jsp" %>
			</div>
			<!--contentArea-->
			<div class="contentArea">
				<span class="areaTxt content" v-if="data.webAppOptions.detailSetting.sectionTab && (data.webAppOptions.detailSetting.layoutTab.titSec=='시리즈' || data.webAppOptions.detailSetting.layoutTab.titSec=='저널' ) && data.webAppOptions.detailSetting.sectionTab.mainTab.length <= 0">콘텐츠 영역</span>
				<div id="mapDiv">
				<div id="map" class="mapArea"></div>
				</div>
				<!-- 여기확인. -->
				<!-- data.viewMode!=  -->
				
				<div class="toolGroup">  
					<ul>
						<!-- top 상단 -->
						<div id="top_widget_div" style="display: flex; margin-right: 9px;">
						</div>
						<template v-if="data.viewMode!='view'">
						<li
							v-if="data.webAppOptions.detailSetting.widgetTab && data.webAppOptions.detailSetting.widgetTab.topWidget.length &lt;1">
							<button type="button" class="plusWidget tool">
								<img src="/smt/images/widget/ico-tool-add.png" alt="이미지">
								<img src="/smt/images/widget/ico-tool-add-hover.png" alt="이미지">
								<span>추가</span>
							</button>
						</li>
						<li
							v-if="data.webAppOptions.detailSetting.widgetTab && data.webAppOptions.detailSetting.widgetTab.topWidget.length &lt;2">
							<button type="button" class="plusWidget tool">
								<img src="/smt/images/widget/ico-tool-add.png" alt="이미지">
								<img src="/smt/images/widget/ico-tool-add-hover.png" alt="이미지">
								<span>추가</span>
							</button>
						</li>
						<li
							v-if="data.webAppOptions.detailSetting.widgetTab && data.webAppOptions.detailSetting.widgetTab.topWidget.length &lt;3">
							<button type="button" class="plusWidget tool">
								<img src="/smt/images/widget/ico-tool-add.png" alt="이미지">
								<img src="/smt/images/widget/ico-tool-add-hover.png" alt="이미지">
								<span>추가</span>
							</button>
						</li>
						<li
							v-if="data.webAppOptions.detailSetting.widgetTab && data.webAppOptions.detailSetting.widgetTab.topWidget.length &lt;4">
							<button type="button" class="plusWidget tool">
								<img src="/smt/images/widget/ico-tool-add.png" alt="이미지">
								<img src="/smt/images/widget/ico-tool-add-hover.png" alt="이미지">
								<span>추가</span>
							</button>
						</li>
						<li v-if="data.webAppOptions.detailSetting.widgetTab && data.webAppOptions.detailSetting.widgetTab.topWidget.length &lt;5" >
							<button type="button" class="plusWidget tool">
								<img src="/smt/images/widget/ico-tool-add.png" alt="이미지">
								<img src="/smt/images/widget/ico-tool-add-hover.png" alt="이미지">
								<span>추가</span>
							</button>
						</li>
						</template>
					</ul>
				</div>
				
				<div id="widget">
					<div class="flex">
						<div class="group active">

							<ul class="dep1" id="toolbar_dep1">
								<!-- <li id="bookMarkControlWidget" style="display:none;"></li> -->
							</ul>
							<div class="btnGroup"
								v-if="data.webAppOptions.detailSetting.widgetTab && data.webAppOptions.detailSetting.widgetTab.toolbarWidget.length &gt;5">
								<button type="button" class="btnLeft" disabled="" @click="btnLeft()"><span
										class="hidden">이전</span></button>
								<button type="button" class="btnRight" @click="btnRight()"><span class="hidden">다음</span></button>
							</div>
						</div>
						<div class="group">
							<ul class="dep1" id="toolbar_dep2">
							</ul>
							<div class="btnGroup">
								<button type="button" class="btnLeft" @click="btnLeft()"><span class="hidden">이전</span></button>
								<button type="button" class="btnRight" @click="btnRight()"><span
										class="hidden">다음</span></button>
							</div>
						</div>
						<div class="group">
							<ul class="dep1" id="toolbar_dep3">
							</ul>
							<div class="btnGroup">
								<button type="button" class="btnLeft" @click="btnLeft()"><span class="hidden">이전</span></button>
								<button type="button" class="btnRight" disabled="" @click="btnRight()"><span
										class="hidden">다음</span></button>
							</div>
						</div>
					</div>
					<!--zoom-->
					<div class="zoomWidget" id="zoomControlWidget_bottom">
					</div>
					<div class="tooltip">
								<ul>
									<li>읍면동</li>
									<li>시군구</li>
									<li>시도</li>
								</ul>
					</div>
					<!--//zoom-->
					<!--//zoom-->
				</div>

				<!-- <div class="swiperControlWidget_header" id="swiperControlWidget_header"></div> -->
				<div class="bookMarkControlWidget_top" id="bookMarkControlWidget_top"></div>
				<div class="swiperControlWidget_top" id="swiperControlWidget_top"></div>

				<!-- <div class="timeSliderControlWidget_header" id="timeSliderControlWidget_header"></div> -->
				<div class="timeSliderControlWidget_top" id="timeSliderControlWidget_top"></div>

				<div id="featureAttributeFormWidgetDiv" style="position: absolute;">
					<div class="popup sm" style="display:none;">
						<div class="head blue"><strong class="titPop">피쳐속성 폼</strong>
							<div class="btnGroup">
								<button type="button" class="btnPopClose"
									@click="widgetHide('featureAttributeFormWidget','toolbar')"><span class="hidden">팝업 닫기</span>
								</button>
							</div>
						</div>
					</div>
					<div class="featureAttributeFormWidget" id="featureAttributeFormWidget_top">
					</div>
				</div>
				<!--//zoom-->


		<!-- 		<div class="timeSliderControlWidget_header" id="timeSliderControlWidget_header"></div>
				<div class="timeSliderControlWidget_top" id="timeSliderControlWidget_top"></div>

 -->

				<div id="overViewMapControlWidgetOption" class="overViewMapControlWidgetOption"></div>
				<div id="analysLegendWidget">
					<div class="analysLegend_displayDiv">
						<div class="analysLegend_colorDiv">
							<div class="analysLegend_style_div"></div>
							<div class="analysLegend_data_div"></div>
						</div>
					</div>
				</div>
				<div id="scaleWidget" class="scaleWidget"></div>
                <div class="mousePosition-srs-select-div">
            		<select class="mousePosition-srs-select">
            			<option value="3857">EPSG:3857</option><option value="4004">EPSG:4004</option><option value="4019">EPSG:4019</option><option value="4326" selected>EPSG:4326</option><option value="5173">EPSG:5173</option><option value="5174">EPSG:5174</option><option value="5175">EPSG:5175</option><option value="5176">EPSG:5176</option><option value="5177">EPSG:5177</option><option value="5178">EPSG:5178</option><option value="5179">EPSG:5179</option><option value="5180">EPSG:5180</option><option value="5181">EPSG:5181</option><option value="5182">EPSG:5182</option><option value="5183">EPSG:5183</option><option value="5184">EPSG:5184</option><option value="5185">EPSG:5185</option><option value="5186">EPSG:5186</option><option value="5187">EPSG:5187</option><option value="5188">EPSG:5188</option>
            		</select>
            	</div>
				<div class="mousePositionControlWidget" id="mousePositionControlWidget"></div>
				<div class="widgetFlex">
					<div id="location" class="location"></div>


					<div id="userMenu">
						<!--searchArea-->
						<div class="searchArea" id="searchAreaWidget"></div>
					</div>
				</div>
				<%@ include file="/WEB-INF/jsp/webapp/optionTable.jsp" %>
			</div>
		</div> <!-- cont -->
		<div class="foot" v-show="data.webAppOptions.detailSetting.themaTab.foot.useYn"
			v-bind:style="{'background' : data.webAppOptions.detailSetting.themaTab.foot.backgroundColor}">
			<p v-bind:style="{'color' : data.webAppOptions.detailSetting.themaTab.foot.fontColor}">
				{{data.webAppOptions.detailSetting.themaTab.foot.desc}}</p>
		</div>
	</div>
	<!--//contentArea-->
	</div>

	</div>
	<!--//sampleFrame-->