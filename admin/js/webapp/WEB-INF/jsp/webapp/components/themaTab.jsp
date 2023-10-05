<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<thema-tab inline-template ref="themaTab">
	<div class="tabCont">
	   <div class="sectionArea thin">
	       <!--tabSec-->
	       <div class="tabSec">
	           <strong class="titSec">헤더 정보</strong>
	           <div class="tabTable">
	               <table v-if="data.webAppOptions.detailSetting">
	                   <caption>헤더 정보</caption>
	                   <tbody>
	                   <tr>
	                       <th scope="row"><label>타이틀 로고</label></th>
	                       <td>
	                           <div class="fileSelect">
	                               <input class="fileLocal" disabled="disabled">
	                               <label for="headFile" class="btnFileSelect">찾아보기</label>
	                               <input type="file" id="headFile" class="fileHidden" accept="image/*" @change="logoUpload">
	                           </div>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>타이틀 링크</label></th>
	                       <td>
	                           <input v-bind:value="data.webAppOptions.detailSetting.themaTab.head.logoLink === '#' ? '' : data.webAppOptions.detailSetting.themaTab.head.logoLink" type="text" ref="headTitleLink"/>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>타이틀</label></th>
	                       <td>
	                           <input type="text" v-bind:value="data.webAppOptions.detailSetting.themaTab.head.title" ref="headTitle"/>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>서브 타이틀</label></th>
	                       <td>
	                           <input type="text" v-bind:value="data.webAppOptions.detailSetting.themaTab.head.subTitle" ref="headSubTitle"/>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row" class="va-t"><label>정보</label></th>
	                       <td style="padding:5px 0;">
	                           <textarea style="width:216px;height:55px;" v-bind:value="data.webAppOptions.detailSetting.themaTab.head.info" ref="headInfo" ></textarea>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>배경색상</label></th>
	                       <td>
	                           <i class="color colorPicker type02" id="headBackColorPicker"></i>
	                           <span class="hex"></span>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>폰트색상</label></th>
	                       <td>
	                           <i class="color colorPicker type02" id="headFontColorPicker"></i>
	                           <span class="hex"></span>
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
	       <div class="tabSec">
	           <strong class="titSec" style="display: inline-block;">푸터 설정</strong>&nbsp;&nbsp;&nbsp;&nbsp;
	           <input type="checkbox" name="footerSetting" v-model="footUseYn">
	           <label for="footerSetting">{{footUseYn ? "사용" : "미사용"}}</label>
	           <div class="tabTable" v-show="footUseYn">
	               <table>
	                   <caption>푸터 설정</caption>
	                   <colgroup>
	                       <col style="width:90px;"/>
	                       <col style="width:auto;"/>
	                   </colgroup>
	                   <tbody>
	                   <tr>
	                       <th scope="row" class="va-t"><label>내용</label></th>
	                       <td style="padding:5px 0;">
	                           <textarea style="width:216px;height:55px;" v-bind:value="data.webAppOptions.detailSetting.themaTab.foot.desc" ref="footDesc"></textarea>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>배경색상</label></th>
	                       <td>
	                           <i class="color colorPicker type02" id="footBackColorPicker"></i>
	                           <span class="hex"></span>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>폰트색상</label></th>
	                       <td>
	                           <i class="color colorPicker type02" id="footFontColorPicker"></i>
	                           <span class="hex"></span>
	                       </td>
	                   </tr>
	                   </tbody>
	               </table>
	           </div>
	       </div>
	       <!--//tabSec-->
	   </div>
		<div class="btnArea flexRight" style="margin-top:10px;">
		     <button type="button" class="btn blue lg" @click="apply"><span>적용</span></button>
		</div>
	</div>
</thema-tab>