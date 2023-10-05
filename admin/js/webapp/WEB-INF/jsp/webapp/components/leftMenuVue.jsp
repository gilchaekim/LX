<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <header id="header">
        <input type="hidden" id="loginUserId" value="${userId}">
        <div class="group upper">
            <a title="로고">
                <h1 class="logo">
                    <img src="/smt/images/common/logo-main.png" alt="로고" />
                </h1>
            </a>
            <div class="menu">
                <ul class="dep1">
                    <li class="webApp">
                        <button type="button" class="tool" id="webAppBtn" @click="webAppBtnClickEvent('webAppBtn')">
                            <span>웹앱</span>
                        </button>
                        <ul class="dep2">
                            <li>
                                <button type="button" class="tool type01" @click="newWebAppBtnClickEvent">
                                    <span>새&nbsp;웹앱</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="tool type02" @click="webAppSearchBtnClickEvent">
                                    <span>검색</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li class="detail">
                        <button type="button" class="tool" id="detailSettingBtn"
                            @click="detailSettingBtnClickEvent('detailSettingBtn')">
                            <span>상세설정</span>
                        </button>
                    </li>
                    <li class="preview">
                        <button type="button" class="tool" id="previewBtn" @click="previewBtnClickEvent('previewBtn')">
                            <span>미리보기</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <!--[확인필요]추후 -->
        <!-- <div class="user">
            <button type="button" class="btnUser" id="userInfoBtn" @click="userInfoBtnClickEvent('userInfoBtn')">
                <span>사용자</span>
                <span class="new">0</span>
            </button>
            <div class="userPop" style="display:none;">
                <div class="inner">
                    <strong class="position">최고관리자</strong>
                    <b class="name">${userId}<span>님</span></b>
                    <ul>
                        <li>
                            <a href="#" title="알림"><i class="ico alarm"></i>
                                <span class="new">0</span>
                                <span>알림</span></a>
                        </li>
                        <li>
                            <a href="#" title="mypage"><i class="ico myPage"></i><span>마이페이지</span></a>
                        </li>
                        <li>
                            <a href="#" title="logout"><i class="ico logout"></i><span>로그아웃</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div> -->
        <!--lower-->
        <div class="group lower">
            <div class="menu">
                <ul class="dep1">
                    <!-- <li class="share">
                        <button type="button" class="tool" id="shareBtn"
                            @click="shareBtnClickEvent('shareBtn', '${userId}')">
                            <span>공유</span>
                        </button>
                    </li> -->
                    <li class="save">
                        <button type="button" class="tool" id="saveBtn" @click="saveBtnClickEvent('saveBtn')">
                            <span>저장</span>
                        </button>
                        <ul class="dep2">
                            <li>
                                <button type="button" class="tool type01" @click="save()">
                                    <span>저장</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="tool type02" id="appDefferSaveBtn" @click='defferSave()'>
                                    <span>다른이름<br />으로저장</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li class="info">
                        <button type="button" class="tool" id="basicInfoBtn"
                            @click="basicInfoBtnClickEvent('basicInfoBtn')">
                            <span>기본정보</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </header>