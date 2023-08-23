<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="popup" style="width:900px; display:none" v-bind:style="styleObj" id="webAppDetailModal">
    <!--head-->
    <div class="head">
        <strong class="titPop">웹앱 상세정보</strong>
        <div class="btnGroup">
            <button type="button" class="btnPopClose" @click="hide()"><span class="hidden">팝업 닫기</span></button>
        </div>
    </div>
    <!--//head-->
    <!--cont-->
    <div class="cont">
        <div class="inner cScroll" style="max-height:650px;">

            <!--tabContWrap-->
            <div class="tabContWrap type04">
                <!--tabNav-->
                <div class="tabNav">
                    <ul class="tabList">
                        <li v-bind:class="{'active' : detailInfoTab.classObj.active}" @click="tabShow('detail')">상세정보</li>
                        <li v-bind:class="{'active' : shareInfoTab.classObj.active}" @click="tabShow('share')">공유현황</li>
                    </ul>
                </div>
                <!--//tabNav-->
                <!--상세정보 탭-->
                <%@ include file="/WEB-INF/jsp/webapp/components/detailInfoTab.jsp" %>
				<!--공유현황 탭 -->
				<%@ include file="/WEB-INF/jsp/webapp/components/shareInfoTab.jsp" %>
            </div>
            <!--//tabContWrap-->
        </div>
    </div>
    <!--//cont-->

</div>
<!--//popup-->