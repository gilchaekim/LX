<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <div class="popup sm" style="width:440px; display:none;" id="spatialAnalysisWidgetModal">
        <!--head-->
        <div class="head blue">
            <strong class="titPop">공간분석 설정</strong>
            <div class="btnGroup">
                <button type="button" class="btnPopClose"><span class="hidden" @click="hide()">팝업 닫기</span></button>
            </div>
        </div>
        <!--//head-->
        <!--cont-->
        <div class="cont analysisSet">
            <div class="inner cScroll" style="max-height:650px;">
                <!--section-->
                <section class="section type02">
                    <div class="titSec">
                        <strong>공간 분석</strong>
                    </div>
                    <!--changeWidgetIcon-->
                    <div class="changeWidgetIcon">
                        <div class="inner">
                            <select title="카테고리" class="selectbox analysisOpt" @change="onChangeCategory($event)">
                                <option key="0" value="0">전체</option>
                                <option :key="item.categoryId" :value="item.categoryId" v-for="item in categoryList">
                                    {{item.categoryName}}
                                </option>
                            </select>
                            <input type="text" class="input analysisOpt" v-model="search"
                                @keyup.enter="searchAnalysis()" />
                            <button class="btn analysisOpt" @click="searchAnalysis()">검색</button>
                            <!-- <div>
                            <div class="widgetBox">
                                <button type="button" class="widget style">
                                    <img src="/smt/images/header/ico-tool-analysis-active.png" alt="스타일">
                                    <span>스타일</span>
                                </button>
                            </div>
                        </div>
                        <div class="fileSelect">
                            <label for="file04" class="btnFileSelect">셀렉트 박스?셀렉트 박스 vue를 이용한 data바인딩으로 select box</label>
                            <input class="fileLocal" value="" disabled="disabled">
                            <input type="file" id="file04" class="fileHidden">
                        </div> -->
                        </div>
                    </div>
                    <!--//changeWidgetIcon-->
                    <!--table-->
                    <div class="table innerTable cScroll hover txt-center analysisTable">
                        <table>
                            <caption>공간분석 설정</caption>
                            <colgroup>
                                <col style="width:70px;">
                                <col style="width:70px;">
                                <col style="width:auto;">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <div class="checkbox">
                                            <input type="checkbox" id="all" value="all" @click="checkedAll($event)">
                                            <label for="all"></label>
                                        </div>
                                    </th>
                                    <th scope="col">구분</th>
                                    <th scope="col">분석명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- v-for 문 돌리기. -->
                                <tr :key="item.analysisId" v-for="item in analysisList" class="analysis">
                                    <td colspan="3">
                                        <table>
                                            <colgroup>
                                                <col style="width:70px;">
                                                <col style="width:70px;">
                                                <col style="width:auto;">
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="checkbox">
                                                            <input type="checkbox" :id="item.analysisId"
                                                                class="analysisCheck" :value="item.analysisId"
                                                                v-model="checkedAnalysisList">
                                                            <label :for="item.analysisId"></label>
                                                        </div>
                                                    </td>
                                                    <td>{{item.categoryName}}
                                                        <input type="hidden" class="categoryId"
                                                            :value="item.categoryId" />
                                                    </td>
                                                    <td>{{item.analysisName}}<input type="hidden" class="analysisId"
                                                            :value="item.analysisId" /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- <tr>
                                    <td colspan="3">
                                        <table>
                                            <colgroup>
                                                <col style="width:70px;">
                                                <col style="width:70px;">
                                                <col style="width:auto;">
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="checkbox">
                                                            <input type="checkbox" id="chk-02">
                                                            <label for="chk-02"></label>
                                                        </div>
                                                    </td>
                                                    <td>분야1</td>
                                                    <td>설명설명설명설명설명</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="3">
                                        <table>
                                            <colgroup>
                                                <col style="width:70px;">
                                                <col style="width:70px;">
                                                <col style="width:auto;">
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="checkbox">
                                                            <input type="checkbox" id="chk-02">
                                                            <label for="chk-02"></label>
                                                        </div>
                                                    </td>
                                                    <td>분야1</td>
                                                    <td>설명설명설명설명설명</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr> -->

                            </tbody>
                        </table>
                    </div>
                    <!--//table-->
                </section>
                <!--//section-->
                <div class="btnArea flex sb" style="margin-top:20px;">
                    <button type="button" class="btn black2 lg"><span>취소</span></button>
                    <button type="button" class="btn blue2 lg" @click="applyAnalysisOption"><span>완료</span></button>
                </div>
            </div>
        </div>
        <!--//cont-->

    </div>