$(function () {
	$.ajaxSetup({
		beforeSend: function (xmlHttpRequest, options) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
			var originalErrorHandler = options.error;
			options.error = function (jqXHR, status, error) {
				if (jqXHR.status == "401") {
					if(jqXHR.getResponseHeader('code') == "9997"){
						let _response = JSON.parse(jqXHR.responseText); //{url : ..., message : ...}
						callAlert('success', _response.message, function () {
							location.href = _response.url;
						}, true);
					} else if (jqXHR.getResponseHeader('code') == "9999") {
						callAlert('success', "세션이 종료되었습니다.<br/>로그인 후 다시 이용해 주십시오.", function () {
							location.href = '/portal/login/getLoginView.do';
						}, true);
					} else if (jqXHR.getResponseHeader('code') == "9998") {
						callAlert('success', "권한이 없습니다.", function () {
							location.href = '/portal/main.do';
						}, true);
					} 
				}else {
					originalErrorHandler.apply(this, arguments);
				}
			}
		}
	});
});

