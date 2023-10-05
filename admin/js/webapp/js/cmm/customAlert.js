

/** Call Custom Alert
 * @param	 type {String} : alert 타입 (success , fail, error)
 * 				 			(default : success)
 * @param 	 message {String} : 메시지 
 * @returns  fnCallback {Function} / void
 * @example  callAlert('fail', '이미 처리된 요청입니다.');
 * @example  callALert('success', '등록을 완료하였습니다.', function(){
 * 
 * 				location.reload();
 * 			 })
 */
/** Call Custom Alert
 * @param	 type {String} : alert 타입 (success , fail, error)
 * 				 			(default : success)
 * @param 	 message {String} : 메시지 / message {Object}: {message : 'asd', subMessage : 'asdsad'} 서브메시지도 포함
 * @returns  fnCallback {Function} / void
 * @example  callAlert('fail', '이미 처리된 요청입니다.');
 * @example  callALert('success', '등록을 완료하였습니다.', function(){
 * 
 * 				location.reload();
 * 			 })
 */
function callAlert(type, message, fnCallback) {
	let _message = message;
	let _subMessage = '';
	let typeNm = "";
	if (type == "success") {
		typeNm = "확인";
		typeClass = "success"
	} else if (type == "error") {
		typeNm = "오류";
		typeClass = "warning"
	} else if (type == "fail") {
		typeNm = "실패";
		typeClass = "warning"
	}
	
	if(typeof message  == 'object'){
		_message = message.message;
		_subMessage = message.subMessage || '';
	}

	//	let _type = (type == ('fail' || 'error') ? 'alertNoresult' : 'alertCheck');
	var popupHTML = "";
	if (type === 'success') {
		popupHTML =
			'<div id="alertPop">'
			+ '<div id="alertDimmed"></div>'
			+ '<div class="alert" id="alertPopBox" style="left:400px; left:40%; top:30%;">'
			+ '<button type="button" class="btnClose"><span class="hidden">닫기</span></button>'
			+ '<div class="head">'
			+ '<strong>' + typeNm + '</strong>'
			+ '</div>'
			+ '<div class="cont">'
			+ '<div class="type success"><span class="hidden">성공</span></div>'
			+ '<strong class="titCont">' + stringFilter(_message) + '</strong>'
			+ (_subMessage != '' ? '<span class="subCont">'+_subMessage+'</span>' : '')
			+ '<div class="btnArea">'
			+ '<button type="button" class="btn blue"><span>확인</span></button>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
	} else {
		popupHTML =
			'<div id="alertPop">'
			+ '<div id="alertDimmed"></div>'
			+ '<div class="alert" id="alertPopBox" style="left:400px; left:40%; top:30%;">'
			+ '<button type="button" class="btnClose"><span class="hidden">닫기</span></button>'
			+ '<div class="head">'
			+ '<strong>' + typeNm + '</strong>'
			+ '</div>'
			+ '<div class="cont">'
			+ '<div class="type warning"><span class="hidden">경고</span></div>'
			+ '<strong class="titCont">' + stringFilter(_message) + '</strong>'
			+ (_subMessage != '' ? '<span class="subCont">'+_subMessage+'</span>' : '')
			+ '<div class="btnArea">'
			+ '<button type="button" class="btn blue"><span>확인</span></button>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
	}
	$('#wrap').append(popupHTML);

	$('#alertPop .cont .btnArea .blue').focus();
	$('#alertPop .cont .btnArea .blue').on('click', function () {
		$('#alertPop').remove();
		if (typeof fnCallback === 'function') {
			fnCallback();
		}
	});

	$('#alertPop .alert .btnClose').on('click', function () {
		$('#alertPop').remove();
	});

	$('#alertPopBox').css('z-index', '10000000000');

	$('#alertDimmed').css('position', 'fixed');
	$('#alertDimmed').css('z-index', '9999999999');
	$('#alertDimmed').css('left', '0');
	$('#alertDimmed').css('top', '0');
	$('#alertDimmed').css('width', '100%');
	$('#alertDimmed').css('height', '100%');
	$('#alertDimmed').css('background', 'rgba(0, 0, 0, 0.75)');

	$('#alertDimmed').on('click', function () {
		$('#alertPop').remove();

		if (typeof fnCallback === 'function') {
			fnCallback();
		}
	})
}

