<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <div class="popup sm" style="width:400px; display:none;" id="landInfoWidgetModal">
        <!--head-->
        <div class="head blue">
            <strong class="titPop">부동산정보 설정</strong>
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
<!--                     <div class="titSec">
                        <strong></strong>
                    </div> -->
                    <!--changeWidgetIcon-->
                    <!--//changeWidgetIcon-->
                    <!--table-->
                    <div class="table innerTable cScroll hover txt-center analysisTable">
                        <table>
                            <caption>부동산정보 설정</caption>
                            <colgroup>
                                <col style="width:90px;">
                                <col style="width:90px;">
                                <col style="width:90px;">
                                <col style="width:auto;">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <div class="checkbox">
                                            <input type="checkbox" id="buildAll" value="all" @click="checkedAll($event)">
                                            <label for="buildAll"></label>
                                        </div>
                                    </th>
                                    <th @click="onChangeCategory('build')">세움터</th>
                                    <th scope="col">
                                        <div class="checkbox">
                                            <input type="checkbox" id="landAll" value="all" @click="checkedAll($event)">
                                            <label for="landAll"></label>
                                        </div>
                                    </th>
                                    <th @click="onChangeCategory('land')">크라스</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                <!-- v-for 문 돌리기. -->
                                <tr :key="item.landColumnId" v-for="item in landInfoList" class="analysis">
                                    <td colspan="4">
                                        <table>
                                            <colgroup>
                                                <col style="width:100px;">
                                                <col style="width:auto;">
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="checkbox">
                                                            <input type="checkbox" :id="item.landColumnId"
                                                                class="analysisCheck" :value="item.landColumnId"
                                                                v-model="checkedLandInfoList">
                                                            <label :for="item.landColumnId"></label>
                                                        </div>
                                                    </td>
                                                    <!-- <td>{{item.landColumnId}}
                                                        <input type="hidden" class="categoryId"
                                                            :value="item.categoryId" />
                                                    </td> -->
                                                    <td>{{item.landColumnName}}<input type="hidden" class="landColumnId"
                                                            :value="item.landColumnId" /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--//table-->
                </section>
                <!--//section-->
                <div class="btnArea flex sb" style="margin-top:20px;">
                    <button type="button" class="btn black2 lg" @click="checkedFalseAll"><span>초기화</span></button>
                    <button type="button" class="btn blue2 lg" @click="applyLandOption"><span>설정</span></button>
                </div>
            </div>
        </div>
        <!--//cont-->

    </div>