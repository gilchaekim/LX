<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<form:form modelAttribute="reqCntntsCnrsVO" method="post">
	<table>
		<caption>기관목록</caption>
		<colgroup>
			<col style="width: 80px;" />
			<col style="width: auto;" />
		</colgroup>
		<thead id="instCnrsTbHead">
			<tr>
				<th scope="col">추가</th>
				<th scope="col">기관</th>
			</tr>
		</thead>
		<tbody id="instCnrsTbBody">
			<c:forEach var="list" items="${resultInstList}" varStatus="status">
			<tr>
				<td><button type="button"
						class="btn btnIcon white center add" onclick="addInst(${status.index})">
						<i class="ico ico-add ct"></i></button></td>
				<td><p class="ellipsis">${list.inscd}</p></td>
			</tr>
			</c:forEach>
		</tbody>
	</table>
	<div id="paging" class="pagination">
		<ui:pagination paginationInfo = "${paginationInfoInst}" type="text" jsFunction="getPageLinkInst" />
	</div>
</form:form>
<script type="text/javaScript" language="javascript" defer="defer">

	/* insts 목록 담아두기 */
	insts = []; //초기화
	<c:forEach var="list" items="${resultInstList}" varStatus="status">
		var obj = {};
		obj.instNm = "${list.inscd}";		//기관 이름
		obj.inscd = "${list.returnResn}"; //기관 코드
		insts.push(obj);
	</c:forEach>
	totalCntInst = "${totalCntInst}";
	/* 페이징 */
	function getPageLinkInst(pageNo) {
		var data = {};
		var serialize = $("#reqCntntsCnrsVO").serializeArray();
		serialize.forEach(function(item,index){
			data[item.name] = item.value;
		});
		data.pageIndex = pageNo;
		
		getCntntsCnrsInstList(data);
	};
</script>


