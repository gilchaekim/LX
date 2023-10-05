/*
 * @param = URL
 * 
 * 사용예제
 *  EX)
 * 	var initQueryArray = $("#reqCntntsListVO").serializeArray(); 전역에 해당 @ModelAttribute 선언
 * 	
 *  함수호출
 	function getPageLink(pageNo) {
		var url = "/portal/webLyr/getWebLyrListView.do";
 		var cmmForm = createCmmForm(url);
 		$(cmmForm).find("input[name='pageIndex']").val(pageNo); //각자 해당 로직에 맞는 값 셋팅.
 		$(cmmForm).submit();
    }
 * */
function createCmmForm(url) { 
	var cmmForm = document.createElement("form");
	
	initQueryArray.forEach(function(item, index){
		$(cmmForm).append("<input type='hidden' id='"+ item.name +"' name='"+ item.name +"' value='"+ item.value +"' />");
	});
	$(cmmForm).attr("action",url);
	$(cmmForm).attr("method", "post"); 
	
	document.body.appendChild(cmmForm);
	return cmmForm;
	
}












