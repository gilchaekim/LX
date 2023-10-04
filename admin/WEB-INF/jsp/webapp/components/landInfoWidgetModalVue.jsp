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
            
				<div class="section">
					<div class="mui_form_field">
						<span class="form_body select">
							<p class="label">항목</p>
							<select name="" id="" @change="onChangeCategory($event)">
								<option value="build">세움터</option>
								<option value="land">크라스</option>
							</select>
					</div>            
            
					<div class="table_sec">
						<div class="table txt-center data_table analysisTable">
							<table>
								<caption>부동산 항목</caption>
								<colgroup>
									<col style="width:50px;">
									<col style="width:auto;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">
											<div class="checkbox">
												<input type="checkbox" :id="currentGubn" value="all" @click="checkedAll($event)">
												<label :for="currentGubn"></label>
											</div>
										</th>
										<th scope="col" class="txt-left">
											세부항목
										</th>
									</tr>
								</thead>
                                <tbody>
                                    <tr :key="item.landColumnId" v-for="item in landInfoList" class="analysis">
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
                                        <td class="txt-left">{{item.landColumnName}}<input type="hidden" class="landColumnId"
                                                :value="item.landColumnId" /></td>
                                    </tr>
                                </tbody>								
								
							</table>
						</div>
					</div>            
				</div>            
                <!--//section-->
                <div class="btnArea flex sb" style="margin-top:20px;">
                    <button type="button" class="btn black2 lg" @click="checkedFalseAll"><span>초기화</span></button>
                    <button type="button" class="btn blue2 lg" @click="applyLandOption"><span>설정</span></button>
                </div>
            </div>
        </div>
        <!--//cont-->

    </div>