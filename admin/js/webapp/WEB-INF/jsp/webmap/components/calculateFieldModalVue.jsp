<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="popup" style="width:500px; display:none" v-bind:style="styleObj" id="calculateFieldModal">
    <!-- head -->
    <div class="head">
        <strong class="titPop">필드 계산</strong>
        <div class="btnGroup">
            <button type="button" class="btnPopClose" @click="hide()"><span class="hidden">팝업 닫기</span></button>
        </div>
    </div>
    <!-- //head --> 
    <!-- cont -->
    <div class="cont">
        <div class="inner cScroll" style="max-height:650px;">
            <div class="table">
            		<table>
                    <colgroup>
                        <col style="width:50%;"/>
                        <col style="width:30%;"/>
                        <col style="width:auto;"/>
                    </colgroup>
            			<thead>
	                    <tr>
	                        <th scope="row"><span class="redDot"></span>필드</th>
	                        <th scope="row"><span class="redDot"></span>단위</th>
	                        <th scope="row"><span class="redDot"></span>삭제</th>
	                    </tr>
            			</thead>
            			<tbody id="calculateFields">     				
            			</tbody>
            		</table>
            </div>
			<div class="btnArea flexRight" style="margin-top:20px;">
			    <button type="button" @click="addCalculateField" class="btn green lg newMap"><span>추가</span></button>
                <button type="button" @click="saveCalculateField" class="btn blue lg newMap"><span>적용</span></button>
            </div>            
        </div>
    </div>
    <!-- //cont -->

</div>
<!-- //popup -->