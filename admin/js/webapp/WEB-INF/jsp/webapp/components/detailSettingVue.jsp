<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="detailSetting">
    <!-- toc 1뎁스-->
    <div class="toc dep1 tocWidget">
        <div class="inner">
            <!--head-->
            <div class="head">
                <strong class="titToc" v-text="themeText()"></strong>
                <div class="btnGroup">
                    <button type="button" id="detailSettingHide" class="btnTocHide" @click="hide('detailSettingHide')"><span class="hidden">숨기기</span></button>
                </div>
            </div>
            <!--//head-->
            <!--cont-->
            <div class="cont cScroll" style="max-height:100%;">
                <div class="inner">
                    <!--tabContWrap-->
                    <div class="tabContWrap type05">
                        <!--tabNav-->
                        <div class="tabNav">
                            <!--tabList-->
                            <ul class="tabList">
                                <template v-if="data.webAppOptions.detailSetting.mainTab  && ['표준','간편보기','편집','스토리맵','비교','시간인식','고도','부서'].includes(data.webAppOptions.detailSetting.layoutTab.titSec)" >
                                	<li class="active" id="mainTab" @click="tabClickEvent('mainTab')">{{data.webAppOptions.detailSetting.mainTab.tabName}}</li>
                            	</template>
                            	<template v-if="data.webAppOptions.detailSetting.layoutTab">
                                	<li class="" id="layoutTab" @click="tabClickEvent('layoutTab')">{{data.webAppOptions.detailSetting.layoutTab.tabName}}</li>
                            	</template>
                            	<template v-if="data.webAppOptions.detailSetting.sectionTab">
                                	<li class="" id="sectionTab" @click="tabClickEvent('sectionTab')">{{data.webAppOptions.detailSetting.sectionTab.tabName}}</li>
                            	</template>
                            	<template v-if="data.webAppOptions.detailSetting.themaTab">
                                	<li class="" id="themaTab" @click="tabClickEvent('themaTab')">{{data.webAppOptions.detailSetting.themaTab.tabName}}</li>
                            	</template>
                            	<template v-if="data.webAppOptions.detailSetting.widgetTab">
                                	<li class="" id="widgetTab" @click="tabClickEvent('widgetTab')">{{data.webAppOptions.detailSetting.widgetTab.tabName}}</li>
                            	</template>
                            	<template v-if="data.webAppOptions.detailSetting.infoTab">
	                             	<li class="" id="infoTab" @click="tabClickEvent('infoTab')">{{data.webAppOptions.detailSetting.infoTab.tabName}}</li>
	                         	</template>
	                         	<template v-if="data.webAppOptions.detailSetting.dataTab">
	                             	<li class="" id="dataTab" @click="tabClickEvent('dataTab')">{{data.webAppOptions.detailSetting.dataTab.tabName}}</li>
	                         	</template>
                    		    <template v-if="data.webAppOptions.detailSetting.deptTab">
	                             	<li class="" id="deptTab" @click="tabClickEvent('deptTab')">{{data.webAppOptions.detailSetting.deptTab.tabName}}</li>
	                         	</template>
                            	<!-- <template v-if="data.webAppOptions.detailSetting.contentsTab">
                                	<li class="" id="contentsTab" @click="tabClickEvent('contentsTab')">{{data.webAppOptions.detailSetting.contentsTab.tabName}}</li>
                            	</template> -->

                            </ul>
                            <!--//tabList-->
                        </div>   
						<template v-if="data.webAppOptions.detailSetting.mainTab && ['표준','간편보기','편집','스토리맵','비교','시간인식','고도','부서'].includes(data.webAppOptions.detailSetting.layoutTab.titSec)">
                        	<%@ include file="/WEB-INF/jsp/webapp/components/mainTab.jsp" %>
                        </template>
                        <!-- 레이아웃  && ['표준','간편보기','편집'].includes(data.webAppOptions.detailSetting.layoutTab.titSec)" > -->
						<template v-if="data.webAppOptions.detailSetting.layoutTab">
                        	<%@ include file="/WEB-INF/jsp/webapp/components/layoutTab.jsp" %> <!-- 레이아웃 -->
						</template>
						<template v-if="data.webAppOptions.detailSetting.sectionTab"> 
                        	<%@ include file="/WEB-INF/jsp/webapp/components/sectionTab.jsp" %> <!-- 탭 --> 
						</template>
						<template v-if="data.webAppOptions.detailSetting.themaTab">
                        	<%@ include file="/WEB-INF/jsp/webapp/components/themaTab.jsp" %>
						</template>
						<template v-if="data.webAppOptions.detailSetting.widgetTab">
                        	<%@ include file="/WEB-INF/jsp/webapp/components/widgetTab.jsp" %>
						</template>
						<template v-if="data.webAppOptions.detailSetting.contentsTab">
                        	<%@ include file="/WEB-INF/jsp/webapp/components/contentsTab.jsp" %>
						</template>
						<template v-if="data.webAppOptions.detailSetting.infoTab">
                        	<%@ include file="/WEB-INF/jsp/webapp/components/infoTab.jsp" %>	<!-- 정보창 -->
                        </template>
                        <template v-if="data.webAppOptions.detailSetting.dataTab">
                        	<%@ include file="/WEB-INF/jsp/webapp/components/dataTab.jsp" %>	<!-- 데이터 -->
                        </template>
                        <template v-if="data.webAppOptions.detailSetting.deptTab">
                        	<%@ include file="/WEB-INF/jsp/webapp/components/deptTab.jsp" %>	<!-- 부서설정 -->
                        </template>
                    </div>
                    <!--//tabContWrap-->
                </div>
            </div>
            <!--//cont-->
        </div>
    </div>
    <!--// toc 1뎁스-->
</div>