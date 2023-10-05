<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<detail-info-tab inline-template ref="detailInfo" v-if="data.webappView">
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
										<span class="titTable">
											{{data.webappView.webappTmplatSj}} </span>
										<template v-if="util.checkAuthority(data.webappView.registerId)">
											<button type="button" class="btnEdit txt" @click="editBoxShow('webappTmplatSj')">
												<span class="hidden">수정</span>
											</button>
											<div class="editBox input">
												<input type="text" style="width: 150px;" id="userAppSjEditBox" />
												<button type="button" class="btn black" @click="updateTmplatSj">
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
								<td>{{data.webappView.usePblonsipSeCodeNm}}</td>
								<td rowspan="4" style="border-left: 1px solid #e9e9e9;">
									<div class="innerMap">
										<div class="imgArea">
											<template v-if="data.webappView.thumbImageFileInfo">
												<img v-bind:src="data.webappView.thumbImageFileInfo" alt="썸네일" id="webappDetailThum" width="210"
													height="140" /> </template>
											<template v-else> <img alt="썸네일" id="webappDetailThum" style="display: none;" width="210"
													height="140" />
												<div class="noImg">
													<p>등록된 미리보기가 없습니다.</p>
												</div>
											</template>
											<template v-if="util.checkAuthority(data.webappView.registerId)">
												<button type="button" class="btnEdit img" @click="editBoxShow()">
													<span class="hidden">수정</span>
												</button>
												<div class="editBox img" style="flex-wrap: wrap;">
													<input type="file" ref="imgRealUploadBtn" accept="image/*" @change="imgToDataURL"
														style="display: none;" />
													<button type="button" class="btn grey2" @click="imgUpload" @mouseover="mouseover"
														@mouseleave="mouseleave">
														<span>업로드</span>
													</button>
													<button type="button" class="btn grey2" @click="imgCurrentDisplay" @mouseover="mouseover"
														@mouseleave="mouseleave">
														<span>현재화면</span>
													</button>
													<button type="button" class="btn grey2" @click="imgDelete" @mouseover="mouseover"
														@mouseleave="mouseleave">
														<span>삭제</span>
													</button>
													<button type="button" style="margin-top: 7px;" class="btn grey2 " @click="imgApply"
														@mouseover="mouseover" @mouseleave="mouseleave">
														<span>적용</span>
													</button>
													<button type="button" style="margin-top: 7px;" class="btn grey2" @click="imgRevert"
														@mouseover="mouseover" @mouseleave="mouseleave">
														<span>되돌리기</span>
													</button>
												</div>
											</template>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">최종수정일자</th>
								<td>{{data.webappView.updtDt}}</td>
							</tr>
							<tr>
								<th scope="row">등록 일시</th>
								<td>{{data.webappView.registDt}}</td>
							</tr>
							<tr>
								<th scope="row">템플릿 유형</th>
								<td>{{data.webappView.webappTmplatTyCodeNm}}</td>
							</tr>
							<tr>
								<th scope="row">상세설명</th>
								<td colspan="2">
									<div class="pos-r">
										<span>{{data.webappView.webappTmplatCn}}</span>
										<template v-if="util.checkAuthority(data.webappView.registerId)">
											<button type="button" class="btnEdit txt" @click="editBoxShow('webappTmplatCn')">
												<span class="hidden">수정</span>
											</button>
											<div class="editBox textarea">
												<textarea style="width: 543px; height: 45px;" id="userAppTmplatCnBox"></textarea>
												<button type="button" class="btn black" @click="updateTmplatCn">
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
				<div class="titSec">
					<strong>레이어 목록</strong>
				</div>
				<!--tabContWrap-->
				<div class="tabContWrap type03">
					<!--tabNav-->
					<template v-if="useLayerTab() ">
						<div class="tabNav">
							<ul class="tabList">
								<li :class="isActiveTab(item)" v-for="item in setLayerTab()" @click="onClickLayerTab(item)">
									{{item.tabName}}</li>
							</ul>
						</div>
					</template>
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
									<template v-if="webmapInfoList.length > 0">
										<tr v-for="item in getCurrentLayerList()">
											<td>{{item.usePblonsipSeCodeNm}}</td>
											<td>
												<div class="icoBox">
													<template v-if="item.lyrTySeCode=='0'"> <i class="ico ico-plane"><span
																class="hidden">타일(Tif업로드)</span></i>
													</template>
													<template v-if="item.lyrTySeCode=='1'"> <i class="ico ico-dot"><span
																class="hidden">포인트</span></i> </template>
													<template v-if="item.lyrTySeCode=='2'"> <i class="ico ico-line"><span
																class="hidden">라인</span></i> </template>
													<template v-if="item.lyrTySeCode=='3'"> <i class="ico ico-plane"><span
																class="hidden">폴리곤</span></i> </template>
													<template v-if="item.lyrTySeCode=='4'"> <i class="ico ico-dot"><span
																class="hidden">GeoTIFF(포인트보간분석)</span></i>
													</template>
												</div>
											</td>
											<td>{{item.lyrNm}}</td>
											<td>{{item.lyrNcm}}</td>
											<td>{{item.registDt}}</td>
										</tr>
									</template>
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
		<!--//tabCont-->
	</detail-info-tab>