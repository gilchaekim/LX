<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="analysis">
	<!-- toc 1뎁스-->
    <div class="toc dep1">
        <div class="inner">
            <!--head-->
            <div class="head">
                <strong class="titToc">공간분석</strong>
                <div class="btnGroup">
                    <button type="button" class="btnTocHide"><span class="hidden">숨기기</span></button>
                </div>
            </div>
            <!--//head-->
            <!--cont-->
            <div id="spatialAnalysisWidget">
                
            </div>
            <!--//cont-->
        </div>
    </div>
    <!--// toc 1뎁스-->
    <!-- toc 2뎁스-->
    <div class="toc dep2 popupWidget" id="spatialAnalysisDetailDiv">
       <div class="inner">
           <!--head-->
           <div class="head">
               <div class="titBox">
                   <strong class="titToc" id="selectedAnalysisName"></strong>
               </div>
               <div class="btnGroup">
                   <button type="button" class="btnTocHide" id="btnTocHide_anal"><span class="hidden">숨기기</span></button>
                   <button type="button" class="btnTocClose" id="btnTocClose_anal"><span class="hidden">닫기</span></button>
               </div>
           </div>
           <!--//head-->
           <!--cont-->
           <div class="cont cScroll" >
              	<div id="spatialAnalysisDetailWidget"></div>
           <!--//cont-->
       	</div>
   	</div>
    <!--// toc 2뎁스-->
    	
   	</div>
</div>