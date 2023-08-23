<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <script>
    	//분석
        function clickAnalysis(userId, obj) {
    		console.log('haha');
            let _check = app.util.checkLogin(userId);
            if (!_check) {
                return;
            }
    		$('#analysis > .toc.dep1').css('display','block');
    		$('#btnTocHide_anal').css('display','block');
    		$('#analysis > .toc.dep2').draggable({'disabled':true}).css({'width':'', 'height' :'100%', 'left' : '', 'top' : ''});
    		
    		
            if ($(obj).closest('.analysis').hasClass('active')) {
        		if ( $('#analysis').hasClass('analysisPopWidget')) {
        			$('#analysis').removeClass('analysisPopWidget')
        			$('#toc').removeClass('active')
        		} else {
                	$('#analysis').removeClass('active')
        		}
            } else {
                $('#analysis').toggleClass('active')
                $('#toc').removeClass('active')
            }
        };
        //저장
        function clickSave(userId, obj){
        	  let _check = app.util.checkLogin(userId);
              if (!_check) {
                  return;
              }
       		$(obj).closest('li').toggleClass('active').siblings('li').removeClass('active');
    		$(obj).closest('.group').siblings('.group').find('li').removeClass('active');  
        }
        //공유
        function clickShare(userId, obj){
        	let _check = app.util.checkLogin(userId);
            if (!_check) {
                return;
            }
        }
    </script>
    <header id="header">
    	<input type="hidden" id="loginUserId" value="${userId}">
        <!--upper-->
        <div class="group upper">
            <a href="" title="LX">
                <h1 class="logo">
                    <img src="/smt/images/common/logo-main.png" alt="로고" />
                </h1>
            </a>
            <div class="menu">
                <ul class="dep1">
                    <li class="webMap">
                        <button type="button" class="tool">
                            <span>웹맵</span>
                        </button>
                        <ul class="dep2">
                            <li>
                                <button type="button" class="tool type01" id="newWebMapModalBtn">
                                    <span>새&nbsp;웹맵</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="tool type02" id="webMapSearchModalBtn">
                                    <span>검색</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li class="tocToggle">
                        <button type="button" class="tool">
                            <span>레이어</span>
                        </button>
                    </li>
                    <li class="analysis">
                        <button type="button" class="tool" onclick="clickAnalysis('${userId}', this)">
                            <span>공간분석</span>
                        </button>
                    </li>
                    <li class="geocoding" style="display:none">
                        <button type="button" class="tool">
                            <span>지오코딩</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- [확인필요] 추후에 주석 풀기 -->
        <!--  <div class="user">
        <button type="button" class="btnUser" >
            <span>사용자</span>
            <span class="new">0</span>
        </button>
        <div class="userPop" style="display:none;">
            <div class="inner">
                <strong class="position">최고관리자</strong>
                <b class="name">송은희<span>님</span></b>
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
        <!--//upper-->
        <!--lower-->
        <div class="group lower">
            <div class="menu">
                <ul class="dep1">
                    <!-- [확인필요] 추후에 주석 풀기 -->
                    <!--   <li class="share">
                    <button type="button" class="tool" onclick="clickShare('${userId}', this)">
                        <span>공유</span>
                    </button>
                </li> -->
                    <li class="save" onclick="clickSave('${userId}', this)">
                        <button type="button" class="tool">
                            <span>저장</span>
                        </button>
                        <ul class="dep2">
                            <li>
                                <button type="button" class="tool type01" id="mapSaveBtn">
                                    <span>저장</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="tool type02" id="mapDefferSaveBtn">
                                    <span>다른이름<br />으로저장</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li class="info">
                        <button type="button" class="tool" id="webMapDetailModalBtn">
                            <span>기본정보</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <!--//lower-->