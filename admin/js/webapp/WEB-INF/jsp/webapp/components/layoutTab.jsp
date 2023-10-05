<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<layout-tab inline-template ref="layoutTab">
	<div class="tabCont">
	    <div class="sectionArea thin">
	    	<template v-if="['STD','QUV','EDT','TMRZ','ALT','DPT'].includes(data.webAppOptions.mapTmplatTyCode)"> 
		        <div class="tabSec">
		            <strong class="titSec">{{data.webAppOptions.detailSetting.layoutTab.titSec}}</strong>
		            <!--layoutArea-->
		            <div class="layoutArea col2">
						<div class="row">
                			<template v-if="data.webAppOptions.detailSetting.layoutTab.type01">	
			                    <div class="layoutBox layoutBoxClickEvent" @click="layoutBoxClickEvent('type01')" id="type01">
			                        <img v-bind:src="data.webAppOptions.detailSetting.layoutTab.type01.imgSrc" alt="레이아웃박스"/>
			                    </div>
			                </template>
			                <template v-if="data.webAppOptions.detailSetting.layoutTab.type02">	
			                    <div class="layoutBox layoutBoxClickEvent" @click="layoutBoxClickEvent('type02')" id="type02">
			                        <img v-bind:src="data.webAppOptions.detailSetting.layoutTab.type02.imgSrc" alt="레이아웃박스"/>
			                    </div>
			                </template>
		                </div>
		                <div class="row">
                			<template v-if="data.webAppOptions.detailSetting.layoutTab.type03">	
			                    <div class="layoutBox layoutBoxClickEvent" @click="layoutBoxClickEvent('type03')" id="type03">
			                        <img v-bind:src="data.webAppOptions.detailSetting.layoutTab.type03.imgSrc" alt="레이아웃박스"/>
			                    </div>
			                </template>
			                <template v-if="data.webAppOptions.detailSetting.layoutTab.type04">	
			                    <div class="layoutBox layoutBoxClickEvent" @click="layoutBoxClickEvent('type04')" id="type04">
			                        <img v-bind:src="data.webAppOptions.detailSetting.layoutTab.type04.imgSrc" alt="레이아웃박스"/>
			                    </div>
			                </template>
		                </div>
		            </div>
		        </div>
	        </template>
	        <template v-if="['TMRZ'].includes(data.webAppOptions.mapTmplatTyCode)"> 
		        <div class="tabSec">
		            <strong class="titSec">타임 슬라이더 위치</strong>
		            <!--layoutArea-->
		            <div class="layoutArea col2">
						<div class="row">
                			<template v-if="data.webAppOptions.detailSetting.layoutTab.type05">	
			                    <div class="layoutBox layoutBoxClickEvent" @click="layoutBoxClickEvent('type05')" id="type05">
			                        <img v-bind:src="data.webAppOptions.detailSetting.layoutTab.type01.imgSrc" alt="레이아웃박스"/>
			                    </div>
			                </template>
			                <template v-if="data.webAppOptions.detailSetting.layoutTab.type06">	
			                    <div class="layoutBox layoutBoxClickEvent" @click="layoutBoxClickEvent('type06')" id="type06">
			                        <img v-bind:src="data.webAppOptions.detailSetting.layoutTab.type02.imgSrc" alt="레이아웃박스"/>
			                    </div>
			                </template>
		                </div>
		            </div>
		        </div>
	        </template>	
    		<template v-if="['TMRZ'].includes(data.webAppOptions.mapTmplatTyCode)"> 
		        <div class="tabSec">
		            <strong class="titSec">타임 슬라이더 설정</strong>
		            <!--layoutArea-->
			        <div class="tabTable">
			       		<table v-if="data.webAppOptions.detailSetting">
	                   <caption>헤더 정보</caption>
	                   <tbody>
	                   <tr>
	                 	     <th scope="row"><label>레이어 설정</label></th>
	                       <td>
	                     			<select>
	                       			<option>time slider test</option>
	                       		</select>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>컬럼 설정</label></th>
	                       <td>
	                   		    <select>
	                       			<option>시간</option>
	                       		</select>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>Date 타입</label></th>
	                       <td>
	                   		    <select>
	                       			<option>YYYYMMDD</option>
	                       			<option>YYYY-MM-DD</option>
	                       			<option>YYYY/MM/DD</option>
	                       			<option>YYYY_MM_DD</option>
	                       			<option>YYYYMMDD HHMM</option>
	                       			<option>YYYY-MM-DD HH:MM</option>
	                       			<option>YYYY/MM/DD HH:MM</option>
	                       			<option>YYYY-MM-DD HH:MM</option>
	                       		</select>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>Date 간격설정</label></th>
	                       <td>
	                   		    <select>
	                       			<option>연</option>
	                       			<option>월</option>
	                       			<option>주</option>
	                       			<option>일</option>
	                       			<option>시</option>
	                       			<option>분</option>
	                       		</select>
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row"><label>표출시간설정(초)</label></th>
	                       <td>
	                           <!-- <input type="text" v-bind:value="data.webAppOptions.detailSetting.themaTab.head.subTitle" ref="headSubTitle"/> -->
	                           <input type="text">
	                       </td>
	                   </tr>
	                   <tr>
	                       <th scope="row" class="va-t"><label>누적여부</label></th>
	                       <td>
	                       		<input type="checkbox" v-model="checked">
	                       </td>
	                   </tr>
	                   </tbody>
	               </table>
			       </div>
	          </div>
	     	  <div class="btnArea flexRight" style="margin-top:10px;">
			     <button type="button" class="btn blue lg" @click="apply"><span>생성</span></button>
			     <button type="button" class="btn blue lg" @click="apply"><span>초기화</span></button>
			   </div>
     	    </template>
	        <template v-if="['SES', 'JOR','STR','CMPR'].includes(data.webAppOptions.mapTmplatTyCode)">
	        	<div class="tabSec">
	                <strong class="titSec">헤더 정보</strong>
	                <!--layoutArea-->
	                <div class="layoutArea">
	                    <div class="row">
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutBoxClickEvent" @click="layoutBoxClickEvent('type01')" id="type01">
	                            <img src="/smt/images/webapp/img-layout-04-01.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                    </div>
	                    <div class="row">
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutBoxClickEvent" @click="layoutBoxClickEvent('type02')" id="type02">
	                            <img src="/smt/images/webapp/img-layout-04-02.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                    </div>
	                </div>
	                <!--//layoutArea-->
	            </div>
	            <!--//tabSec-->
	            <!--tabSec-->
	            <div class="tabSec">
	                <strong class="titSec">패널 사이즈 설정</strong>
	                <!--layoutArea-->
	                <div class="layoutArea col2">
	                    <div class="row">
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('userPer')" id="userPer">
	                            <img src="/smt/images/webapp/img-layout-05-01.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                        <div class="flex ab">
	                            <input type="text" style="width:134px;" id="panelSizeBox" placeholder="기본 : 470px"/>
	                            <span class="unit">PX</span>
	                        </div>
	                    </div>
	                    <div class="row">
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('per20')" id="per20">
	                            <img src="/smt/images/webapp/img-layout-05-02.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('per30')" id="per30">
	                            <img src="/smt/images/webapp/img-layout-05-03.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                    </div>
	                    <div class="row">
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('per40')" id="per40">
	                            <img src="/smt/images/webapp/img-layout-05-04.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('per50')" id="per50">
	                            <img src="/smt/images/webapp/img-layout-05-05.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                    </div>
	                </div>
	                <!--//layoutArea-->
	            </div>
