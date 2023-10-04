<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<main-tab inline-template ref="mainTab">
		<div class="tabCont active">
			<span>화면1</span> 
			<!--tabContWrap-->
			<div class="tabContWrap type06">
				<!--tabNav-->
				<template v-if="['SES','JOR'].includes(data.webAppOptions.mapTmplatTyCode)">
					<div class="tabNav">
						<ul class="tabList">
							<li class="active">지도</li>
							<li>이미지</li>
							<li>비디오</li>
							<li>Web URL</li>
						</ul>
					</div>
				</template>
				<!--//tabNav-->
				<!--tabCont-->
				<div class="tabCont active">
					<div class="inner">
						<!--secInner-->
						<div class="secInner">
							<label>지도 선택</label>
							<div class="fileSelect">
								<input class="fileLocal" v-bind:value="webmap.userMapSj" disabled="disabled" style="flex:1;">
								<label class="btnFileSelect" @click="webMapSearchClickEvent">갤러리검색</label>
							</div>
						</div>
						<!--//secInner-->
						<!--secInner-->
						<div class="secInner">
							<label>지도 시작 좌표 및 배율 선택</label>
							<div class="flex">
								<button type="button" class="btn innerSec" @click="mapScopeInit()">
									<i class="ico ico-location"></i><span>지도에서 선택</span>
								</button>
							</div>
						</div>
						<!--//secInner-->
						<!--secInner-->
						<template v-if="mapScope">
						<div class="secInner" v-show="mapScope.useYn">
							<label style="margin-bottom: 4px;">선택 좌표</label>
							<div class="flex" v-for="value in mapScope.center" @click="mapScopeMove()" style="cursor:pointer;">
								{{value}}
							</div>
							맵 줌 : {{mapScope.zoom}}
						</div>
						</template>
						<!--//secInner-->
						<div class="btnArea flexRight" style="margin-top:20px;">
							<button type="button" class="btn blue lg"><span>저장</span></button>
						</div>
					</div>
				</div>
				<div class="widgetList">
					<div class="inner"> 
						<button type="button" class="btnWidgetAdd">
							<span class="hidden">위젯 추가</span>
						</button>
					</div>
				</div>
				<!--//tabCont-->
				<!--tabCont-->
				<div class="tabCont">
					<div class="inner">
						<!--secInner-->
						<div class="secInner">
							<label>이미지 업로드</label>
							<div class="fileSelect">
								<input class="fileLocal" value="" disabled="disabled" style="flex:1;">
								<label for="file05" class="btnFileSelect">이미지검색</label>
								<input type="file" id="file05" class="fileHidden">
							</div>
						</div>
						<!--//secInner-->
						<!--secInner-->
						<div class="secInner">
							<label>웹이미지 URL</label>
							<div class="flex">
								<input type="text" style="flex:1;">
								<button type="button" class="btn innerSec"><span>미리보기</span></button>
							</div>
						</div>
						<!--//secInner-->
						<p class="tip red">
							<i>* 두가지 방식 중 하나만 선택해주세요</i>
						</p>
						<div class="btnArea flexRight" style="margin-top:10px;">
							<button type="button" class="btn blue lg"><span>저장</span></button>
						</div>
					</div>
				</div>
				<!--//tabCont-->
				<!--tabCont-->
				<div class="tabCont">
					<div class="inner">
						<!--secInner-->
						<div class="secInner">
							<label>비디오 URL</label>
							<div class="flex">
								<input type="text" style="flex:1;">
								<button type="button" class="btn innerSec"><span>미리보기</span></button>
							</div>
						</div>
						<!--//secInner-->
						<div class="btnArea flexRight" style="margin-top:20px;">
							<button type="button" class="btn blue lg"><span>저장</span></button>
						</div>
					</div>
				</div>
				<!--//tabCont-->
				<!--tabCont-->
				<div class="tabCont">
					<div class="inner">
						<!--secInner-->
						<div class="secInner">
							<label>Web URL</label>
							<div class="flex">
								<input type="text" style="flex:1;">
							</div>
						</div>
						<!--//secInner-->

					</div>
				</div>
				<!--//tabCont-->
			</div>
			<!--/tabContWrap-->
		</div>
	</main-tab>