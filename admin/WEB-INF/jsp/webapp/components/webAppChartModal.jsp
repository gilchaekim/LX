<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="popup" style="width: 400px; display: none" id="webAppChartModal">
	<!--head-->
	<div class="head blue">
		<strong class="titPop">차트설정</strong>
		<div class="btnGroup">
			<button type="button" class="btnPopClose" @click="hide">
				<span class="hidden">팝업 닫기</span>
			</button>
		</div>
	</div>
	<div class="chartWidgetArea" id="chartWidgetArea" style="background-color: white;"></div>
</div>