function callConfirm2(title, message) {
	var flag = false;
	
	let hasTitle = (title != '');
	var popupHTML =
		'<div id="confirmPop">'
		+ '<div id="confirmDimmed"></div>'
		+ '<div class="alert" id="confirmPopBox" style="left:42%; top:30%;">'
		+ '<button type="button" class="btnClose"><span class="hidden">닫기</span></button>'
		+ '<div class="head">'
		+ '<strong></strong>'
		+ '</div>'
		+ '<div class="cont">'
		+ '<div class="type confirm"><span class="hidden">경고</span></div>'
	if (hasTitle) {
		popupHTML += '<strong class="titCont">' + stringFilter(title) + '</strong>'
	} else {
		popupHTML += '<strong class="titCont" style="display:none;">' + stringFilter(title) + '</strong>'
	}
	popupHTML += '<p class="desc">' + stringFilter(message) + '</p>'
		+ '<div class="btnArea">'
		+ '<button type="button" class="btn blue"><span>확인</span></button>'
		+ '<button type="button" class="btn grey"><span>취소</span></button>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
	$('#wrap').append(popupHTML);

	
	return new Promise(function(resolve, reject){
		$('#confirmPop .cont .btnArea .blue').focus();
		$('#confirmPop .cont .btnArea .blue').on('click', function () {
			resolve(true);
			$('#confirmPop').remove();
		});

		$('#confirmPop .cont .btnArea .grey').on('click', function () {
			resolve(false);
			$('#confirmPop').remove();
		});

		$('#confirmPop .alert .btnClose').on('click', function () {
			$('#confirmPop').remove();
		});

		$('#confirmPopBox').css('z-index', '10000000000');

		$('#confirmDimmed').css('position', 'fixed');
		$('#confirmDimmed').css('z-index', '9999999999');
		$('#confirmDimmed').css('left', '0');
		$('#confirmDimmed').css('top', '0');
		$('#confirmDimmed').css('width', '100%');
		$('#confirmDimmed').css('height', '100%');
		$('#confirmDimmed').css('background', 'rgba(0, 0, 0, 0.75)');

		$('#confirmDimmed').on('click', function () {
			$('#confirmPop').remove();
		})
	});
	
}

/** Call Custom Confirm
 * @param 		  type {String}   : 타입 (insert, update, delete)
 * @param 	   message {String}	  : 메시지
 * @param 	 backgroundYn {boolean}	  : 백그라운드 여부 
 * @param 	fnCallback {Function} : 콜백 함수
 * @returns	callback
 * @example callConfirm('insert', '등록하시겠습니까?', function(){
 * 				~~~
 * 			})
 */
