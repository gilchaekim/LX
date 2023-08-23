<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<alarm-modal inline-template ref="alarmModal">
	<div class="alarmPop" style="display:none">
   		<button type="button" class="btnPopClose" @click="close()"><span class="hidden">닫기</span></button>
	   <!--head-->
	   	<div class="head">
			<strong class="titPop">알림</strong>
	   	</div>
	   	<!--//head-->
	   	<!--cont-->
	   	<div class="cont">
			<div class="cScroll" @scroll="infinityScroll" style="height:400px;">
				<div class="inner">
					<div class="alarmList">
						<!--dayBox-->
							<template v-if="data.alarmData.today.todayAlarmArray">
								<div class="dayBox">
									<div class="date today"><!-- 다른날일시 today 제거 -->
										<p>{{data.alarmData.today.date}} <span>(오늘)</span></p>
									</div>
									<template v-for="item in data.alarmData.today.todayAlarmArray">
										<div class="log">
											<div class="btnGroup">
												<template v-if="item.opertClCode === 'MPD013'">
													<button type="button" class="btnLogAdd" @click="setGrid(item.opertNtcnId, item.lyrNm, item.opertProcessSeCode, item.opertCn)"><span class="hidden">추가</span></button>
				                                </template>
				                                <template v-else>
				                                	<button type="button" class="btnLogAdd" @click="setToc(item.opertNtcnSn, item.lyrNm)"><span class="hidden">추가</span></button>
				                                </template>
				                                <button type="button" class="btnLogRemove" @click="deleteAlarm(item.opertNtcnId)"><span class="hidden">삭제</span></button>
				                            </div>
				                            <template v-if="item.opertClCode !== 'MPD015'">
					                            <div class="inner">
					                                <p>
					                                    <strong>{{item.opertClSeCode == null ?  "지오코딩" : item.opertClSeCodeNm }} {{item.opertProcessSeCode == 5 ? "완료" : "실패"}}</strong>
					                                    <i class="newAlarm"><span class="hidden">새글</span></i>
					                                </p>
					                                <span>{{item.lyrNm}}</span>
					                            </div>
				                            </template>
				                            <template v-else>
					                            <div class="inner">
					                                <p>
					                                    <strong>{{item.lyrNm}}</strong>
					                                    <i class="newAlarm"><span class="hidden">새글</span></i>
					                                </p>
					                                <span>{{item.userId}}</span>
					                            </div>
				                            </template>
				                       	 </div>
			                   		</template>
								</div>
							</template>
							<template v-for="etc in data.alarmData.etcDay">
								<div class="dayBox">
									<div class="date"><!-- 다른날일시 today 제거 -->
										<p>{{etc.date}} <span></span></p>
									</div>
									<template v-for="item in etc.alarm">
										<div class="log">
											<div class="btnGroup">
												<template v-if="item.opertClCode === 'MPD013'">
													<button type="button" class="btnLogAdd" @click="setGrid(item.opertNtcnId, item.lyrNm, item.opertProcessSeCode, item.opertCn)"><span class="hidden">추가</span></button>
				                                </template>
				                                <template v-else>
				                                	<button type="button" class="btnLogAdd" @click="setToc(item.opertNtcnSn, item.opertNtcnId, item.lyrNm)"><span class="hidden">추가</span></button>
				                                </template>
				                                <button type="button" class="btnLogRemove" @click="deleteAlarm(item.opertNtcnId)"><span class="hidden">삭제</span></button>
				                            </div>
				                            <template v-if="item.opertClCode !== 'MPD015'">
					                            <div class="inner">
					                                <p>
					                                   <strong>{{item.opertClSeCode == null ?  "지오코딩" : item.opertClSeCodeNm }} {{item.opertProcessSeCode == 5 ? "완료" : "실패"}}</strong>
					                                </p>
					                                <span>{{item.lyrNm}}</span>
					                            </div>
				                            </template>
				                            <template v-else>
					                            <div class="inner">
					                                <p>
					                                    <strong>{{item.lyrNm}}</strong>
					                                </p>
					                                <span>{{item.userId}}</span>
					                            </div>
				                            </template>
				                       	 </div>
			                   		</template>
								</div>
							</template>
	                   <!--//dayBox-->
	               </div>
	           </div>
	       </div>
	   </div>
	   <!--//cont-->
	</div>
</alarm-modal>