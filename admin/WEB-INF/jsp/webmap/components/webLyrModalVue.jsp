<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

	<div class="popup" style="display:none;width:900px;" v-bind:style="styleObj" id="webLyrModal">
		<!--head-->
		<div class="head">
			<strong class="titPop">레이어 상세정보</strong>
			<div class="btnGroup">
				<button type="button" class="btnPopClose" @click="hide()"><span class="hidden">팝업 닫기</span></button>
			</div>
		</div>
		<!--//head-->
		<!--cont-->
		<div class="cont">
			<div class="inner cScroll" style="max-height:650px;">
				<!--section-->
				<section class="section type02">
					<div class="titSec">
						<strong>기본정보</strong>
					</div>
					<div class="table">
						<table>
							<caption>기본정보</caption>
							<colgroup>
								<col style="width:140px;">
								<col style="width:270px;">
								<col style="width:140px;">
								<col style="width:auto;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">레이어 명칭</th>
									<td>{{data.webLyr.lyrNm}}</td>
									<td id="webLayerModalTd" rowspan="2" colspan="2" style="border-left:1px solid #e9e9e9;">
										<div class="innerMap">
											<div class="imgArea">
												<template v-if="data.webLyr.base64">
													<img id="lyrThumnail" v-bind:src="data.webLyr.base64" alt="레이어 이미지11111">
												</template>
												<template v-else>
													<img id="lyrThumnail" alt="레이어 이미지22222" style="display:none;" width="210" height="140" />
													<div class="noImg" id="lyrThumnailNoImg">
														<p>등록된 미리보기가 없습니다.</p>
													</div>
												</template>
												<template v-if="util.checkAuthority(data.webLyr.registerId)">
													<button type="button" class="btnEdit img" @click="thumnailToggle()"><span
															class="hidden">수정</span></button>
													<div class="editButton editBox img" v-bind:class="{active :editBox.classObj.thumnail}">
														<button @click="imgUpload" type="button" class="btn grey2" @mouseover="mouseover"
															@mouseleave="mouseleve">
															<span>업로드</span></button>
														<input type="file" id="lyrThumnailUploadBtn" accept="image/*" @change="imgToDataURL"
															style="display:none;" />
														<button type="button" class="btn grey2" @click="imgCurrentDisplay()" @mouseover="mouseover"
															@mouseleave="mouseleve"><span>현재화면</span></button>
														<button type="button" class="btn grey2" @click="imgDelete()" @mouseover="mouseover"
															@mouseleave="mouseleve"><span>삭제</span></button>

														<button type="button" style="margin-top:7px;" class="btn grey2" @click="imgApply()"
															@mouseover="mouseover" @mouseleave="mouseleve"><span>적용</span></button>
														<button type="button" style="margin-top:7px;" class="btn grey2" @click="imgRecall()"
															@mouseover="mouseover" @mouseleave="mouseleve"><span>되돌리기</span></button>
													</div>
												</template>
											</div>
										</div>
									</td>
								</tr>

								<tr>
									<th scope="row">레이어 타입</th>
									<td v-text="lyrTySeCodeText(data.webLyr.lyrTySeCode)"></td>
								</tr>
								<tr v-show="userMapId && layerGroupSn">
									<th scope="row">레이어 별칭</th>
									<td>
										<div class="pos-r">
											<span>{{data.webLyr.lyrNcm}}</span>
											<template v-if="util.checkAuthority(data.webLyr.registerId)">
												<button type="button" class="btnEdit txt" @click="modifyShow('ncm')"><span
														class="hidden">수정</span></button>
												<div class="editBox textarea" v-bind:class="{active :editBox.classObj.ncm}">
													<textarea id="lyrNcmEdit" style="width:152px;height: 32px;margin-left: -3px;"></textarea>
													<button type="button" class="btn black" @click="modifyLyrNcm()"><span>적용</span></button>
													<button type="button" class="btn grey2" @click="modifyHide('ncm')"><span>취소</span></button>
												</div>
											</template>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">상세설명</th>
									<td colspan="3">
										<div class="pos-r">
											<span>
												{{data.webLyr.lyrDc}}
											</span>
											<template v-if="util.checkAuthority(data.webLyr.registerId)">
												<button type="button" class="btnEdit txt" @click="modifyShow('modify')"><span
														class="hidden">수정</span></button>
												<div class="editBox textarea" v-bind:class="{active :editBox.classObj.modify}">
													<textarea id="lyrDcEdit" style="width: 543px;height: 45px;margin-left: -3px;"></textarea>
													<button type="button" class="btn black" @click="modifyLyrDc()"><span>적용</span></button>
													<button type="button" class="btn grey2" @click="modifyHide('modify')"><span>취소</span></button>
												</div>
											</template>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">공유 범위</th>
									<!--                              (usePblonsipSeCode){ // 1(전체공유),5(부분공유),9(비공유)) -->
									<td v-text="shareText(data.webLyr.usePblonsipSeCode)"></td>
									<th scope="row">생성 일자</th>
									<td>{{data.webLyr.registDt}}</td>
								</tr>
								<tr>
									<th scope="row">데이터 건수</th>
									<td>0건</td>
									<th scope="row">다운로드</th>
									<td>
										<div class="tagList download">
											<a>
												<span class="tag green" @click="download('shape')">SHP</span>
											</a>
											<a>
												<span class="tag blue" @click="download('csv')">CSV</span>
											</a>
											<a>
												<span class="tag peacock" @click="download('geojson')">GeoJSON</span>
											</a>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
				<!--//section-->
				<template v-if="util.checkAuthority(data.webLyr.registerId)">
					<!--section-->
					<section class="section type02">
						<div class="titSec">
							<strong>공유현황</strong>
						</div>
						<!--tabContWrap-->
						<div class="tabContWrap type03">
							<!--tabNav-->
							<div class="tabNav">
								<ul class="tabList">
									<li @click="tabShow('all')" v-bind:class="{active :tabBtn.classObj.all}">전체 <span class="leng">(<span
												class="red" v-text=shareCnt('shareList')></span>건)</span></li>
									<li @click="tabShow('insts')" v-bind:class="{active :tabBtn.classObj.insts}">기관 <span
											class="leng">(<span class="red" v-text=shareCnt('instList')></span>건)</span></li>
									<li @click="tabShow('users')" v-bind:class="{active :tabBtn.classObj.users}">사용자 <span
											class="leng">(<span class="red" v-text=shareCnt('userList')></span>건)</span></li>
								</ul>
							</div>
							<!--//tabNav-->
							<!--tabCont-->
							<div class="tabCont active">
								<!--table-->
								<div class="table txt-center cScroll" style="height:335px;">
									<table>
										<caption>공유현황</caption>
										<colgroup>
											<col style="width:120px;">
											<col style="width:auto;">
											<col style="width:160px;">
											<col style="width:210px;">
										</colgroup>
										<thead>
											<tr>
												<th scope="col">구분</th>
												<th scope="col">기관/주소록 명</th>
												<th scope="col">이름</th>
												<th scope="col">공유 시작일자</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item,index) in shareList">
												<td>{{item.pblonsipScopeSeCodeNm}}</td>
												<td>{{item.orgnNm}}</td>
												<td>{{item.userNm}}</td>
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
				</template>
			</div>
		</div>
		<!--//cont-->

	</div>
	<!--//popup-->