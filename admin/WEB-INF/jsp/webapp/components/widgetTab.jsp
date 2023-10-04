<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <widget-tab inline-template ref="widgetTab">
        <div class="tabCont">
            <div class="sectionArea thin">
                <!--tabSec-->
                <div class="tabSec">
                	<button type="button" @click="widgetListShow('all')"><strong class="titSec">위젯 전체보기</strong></button>
                </div>
                <div class="tabSec">
                   	<strong class="titSec">헤더 위젯</strong>
                    <!--widgetList-->
                    <div class="widgetList">
                        <div class="inner">
                            <template v-if="data.webAppOptions.detailSetting.widgetTab.headerWidget"
                                v-for="(item,index) in data.webAppOptions.detailSetting.widgetTab.headerWidget">
                                <div class="widgetBox">
                                    <button type="button" class="widget">
                                        <span class="imgBox">
                                            <img v-bind:src="widget[item].img" alt="이미지"/>
                                        </span>
                                        <span v-text="widget[item].text"></span>
                                    </button>
                                    <div class="flex">
                                        <button type="button" class="btnWidgetRemove"
                                            v-on:click="widgetDelete(item,'header')">
                                            <span class="hidden">위젯삭제</span></button>
                                        <button type="button" class="btnWidgetEdit"><span
                                                class="hidden">위젯편집</span></button>
                                    </div>
                                </div>
                            </template>
                            <button type="button" class="btnWidgetAdd" @click="widgetListShow('header')"><span
                                    class="hidden">위젯 추가</span></button>
                        </div>
                    </div>
                    <!--//widgetList-->
                </div>
                <!--//tabSec-->
                <!--tabSec-->

                <div class="tabSec" v-if="data.webAppOptions.detailSetting.layoutTab.titSec!='간편보기'">
                    <strong class="titSec">레이어</strong>
                    <!--widgetList-->
                    <div class="widgetList">
                        <div class="inner">
                  
                            <div class="widgetBox">
                                <!-- css적용. -->
                                <button type="button" class="widget layerSearch">
                                    <span class="imgBox">
                                        <img src="/smt/images/widget/레이어검색active.png" alt="레이어 검색" />
                                    </span>
                                    <span class="txt">
                                        <span>검색</span>
                                    </span>
                                </button>
                                <div class="flex">
                                    <button type="button" id="layerSearchOptionBtn" class="btnWidgetView"
                                        @click="updateTocOptions('layerSearch', $event)">
                                        <span class="hidden">위젯ONOFF</span>
                                    </button>
                                </div>
                            </div>
                           <!-- [확인필요] 팝업 위젯 막음 -->
                           <!--  <div class="widgetBox">
                                <button type="button" class="widget layerUpload">
                                    <span class="imgBox">
                                        <img src="/smt/images/widget/레이어 업로드active.png" alt="업로드" />
                                    </span>
                                    <span class="txt">
                                        <span>업로드</span>
                                    </span>
                                </button>
                                <div class="flex">
                                    <button type="button" id="layerUploadOptionBtn" class="btnWidgetView"
                                        @click="updateTocOptions('layerUpload', $event)">
                                        <span class="hidden">위젯ONOFF</span>
                                    </button>
                                </div>
                            </div> -->
                            <div class="widgetBox">
                                <!-- css적용. -->
                                <button type="button" class="widget style">
                                    <span class="imgBox">
                                        <img src="/smt/images/widget/스타일active.png" alt="스타일" />
                                    </span>
                                    <span class="txt">
                                        <span>스타일</span>
                                    </span>
                                </button>
                                <div class="flex">
                                    <button type="button" class="btnWidgetView" id="styleSetOptionBtn"
                                        @click="updateTocOptions('styleSet', $event)">
                                        <span class="hidden">위젯ONOFF</span>
                                    </button>
                                </div>
                            </div>
                            <!-- [확인필요] 팝업 위젯 막음 -->
                            <!-- <div class="widgetBox">
                              	<button type="button" class="widget popupSet">
                                    <span class="imgBox">
                                        <img src="/smt/images/widget/범례active.png" alt="팝업" />
                                    </span>
                                    <span class="txt">
                                        <span>팝업</span>
                                    </span>
                                </button>
                                <div class="flex">
                                    <button type="button" class="btnWidgetView" id="popupSetOptionBtn"
                                        @click="updateTocOptions('popupSet', $event)">
                                        <span class="hidden">위젯ONOFF</span>
                                    </button>
                                </div>
                            </div> -->
                            <div class="widgetBox">
                                <!-- css적용. -->
                                <button type="button" class="widget grid">
                                    <span class="imgBox">
                                        <img src="/smt/images/widget/속성 테이블active.png" alt="속성" />
                                    </span>
                                    <span class="txt">
                                        <span>속성</span>
                                    </span>
                                </button>
                                <div class="flex">
                                    <button type="button" class="btnWidgetView" id="attributeGridOptionBtn"
                                        @click="updateTocOptions('attributeGrid', $event)">
                                        <span class="hidden">위젯ONOFF</span>
                                    </button>
                                </div>
                            </div>
                            <div class="widgetBox">
                                <!-- css적용. -->
                                <button type="button" class="widget grid">
                                    <span class="imgBox">
                                        <img src="/smt/images/widget/속성 테이블active.png" alt="속성" />
                                    </span>
                                    <span class="txt">
                                        <span>속성필터</span>
                                    </span>
                                </button>
                                <div class="flex">
                                    <button type="button" class="btnWidgetView" id="filterOptionBtn"
                                        @click="updateTocOptions('filter', $event)">
                                        <span class="hidden">위젯ONOFF</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--//tabSec-->
                <!--tabSec-->
                <div class="tabSec">
                    <strong class="titSec">상단 위젯</strong>
                    <!--widgetList-->
                    <div class="widgetList">
                        <div class="inner">
                            <template v-if="data.webAppOptions.detailSetting.widgetTab.topWidget"
                                v-for="(item,index) in data.webAppOptions.detailSetting.widgetTab.topWidget">
                                <div class="widgetBox" v-if="!['spatialAnalysisWidget'].includes(item)"> <!-- 20230530 상세설정에 공간분석 위젯 숨기기 -->
                                    <button type="button" class="widget">
                                        <span class="imgBox">
                                            <img v-bind:src="widget[item].img" />
                                        </span>
                                        <span v-text="widget[item].text"></span>
                                    </button>
                                    <div class="flex">
                                        <button type="button" class="btnWidgetRemove"
                                            v-on:click="widgetDelete(item,'top')">
                                            <span class="hidden">위젯삭제</span></button>
                                        <button type="button" class="btnWidgetEdit" v-on:click="widgetEdit(item)"
                                            v-if="['spatialAnalysisWidget'].includes(item)">
                                            <span class="hidden">위젯편집</span>
                                        </button>
                                    </div>
                                </div>
                            </template>
                            <button type="button" class="btnWidgetAdd" @click="widgetListShow('top')"><span
                                    class="hidden">위젯 추가</span></button>
                        </div>
                    </div>
                    <!--//widgetList-->
                </div>
                <!--//tabSec-->
                <!--tabSec-->
                <div class="tabSec">
                    <strong class="titSec">툴바 위젯</strong>
                    <!--widgetList-->
                    <div class="widgetList">
                        <div class="inner">

                            <template v-if="data.webAppOptions.detailSetting.widgetTab.toolbarWidget"
                                v-for="(item,index) in data.webAppOptions.detailSetting.widgetTab.toolbarWidget">
                                <div class="widgetBox">
                                    <button type="button" class="widget">
                                        <span class="imgBox">
                                            <img v-bind:src="widget[item].img" alt="이미지"/>
                                        </span>
                                        <span v-text="widget[item].text"></span>
                                    </button>
                                    <div class="flex">
                                        <button type="button" class="btnWidgetRemove"
                                            v-on:click="widgetDelete(item,'toolbar')">
                                            <span class="hidden">위젯삭제</span></button>
                                        <button type="button" class="btnWidgetEdit" v-on:click="widgetEdit(item)"
                                            v-if="['spatialAnalysisWidget'].includes(item)">
                                            <span class="hidden">위젯편집</span>
                                        </button>
                                    </div>
                                </div>
                            </template>
                            <button type="button" class="btnWidgetAdd" @click="widgetListShow('toolbar')"><span
                                    class="hidden">위젯 추가</span></button>
                        </div>
                    </div>
                    <!--//widgetList-->
                </div>
                <!--//tabSec-->
                <!--tabSec-->
                <div class="tabSec">
                    <strong class="titSec">하단 위젯</strong>
                    <!--widgetList-->
                    <div class="widgetList">
                        <div class="inner">
                            <template v-if="data.webAppOptions.detailSetting.widgetTab.bottomWidget"
                                v-for="(item,index) in data.webAppOptions.detailSetting.widgetTab.bottomWidget">
                                <div class="widgetBox">
                                    <button type="button" class="widget">
                                        <span class="imgBox">
                                            <img v-bind:src="widget[item].img" alt="이미지"/>
                                        </span>
                                        <span v-text="widget[item].text"></span>
                                    </button>
                                    <div class="flex">
                                        <button type="button" class="btnWidgetRemove"
                                            v-on:click="widgetDelete(item,'bottom')">
                                            <span class="hidden">위젯삭제</span></button>
                                        <button type="button" class="btnWidgetEdit" v-on:click="widgetEdit(item)"
                                            v-if="['spatialAnalysisWidget'].includes(item)">
                                            <span class="hidden">위젯편집</span>
                                        </button>
                                    </div>
                                </div>
                            </template>
                            <button type="button" class="btnWidgetAdd" @click="widgetListShow('bottom')"><span
                                    class="hidden">위젯 추가</span></button>
                        </div>
                    </div>
                    <!--//widgetList-->
                </div>
                <!--//tabSec-->

            </div>
    </widget-tab>