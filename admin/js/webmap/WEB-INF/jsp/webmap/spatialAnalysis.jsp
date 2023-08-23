<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<style>
	
		#spatialAnalysisWidget::-webkit-scrollbar {
		    width: 0px;  
		}
		
		#spatialAnalysisWidget::-webkit-scrollbar-thumb {
		    background: #2F5597; /* 스크롤바 색상 */
		    border-radius: 10px; /* 스크롤바 둥근 테두리 */
		}
		
		#spatialAnalysisWidget::-webkit-scrollbar-track {
		    background: #2F5597;  /*스크롤바 뒷 배경 색상*/
		}
		
		#spatialAnalysisWidget{
			max-height:100%;
			overflow-y:auto;
			scrollbar-width: none;
			scrollbar-arrow-color: #2F5597;
			scrollbar-3dlight-color: #2F5597;
			scrollbar-darkshadow-color: #2F5597;
			scrollbar-face-color: #2F5597;
			scrollbar-hightlight-color: #2F5597;
			scrollbar-shadow-color: #2F5597;
			scrollbar-track-color: #2F5597;
			
		}
		
	</style>
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