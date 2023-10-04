<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="optionTable" class="gridWidget active" style="display:none;">
	<div class="inner">
	    <!--head-->
	    <div class="head">
	        <strong class="titOpTable">속성 테이블</strong>
	        <div class="btnGroup">
	        	<button type="button" class="btn scale up" style="display: flex;"><span class="hidden">확대</span></button>
                        <button type="button" class="btn scale down" style="display: none;"><span class="hidden">축소</span></button>
	            <button type="button" class="btnOpTableHide"><span class="hidden">숨기기</span></button>
	            <button type="button" class="btnOpTableClose" @click="optionTableHide()"><span class="hidden">닫기</span></button>
	        </div>
	    </div>
	    <!--//head-->
	    <!--cont-->
	    <div class="cont" id="gridWidget">
	    </div> 
	    <!--//cont-->
	</div>
</div>
<!-- //optionTable -->