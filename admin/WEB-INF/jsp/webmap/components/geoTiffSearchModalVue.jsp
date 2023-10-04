<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="popup" style="width:800px; display:none" v-bind:style="styleObj" id="geoTiffSearchModal">

    <!-- head -->
    <div class="head">
    
        <strong class="titPop">래스터 레이어 (GeoTiff) 선택</strong>
        
        <div class="btnGroup">
            <button type="button" class="btnPopClose" @click="hide()">
            	<span class="hidden">팝업 닫기</span>
            </button>
        </div>
        
    </div>
    <!-- //head -->
    
    <!-- cont -->
    <div class="cont">
    
        <div class="inner cScroll" style="max-height:900px !important;">
        
            <div class="table">
           		<table class="layerSearch_layerListBox">
                    <colgroup>
                        <col style="width:10%;"/>
                        <col style="width:15%;"/>
                        <col style="width:15%;"/>
                        <col style="width:30%;"/>
                        <col style="width:auto;"/>
                    </colgroup>
                   
           			<thead>
	                    <tr>
	                    	<th>선택</th>
	                        <th>종류</th>
	                        <th>서비스</th>
	                        <th>레이어명</th>
	                        <th>레이어 설명</th>
	                    </tr>
           			</thead>
           			
					<!-- GeoTIFF or TIFF 목록 -->     
           			<tbody id="geoTiffList">
      								
           			</tbody>
	
           		</table>
           		
           		<!--pagination-->
                <div class="pagination">
                
                  <button type="button" class="btnPagi first" id="first_page"><span class="hidden">맨 앞으로</span></button>
                  <button type="button" class="btnPagi prev" id="prev_page"><span class="hidden">이전</span></button>
                  
                  <div id="pageNum">1</div> 
                  
                  <button type="button" class="btnPagi next" id="next_page"><span class="hidden">다음</span></button>
                  <button type="button" class="btnPagi last" id="last_page"><span class="hidden">맨 뒤로</span></button>
                  
              	</div>
                <!--//pagination-->

            </div>
			<div class="btnArea flexRight" style="margin-top:20px;">
			    <button type="button" @click="selectGeoTiff" class="btn green lg newMap"><span>적용</span></button>
            </div>
            
        </div>
        
    </div>
    <!-- //cont -->
	    
</div>
<!-- //popup -->