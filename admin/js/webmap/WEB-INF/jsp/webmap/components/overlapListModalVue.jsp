<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="popup" style="width:500px; display:none" v-bind:style="styleObj" id="overlapListModal">
    <!--head-->
    <div class="head blue">
        <strong class="titPop">중첩 영상</strong>
        <div class="btnGroup">
            <button type="button" class="btnPopClose" @click="hide"><span class="hidden">팝업 닫기</span></button>
        </div>
    </div>
    <!--//head-->
    <!--cont-->
    <div class="cont">
        <div class="inner cScroll" style="max-height:650px;">
            <!--tabContWrap-->
            <div class="tabContWrap type04">

                <!--tabCont-->
                <div class="tabCont t10 active">
                    <div class="table innerTable cScroll hover txt-center overlapTable">
                        <table>
                            <caption>중첩 영상 목록</caption>
                            <colgroup>
                                <col style="width:50px;">
                                <col style="width:250px;">
                                <col style="width:auto;">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">
<!--                                         <div class="checkbox">
                                            <input type="checkbox" id="all" value="all" @click="checkedAll($event)">
                                            <label for="all"></label>
                                        </div> -->
                                    </th>
                                    <th scope="col">파일명</th>
                                    <th scope="col">날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- v-for 문 돌리기. -->
                                <tr :key="item.bcrnMapId" v-for="item in data.overlapLayerTotalList.list" class="overlap">
                                    <td colspan="3">
                                        <table>
                                            <colgroup>
                                                <col style="width:50px;">
                                                <col style="width:250px;">
                                                <col style="width:auto;">
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="checkbox">
                                                            <input type="checkbox" :id="item.bcrnMapId" :checked="data.overlapOrderList.find(v => v.lapId === item.bcrnMapId)? true:false"
                                                                class="overlapCheck" :value="item.bcrnMapNm" @click="checkOverlap($event)" >
                                                            <label :for="item.bcrnMapId"></label>
                                                        </div>
                                                    </td>
                                                    <td>{{item.bcrnMapNm}}</td>
                                                    <td>{{item.registDt | yyyyMMdd}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <!--//table-->
                    <!--pagination-->
                    <div class="pagination" v-if="data.overlapLayerTotalList.list.length !=0">
<!-- 					<div class="pagination"> -->
                        <button type="button" class="btnPagi first" @click="pagination(1)"><span class="hidden">맨 앞으로</span></button>
                        <button type="button" class="btnPagi prev" @click="pagination(data.paginationInfo.overlapList.prevPageNo)"><span class="hidden">이전</span></button>
                        <a href="#" v-for="page in data.paginationInfo.overlapList.pages" @click = "pagination(page)" v-bind:class="{active : activePage(page)}">
							{{page}}
						</a>
                        <button type="button" class="btnPagi next" @click="pagination(data.paginationInfo.overlapList.nextPageNo)"><span class="hidden">다음</span></button>
                        <button type="button" class="btnPagi last" @click="pagination(data.paginationInfo.overlapList.totalPageCount)" ><span class="hidden">맨 뒤로</span></button>
                    </div>
                    <!--//pagination-->
                    
                    <div class="resultArea" style="margin-top:8px;">
                        <dl>
                            <dt><strong><span>선택한 중첩 영상 순서</span></strong></dt>
                        </dl>
                    </div>
                    
                    <div class="table innerTable cScroll hover txt-center overlapOrderTable">
                        <table>
                            <caption>선택한 중첩 영상 목록</caption>
                            <colgroup>
                                <col style="width:50px;">
                                <col style="width:auto;">
                            </colgroup>
                            <tbody id="overlapOrder-tbody">                              
                            </tbody>
                        </table>
                    </div>
                    <!--//table-->                    
                    
<!-- 	    			<div class="toc_btnArea" style="justify-content: center;">
						<button class="toc_btnAddGroup" @click = "setting()" >설정</button>
					</div> -->
                    
                </div>
                <!--//tabCont-->
                <!--tabCont-->
                <div class="tabCont t10"></div>
                <!--//tabCont-->
                <!--tabCont-->
                <div class="tabCont t10"></div>
                <!--//tabCont-->
            </div>
            <!--//tabContWrap-->
        </div>
    </div>
    <!--//cont-->

</div>
<!--//popup-->