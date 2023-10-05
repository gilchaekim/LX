<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <div class="popup sm" style="width:900px; display:none;" id="themaTabModalVue">
        <!--head-->
        <div class="head blue">
            <strong class="titPop">섹션 지도 설정.</strong>
            <div class="btnGroup">
                <button type="button" class="btnPopClose"><span class="hidden" @click="hide()">팝업 닫기</span></button>
            </div>
        </div>
        <!--//head-->
        <!--cont-->
        <div class="cont">
        <div class="inner cScroll" style="max-height:650px;">
        	<!-- 시리즈 맵일 경우 테마 -->
        	<template v-if="data.webAppOptions.detailSetting.layoutTab && data.webAppOptions.detailSetting.layoutTab.titSec=='시리즈'">
            <div class="tip">
                <i>- 탭의 가로 길이는 텍스트 길이에 따라 가변적으로 설정됩니다.</i>
                <i>- 탭의 개수가 많을 경우 아래로 배치됩니다.</i>
            </div>
            <div class="choiceList col">
                <div class="box active" @click="themaBox('theme01')">
                    <div class="inner">
                        <strong>탭 테마 1</strong>
                        <!--contextArea-->
                        <div class="contextArea theme01">
                            <!--contextNav-->
                            <div class="contextNav">
                                <!--contextList-->
                                <ul class="contextList">
                                    <li class="active">탭1 명칭</li>
                                    <li class="">탭2 명칭</li>
                                    <li class="">탭3 명칭</li>
                                    <li class="">탭4 명칭</li>
                                    <li>탭5 명칭</li>
                                    <li>탭6 명칭</li>
                                    <li>탭7 명칭</li>
                                    <li>탭8 명칭</li>
                                </ul>
                                <!--//contextList-->
                            </div>
                            <!--//contextNav-->
                        </div>
                        <!--//contextArea-->
                    </div>
                </div>
                <div class="box" @click="themaBox('theme02')">
                    <div class="inner">
                        <strong>탭 테마 2</strong>
                        <!--contextArea-->
                        <div class="contextArea theme02">
                            <!--contextNav-->
                            <div class="contextNav">
                                <!--contextList-->
                                <ul class="contextList">
                                    <li class="active">탭1 명칭</li>
                                    <li class="">탭2 명칭</li>
                                    <li class="">탭3 명칭</li>
                                    <li class="">탭4 명칭</li>
                                    <li>탭5 명칭</li>
                                    <li>탭6 명칭</li>
                                    <li>탭7 명칭</li>
                                    <li>탭8 명칭</li>
                                </ul>
                                <!--//contextList-->
                            </div>
                            <!--//contextNav-->
                        </div>
                        <!--//contextArea-->
                    </div>
                </div>
                <div class="box" @click="themaBox('theme03')">
                    <div class="inner">
                        <strong>탭 테마 3</strong>
                        <!--contextArea-->
                        <div class="contextArea theme03">
                            <!--contextNav-->
                            <div class="contextNav">
                                <!--contextList-->
                                <ul class="contextList">
                                    <li class="active">탭1 명칭</li>
                                    <li class="">탭2 명칭</li>
                                    <li class="">탭3 명칭</li>
                                    <li>탭4 명칭</li>
                                    <li class="">탭5 명칭</li>
                                    <li class="">탭6 명칭</li>
                                    <li class="">탭7 명칭</li>
                                    <li class="">탭8 명칭</li>
                                </ul>
                                <!--//contextList-->
                            </div>
                            <!--//contextNav-->
                        </div>
                        <!--//contextArea-->
                    </div>
                </div>
            </div>
            <div class="btnArea flexRight" style="margin-top:30px;">
                <button type="button" class="btn black2 lg" @click-="hide()"><span>취소</span></button>
                <button type="button" class="btn blue2 lg" @click="applySES()"><span>완료</span></button>
            </div>
            </template>
            <template v-if="data.webAppOptions.detailSetting.layoutTab && data.webAppOptions.detailSetting.layoutTab.titSec=='저널'">

			<div class="choiceList">
                <div class="box active" @click="themaBox('type01')">
                    <div class="inner">
                        <strong>저널 테마 1</strong>
                        <img src="/smt/images/webapp/img-journal-01.png" alt="저널 테마 1">
                    </div>
                </div>
                <div class="box" @click="themaBox('type02')">
                    <div class="inner">
                        <strong>저널 테마 2</strong>
                        <img src="/smt/images/webapp/img-journal-02.png" alt="저널 테마 2">
                    </div>
                </div>
                <div class="box">
                    <div class="inner" @click="themaBox('type03')">
                        <strong>저널 테마 3</strong>
                        <img src="/smt/images/webapp/img-journal-03.png" alt="저널 테마 3">
                    </div>
                </div>
            </div>
             <div class="btnArea flexRight" style="margin-top:30px;">
                <button type="button" class="btn black2 lg" @click-="hide()"><span>취소</span></button>
                <button type="button" class="btn blue2 lg" @click="applyJOR()"><span>완료</span></button>
            </div>
            </template>
        </div>
    </div>
        <!--//cont-->

    </div>