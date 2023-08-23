<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<form:form modelAttribute="userVO" method="post">
	<table>
		<caption>사용자목록</caption>
		<colgroup>
			<col style="width: 80px;" />
			<col style="width: auto;" />
			<col style="width: auto;" />
		</colgroup>
		<thead id="userCnrsTbHead">
			<tr>
				<th scope="col">추가</th>
				<th scope="col">사용자</th>
				<th scope="col">기관</th>
			</tr>
		</thead>
		<tbody id="userCnrsTbBody">
			<c:forEach var="list" items="${resultUserList}" varStatus="status">
			<tr>
				<td><button type="button"
						class="btn btnIcon white center add" onclick="addUser(${status.index})">
						<i class="ico ico-add ct"></i></button></td>
				<td><p class="ellipsis">${list.userNm}</p></td>
				<td><p class="ellipsis">${list.inscd}</p></td>
			</tr>
			</c:forEach>
		</tbody>
	</table>
	<div id="paging" class="pagination">
		<ui:pagination paginationInfo = "${paginationInfoUser}" type="text" jsFunction="getPageLinkUser" />
	</div>
</form:form>
<script type="text/javaScript" language="javascript" defer="defer">

	/* user 목록 담아두기 */
	users = []; //초기화
	<c:forEach var="list" items="${resultUserList}" varStatus="status">
		var obj = {};
		obj.userId = "${list.userId}";
		obj.userNm = "${list.userNm}";
		obj.inscd = "${list.inscd}";
		users.push(obj);
	</c:forEach>
	
	totalCntUser = "${totalCntUser}";
	
	/* 페이징 */
	function getPageLinkUser(pageNo) {
		var data = {};
		var serialize = $("#userVO").serializeArray();
		serialize.forEach(function(item,index){
			data[item.name] = item.value;
		});
		data.pageIndex = pageNo;
		
		getCntntsCnrsUserList(data);
	};
</script>
