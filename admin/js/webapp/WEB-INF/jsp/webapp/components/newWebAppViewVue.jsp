<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="newWebAppView" class="app" style="background:#fafafa;">
	<div class="inner">
	    <div class="searchArea">
	        <div class="txtArea">
	            <strong class="tit">템플릿 구성 선택</strong>
	            <span class="desc">발행할 앱의 템플릿을 선택합니다.</span>
	        </div>
	        <div class="inputBox" style="display:none;">
	            <input type="text" style="width:370px;">
	            <button type="button" class="btn black"><span class="hidden">검색</span></button>
	        </div>
	    </div>
	</div>
	<div class="tempList">
	    <div class="inner">
	        <div class="temp" v-for="template in data.mapTemplateInfo" @click="initWebApp(template)" v-bind:id="template.type">
	            <div class="inner" >
	                <img v-bind:src="template.imgSrc" alt="썸네일"/>
	                <div class="txtBox">
	                    <strong class="tit">{{template.tit}}</strong>
	                    <p class="desc">{{template.desc}}</p>
	                </div>
	            </div>
	        </div>
	        <!-- <div class="btnArea flexRight" style="flex:1;align-items:flex-end;">
	            <button type="button" class="btn blue lg" @click="initWebApp"><span>웹앱 생성</span></button>
	        </div> -->
	    </div>
	</div>
</div>
