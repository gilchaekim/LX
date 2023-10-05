<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<detail-info-tab inline-template ref="detailInfo"
	v-if="data.webmapView.userMapInfo">
<div class="tabCont" v-bind:class="{'active' : classObj.active}">
	<!--section-->
	<section class="section type02">
		<!--table-->
		<div class="table">
			<table>
				<caption>기본정보</caption>
				<colgroup>
					<col style="width: 140px;" />
					<col style="width: 270px;" />
					<col style="width: auto;" />
				</colgroup>
				<tbody>
					<tr>
						<td colspan="3">
							<div class="pos-r">
								<span class="titTable">{{data.webmapView.userMapInfo.userMapSj}}</span>
								<template v-if="util.checkAuthority(data.webmapView.userMapInfo.registerId)">
									<button type="button" class="btnEdit txt" @click="editBoxShow('mapSj')">
										<span class="hidden">수정</span>
									</button>
									<div class="editBox input">
										<input type="text" style="width: 150px;" id="userMapSjEditBox"/>
										<button type="button" class="btn black"
											@click="updateUserMapSj">
											<span>적용</span>
										</button>
										<button type="button" class="btn grey2" @click="editBoxHide">
											<span>취소</span>
										</button>
									</div>
								</template>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공유 범위</th>
						<td>{{data.webmapView.userMapInfo.usePblonsipSeCode === "1" ?
							"전체공유" : data.webmapView.userMapInfo.usePblonsipSeCode === "5" ?
							"부분공유" : "비공유"}}</td>
						<td rowspan="3" style="border-left: 1px solid #e9e9e9;">
							<div class="innerMap">
								<div class="imgArea">
									<template v-if="data.webmapView.userMapInfo.imageFileData">
									<img v-bind:src="data.webmapView.userMapInfo.imageFileData"
										alt="썸네일" id="webMapDetailThum" width="210" height="140" /> </template>
									<template v-else> <img alt="썸네일" src=""
										id="webMapDetailThum" style="display: none;" width="210"
										height="140" />
									<div class="noImg">
										<p>등록된 미리보기가 없습니다.</p>
									</div>
									</template>
									<template v-if="util.checkAuthority(data.webmapView.userMapInfo.registerId)">
										<button type="button" class="btnEdit img" @click="editBoxShow()">
											<span class="hidden">수정</span>
										</button>
										<div class="editBox img" style="flex-wrap: wrap;">
											<input type="file" ref="imgRealUploadBtn" accept="image/*"
												@change="imgToDataURL" style="display: none;" />
											<button type="button" class="btn grey2" @click="imgUpload"
												@mouseover="mouseover" @mouseleave="mouseleave">
												<span>업로드</span>
											</button>
											<button type="button" class="btn grey2"
												@click="imgCurrentDisplay" @mouseover="mouseover"
												@mouseleave="mouseleave">
												<span>현재화면</span>
											</button>
											<button type="button" class="btn grey2" @click="imgDelete"
												@mouseover="mouseover" @mouseleave="mouseleave">
												<span>삭제</span>
											</button>
											<button type="button" style="margin-top: 7px;"
												class="btn grey2 " @click="imgApply" @mouseover="mouseover"
												@mouseleave="mouseleave">
												<span>적용</span>
											</button>
											<button type="button" style="margin-top: 7px;"
												class="btn grey2" @click="imgRevert" @mouseover="mouseover"
												@mouseleave="mouseleave">
												<span>되돌리기</span>
											</button>
										</div>
									</template>

								</div>
								<!-- <button type="button" class="btn blue sm"><span>지도 서비스로 보기</span><i class="ico rt ico-link2"></i></button> -->
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">최종수정일자</th>
						<td>{{data.webmapView.userMapInfo.updtDt}}</td>
					</tr>
					<tr>
						<th scope="row">등록 일시</th>
						<td>{{data.webmapView.userMapInfo.registDt}}</td>
					</tr>
					<tr>
						<th scope="row">상세설명</th>
						<td colspan="2">
							<div class="pos-r">
								<span>{{data.webmapView.userMapInfo.userMapCn}}</span>
								<template v-if="util.checkAuthority(data.webmapView.userMapInfo.registerId)">
									<button type="button" class="btnEdit txt" @click="editBoxShow('userMapCn')">
										<span class="hidden">수정</span>
									</button>
									<div class="editBox textarea">
										<textarea style="width: 543px; height: 45px;" id="userMapCnEditBox"></textarea>
										<button type="button" class="btn black"
											@click="updateUserMapCn">
											<span>적용</span>
										</button>
										<button type="button" class="btn grey2" @click="editBoxHide">
											<span>취소</span>
										</button>
									</div>
								</template>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--//table-->
	</section>
	<!--//section-->
	<!--section-->
	<section class="section type02">
	<div class="titSec" style=" margin-bottom: -8px; ">
		<strong>레이어 목록</strong>
	</div>
		<!--tabContWrap-->
		<div class="tabContWrap type03">
			<!--tabNav-->
			<div class="tabNav">
				<ul class="tabList">
<!-- 					<li class="active">레이어 목록</li> -->
<!-- 					<li>탭2</li> -->
				</ul>
			</div>
			<!--//tabNav-->
			<!--tabCont-->
			<div class="tabCont active">
				<!--table-->
				<div class="table txt-center cScroll" style="height: 232px;">
					<table>
						<caption>레이어 목록</caption>
						<colgroup>
							<col style="width: 108px;" />
							<col style="width: 155px;" />
							<col style="width: 170px;" />
							<col style="width: 170px;" />
							<col style="width: auto;" />
						</colgroup>
						<thead>
							<tr>
								<th scope="col">구분</th>
								<th scope="col">레이어형태</th>
								<th scope="col">레이어 명</th>
								<th scope="col">레이어별칭</th>
								<th scope="col">생성일/공유일</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for ="(item,index) in data.webmapView.lyrList">
								<td v-text="shareText(item.usePblonsipSeCode)">공유 레이어</td>
								<td>
									<div class="icoBox">
										<!--  dot, line, plane -->
										<template v-if="item.lyrTySeCode=='0'">
											<i class="ico ico-plane"><span class="hidden">타일(Tif업로드)</span></i>
										</template>
										<template v-if="item.lyrTySeCode=='1'">
											<i class="ico ico-dot"><span class="hidden">포인트</span></i>
										</template>
										<template v-if="item.lyrTySeCode=='2'">
											<i class="ico ico-line"><span class="hidden">라인</span></i>
										</template>
										<template v-if="item.lyrTySeCode=='3'">
											<i class="ico ico-plane"><span class="hidden">폴리곤</span></i>
										</template>
										<template v-if="item.lyrTySeCode=='4'">
											<i class="ico ico-dot"><span class="hidden">GeoTIFF(포인트보간분석)</span></i>
										</template>
									</div>
								</td>
								<td>{{item.lyrNm}}</td>
								<td>레이어 별칭</td>
								<td>{{item.registDt}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--//table-->
			</div>
			<!--//tabCont-->
			<!--tabCont-->
			<div class="tabCont"></div>
			<!--//tabCont-->
		</div>
		<!--//tabContWrap-->
	</section>
	<!--//section-->
</div>
<!--//tabCont--> </detail-info-tab>