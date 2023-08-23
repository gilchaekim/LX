/**
 * 비동기로 페이징 랜더링 필요시 사용한다.
 * TextPaginationRenderer.java 와 AbstractPaginationRenderer.java 클래스를 참조하여 만들었다.
 * 만약 ajax 요청의 결과로 Java 단의 PaginationInfo 인스턴스를 받는다면 사용한다. 
 * 
 * 사용예)
 * 
 * 
	<div id="pagingList" class="pagination"></div>
	 
   	<script>
	 
	 //... 생략....
	 
   	function getPageLink(pageNo) {
		
		var queryParam = $("#Form").serialize();
		
		$.ajax({
			url: '/list.do?' + queryParam,
		    type: 'GET',
		    dataType: 'json',
		    success: function(response) {
		    
		    		// paginationRender.renderPagination 메소드는 3가지 파라미터를 받는다. 
		    		// 첫번째는 java 단에서 받은 공통 PaginationInfo 클래스의 인스턴스다. 
		    		// 두번째는 페이지 이동을 담당할 함수를 넣는다.
		    		// 세번째는 해당 페이징이 랜더링 되길 바라는 div의 id 값이다. (필수값X)
		    		  
				// 사용 방식은 paginationRender.renderPagination 메소드의 "2번째 파라미터"를 어떻게 작성하냐에 따라 나뉜다.
				// 아래 3가지 사용 방식을 보자.
				
				// 1. (비추천) 함수명을 "문자열" 줄 때, 단 이 방식은 함수가 "전역"에 선언되어 있어야 사용 가능하다. 
				paginationRender.renderPagination(response.paginationInfo, "getPageLink", "userImgSelectPaging");
				
				// 2. 동적으로 함수 생성하여 넣어주기
				paginationRender.renderPagination(response.paginationInfo, (pageIndex) => { ~~ }, "userImgSelectPaging");
				
				// 3. 이미 선언된 함수를 다시 넣어준다, 이 방식은 1번과 다르게 전역에 함수가 선언된 것이 아니더라도 사용 가능하다.
				// paginationRender.renderPagination(response.paginationInfo, getPageLink , "userImgSelectPaging");
		    },
		    error: function(jqXHR, status, error) {
		    		callAlert('fail', "조회에 실패하였습니다);
		    }
		});
	};
	
	//... 생략....
	
	</script>
 * 
 * 
 * 만약 ajax 의 요청 결과로 Java 단의 PaginationInfo 인스턴스를 받지 않고,
 * 브라우저 단에서 동적으로 생성해서 페이징을 랜더링하려면 paginationInfo.js 를 사용한다. 
 */
function PaginationRenderer() {
	
	/**
	 * AbstractPaginationRenderer.class 의  renderPagination 메소드를 그대로 흉내낸 것이다.
	 * @param paginationInfo
	 * @param jsFunction : 페이지 이동을 담당할 javascript 함수 명 / 페이지 이동을 담당할 javascript 함수
	 * @param pagingId : 페이징을 랜더링할 Dom의 Id 값 ==> 파라미터 값이 있으면, 해당 id 태그 밑에 랜더링 결과를 그린다.
	 *                                           ==> 파라미터 값이 없으면, strBuff를 반환한다.
	 *                                           
	 * @참고 : jsFunction 이 문자열인지 아니면 그냥 함수인지에 따라 분기문이 크게 나뉜다.
	 */
	this.renderPagination = function(paginationInfo, jsFunction, pagingId) {
		
		let strBuff = "";
		
		let firstPageNo = Number(paginationInfo.firstPageNo);
		let firstPageNoOnPageList = Number(paginationInfo.firstPageNoOnPageList);
		let totalPageCount = Number(paginationInfo.totalPageCount);
		let pageSize = Number(paginationInfo.pageSize);
		let lastPageNoOnPageList = Number(paginationInfo.lastPageNoOnPageList);
		let currentPageNo = Number(paginationInfo.currentPageNo);
		let lastPageNo = Number(paginationInfo.lastPageNo);
		
		
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
			
			if(typeof jsFunction === 'function') {
				$("#" + pagingId).find("[data-page-no]").on("click", function(e){
					e.preventDefault();
					var pageNo = $(e.target).attr("data-page-no");
					jsFunction(pageNo);
				});
			}
		}
		return strBuff;
	}
	
	
	// 가장 첫 페이지로 이동하는 화살표
	this.getFirstPageLabel = function(jsFunction, firstPageNo) {
		
		if(typeof jsFunction === 'function') {
			return `<button type=\"button\" class=\"btnPagi first\" data-page-no=\"${firstPageNo}\"><span class=\"hidden\">처음</span></button>`;
		} 
		
		return `<button type=\"button\" class=\"btnPagi first\" onclick=\"${jsFunction}(${firstPageNo}); return false;\"><span class=\"hidden\">처음</span></button>`;
	}

	
	// 이전 페이지 목록을 불러오는 화살표
	this.getPreviousPageLabel = function(jsFunction, previousPage) {
		
		if(typeof jsFunction === 'function') {
			return `<button type=\"button\" class=\"btnPagi prev\" data-page-no=\"${previousPage}\"><span class=\"hidden\">이전</span></button>`;
		} 
		
		return `<button type=\"button\" class=\"btnPagi prev\" onclick=\"${jsFunction}(${previousPage}); return false;\"><span class=\"hidden\">이전</span></button>`;
	}

	
	// 현재 페이지 
	this.getCurrentPageLabel = function(currentPageNo) {
		return `<a href=\"#\" onclick=\"return false;\" class=\"active\">${currentPageNo}</a>`;
	}

	
	// 현재 페이지를 제외한 나머지 페이지
	this.getOtherPageLabel = function(jsFunction, pageNo) {
		
		if(typeof jsFunction === 'function') {
			return `<a href=\"#\"  data-page-no=\"${pageNo}\">${pageNo}</a>`;
		} 
		
		return `<a href=\"#\" onclick=\"${jsFunction}(${pageNo}); return false;\">${pageNo}</a>`;
	}

	
	// 다음 페이지 목록을 불러오는 화살표
	this.getNextPageLabel = function(jsFunction, nextPageNo) {
		
		if(typeof jsFunction === 'function') {
			return `<button type=\"button\" class=\"btnPagi next\" data-pageNo=\"${nextPageNo}\"><span class=\"hidden\">다음</span></button>`;
		} 
		
		return `<button type=\"button\" class=\"btnPagi next\" onclick=\"${jsFunction}(${nextPageNo}); return false;\"><span class=\"hidden\">다음</span></button>`;
	}

	
	// 맨 끝 페이지로 이동하는 화살표
	this.getLastPageLabel = function(jsFunction, lastPageNo) {
		
		if(typeof jsFunction === 'function') {
			return `<button type=\"button\" class=\"btnPagi last\" data-pageNo=\"${lastPageNo}\"><span class=\"hidden\">마지막</span></button>`;
		} 
		
		return `<button type=\"button\" class=\"btnPagi last\" onclick=\"${jsFunction}(${lastPageNo}); return false;\"><span class=\"hidden\">마지막</span></button>`;
	}
	
}
