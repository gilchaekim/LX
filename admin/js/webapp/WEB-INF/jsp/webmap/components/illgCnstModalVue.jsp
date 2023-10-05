<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 
<div class="popup movie_pop movie_pop_layer" style="width:450px; display:none" v-bind:style="styleObj" id="illgCnstModal">
    <!--head-->
    <div class="head blue">
        <strong class="titPop">불법 건축물</strong>
        <div class="btnGroup">
            <button type="button" class="btnPopClose" @click="hide"><span class="hidden">팝업 닫기</span></button>
        </div>
    </div>
    <!--//head-->
    <!--cont-->
    <div class="cont">
        <div class="inner cScroll" style="max-height:650px;">
            <!--tabContWrap-->
            <div class="tabContWrap type01">
				
                <!--tabCont-->
                <div class="tabCont t10 active">
                
                    <div class="table_sec">
                    	<div class="table txt-center data_table ">
	                        <table>
	                            <caption>불법 건축물</caption>
	                            <colgroup>
	                                <col style="width:auto;">
	                            </colgroup>
	                            <thead>
	                                <tr>
	                                    
										<th scope="col" class="txt-left">
											<span class="txt">불법 건축물 주소</span>
										</th>
	                                </tr>
	                            </thead>
	                            <tbody id="illgCntsList">
									
								</tbody>
	                        </table>
	                    </div>
                    </div>
                    <!--//table-->
                    <!--pagination-->
                    <div class="pagination" v-if="data.illgCnstInfoTotalList.list.length !=0">
<!-- 					<div class="pagination"> -->
                        <button type="button" class="btnPagi first" @click="pagination(1)"><span class="hidden">맨 앞으로</span></button>
                        <button type="button" class="btnPagi prev" @click="pagination(data.paginationInfo.illgCnstInfoTotalList.prevPageNo)"><span class="hidden">이전</span></button>
                        <a href="#" v-for="page in data.paginationInfo.illgCnstInfoTotalList.pages" @click = "pagination(page)" v-bind:class="{active : activePage(page)}">
							{{page}}
						</a>
                        <button type="button" class="btnPagi next" @click="pagination(data.paginationInfo.illgCnstInfoTotalList.nextPageNo)"><span class="hidden">다음</span></button>
                        <button type="button" class="btnPagi last" @click="pagination(data.paginationInfo.illgCnstInfoTotalList.totalPageCount)" ><span class="hidden">맨 뒤로</span></button>
                    </div>
                    <!--//pagination-->
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