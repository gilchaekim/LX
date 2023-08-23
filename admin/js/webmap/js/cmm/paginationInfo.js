/**
 * Java 단의 PaginationInfo 클래스의 코드 내용을 javascript에 맞게 변경했다.
 * 추가적으로 페이지 랜더링하는 기능도 넣었다. 
 * 랜더링 코드는 TextPaginationRenderer.java 와 AbstractPaginationRenderer.java 클래스를 참조하여 만들었다.
 * 
 * 이 모듈은 ajax 의 요청 결과로 Java 단의 PaginationInfo 인스턴스를 받지 않고,
 * 브라우저 단에서 동적으로 생성해서 페이징을 랜더링하기 위함이다.
 * 
 * 사용예)
 * 
    <div id="pagingList" class="pagination"></div>
	
 	<script>

	//... 생략....

	// 페이지 이동 함수
	function pageLink(pageNo) {
		
		var queryParam = $("#Form").serialize();
	
		$.ajax({
	        url: "/list?" + queryParam,
	        type: 'GET',
	        dataType: 'json',
	        success: function (response) {
	        		
	        		// 사용방법은 아래와 같다.
	        		
	        		// 1. new 를 통해서 paginationInfo 객체를 생성한다. 여기서 totalCnt는 필수값이고, 나머지는 안넣으면 미리 설정한 default 값이 주입된다.
	            new PaginationInfo({
		            currentPageNo: response.pageNo,
		            totalCnt: response.totalCount,
		            pageUnit: response.pageSize
		        })
		        .renderPagination(pageLink, "pagingList"); // 2. 생성된 paginationInfo 객체를 통해서 실제 화면 랜더링을 한다.
		        											 // 첫번째 인자값은 페이지 이동에 사용되는 함수를 넣고, 두번째 인자로는 페이지 랜더링을 할 div의 id 값이다.
	
	        },
	        error: function (jqXHR, status, error) {
	            callAlert('fail', "조회에 실패하였습니다);
	        }
	    });
	}
	
	//... 생략....
	</script>

 */
function PaginationInfo(option) {
	
	if(option.totalCnt === null) {
		console.error('paginationInfo.js ==> 생성자 파라미터 객체에서 totalCnt 속성값은 필수값입니다!!!');
		return null;
	}
	
	this.currentPageNo = option.currentPageNo || 1;
	this.pageUnit = option.pageUnit || 10;
	this.pageSize = option.pageSize || 10;
	this.totalCnt = option.totalCnt;
	
	this.firstPageNo = 1;
	this.firstPageNoOnPageList = Math.floor(((this.currentPageNo - 1) / this.pageSize)) * this.pageSize + 1;
	this.totalPageCount = Math.floor(((this.totalCnt - 1) / this.pageUnit) + 1);
	
	var tempValue = this.firstPageNoOnPageList + this.pageSize - 1;
	if(tempValue > this.totalPageCount) {
		tempValue = this.totalPageCount;
	}
	
	this.lastPageNoOnPageList = tempValue;
	this.lastPageNo = this.totalPageCount;
	
	/**
	 * AbstractPaginationRenderer.class 의  renderPagination 메소드를 그대로 흉내낸 것이다.
	 * @param paginationInfo
	 * @param jsFunction : 페이지 이동을 담당할 javascript 함수 명 / 페이지 이동을 담당할 javascript 함수
	 * @param pagingId : 페이징을 랜더링할 Dom의 Id 값 ==> 파라미터 값이 있으면, 해당 id 태그 밑에 랜더링 결과를 그린다.
	 *                                           ==> 파라미터 값이 없으면, strBuff를 반환한다.
	 */
	this.renderPagination = function(jsFunction, pagingId) {
		
		if(typeof jsFunction !== 'function') {
			console.error('paginationInfo.js ==> 페이지 이동에 사용되는 jsFunction 파라미터는 함수여야 합니다!!!');
			return null;
		}
		
		var strBuff = "";
		
		var firstPageNo = Number(this.firstPageNo);
		var firstPageNoOnPageList = Number(this.firstPageNoOnPageList);
		var totalPageCount = Number(this.totalPageCount);
		var pageSize = Number(this.pageSize);
		var lastPageNoOnPageList = Number(this.lastPageNoOnPageList);
		var currentPageNo = Number(this.currentPageNo);
		var lastPageNo = Number(this.lastPageNo);
		
		
		if (totalPageCount > pageSize) {
			if (firstPageNoOnPageList > pageSize) {
				strBuff += this.getFirstPageLabel(jsFunction, firstPageNo);
				strBuff += this.getPreviousPageLabel(jsFunction, firstPageNoOnPageList - 1);
			} else {
				strBuff += this.getFirstPageLabel(jsFunction, firstPageNo);
				strBuff += this.getPreviousPageLabel(jsFunction, firstPageNo);
			}
		}
		
		
		for (let i = firstPageNoOnPageList; i <= lastPageNoOnPageList; i++) {
			if (i == currentPageNo) {
				strBuff += this.getCurrentPageLabel(i);
			} else {
				strBuff += this.getOtherPageLabel(jsFunction, i);
			}
		}
		
		
		if (totalPageCount > pageSize) {
			if (lastPageNoOnPageList < totalPageCount) {
				strBuff += this.getNextPageLabel(jsFunction, firstPageNoOnPageList + pageSize);
				strBuff += this.getLastPageLabel(jsFunction, lastPageNo);
			} else {
				strBuff += this.getNextPageLabel(jsFunction, lastPageNo);
				strBuff += this.getLastPageLabel(jsFunction, lastPageNo);
			}
		}
		
		
		if(pagingId) {
			$("#" + pagingId).empty();
			$("#" + pagingId).append(strBuff);
			$("#" + pagingId).find("[data-page-no]").on("click", function(e){
				e.preventDefault();
				var pageNo = $(e.target).attr("data-page-no");
				jsFunction(pageNo);
			});
		}
		
		return strBuff;
	}
	
	
	this.getFirstPageLabel = function(jsFunction, firstPageNo) {
		return `<button type=\"button\" class=\"btnPagi first\" data-page-no=\"${firstPageNo}\"><span class=\"hidden\">처음</span></button>`;
	}

	this.getPreviousPageLabel = function(jsFunction, previousPage) {
		return `<button type=\"button\" class=\"btnPagi prev\" data-page-no=\"${previousPage}\"><span class=\"hidden\">이전</span></button>`;
	}

	this.getCurrentPageLabel = function(currentPageNo) {
		return `<a href=\"#\" onclick=\"return false;\" class=\"active\">${currentPageNo}</a>`;
	}

	this.getOtherPageLabel = function(jsFunction, pageNo) {
		return `<a href=\"#\"  data-page-no=\"${pageNo}\">${pageNo}</a>`;
	}

	this.getNextPageLabel = function(jsFunction, nextPageNo) {
		return `<button type=\"button\" class=\"btnPagi next\" data-pageNo=\"${nextPageNo}\"><span class=\"hidden\">다음</span></button>`;
	}

	this.getLastPageLabel = function(jsFunction, lastPageNo) {
		return `<button type=\"button\" class=\"btnPagi last\" data-pageNo=\"${lastPageNo}\"><span class=\"hidden\">마지막</span></button>`;
	}
	
}