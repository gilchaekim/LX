<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <div class="popup sm" style="width:440px; display:none;" id="mainTabModalVue">
        <!--head-->
        <div class="head blue">
            <strong class="titPop">테마 탭 선택</strong>
            <div class="btnGroup">
                <button type="button" class="btnPopClose" @click="hide()"><span class="hidden">팝업 닫기</span></button>
            </div>
        </div>
        <!--//head-->
        <!--cont-->
        <div class="cont">
            <div class="inner cScroll" style="max-height:650px;">
                <div class="tabContWrap type06">
                    <!--tabNav-->
                    <div class="tabNav">
                        <ul class="tabList">
                            <li :class="{active :  previewTabInfo.tabContent.contentType == 'map'}" id="map_tab"
                                @click="tabClickEvent('map_tab')">지도</li>
                         <!--     <li class="{active :  previewTabInfo.tabContent.contentType == 'img'}" id="img_tab"
                                @click="tabClickEvent('img_tab')">이미지</li>
                            <li class="{active :  previewTabInfo.tabContent.contentType == 'video'}" id="video_tab"
                                @click="tabClickEvent('video_tab')">비디오</li>
                            <li class="{active :  previewTabInfo.tabContent.contentType == 'weburl'}" id="weburl_tab"
                                @click="tabClickEvent('weburl_tab')">Web URL</li> -->
                        </ul>
                    </div>
                    <!--//tabNav-->
                    <!--tabCont-->
                    <div class="tabCont active">
                        <div class="inner">
                            <!--secInner-->
                            <div class="secInner">
                                <label>지도 선택</label>
                                <div class="fileSelect">
                                    <input class="fileLocal" disabled="disabled" style="flex:1;"
                                        :value="previewTabInfo.tabContent.contentValue.userMapSj">
                                    <label class="btnFileSelect"
                                        onclick="app.webapp.components.mainTab.methods.webMapSearchClickEvent()">갤러리검색</label>
                                </div>
                            </div>
                            <!--//secInner-->
                            <!--secInner-->
                            <div class="secInner">
                                <label>지도 시작 좌표 및 배율 선택</label>
                                <div class="flex">
                                    <button type="button" class="btn innerSec" @click="mapScopeInit()">
                                        <i class="ico ico-location"></i><span>지도에서 선택</span></button>
                                </div>
                            </div>
                            <!--//secInner-->
                            <div class="secInner" v-show="previewTabInfo.tabContent.contentValue.useYn">
                                <label style="margin-bottom: 4px;">선택 좌표</label>
                                <div class="flex" v-for="value in previewTabInfo.tabContent.contentValue.center"
                                    @click="mapScopeMove()" style="cursor:pointer;">
                                    {{value}}
                                </div>
                                맵 줌 : {{previewTabInfo.tabContent.contentValue.zoom}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnArea flex sb" style="margin-top:20px;">
                    <button type="button" class="btn black2 lg"><span>취소</span></button>
                    <button type="button" class="btn blue2 lg" @click="applyContent()"><span>완료</span></button>
                </div>
            </div>
        </div>
        <!--//cont-->

    </div>