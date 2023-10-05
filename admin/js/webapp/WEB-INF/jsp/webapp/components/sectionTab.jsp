<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<section-tab inline-template ref="sesTab">
		<div class="tabCont">
			<div class="flex jb">
				<input type="text" class="inputTabName blue" style="width:210px;margin-right:10px;" />
				<button type="button" class="btn btnOptAdd" @click="tabAdd('add')"><i class="ico ico-add2"></i><span>탭
						추가</span></button>
			</div>
			<!--dragList-->
			<div class="sortList">
				<!--item v-for 문 돌리기-->
				<template v-if="data.webAppOptions.detailSetting.sectionTab">
					<div class="item" v-for="(item) in data.webAppOptions.detailSetting.sectionTab.mainTab">
						<div class="editBox tocGroup">
							<input type="text" style="width:210px;">
							<button type="button" class="btn black"><span>적용</span></button>
							<button type="button" class="btn grey2"><span>취소</span></button>
						</div>
						<i class="handle"></i>
						<strong class="titGroup">{{item.tabName}}</strong>
						<input type="hidden" class="tabSn" :value="item.tabSn">
						<div class="btnGroup">
							<button type="button" class="btnSortEdit" @click="tabAdd('update', item)"><span
									class="hidden">수정</span></button>
							<button type="button" class="btnSortRemove" @click="removeTab(item)"><span
									class="hidden">삭제</span></button>
						</div>
					</div>
				</template>
				<!--//item-->
			</div>
			<!--//dragList-->
			<div class="checkbox sm">
				<input type="checkbox" id="chk01" />
				<label for="chk01">각 탭들의 동일한 지리적 위치를 표시하도록 동기화</label>
			</div>

		</div>
	</section-tab>