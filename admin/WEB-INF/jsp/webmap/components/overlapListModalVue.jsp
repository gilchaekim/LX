<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="popup movie_pop movie_pop_layer" style="width:450px; display:none" v-bind:style="styleObj" id="overlapListModal">
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
            <div class="tabContWrap type01">
				<div class="tabNav">
					<ul class="tabList">
					<li id="dronTab" class="active">드론영상</li> 
					<li id="userUploadTab" class="">사용자 업로드</li> 
					</ul>
				</div>
                <!--tabCont-->
                <div class="tabCont t10 active">
                	<div class="mui_form_field">
						<span class="form_body select">
							<p class="label">날짜 선택</p>
							<select name="yyyyMMSel" id="yyyyMMSel">
								<!-- <option value="">0000.00.00</option> -->
							</select>
						</span>
						<!-- <span class="form_body select">
							<p class="label">지구 단위</p>
							<select name="" id="">
								<option value="">0000.00.00</option>
							</select>
						</span> -->
						<span class="form_body select_group">
							<select name="ctpvSel" id="ctpvSel">
								<!-- <option value="">시/도</option> -->
							</select>
							<select name="sggSel" id="sggSel">
								<!-- <option value="">시/군/구</option> -->
							</select>
							<select name="emdSel" id="emdSel">
								<!-- <option value="">읍/면/동</option> -->
							</select>
						</span>
						<span class="form_body btns">
							<button type="button" class="search" @click="init()"><span>검색</span></button>
							<button type="button" class="write" id="drawControl_droneBoxBtn" @click="controlBox()"><span>사각형</span></button>
						</span>
					</div>
                	
                	<!-- <div class="inner">
	                	<div class="secInner">
			                <div class="fileSelect">
			                	<select name="yyyyMMSel" id="yyyyMMSel" style="width:200px;">
								</select>
							</div>
							<div class="fileSelect">	
								<select name="ctpvSel" id="ctpvSel" style="width:100px;">
								</select>
								<select name="sggSel" id="sggSel" style="width:100px;">
								</select>
								<select name="emdSel" id="emdSel" style="width:100px;">
								</select>
								<button class="drawControl_droneBoxBtn" id="drawControl_droneBoxBtn" @click="controlBox()">사각형</button>
								<button type="button" @click="init()" class="layerSearch_btnSearch undefined" value="검색">
								
		                	</div>
	                	</div> 
	                	
	                </div> --> 	
                    <div class="table_sec">
                    	<div class="table txt-center data_table ">
	                        <table>
	                            <caption>중첩 영상 목록</caption>
	                            <colgroup>
	                                <col style="width:50px;">
	                                <col style="width:auto;">
	                                <col style="width:150;">
	                            </colgroup>
	                            <thead>
	                                <tr>
	                                    <th scope="col">
	<!--                                         <div class="checkbox">
	                                            <input type="checkbox" id="all" value="all" @click="checkedAll($event)">
	                                            <label for="all"></label>
	                                        </div> -->
	                                    </th>
	                                    <th scope="col" class="txt-left">
											<span class="txt">파일명</span>
										</th>
										<th scope="col" class="txt-left">
											<span class="txt">날짜</span>
										</th>
	                                </tr>
	                            </thead>
	                            <tbody id="droneList">
									
								</tbody>
	                           <!--  <tbody>
									<tr class="overlap">
	                                    <td colspan="3">
	                                        <table>
	                                            <colgroup>
	                                                <col style="width:50px;">
	                                                <col style="width:auto;">
	                                                <col style="width:150;">
	                                            </colgroup>
	                                            <tbody id="droneList">
	                                                
	                                            </tbody>
	                                        </table>
	                                    </td>
	                                </tr>
	
	                            </tbody> -->
	                        </table>
	                    </div>
                    </div>
                    <!--//table-->
                    <!--pagination-->
                    <div class="pagination">
                      <button type="button" class="btnPagi first" id="first_page"><span class="hidden">맨 앞으로</span></button>
                      <button type="button" class="btnPagi prev" id="prev_page"><span class="hidden">이전</span></button>
                      <div id="pagesNum"></div> 
                      <button type="button" class="btnPagi next" id="next_page"><span class="hidden">다음</span></button>
                      <button type="button" class="btnPagi last" id="last_page"><span class="hidden">맨 뒤로</span></button>
                    </div>
                    <!--//pagination-->
                    
                    <div class="movie_list">
                    	<p class="title">선택한 중첩 영상 순서</p>
                    	<div id="overlapOrder-tbody">
	                    	
						</div>
                        <!-- <table>
                            <caption>선택한 중첩 영상 목록</caption>
                            <colgroup>
                                <col style="width:50px;">
                                <col style="width:50px;">
                                <col style="width:auto;">
                            </colgroup>
                            <tbody id="overlapOrder-tbody">                              
                            </tbody>
                        </table> -->
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