<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<info-tab inline-template ref="infoTab">
	<div class="tabCont">
	   <div class="sectionArea thin">
	       <!--tabSec-->
	       <div class="tabSec">
	           <strong class="titSec">정보창</strong>
	           <div class="tabTable">
	               <table v-if="data.webAppOptions.detailSetting">
	                   <caption>정보창</caption>
	                   <tbody>
                       <th><label>ㆍ정보창 내용</label></th>
	                   <tr scope="row">
	                       <td>
	                           <div class="fileSelect">
	                               <input class="fileLocal" disabled="disabled">
	                               <label for="headFile" class="btnFileSelect">위치지정</label>
	                               <input type="file" id="headFile" class="fileHidden" accept="image/*" @change="logoUpload">
	                           </div>
	                       </td>
	                   </tr>
	                   <tr>
	                       <td colspan="2">
                   		       <textarea style="width:100%;height:300px;" v-bind:value="data.webAppOptions.detailSetting.infoTab.head.info" ref="headInfo" ></textarea>
	                       </td>
	                   </tr>
	                   </tbody>
	               </table>
	           </div>
					<div class="btnArea flexRight" style="margin-top:10px;">
					     <button type="button" class="btn blue lg" @click="apply"><span>생성</span></button>
					</div>	  
	           <div class="tabTable">
	               <table v-if="data.webAppOptions.detailSetting">
	                   <tbody>
	                       <th><label>ㆍ생성된 정보창 </label></th>
	                   <tr scope="row">
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
	       <!--//tabSec-->
	       <!--tabSec-->
	   </div>
	</div>
</info-tab>