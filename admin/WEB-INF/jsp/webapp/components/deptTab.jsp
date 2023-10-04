<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<dept-tab inline-template ref="deptTab">
	<div class="tabCont">
	   <div class="sectionArea thin">
	       <!--tabSec-->
	       <div class="tabSec">
	           <strong class="titSec">협업 부서설정</strong>
	           <div class="tabTable">
	               <table v-if="data.webAppOptions.detailSetting">
	                   <caption>정보창</caption>
						<div class="btnArea flex" style="margin-top:10px;">
						     <button type="button" class="btn blue 1g" @click="apply"><span>협업 부서설정</span></button>
						</div>	                   
	               </table>
	           </div>
	       </div>
	       <!--tabSec-->
	       <div class="tabSec">
	    	   <div class="tabTable">
	               <table v-if="data.webAppOptions.detailSetting">
	                   <tbody>
	                   <tr>
	                       <th scope="row"><label>그리드부분</label></th>
	                       <td>
	                          
	                       </td>
	                   </tr>
	                   </tbody>
	               </table>
	           </div>	    
	       </div>
	       <!--//tabSec-->
	       <!--tabSec-->
	       <template v-if="['SES','JOR','STR'].includes(data.webAppOptions.mapTmplatTyCode)"> 
	       <div class="tabSec">
	           <strong class="titSec">섹션 설정</strong>
	           <div class="tabTable">
	               <table>
	                   <caption>섹션 설정</caption>
	                   <colgroup>
	                       <col style="width:90px;"/>
	                       <col style="width:auto;"/>
	                   </colgroup>
	                   <tbody>
	                   <tr>
	                       <th scope="row"><label>테마선택</label></th>
	                       <td>
	                           <button type="button" class="btnPopOpen" @click="themaPop()"><span class="hidden">팝업열기</span></button>
	                           <span v-text="themaText()">
	                           </span>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>배경색상</label></th>
	                       <td>
	                       	   <template v-if="data.webAppOptions.detailSetting.layoutTab">
	                           <i class="color colorPicker type02" id="sectionBackColorPicker" :style="{'background':data.webAppOptions.detailSetting.themaTab.section.backgroundColor}"></i>
	                           <span class="hex">{{data.webAppOptions.detailSetting.themaTab.section.backgroundColor}}</span>
	                           </template>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>폰트색상</label></th>
	                       <td>
	                           <i class="color colorPicker type02" id="sectionFontColorPicker" style="background-color: #333;"></i>
	                           <span class="hex">#333</span>
	                       </td>
	                   </tr>
	                   </tbody>
	               </table>
	           </div>
	       </div>
	       </template>
	   </div>
	</div>
</dept-tab>