<!-- 	            <div class="btnArea flexRight" style="margin-top:10px;"> -->
<!--                                 <button type="button" class="btn blue lg"><span>저장</span></button> -->
<!--                 </div> -->
	        </template>
        	<!--tabSec-->
            <template v-if="['CMPR'].includes(data.webAppOptions.mapTmplatTyCode)">
	            <div class="tabSec">
	                <strong class="titSec">콘텐츠 영역 설정</strong>
	                <!--layoutArea-->
	                <div class="layoutArea col2">
	                    <div class="row">
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('userPer')" id="userPer">
	                            <img src="/smt/images/webapp/img-layout-05-01.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                        <div class="flex ab">
	                            <input type="text" style="width:134px;" id="panelSizeBox" placeholder="기본 : 470px"/>
	                            <span class="unit">PX</span>
	                        </div>
	                    </div>
	                    <div class="row">
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('per20')" id="per20">
	                            <img src="/smt/images/webapp/img-layout-05-02.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('per30')" id="per30">
	                            <img src="/smt/images/webapp/img-layout-05-03.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                    </div>
	                    <div class="row">
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('per40')" id="per40">
	                            <img src="/smt/images/webapp/img-layout-05-04.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                        <!--layoutBox-->
	                        <div class="layoutBox layoutPenelBoxClickEvent" @click="layoutPenelBoxClickEvent('per50')" id="per50">
	                            <img src="/smt/images/webapp/img-layout-05-05.png" alt="레이아웃박스"/>
	                        </div>
	                        <!--//layoutBox-->
	                    </div>
	                </div>
	                <!--//layoutArea-->
	            </div>
            </template>
	    </div>

	</div>
</layout-tab>