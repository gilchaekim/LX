<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!--팝업 개별페이지에서 확인 추후에 jquer -->
<%-- <script type="text/javascript" src="<c:url value='/js/jquery/jquery-1.12.4.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/jquery/jquery-ui.min.js'/>"></script> --%>
<style>
.addShareArea .table {
	width: 350px;
}
.addShareArea .table:last-of-type {
	width: auto;
	flex: 1;
}
.addShareArea .table:not(:last-child) {
	border-right: 1px solid #e9e9e9;
}
</style>
<div id="sharePopup" class="popup" style="width: 900px;">
	<validator:javascript formName="webAppVO"
		staticJavascript="false" xhtml="true" cdata="false" />
	<form:form modelAttribute="webAppVO" method="post" id="putForm">
		<form:hidden path="webappTmplatId" />
		<form:hidden path="ownrId" value="${loginUser.userId }"/>

		<!--head-->
		<div class="head blue">
			<strong class="titPop">공유</strong>
			<div class="btnGroup">
				<button type="button" class="btnPopClose">
					<span class="hidden">팝업 닫기</span>
				</button>
			</div>
		</div>
		<!--//head-->
		<!--cont-->
		<div class="cont">
			<div class="inner cScroll" style="max-height: 650px;">
				<!--termProgress-->
				<div class="termsProgress">
					<div class="active" id="firstTerm">Step1. 공유 범위 선택</div>
					<span></span>
					<div id="secondTerm">Step2. 공유 내역 확인</div>
					<span></span>
					<div id="thirdTerm">Step3. 공유 완료</div>
				</div>
				<!--//termProgress-->

				<!--step1.공유범위 선택-->
				<div class="termCont active" id="firstTermCont">
					<!--tabContWrap-->
					<div class="tabContWrap type04">
						<!--tabNav-->
						<div class="tabNav">
							<ul class="tabList">
								<li class="active" onclick="cntntsCnrsTab('user')" id="userLi">사용자 (<span id="totalCntUser"></span>)
								</li>
								<li onclick="cntntsCnrsTab('inst')" id="instLi">기관 (<span id="totalCntInst"></span>)
								</li>
								<li onclick="cntntsCnrsTab('all')" id="allLi">전체</li>
							</ul>
						</div>
						<!--//tabNav-->
						
						<!-- 사용자 --><!--tabCont-->
						<div class="tabCont active t10" id="userCnrs">
							<!--optionArea-->
							<div class="optionArea" style="margin-bottom: 10px;">
								<!--searchArea-->
								<div class="searchArea">
									<div class="flex ac sb">
										<label class="label">사용자검색</label>
										<div class="inputBox">
											<input type="text" id="searchKeywordUser" 
												onkeyPress="javascript:if(event.keyCode==13) {getCntntsCnrsUserList()}"/>
										</div>
										<button type="button" class="btn black search"
											onclick="getCntntsCnrsUserList()">
											<span class="hidden">검색</span>
										</button>
									</div>
								</div>
								<!--//searchArea-->
							</div>
							<!--//optionArea-->
							<button type="button" class="btn normal" onclick="removeAllUser()"
								style="margin-right: auto;">
								<span>전체해제</span>
							</button>

							<!--addShareArea-->
							<div class="addShareArea">
								<!--table-->
								<div class="table hover txt-center cScroll" style="max-height: 341px;">
									<table>
										<caption>공유 사용자명</caption>
										<colgroup>
											<col style="width: 135px;">
											<col style="width: 135px;">
											<col style="width: 80px;" />
										</colgroup>
										<thead>
											<tr>
												<th scope="col" class="tit">공유 사용자</th>
												<th scope="col" class="tit">기관</th>
												<th scope="col" class="tit">삭제</th>
											</tr>
										</thead>
										<tbody id="cntntsCnrsUser">
											<c:forEach var="list" items="${selectResCntntsCnrs.userList}">
												<tr id='u1tr_${list.pblonsipRefrnId}'>
													<td><p class="ellipsis">${list.pblonsipRefrnNm}</p></td>
													<td><p class="ellipsis">${list.ownerNm}</p></td>
													<td><button type='button' class='btn btnIcon white center remove' 
														onclick='removeCnrsUser("${list.pblonsipRefrnId}")'>
														<i class='ico ico-remove2 ct'></i></button></td>
												</tr>
											</c:forEach>
										</tbody>
									</table>
								</div>
								<!--//table-->
								<!--table-->
								<div class="table hover txt-center cScroll" style="max-height: 341px;"
									 id="userCnrsTb"></div>
								<!--//table-->
							</div>
							<!--//addShareArea-->
							<div class="btnArea flexRight" style="margin-top: 10px;">
								<button type="button" class="btn blue lg termNext" onclick="nextTerm();">
									<span>다음</span>
								</button>
							</div>
						</div>
						<!--//tabCont-->
						
						<!-- 기관 --><!--tabCont-->
						<div class="tabCont t10" id="instCnrs">
							<!--optionArea-->
							<div class="optionArea" style="margin-bottom: 10px;">
								<!--searchArea-->
								<div class="searchArea">
									<div class="flex ac sb">
										<label class="label">기관검색</label>
										<div class="inputBox">
											<input type="text" id="searchKeywordInst" 
												onkeyPress="javascript:if(event.keyCode==13) {getCntntsCnrsInstList()}"/>
										</div>
										<button type="button" class="btn black search"
											onclick="getCntntsCnrsInstList()">
											<span class="hidden">검색</span>
										</button>
									</div>
								</div>
								<!--//searchArea-->
							</div>
							<!--//optionArea-->
							<button type="button" class="btn normal" onclick="removeAllInst()"
								style="margin-right: auto;">
								<span>전체해제</span>
							</button>

							<!--addShareArea-->
							<div class="addShareArea">
								<!--table-->
								<div class="table hover txt-center cScroll"
									style="max-height: 341px;">
									<table>
										<caption>공유 기관명</caption>
										<colgroup>
											<col style="width: auto;" />
											<col style="width: 100px;" />
										</colgroup>
										<thead>
											<tr>
												<th scope="col" class="tit">공유 기관</th>
												<th scope="col" class="tit">삭제</th>
											</tr>
										</thead>
										<tbody id="cntntsCnrsInst">
											<c:forEach var="list" items="${selectResCntntsCnrs.instList}">
												<tr id='i1tr_${list.pblonsipRefrnId}'>
													<td><p class='ellipsis'>${list.pblonsipRefrnNm}</p></td>
													<td><button type='button' class='btn btnIcon white center remove'
															 onclick='removeCnrsInst("${list.pblonsipRefrnId}")'>
															<i class='ico ico-remove2 ct'></i></button></td>
												</tr>
											</c:forEach>
										</tbody>
									</table>
								</div>
								<!--//table-->
								<!--table-->
								<div class="table hover txt-center cScroll"
									style="max-height: 341px;" id="instCnrsTb">
									
								</div>
								<!--//table-->
							</div>
							<div class="btnArea flexRight" style="margin-top: 10px;">
								<button type="button" class="btn blue lg" onclick="nextTerm();">
									<span>다음</span>
								</button>
							</div>
						</div>
						<!--//tabCont-->
						
						<!-- 전체 --><!--tabCont-->
						<div class="tabCont t10" id="allCnrs">
							<div class="shareImg">
                                <img src="/smt/images/share/img-mapgallery-app.png" alt="맵갤러리 신청절차"/>
                            </div>
                            <div class="checkbox type02 right" style="margin-top:10px;">
                                <input id="shareWebAppAllCheck" type="checkbox" />
                                <label for="shareWebAppAllCheck">※ 맵갤러리로 신청 시, 관리자 승인 후에 <span class="colorType blue">모든 사용자들이 볼 수 있도록 제공되는 것</span>에 동의 합니다.</label>
                            </div>

                            <div class="btnArea flexRight" style="margin-top:20px;">
                                <button type="button" class="btn blue lg termNext" onclick="shareAll();"><span>전체공유</span></button>
                            </div>
						</div>
						<!--//tabCont-->
					</div>
					<!--//tabContWrap-->
				</div>
				<!--step1.공유범위 선택 end-->

				<!--step2.공유내역 확인-->
				<div class="termCont" id="secondTermCont">
					<!--addShareArea-->
                    <div class="addShareArea">
                        <!--table-->
                        <div class="table hover txt-center cScroll" style="max-height:341px;">
                            <table>
                                <caption>기관</caption>
                                <colgroup>
                                    <col style="width:auto;"/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th scope="col" class="tit">기관</th>
                                </tr>
                                <tr>
                                    <th scope="col">기관명</th>
                                </tr>
                                </thead>
                                <tbody id="cntntsCnrsInstChk">
                                	<c:forEach var="list" items="${selectResCntntsCnrs.instList}">
	                                	<tr id='i2tr_${list.pblonsipRefrnId}'>
	                                		<td><p class='ellipsis'>${list.pblonsipRefrnNm}</p></td>
	                               	 	</tr>
	                                </c:forEach>
                                </tbody>
                            </table>
                        </div>
                        <!--//table-->
                        <!--table-->
                        <div class="table hover txt-center cScroll" style="max-height:341px;">
                            <table>
                                <caption>사용자</caption>
                                <colgroup>
                                    <col style="width:200px;"/>
                                    <col style="width:auto;"/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th scope="col" colspan="2" class="tit">사용자</th>
                                </tr>
                                <tr>
                                    <th scope="col">이름</th>
                                    <th scope="col">기관명</th>
                                </tr>
                                </thead>
                                <tbody id="cntntsCnrsUserChk">
                                	<c:forEach var="list" items="${selectResCntntsCnrs.userList}">
	                                	<tr id='u2tr_${list.pblonsipRefrnId}'><td>${list.pblonsipRefrnNm}</td>
	                                	<td><p class='ellipsis'>${list.ownerNm}</p></td>
	                                </c:forEach>
                                </tbody>
                            </table>
                        </div>
                        <!--//table-->
                    </div>
                    <!--//addShareArea-->
                    <div class="btnArea flex sb" style="margin-top:10px;">
                        <button type="button" class="btn grey2 lg termPrev" onclick="prevTerm()"><span>이전</span></button>
                        <button type="button" class="btn blue lg termNext" onclick="putCntntsCnrs()"><span>적용</span></button>
                    </div>
				</div>
				<!--step2.공유내역 확인 end-->

				<!--step3.공유 완료-->
				<div class="termCont" id="thirdTermCont">
					<!--addShareArea-->
                    <div class="addShareArea">
                        <div class="success">
                            <img src="/smt/images/share/img-share-success.png"/>
                            <strong>공유 설정이 완료 되었습니다.</strong>
                        </div>
                    </div>
                    <!--//addShareArea-->
                    <div class="btnArea flex sb" style="margin-top:10px;">
                        <!-- <button type="button" class="btn blue lg" onclick="moveFirstTerm();"><span>처음으로</span></button> -->
                        <button type="button" class="btn blueLine lg btnPopClose"><span>닫기</span></button>
                    </div>
             	</div>
				<!--step3.공유 완료 end-->
			</div>
		</div>
		<!--//cont-->
	</form:form>