//function callConfirm(title, message, backgroundYn = true, fnCallback){
function callConfirm(title, message, fnCallback) {
	/*let _type = (type == 'insert' ? 'alertCheck' : type == 'update' ? 'alertModify' : type == 'delete' ? 'alertDelete' : '');
	if(_type == '') {
		console.error('type error');
		return;
	}*/
	let hasTitle = (title != '');
	var popupHTML =
		'<div id="confirmPop">'
		//+     !backgroundYn  ? '' : '<div id="confirmDimmed"></div>'
		+ '<div id="confirmDimmed"></div>'
		+ '<div class="alert" id="confirmPopBox" style="left:42%; top:30%;">'
		+ '<button type="button" class="btnClose"><span class="hidden">닫기</span></button>'
		+ '<div class="head">'
		+ '<strong></strong>'
		+ '</div>'
		+ '<div class="cont">'
		+ '<div class="type confirm"><span class="hidden">경고</span></div>'
	if (hasTitle) {
		popupHTML += '<strong class="titCont">' + stringFilter(title) + '</strong>'
	} else {
		popupHTML += '<strong class="titCont" style="display:none;">' + stringFilter(title) + '</strong>'
	}
	popupHTML += '<p class="desc">' + stringFilter(message) + '</p>'
		+ '<div class="btnArea">'
		+ '<button type="button" class="btn blue"><span>확인</span></button>'
		+ '<button type="button" class="btn grey"><span>취소</span></button>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
	$('#wrap').append(popupHTML);

	$('#confirmPop .cont .btnArea .blue').focus();
	$('#confirmPop .cont .btnArea .blue').on('click', function () {
		$('#confirmPop').remove();
		fnCallback();
	});

	$('#confirmPop .cont .btnArea .grey').on('click', function () {
		$('#confirmPop').remove();
	});

	$('#confirmPop .alert .btnClose').on('click', function () {
		$('#confirmPop').remove();
	});

	$('#confirmPopBox').css('z-index', '10000000000');

	$('#confirmDimmed').css('position', 'fixed');
	$('#confirmDimmed').css('z-index', '9999999999');
	$('#confirmDimmed').css('left', '0');
	$('#confirmDimmed').css('top', '0');
	$('#confirmDimmed').css('width', '100%');
	$('#confirmDimmed').css('height', '100%');
	$('#confirmDimmed').css('background', 'rgba(0, 0, 0, 0.75)');

	$('#confirmDimmed').on('click', function () {
		$('#confirmPop').remove();
	})
}

function stringFilter(str) {
	let resultStr = '';

	if (str == null) {
		return null;
	}

	for (let i = 0; i < str.length; i++) {
		let c = str.charAt(i);
		switch (c) {
			case '<':
				resultStr += "&lt;"
				break;
			case '>':
				resultStr += "&gt;"
				break;
			case '&':
				resultStr += "&amp;"
				break;
			case '"':
				resultStr += "&quot;"
				break;
			case '\'':
				resultStr += "&apos;"
				break;
			default:
				resultStr += c
				break;
		}
	}

	return resultStr;
}

/** Call Custom LoadingBar
 * @param	 message {String} : 로딩바 문구 (default : 로딩중입니다.)
 * @param 	 status {boolean} : 로딩바 상태 (default : false , true의 경우 로딩바 표출 , false 호출시 로딩바제거)
 * @example  callLoadingBar({status : true, message : '이미 처리된 요청입니다.});
 * @example  callLoadingBar({status : false});
 * 
 */
function callLoadingBar(options) {
	const { message = "로딩중입니다.", status = false } = options;
	if (status) {
		let popupHTML = `
			<div id="dimmed"></div>
			<div class="loadingBox">
				<div class="loadingArea">
					<div class="quater">

					</div>
				</div>
				<strong>${message}</strong>
			</div>`;
		$('body').append(popupHTML);

	} else {
		$('body > #dimmed').remove();
		$('body > .loadingBox').remove();
	}
}

/** Call Custom alert message
 * @param	 message {String} : 알림 메세지 문구(default = "에러")
 * @example  callAlertMessage('메세지');
 * @example  callAlertMessage('메세지');
 * 
 */
function callAlertMessage(message = "에러") {
	let popupHTML = `<div class="sysMsg on" style="top:300px; z-index:9999999999">${message}</div>`;
	$('body').append(popupHTML);

	let interval = setInterval(() => {
		$('.sysMsg').remove();
		clearInterval(interval);
	}, 3001);
}


/** Call Custom alert message
 * @param	 message {String} : 알림 메세지 문구(default = "에러")
 * @example  callAlertMessage('메세지');
 * @example  callAlertMessage('메세지');
 * 
 */
function callTargetLoadingBar(target, message = "에러", loadingFlag) {
	if (loadingFlag) {
		$(target).find('.searchLoading').remove();
		let popupHTML = `
			<div class="searchLoading">
				<div class="box">
					<div class="loadingImg"></div>
					<p>${message}</p>
				</div>
			</div>
			`;
		$(target).append(popupHTML);
	} else {
		$(target).find('.searchLoading').remove();
	}
}