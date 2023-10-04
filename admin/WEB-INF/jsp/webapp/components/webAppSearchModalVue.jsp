<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="popup" style="width:1000px; display:none;" id="webAppSearchModal" v-bind:style="styleObj">  
    <!--head-->
    <div class="head blue">
        <strong class="titPop">웹앱 검색</strong>
        <div class="btnGroup">
            <button type="button" class="btnPopClose" @click="hide"><span class="hidden">팝업 닫기</span></button>
        </div>
    </div>
    <!--//head-->
    <!--cont-->
    <div class="cont">
        <div class="inner cScroll" style="max-height:650px;">
            <!--tabContWrap-->
            <div class="tabContWrap type04">
                <div class="titSec"><strong>내 웹앱</strong></div>
                <!--tabNav-->
               <!--  <div class="tabNav">
                     <ul class="tabList">
                        <li @click="tabShow('all')" v-bind:class="{active :tabBtn.classObj.all}">전체</li>
                        <li @click="tabShow('user')" v-bind:class="{active :tabBtn.classObj.user}">내 웹앱</li>
                        <li @click="tabShow('share')" v-bind:class="{active :tabBtn.classObj.share}">공유 웹앱</li>
                    </ul>
                </div> -->
                <!--//tabNav-->
                <!--tabCont-->
                <div class="tabCont t10 active">
                    <!--resultArea-->
                    <div class="resultArea">
                        <dl style="min-width : 341px;">
                         <dt><strong>전체 <span class="blue">{{data.webappList.pageInfo.totalWebappTmplatCount}}</span>건</strong></dt>
                            <!-- <dd><strong>전체공유 <span class="blue">{{data.webappList.pageInfo.fullShareWebappTmplatCount}}</span>건</strong></dd>
                            <dd><strong>부분공유 <span class="blue">{{data.webappList.pageInfo.partialShareWebappTmplatCount}}</span>건</strong></dd>
                            <dd><strong>비공유 <span class="blue">{{data.webappList.pageInfo.noneShareWebappTmplatCount}}</span>건</strong></dd> -->
                        </dl>
                        <!--searchArea-->
                        <select title="원하는 템플릿 고르기" v-model="webappTmplatTyCode" style="width: 94px; margin-left: 80px;">
	                        <option value="">전체</option>
	                        <option value="STD">표준</option>
	                        <option value="QUV">간편보기</option>
	                        <option value="EDT">편집</option>
	                        <option value="SES">시리즈</option>
	                        <option value="JOR">저널</option>
                        </select>
                        
                        <div class="searchArea">
                            <div class="inputBox">
                            <input id="appSearchKeyword" type="text" style="width:370px;" @keyup.enter="searchKeyword()"/>
                                <button type="button" class="btn black" @click="searchKeyword()"><span class="hidden" >검색</span></button>
                            </div>
                        </div>
                        <!--//searchArea-->
                    </div>
                    <!--//resultArea-->
                    <!--cardList-->
                    
                    <div class="cardList">
 	 	 		    <!--card-->
 	 	 		     
                        <div class="card"  v-for ="(item,index) in data.webappList.list">
                            <button type="button" class="btnCardClose" v-if="tab =='user'" @click="remove(index)"><span class="hidden">닫기</span></button>
                           <template v-if="item.thumbImageFileInfo">
                            <div class="imgArea">
                                <img @click="detail(index)" style="height:100%;" v-bind:src="item.thumbImageFileInfo" alt="웹앱"/>
                            </div>
                           </template>
                        	<template v-else>
	                         		<img alt="웹 앱 이미지22" style="display:none;" width="210" height="140"/>
		                           	<div @click="detail(index)" class="noImg" style="height:293.02px;">
	                                       <p>등록된 미리보기가 없습니다.</p>
	                                  </div>
	                        </template> 
                           
                           
                            <div class="txtArea">
                                <button type="button" class="btnCardShare"><span class="hidden">공유</span></button>
                                <div class="inner">
                                    <strong class="titCard">{{item.webappTmplatSj}}</strong>
                                    <ul class="info">
                                        <li class="green">{{item.usePblonsipSeCodeNm}}</li>
                                        <li>{{item.registDt}}</li>
                                        <li>{{item.registerId}}</li>
                                        <li style="font-family:Pretendard bold;">{{item.webappTmplatTyCodeNm}}</li>
                                    </ul>
                                    <p class="desc">{{item.webappTmplatCn}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--//cardList-->
                    <!--pagination-->
                    <div class="pagination" v-if="data.webappList.list.length !=0">
                        <button type="button" class="btnPagi first" @click="pagination(1)"><span class="hidden">맨 앞으로</span></button>
                        <button type="button" class="btnPagi prev" @click="pagination(data.paginationInfo.webappList.prevPageNo)"><span class="hidden">이전</span></button>
                        <a href="#" v-for="page in data.paginationInfo.webappList.pages" @click = "pagination(page)" v-bind:class="{active : activePage(page)}">
							{{page}}
						</a>
                        <button type="button" class="btnPagi next" @click="pagination(data.paginationInfo.webappList.nextPageNo)"><span class="hidden">다음</span></button>
                        <button type="button" class="btnPagi last" @click="pagination(data.paginationInfo.webappList.totalPageCount)" ><span class="hidden">맨 뒤로</span></button>
                    </div>
                     
                    <!--//pagination-->
                </div>
                <!--//tabCont-->
                <!--tabCont-->
                <div class="tabCont t10"></div>
                <!--//tabCont-->
                <!--tabCont-->
                <div class="tabCont t10"></div>
                <!--//tabCont-->
            </div>
            <!--//tabContWrap-->
        </div>
    </div>
    <!--//cont-->

</div>
<!--//popup-->