</div>
<script type="text/javaScript" language="javascript" defer="defer">
	
	var users = []; //검색한 유저 목록
	var cnrsUsers = []; // 공유 대상 유저 목록
	var insts = []; // 검색한 기관 목록
	var cnrsInst = []; // 공유 대상 기관 목록
	
	var totalCntUser = 0; //검색한 유저 수
	var totalCntInst = 0; //검색한 기관 수
	
	$(document).ready(function(){
		getCntntsCnrsUserList(); //사용자 목록 조회
		getCntntsCnrsInstList(); //기관 목록 조회
		
		
		//웹앱공유 일 시, totalList (웹앱 부분 공유 정보)를 통해 미리 공유 대상 목록을 추가해줌
		<c:forEach var="list" items="${selectResCntntsCnrs.instList}">
			var obj = {};
			obj.instNm = "${list.pblonsipRefrnNm}";		//기관 이름
			obj.inscd = "${list.pblonsipRefrnId}"; 		//기관 코드
			cnrsInst.push(obj);
		</c:forEach>
		users = []; //초기화
		<c:forEach var="list" items="${selectResCntntsCnrs.userList}">
			var obj = {};
			obj.userId = "${list.pblonsipRefrnId}";
			obj.userNm = "${list.pblonsipRefrnNm}";
			obj.inscd = "${list.ownerNm}";
			cnrsUsers.push(obj);
		</c:forEach>
		
		
	});
	
	/*탭 메뉴 (전체/기관/사용자)*/
	function cntntsCnrsTab(id){
		$('#allLi').removeAttr("class");
		$('#userLi').removeAttr("class");
		$('#instLi').removeAttr("class");
		$('#' + id + 'Li').attr('class','active');
		
		$('#allCnrs').attr("class",'tabCont t10');
		$('#userCnrs').attr("class",'tabCont t10');
		$('#instCnrs').attr("class",'tabCont t10');
		$('#' + id + 'Cnrs').attr('class','tabCont t10 active');
	}
	
	/*사용자 공유대상 추가*/
	function addUser(index){
		var idx = cnrsUsers.findIndex(function(data){
			return data.userId === users[index].userId;
		});
		if(idx >= 0){
			callAlert("error", "이미 공유 대상으로 추가된 사용자 입니다.");
		}else{
			cnrsUsers.push(users[index]);
			$('#cntntsCnrsUser').append("<tr id='u1tr_"+ users[index].userId +"'><td><p class='ellipsis'>"
					+ users[index].userNm 
					+ "</p></td><td><p class='ellipsis'>" + users[index].inscd
					+"</p></td><td><button type='button' class='btn btnIcon white center remove' onclick=removeCnrsUser('"
						+users[index].userId
						+ "')><i class='ico ico-remove2 ct'></i></button></td></tr>");
			
			$('#cntntsCnrsUserChk').append("<tr id='u2tr_"+ users[index].userId +"'><td>" + users[index].userNm 
					+ "</td><td><p class='ellipsis'>" + users[index].inscd +"</p></td>");
		}
	}
	
	/*사용자 공유대상 제거*/
	function removeCnrsUser(userId){
		//$(event.target).parent().remove();
		$('#u1tr_'+userId).remove();
		$('#u2tr_'+userId).remove();
		
		var idx = cnrsUsers.findIndex(function(data){
			return data.userId == userId
		});
		cnrsUsers.splice(idx, 1);
	}
	
	/* 사용자 공유대상 전체해제 */
	function removeAllUser(){
		$('#cntntsCnrsUser > tr > td > button').each(function(index,item){
			$(item).click();
		});  
	}
	
	/*기관 공유대상 추가*/
	function addInst(index){
		var idx = cnrsInst.findIndex(function(data){
			return data.inscd === insts[index].inscd;
		});
		if(idx >= 0){
			callAlert("error", "이미 공유 대상으로 추가된 기관 입니다.");
		}else{
			cnrsInst.push(insts[index]);
			$('#cntntsCnrsInst').append("<tr id='i1tr_"+ insts[index].inscd 
					+"'><td><p class='ellipsis'>" + insts[index].instNm 
					+ "</p></td><td><button type='button' class='btn btnIcon white center remove' onclick=removeCnrsInst('"
						+insts[index].inscd
						+ "')><i class='ico ico-remove2 ct'></i></button></td></tr>");
			
			$('#cntntsCnrsInstChk').append("<tr id='i2tr_"+ insts[index].inscd +"'><td><p class='ellipsis'>"
					+ insts[index].instNm +"</p></td>");
		}
	}
	
	/*기관 공유대상 제거*/
	function removeCnrsInst(inscd){
		//$(event.target).parent().remove();
		$('#i1tr_'+inscd).remove();
		$('#i2tr_'+inscd).remove();
		
		var idx = cnrsInst.findIndex(function(data){
			return data.inscd == inscd
		});
		cnrsInst.splice(idx, 1);
	}
	
	/* 기관 공유대상 전체해제 */
	function removeAllInst(){
		$('#cntntsCnrsInst > tr > td > button').each(function(index,item){
			$(item).click();
		});  
	}
	
	/*사용자 목록 조회*/
	function getCntntsCnrsUserList(data){
		data = data || {};
		data.searchKeyword = $('#searchKeywordUser').val();
		$.ajax({
			data : data,
			url : "<c:url value='/cntnts/getCntntsCnrsUserList.do'/>",
			dataType : 'html',
			type : 'post',
			success : function(data) {
				$("#userCnrsTb").html(data);
				$("#totalCntUser").html(totalCntUser);
			},
			error : function(request, status, error) {
				//에러
			}
		})
	}
	
	/*기관 목록 조회*/
	function getCntntsCnrsInstList(data){
		data = data || {};
		data.searchKeyword = $('#searchKeywordInst').val();
 		$.ajax({
 			data : data,
 			url : "<c:url value='/cntnts/getCntntsCnrsInstList.do'/>",
 			dataType : 'html',
 			type : 'post',
 			success : function(data) {
				$("#instCnrsTb").html(data);
				$("#totalCntInst").html(totalCntInst);
			},
 			error : function(request, status, error) {
 				//에러
 			}
 		})	
	}
	
	/* step1. -> step.2 */	
	function nextTerm(){
		$('#firstTerm').removeAttr('class');
		$('#secondTerm').attr('class','active');
		$('#firstTermCont').attr('class','termCont');
		$('#secondTermCont').attr('class','termCont active');
	}
	/* step1. <- step.2 */	
	function prevTerm(){
		$('#firstTerm').attr('class','active');
		$('#secondTerm').removeAttr('class');
		$('#firstTermCont').attr('class','termCont active');
		$('#secondTermCont').attr('class','termCont');
	}
	
	/* 처음으로 */
	function moveFirstTerm(){
		$('.btnPopClose').click();
		putCntntsCnrsViewPop();
	}
	
	/* 콘텐츠 전체 공유 등록 */
	function shareAll(){
		//전체 동의란 체크박스 확인
		if(!$('input:checkbox[id="shareWebAppAllCheck"]').is(":checked")){
			callAlert('error','전체공유 동의란에 체크하십시오.');
			return 0;
		}

		var data = {};
		var serialize = $("#putForm").serializeArray();
		serialize.forEach(function(item, index) {
					data[item.name] = item.value;
				});
		
		callConfirm("전체공유","공유를 등록하시겠습니까?", function(){
			//[KGEOP] 에서 사용하지 않음
			$.ajax({
				data : JSON.stringify(data),
				url : "<c:url value='/share/putWebAppAllShare.do'/>",
				dataType : 'json',
				type : 'post',
				contentType : "application/json",
				traditional : true,
				processData : false,
				success : function(data) {
					if (data.result == 'success' && data.status == 200) {
						callAlert(
								'success',
								"<spring:message code='success.common.insert' />",
								function() {
									$('#firstTerm').removeAttr('class');
									$('#thirdTerm').attr('class','active');
									$('#firstTermCont').attr('class','termCont');
									$('#thirdTermCont').attr('class','termCont active');
									
								});
					} else if(data.result == 'success' && data.status == 900){
						callAlert(
								'success',
								"이미 맵갤러리 신청 요청중입니다.",
								function() {
									$('#firstTerm').removeAttr('class');
									$('#thirdTerm').attr('class','active');
									$('#firstTermCont').attr('class','termCont');
									$('#thirdTermCont').attr('class','termCont active');
									
								});
						
					} else {
						callAlert("error",
								"<spring:message code='fail.common.insert' />");
					}
				},
				error : function(request, status, error) {
					//에러
				}
			})
			
			
			//[KGEOP] 에서 사용  전체공유로 변경
			/*
			app.util.callAPI({
				url: `${API_SMT}/layer/info/insert`,
				data: {
					userId : $('#ownrId').val()
					, webappTmplatId : webappTmplatId
					, webappTmplatTyCode : app.webapp.data.webappView.webappTmplatTyCode
					, webappTmplatSj  : app.webapp.data.webappView.webappTmplatSj
					, usePblonsipSeCode : "1"
				},
				async: false,
				type: 'post'
			});
			*/
		})
	}
	
	/* 콘텐츠 공유 등록 */
	function putCntntsCnrs() {
		/* if(cnrsUsers.length == 0 && cnrsInst.length == 0){
			callAlert("error","공유할 기관이나 사용자를 선택하십시오");
			return 0;
		} */
		
		callConfirm("부분공유","공유를 등록하시겠습니까?", function(){
			var data = {};
			var serialize = $("#putForm").serializeArray();
			serialize.forEach(function(item, index) {
						data[item.name] = item.value;
					});
			data.userList = cnrsUsers;
			data.instList = cnrsInst;

			$.ajax({
				data : JSON.stringify(data),
				url : "<c:url value='/share/putWebAppParticalShare.do'/>",
				dataType : 'json',
				type : 'post',
				contentType : "application/json",
				traditional : true,
				processData : false,
				success : function(data) {
					if (data.result == 'success'
							&& data.status == 200) {
						callAlert(
								'success',
								"<spring:message code='success.common.insert' />",
								function() {
									$('#secondTerm').removeAttr('class');
									$('#thirdTerm').attr('class','active');
									$('#secondTermCont').attr('class','termCont');
									$('#thirdTermCont').attr('class','termCont active');
									
								});
					} else {
						callAlert("error",
								"<spring:message code='fail.common.insert' />");
					}
				},
				error : function(request, status, error) {
					//에러
				}
			})
		})

	};
</script>