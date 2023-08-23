

/** 
 * 콘텐츠 공유 팝업창 조회
 * 
 * @param	 type {object} : {key : value}
 * @returns  fnCallback {Function} / void
 * @example  callAlert('fail', '이미 처리된 요청입니다.');
 * @example  callALert('success', '등록을 완료하였습니다.', function(){
 * 
 * 				location.reload();
 * 			 })
 */
function putCntntsCnrsViewPop(data){
	$.ajax({
		  data : data
		, url : contextPath + "/cntnts/putCntntsCnrsViewPop.do"
		, dataType : 'html'
		, type : 'post'
		, success : function(html){
			$('#divPutCntntsCnrsViewPop').html(html);
			
			//프로그램 등록화면 드래그 기능 & 텍스트 클릭 기능
			$(document).ready(function() {
				$('.popup').draggable({
				      cancel:'.cont',
				      containment: "window"
				  });
			});
			
			//팝업 CSS 이벤트 추가
			$('.btnPopClose').on({
		        "click":function() {
	            	$(this).closest('.popup').hide();
	            	$('#dimmed').remove();
	            	getPageLink('1');
	            	
	        	}
	    	});
			
		}
		, error : function(request, status, error) {
			callAlert("error", "오류가 발생했습니다.");
		}
	})
	
	event.stopPropagation();
}
	
/** 
 * 웹앱 템플릿 공유 팝업창 조회
 * 
 * @param	 type {object} : {key : value}
 * @returns  fnCallback {Function} / void
 * @example  callAlert('fail', '이미 처리된 요청입니다.');
 * @example  callALert('success', '등록을 완료하였습니다.', function(){
 * 
 * 				location.reload();
 * 			 })
 */
function putCntntsCnrsWebAppViewPop(data){
	$.ajax({
		  data : data
		, url : contextPath + "/share/putCntntsCnrsViewPop.do"
		, dataType : 'html'
		, type : 'post'
		, success : function(html){
			$('#divPutCntntsCnrsViewPop').html(html);
			
			//프로그램 등록화면 드래그 기능 & 텍스트 클릭 기능
			$(document).ready(function() {
				$('#sharePopup').draggable({
				      cancel:'.cont',
				      containment: "window"
				  });
			});
			
			//팝업 CSS 이벤트 추가
			$('#sharePopup .btnPopClose').on({
		        "click":function() {
	            	$(this).closest('.popup').hide();
	            	$('#dimmed').remove();
	        	}
	    	});
			
		}
		, error : function(request, status, error) {
			callAlert("error", "오류가 발생했습니다.");
		}
	})
	
	event.stopPropagation();
}

