(() => {
	//피쳐속성 폼 활성화 표시
	$(document).on('click', '#featureAttributeFormWidgetDiv .btnPopClose', function () {
		if (app.widget.featureAttributeFormWidget.isActive()) {
			$('.sampleFrame .toolGroup ul li.featureAttributeFormWidget > .tool').addClass('active');
		} else {
			$('.sampleFrame .toolGroup ul li.featureAttributeFormWidget > .tool').removeClass('active');
		}
	})

	/* 툴바 1뎁스 버튼 클릭 */
	$("#newWebMapModalBtn").on("click", function () {
		callConfirm('새 웹맵', '기존내용을 저장하지않으면 작업중인 내용은 사라집니다. 계속 진행하시겠습니까?', () => {
			// 화면 이동시키기. webmap.do 로.
			let url = `${contextPath}/webmap.do`
			window.location.href = url;
		})

	})
	/*$('#widget .dep1 > li').on({
			"click":function (){
					if(!$(this).closest('li').hasClass('reset')){
							$(this).closest('li').toggleClass('active').siblings('li').removeClass('active');
									 $(this).find("span").css("color","#555") 
									 $(this).find("span").css("color","#fff") 
					}else{
							$(this).closest('li').siblings('li').removeClass('active');
					}
			}
	});*/

	$("#mapDefferSaveBtn").on("click", function () {
		if (app.cmm.data.mode == "webmap-detail") {
			app.webmap.components.newWebMapModalVue.show();
		}
	})

	//웹앱 저장위젯 - 다른이름으로 저장 
	$(document).on("click", ".webMapSave_content .type02", function () {
		app.webmap.components.newWebMapModalVue.show();
	});

	$("#webMapSearchModalBtn").on("click", function () {
		let userId = $('#loginUserId').val();
		let _check = app.util.checkLogin(userId);
		if (!_check) {
			return;
		}
		$(".webMap").removeClass("active");
		app.webmap.components.webMapSearchModalVue.search(app.webmap.components.webMapSearchModalVue.$data.tab);
		//app.webmap.components.webMapSearchModalVue.show("map");
	})
	$("#lyrDetailBtn").on("click", function () {
		/* OUI에서 만들어주는 레이어 아이디 */
		let lyrId = $(".layerIdValue").attr("value");
		// lyrId = 'LR0000000039';
		if (lyrId) {
			app.webmap.components.webLyrModalVue.show();
			app.webmap.components.webLyrModalVue.search(lyrId, $(".layerGroupSn").attr("value"));
		}
		else {
			callAlert("select", "DB에 레이어 정보가 등록되어있지 않습니다.");
		}
		return;
	})

	$(document).on('click', '#webMapDetailModalBtn, .webMapInfo_btn', function () {
		$(".info").removeClass("active");
		app.webmap.components.webMapDetailModalVue.$el.style.display === 'none' ? app.webmap.components.webMapDetailModalVue.show() : app.webmap.components.webMapDetailModalVue.hide();
	})
	// $("#webMapDetailModalBtn, .webMapInfoWidget").on("click", function () {
	// })

	$(document).on('click', "#mapSaveBtn, .webMapSave_content .type01", function () {
		let _check = app.util.checkLogin(userId);
		if (!_check) { 
			return;
		}
		if (userMapId) {
			//callConfirm("맵 등록", "맵을 저장하시겠습니까?", function () {
			app.webmap.process.webmapTocSave();
			//})
		}
		else {
			app.webmap.components.newWebMapModalVue.show();
		}
		$(".menu .save").removeClass("active");
	});

	$("#mapSaveBtn").on("click", function () {

	})
	/* 스와이퍼 위젯 ui control*/
	//swiper 위젯 이벤트 실행 함수
	$('#swiperBtn').on('click', function () {
		if ($('.swiperControl_swiperControlContent').css('display') == 'block') {
			app.oui.swiperControlWidget().remove();
			app.oui.swiperControlWidget().build();
			app.oui.swiperControlWidget().addTo();
			$('.swiperControl_swiperControlContent').css({ display: 'none' })
		} else {
			app.oui.swiperControlWidget().build();
			app.oui.swiperControlWidget().addTo();
			$('.swiperControl_swiperControlContent').css({ display: 'block' })
			$('#swiperBorderDiv').draggable(
				{
					axis: 'x',  //x축으로 한정
					cancel: false, //기본 설정값
					containment: ".mapArea",
					drag: function (e) {
						let mapDivArea = Number($('.mapArea').css('width').replace('px', ''));
						let swiperDivArea = Number($('#swiperBorderDiv').css('left').replace('px', ''));
						//let perValue = (mapDivArea / 2 + swiperDivArea) / mapDivArea * 100;
						let perValue = swiperDivArea / mapDivArea * 100;
						perValue < 0 ? perValue = 0.1 : null;
						perValue > 100 ? perValue = 100 : null;
						if ($('#swiperBorderDiv').css('left').replace('px', '') < 0) {
							$('#swiperBorderDiv').css('left', '1px')
						}
						app.oui.swiperControlWidget().setSliderValue(perValue);
					}
				});//드래그 종료시 이벤트
		}

		$('.swiperControl_barDiv').css({ display: 'none' })
	})
	$('#bookMarkBtn').on('click', function () {
		if ($('#loginUserId').val() == '') {
			callAlertMessage('로그인 후에 사용가능합니다.');
		} else {
			if ($('.bookMarkControl_bookMarkControlContent').css('display') == 'block') {
				$('.bookMarkControl_bookMarkControlContent').css('display', 'none')
			} else {
				app.oui.bookMarkControlWidget().addTo(map);
				$('.bookMarkControl_bookMarkControlContent').css({ display: 'block' })
			}
		}
	})
	$('#linkRoadView').on('click', function () {
		app.oui['roadViewWidget']().build();
	});

	$('.btnOpTableHide').on({
		"click": function () {
			$(this).closest('#optionTable').toggleClass('hide')
			$(this).closest('#optionTable').attr('class').includes('hide') ? $(this).closest('#optionTable').css('margin-bottom', '0px') : $(this).closest('#optionTable').css('margin-bottom', '35px')
			window.setTimeout(function () {
				map.updateSize();
			}, 401)
		}
	})
	$('.btn.scale').on({
		"click": function () {
			if ($(this).hasClass('up')) {
				if ($('#optionTable').hasClass('active')) {
					$(this).siblings('.btn.scale').show();
					$('#optionTable').addClass('middle').removeClass('active');
					$('.ag-theme-alpine').css('height', '500px');
					window.setTimeout(function () { map.updateSize() }, '401');
				} else if ($('#optionTable').hasClass('middle')) {
					$('#optionTable').addClass('full').removeClass('middle');
					$(this).hide();
					$('.ag-theme-alpine').css('height', '800px');
					window.setTimeout(function () { map.updateSize() }, '401');
				}
			} else if ($(this).hasClass('down')) {
				if ($('#optionTable').hasClass('full')) {
					$('#optionTable').addClass('middle').removeClass('full');
					$('.ag-theme-alpine').css('height', '500px');
					$(this).siblings('.btn.scale').show();
					window.setTimeout(function () { map.updateSize() }, '401');
				} else if ($('#optionTable').hasClass('middle')) {
					$('#optionTable').addClass('active').removeClass('middle');
					$(this).hide();
					$('.ag-theme-alpine').css('height', '306px');
					window.setTimeout(function () { map.updateSize() }, '401');
				}
			}
		}
	});

	$('.btnOpTableClose').on({
		"click": function () {
			//grid header에 닫기 버튼 있으면 동작시키기
			if ($('#optionTable #close')) {
				$('#optionTable #close').trigger("click");
			}
			/*임시로css 바꿔서 테이블 맵 뒤로 숨기기. -김정헌 */
			//        	$(this).closest('#optionTable').css("z-index",-1);
			//        	$(this).closest('#optionTable').css("top","50px");
			//        	$(this).closest('#optionTable').css("position","absolute")
			app.widget.geocodingGridWidget && app.widget.geocodingGridWidget.addTo(false);
			app.widget.tocWidget.removeGrid();
			$(this).closest('#optionTable').hide();
			map.updateSize();
			document.querySelector('.titOpTable').innerText = "속성 테이블";
		}
	})
	/* 속성테이블 리사이즈시 레이아웃 변경 */
	function opTbResize() {
		if ($('#optionTable').outerWidth() < 1672) {
			$('#optionTable').addClass('small');
		} else {
			$('#optionTable').removeClass('small');
		}
	}
	
	/* 데이터추가 ui control*/
	//데이터추가 위젯 이벤트 실행 함수
	$('#dataAddBtn').on('click', function () {
		app.oui.dataAddWidget().build();
		app.oui.dataAddWidget().addTo();
	})
	
	/* 지오코딩 ui control*/
	//지오코딩 위젯 이벤트 실행 함수
	$('#geoCodingBtn').on('click', function () {
		app.oui.geoCodingWidget().build();
		app.oui.geoCodingWidget().addTo();
	})
	
	/* TOC도구 ui control*/
	//TOC도구 위젯 이벤트 실행 함수
	$(document).on('click','#tocPopupBtn', function () {	
		
		if ($("#toc").hasClass('active') && $("#toc").css('width') =='0px' && $('#toc > .toc.dep1').css('display') == 'block'){
		} else {
			//toc popup 열기
			if ( ($(".tocToggle").hasClass('active') && $("#toc").hasClass('active')) || !$("#toc").hasClass('active') || ($('#toc').hasClass('active') && $('#layerDetailDiv').hasClass('active')) || app.cmm.data.mode !== 'webmap-view') {
				
				//웹앱, 웹맵 구분
				if(['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) {
					//$("#toc > .toc.dep2").removeClass('active').css('display','none');
					$(".tocToggle").removeClass('active');
					$('#toc > .toc.dep1').css('display','block');
					$(".tocToggle").removeClass('active');
					$("#toc").draggable().draggable({ disabled :false, handle : '.head'}).css({ 'width':0, 'height':600, 'left':1030, 'top':68 })
					$('#toc').addClass('active').removeClass('hide');
					$('.btnTocHide').css('display', 'none');
				} else {
					$("#toc").draggable().draggable({ disabled :false, handle : '.head'}).css({ 'width':0, 'height':600, 'left':1030, 'top':68 })
					$('#toc > .toc.dep1').css('display','block');
					$('#toc').addClass('active').removeClass('hide').css('position','absolute');
					$('#toc').find('.btnTocHide').css('display', 'none');
					$('#toc').appendTo($('#map'));
				}
				
				//레이어스타일 popup이 열려있는경우
				if ($('#toc > .toc.dep2').hasClass('active') && $('#layerStyle_layerSelect').length !== 0){
					//$('#layerDetailDiv').css({'left':'10px','top':'0px'});
					//console.log($('#layerDetailDiv').css('left'));
					
					if ($('#toc .toc.dep1').find('.btnTocHide').css('display') == 'none') {
						$('#layerDetailDiv').css({'left': 10,'top': 0 });
					} else {
						$('#layerDetailDiv').css({'left': parseInt($('#layerDetailDiv').css('left'),10) -1030,'top': parseInt($('#layerDetailDiv').css('top'),10) -72 });
					}
					
					$("#toc").draggable().draggable('option', 'disabled', true);
					$("#toc > .toc.dep1").draggable().draggable({ disabled :false, handle : '.head'});
				}
				
				
				//버튼 추가 안되어있는경우만 추가
				if (!$("#tocPopClose").length) {
					$("#toc > .tocWidget").find('.btnGroup').append('<button class="btnTocClose" id="tocPopClose"><span class="hidden">X</span></button>');
					$("#tocPopClose").click( function(){
						//toc popup 닫기 레이어팝업 on/off
						if ($('#layerDetailDiv').hasClass('active') && $('#layerTile').html() =='레이어 스타일'){
							$('#toc > .toc.dep1').css('display','none');
							$('#layerDetailDiv').css('left', parseInt($('#layerDetailDiv').css('left'),10) + 370)
						} else {
							$("#toc").removeClass('active');
						}
					});
				}
			}
			map.updateSize();
		}
		
	});	
	
	
	//레이어스타일 위젯 이벤트 실행 함수
	$(document).on('click','#layerStyleBtn', function () {	
		let filterList = app.widget.tocWidget.getContentList().filter(function(obj){
		     return obj.odfLayerId !== undefined
		}); 
		if (!filterList.length) {
			callAlertMessage('추가된 레이어가 없습니다.');
		} else {
			
			//레이어스타일팝업이 열려있는지 ?
			if ($('#toc > .toc.dep2').hasClass('active') && $('#toc > .toc.dep2').css('width') == '0px') {
			} else {
				//레이어스타일탭이 닫혀있거나, 열려있으나 첫번째순서 레이어가 아닌 다른 레이어가 열려있는경우
				let openContentId = $('#layerDetailWidget').find('.contentId').val();
				let firstContentId = filterList[0].contentId;
				if (!$('#toc > .toc.dep2').hasClass('active') || openContentId !== firstContentId ) {
					$('.toc_btnLayerDetail:first').click();
				}
				layerStylePopSet();
				
				//toc popup이 열려져있는 상태에서 open
				if ($('#toc').css('width') == '0px' && $('#toc > .toc.dep1').css('display') == 'block'){
					$('#toc').draggable().draggable('option', 'disabled', true);
					$('#toc > .toc.dep1').draggable().draggable('option', 'disabled', false);
					//$('#layerDetailDiv').css({'left':'10px','top':'0px'});
					$('#layerDetailDiv').css({'left':1030 - parseInt($('#toc').css('left'),10),'top':68 - parseInt($('#toc').css('top'),10)});
					//웹앱
					if(!['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) {
						$('#layerDetailDiv').css('position','relative');
					}
				} else {
					let tocLeft = $('#toc').css('left');
					tocLeft = '1030px' ? $('#layerDetailDiv').css({'left':370,'top':0}) : $('#layerDetailDiv').css({'left':1030,'top':68}) ;
					$('#toc').addClass('active');
				}
			}
			
		}
		map.updateSize();
		
	});
	
	//레이어스타일 위젯 select 이벤트
	$(document).on('change','#layerStyle_layerSelect', function () {
		let loc = [$('#layerDetailDiv').css('left'), $('#layerDetailDiv').css('top')];
		$(`.toc_btnLayerDetail:eq(${this.selectedIndex})`).click();
		layerStylePopSet(loc);
		
	});
	
	//레이어스타일탭 팝업화
	function layerStylePopSet(loc){
		
		if (!$("#toc").hasClass('active')){
			$('#toc').addClass('active');
			$('#toc > .toc.dep1').css('display','none');
		}
		
		let tocLeft = $('#toc').css('left');
		let tocTop = $('#toc').css('top');
		//console.log(tocLeft);
		//console.log(tocTop);
		$('#layerDetailDiv').draggable().draggable('option','disabled',false).css({ 'width':0, 'height':600, 'left': 1020, 'top': 72 }).addClass('active');
		if (loc) {
			$('#layerDetailDiv').css({'left': `${loc[0]}` , 'top' : `${loc[1]}`});
		}
		
		//웹앱
		if(!['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) {
			$('#layerDetailDiv').css('position','fixed');
		}
		
		$('.layerDetail_tabList > li:eq(1)').hide();
		$('#layerTile').html('레이어 스타일');
		$('#lyrDetailBtn').hide();
		
		if (!$('#layerStyle_layerSelect').length) {
			let layerListHtml = '<div class="style_choice style_noMarginBottom"><label>레이어 선택</label><div class="style_pick"><select id="layerStyle_layerSelect"></select></div></div>'
				$('.layerDetail_inner > form').prepend(layerListHtml);
			$('#layerStyle_layerSelect').css('width','83%').after('<button type="button" class="btn spatialAnalysis_btnAdd" id="layerStyle_mouse" style="height:28px;width:14px;margin-left:3px;display:inline-block"><span class="spatialAnalysis_hidden">추가</span></button>');
			if(!['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) $('#layerStyle_layerSelect').css('width','81%');
			for( let tocLyr of app.widget.tocWidget.getContentList().filter(function(obj){return obj.odfLayerId !== undefined}) ) {
				$('#layerStyle_layerSelect').append(`<option value="${tocLyr.odfLayerId}">${tocLyr.lyrNcm}</option>`);
			}
		}
		//$('#layerDetailDiv').css('position','absolute');
		map.updateSize();
	}
	
	//레이어스타일 위젯 레이어 클릭이벤트
	$(document).on('click','#layerStyle_mouse', function () {
		callAlert("success", "지도에서 지점을 클릭해 주세요.");
		$('#layerStyle_mouse').addClass('clickActive');
	});
	
	
	//웹맵
	if(['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) {
		//레이어스타일 위젯 레이어 클릭이벤트 -웹맵
	    odf.event.addListener(map, 'click', (evt) => {
	    	if ($('#layerStyle_mouse').hasClass('clickActive')) {
	    		let feature = map.selectFeatureOnClick(evt);
	    		if (feature.length > 0) {
	    			let clickODFId = feature[0].layer.getODFId();	//클릭한 피쳐의 레이어 odfId
	    			let nowODFId = $('#layerDetailWidget').find('.contentId').val();	//현재 선택되어 있는 레이어 odfId
	    			if (clickODFId !== nowODFId) {
	    				$('#layerStyle_layerSelect').val(`${clickODFId}`).trigger('change');
	    				$('#layerStyle_mouse').addClass('clickActive');
	    			}
	    		}
	    	}

	    });
	    
		let bLayerList = app.widget.tocWidget.getContentList().filter(function(obj){
		     return obj.odfLayerId !== undefined
		}); 
		let aLayerList = app.widget.tocWidget.getContentList().filter(function(obj){
		     return obj.odfLayerId !== undefined
		}); 
		
		//toc변경감지
		setInterval(function(){
			aLayerList =  app.widget.tocWidget.getContentList().filter(function(obj){
			     return obj.odfLayerId !== undefined
			}); 
			if ($('#layerDetailDiv').css('height') == '600px' && $('#layerDetailDiv').hasClass('active')) {
				
				let compare = true;
				if (aLayerList.length !== bLayerList.length ) {
					compare = false;
				} else {
					for (var i=0; i<bLayerList.length ; i++) {
						if (bLayerList[i].contentId !== aLayerList[i].contentId) {
							compare = false;
							break;
						}
					}
				}
				
				if (!compare) {
					$('#btnTocClose_toc').click();
					$('#layerStyleBtn').click();
				}
			}
			bLayerList = app.widget.tocWidget.getContentList().filter(function(obj){
			     return obj.odfLayerId !== undefined
			}); 
		},1000);
	}
    
    //레이어탭 닫을 시 레이어상세설정 버튼 클릭으로 닫도록
	$(document).on('click','#btnTocClose_toc', function () {
		let nowODFId = $('#layerDetailWidget').find('.contentId').val();
		let lyrList = app.widget.tocWidget.getContentList().filter(function(obj){
		     return obj.odfLayerId !== undefined
		}); 
		for(let i=0; i < lyrList.length ; i++) {
			if (lyrList[i].odfLayerId == nowODFId) $(`.toc_btnLayerDetail:eq(${i})`).click();
		}
	});

	
	/* 공간분석 ui control*/
	//공간분석  위젯 onOff
	$(document).on('click','.analysisWidgetClass > div > button', function () {
		if ($(this).next().css('display') == 'none') {
			$(this).next().css('display','flex');
		} else {
			$(this).next().css('display','none');			
		}
	})
	
	//공간분석 각 상세분석 버튼
	$(document).on('click','.analysisSegListDiv > button' , function () {
		$(this).closest('div').css('display','none');	
		let btnId = $(this).attr('id');
		btnId = btnId.substr(btnId.indexOf('_')+1);
		
		//웹앱인 경우 분석 탭 수정
		if ( $('.tocArea').length > 0) {
			$('#analysis').appendTo($('.contentArea'));
			$('#analysis').css('position','absolute');
		}
		
		
		$('#analysis').addClass('active');
		$('#analysis').addClass('active analysisPopWidget');
		$('.analysis').addClass('active');
		
		//공간분석 1차탭 none
		$('#analysis > .toc.dep1').css('display','none');
		//분석 숨기기버튼 none
		//$('#btnTocHide_anal').css('display','none');
		//탭 팝업화
		$('#analysis > .toc.dep2').draggable({'disabled':false}).css({'width':'0px', 'height' :'800px', 'left' : '1000px', 'top' : '75px'});
		
		$(`.${btnId}`).click();
	})

	$(document).on('click','.login_btn.widgetBtn', function () {
		//로그인 여부 체크
		if ($('#loginUserId').val() !== '') {
			callAlertMessage('이미 로그인 되어 있습니다.');
			return;
		}
		let html = 
			`<div id="modal-loginWidget" class="modal_modal modal_open popup movie_pop lx_login_layer" style="width:393px;">
				<div>
					<div class="head blue">
						<strong class="titPop">로그인</strong>
						<div class="btnGroup">
							<button type="button" class="btnPopClose" onclick="$('#modal-loginWidget').remove();"><span class="hidden">팝업 닫기</span></button>
						</div>
					</div>			
					<div class="cont">
					<form class="toc_groupAddForm" id="mapLoginForm" method="post">
					<input type="hidden" name="returnUrl" value="">
						<div class="login">
							<p class="logo">
								<img src="../smt/images/widget/logo.png" alt="LX로고">
							</p>
							<span class="input">
								<input type="text" placeholder="ID 입력" id="userId" name="userId" onkeyup="javascript:if(event.keyCode==32) {removeSpaceBar()}">
							</span>
							<span class="input">
								<input type="password" placeholder="비밀번호 입력" id="userPw" name="userPw" onkeyPress="javascript:if(event.keyCode==13) {getLogin()}">
								<input type="hidden" id="userPasswordEncpt" name="userPasswordEncpt" />
							</span>
							<div class="link">
								<a href="#" onclick="mapLoginMenu('join');">회원가입</a>
								<a href="#" onclick="mapLoginMenu('find');">아이디/비밀번호 찾기</a>
							</div>
							<div class="btn_sec">
								<button type="button" class="btn" onclick="getLogin();"><span>로그인</span></button>
							</div>
						</div>
					</form>	
					</div>					

				</div>
			</div>`;
		$('body').append(html);
		$('#modal-loginWidget').draggable();
		
	});
	
	
	//중첩영상 위젯 button
	$(document).on('click','#overlapBtn', function () {
		app.webmap.components.overlapListModalVue.init();
		app.webmap.components.overlapListModalVue.addrInit();
	})
	
	//부동산  위젯 onOff
	$(document).on('click','.landInfoWidget > div > button', function () {
		if ($(this).next().css('display') == 'none') {
			$(this).next().css('display','flex');
		} else {
			$(this).next().css('display','none');			
		}
	})
	
	let beforeLandClickEvtId;
	let beforeLandMoveEvtId;
	
	//부동산 지점버튼 클릭 이벤트
	$(document).on('click','.landInfoWidget_pointBtn', function () {
		odf.event.removeListener(beforeLandClickEvtId);	//클릭이벤트 삭제
		odf.event.removeListener(beforeLandMoveEvtId);	//무브이벤트 삭제
		let drawControl = new odf.DrawControl();
		drawControl.setMap(map,false);
		drawControl.createDrawTip();	//지점 선택 문구
		
		let datas= {
				type: "FeatureCollection",
				features: [{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [0, 0],
					}
				}]
		}
		let tempLayer = odf.LayerFactory.produce('geojson', {
			data: datas
		});
		tempLayer.setMap(map);
		
		let pointStyle = odf.StyleFactory.produce(
			{
			    "geometryType": "free",
			    "name": "기본 스타일",
			    "fill": {
			        "color": [0,0,0,0.4
			        ]
			    },
			    "stroke": {
			        "color": [
			            255,0,0,0.7
			        ],
			        "width": 2
			    },
			    "image": {
			        "circle": {
			            "radius": 5,
			            "snapToPixel": true,
			            "fill": {
			                "color": [0,0, 0, 0.4]
			            },
			            "stroke": {
			                "color": [255,0, 0,0.7],
			                "width": 2
			            }
			        }
			    },
			    "text": {
			        "font": "20px sans-serif",
			        "maxAngle": 0.7853981633974483,
			        "placement": "point",
			        "fill": {
			            "color": [255,0,0,1]
			        },
			        "stroke": {
			            "color": [255,255,255,1]
			        }
			    }
			}
		);
		tempLayer.setStyle(pointStyle);
		
		let landMoveEvtId = odf.event.addListener(map,'pointermove',(evt)=>{
			tempLayer.clear();
			let pointFeature = odf.FeatureFactory.produce({
				  geometryType: 'point',
				       coordinates: evt.coordinate,
				});
			tempLayer.addFeature(pointFeature);
		});
		
		let landClickEvtId = odf.event.addListener(map,'click',(evt)=>{

			drawControl.removeToolTip();
			tempLayer.clear()
			odf.event.removeListener(landMoveEvtId);	//무브이벤트 삭제
			map.removeLayerFromMap(tempLayer.getODFId());	//레이어 삭제
			drawControl.removeMap();
			let param = {}
			param.geom = `POINT (${evt.coordinate[0]} ${evt.coordinate[1]})`;
			param.userId = 'lxuser';
			
			app.cmm.api.landInfo.list(param).then(function (result) {
				if (result.contents.landInfo.length == 0) {
					callAlertMessage('지점의 부동산정보가 없습니다.');
				} else{
					//getLandInfo(result.contents, 'land', evt.coordinate);
					getLandInfo1(result.contents, 'land', evt.coordinate);
				}
			});
			
		},true);
		beforeLandClickEvtId = landClickEvtId;
		beforeLandMoveEvtId = landClickEvtId;
	})
	
	//부동산정보세팅
	function getLandInfo(apiDatas, gubn, coord) {
		

		//popup 표출
		let popHtml = `<div class="thisAddr" style="width:400px;height:250px;top:-300px;">
            				<div class="inner"></div>
					   </div>`;

		 let popDiv = document.createElement('div');
		 popDiv.innerHTML = popHtml;
		 let marker = new odf.Marker({
			    position : coord,
			    style : {
			      element : popDiv
			    },
			    rightClickDelete : true
			  });
		 marker.setMap(map);
		 
		 //레이어 표출
		 let landFeature = odf.FeatureFactory.fromWKT(apiDatas[0].geom);
		 let landLayer = odf.LayerFactory.produce('geojson', {
			 data: {
				 type: "FeatureCollection",
				 features: [{
					 type: "Feature",
					 geometry: {
						 type: "Point",
						 coordinates: [0, 0],
					 }
				 }]
			 }
		 });
		 landLayer.addFeature(landFeature);
		 landLayer.setMap(map);
		 landLayer.setODFId(`odf-layer-draw_${marker.id}`);
		 
		 //컬럼 데이터 설정
		 $(`[data-id=${marker.id}]`).append(`<input type="hidden" id="${marker.id}_juso" value="${apiDatas[0].sidoNm} ${apiDatas[0].sggNm} ${apiDatas[0].emdNm} ${apiDatas[0].jibun}"/>`);
		 let landList;
		 if(['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) { 
			 landList = app.webmap.data.landInfoList;
		 } else {
			 landList = app.webapp.data.landInfoList.filter(v=> app.webapp.data.webAppOptions.detailSetting.widgetTab.landInfoCheckedList[v.landGubn +"Column_"+v.landColumnId] == true)
		 }
		 
		 $(`[data-id=${marker.id}]`).append(`<input type="hidden" id="${marker.id}_buildLen" value="${apiDatas.length}"/>`);
		 
		 $.each(landList, function(idx, itm) {
			 //건물이 여러개 일경우, 및 토지,건물 구분
			 $.each(apiDatas, function(apiIdx, apiItem) {
				 let dataVal = apiDatas[apiIdx][itm.landColumnId];
				 if (itm.landGubn == 'land') {
					 if (apiIdx ==0) $(`[data-id=${marker.id}]`).append(`<input type="hidden" id="${marker.id}_${itm.landGubn}Column_${itm.landColumnId}" value="${dataVal}"/>`);
				 } else {
					 $(`[data-id=${marker.id}]`).append(`<input type="hidden" id="${marker.id}_${itm.landGubn}Column_${itm.landColumnId}-${apiIdx}" data-tab="${apiIdx}" value="${dataVal}"/>`);
				 }
			 })
			 
		 });
		 
		 $(`[data-id=${marker.id}]`).find('.thisAddr .inner').append(`
			 <ul style="font-size:17px; display: inline-block;">
				<li style="background-color:red;display: inline-block; padding :5px;" class="landInfo-li land">토지정보</li>
				<li style="display: inline-block;padding :5px;" class="landInfo-li build">건물정보</li>
			 </ul>
			 <button id="${marker.id}_closeBtn" class="landInfo_closeBtn" style="float: right; font-size:20px;">X</button>
		 `);
		 
		 $(`[data-id=${marker.id}]`).find('li').eq(0).trigger('click');
	}
	
	
	//부동산정보세팅
	function getLandInfo1(apiDatas, gubn, coord) {
		
		//주소
		let juso = apiDatas.landInfo[0].a2 + " " + apiDatas.landInfo[0].a5
		
		 //컬럼 데이터 설정
		 let landList;
		 if(['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) { 
			 landList = app.webmap.data.landInfoList;
		 } else {
			 landList = app.webapp.data.landInfoList.filter(v=> app.webapp.data.webAppOptions.detailSetting.widgetTab.landInfoCheckedList[v.landGubn +"Column_"+v.landColumnId] == true)
		 }
		
		let landHtml = "";
		let buildHtml = "";
		let buildLiHtml = "";	//건물 여러개인경우
		
		$.each( landList, function (idx,itm) {	//필지
			if (itm.landGubn == 'land') {
				let landInfo = apiDatas.landInfo[0];
				let infoData = landInfo[itm.landColumnId] ?? '';
				
				landHtml +=
				`<tr>
					<th scope="row">${itm.landColumnName}</th>
					<td class="txt-center">${infoData}</td>
				</tr>`;
					
			}
		})
		
		$.each( apiDatas.buildInfo, function(idx,itm) {	//건물
			
			buildLiHtml += `<a href="#" class="buildInfo-li" onclick="return false;">건물${idx+1}</a>`;
			
			buildHtml += `<tbody>` ;
			$.each(landList.filter(v=> v.landGubn =='build'), function (dataIdx, dataItm) {
				buildInfo =  itm;
				let buildData = itm[dataItm.landColumnId] ?? '';
				buildHtml += `
					<tr>
						<th scope="row">${dataItm.landColumnName}</th>
						<td class="txt-center">${buildData}</td>
					</tr>						
				`;
			});
			buildHtml += `</tbody>` ;
		})
		
		if (apiDatas.buildInfo.length == 0) buildHtml = '<tbody><tr><td colspan="2" class="txt-center">조회된 건물정보가 없습니다.</td></tr></tbody>'
	
		
		//popup 표출
		let popHtml = `	
		<div class="popup modal_tooltip tooltip_layer" style="background-color:white; min-height:350px;max-height:350px; top:-400px; left:-183px" >
			<div class="tab">
				<div class="tabContWrap type01">
					<div class="tabNav">
						<ul class="tabList">
							<li class="active landInfo-li land">필지정보</li>
							<li class="landInfo-li build">건물정보</li>
						</ul>
					</div>
					<div class="tabCont active">
						<section class="section type02">
							<div class="titSec div_juso"><strong>${juso}</strong></div>
							<div class="table" style="max-height:220px">
								<table >
									<caption>기본정보</caption>
									<colgroup>
										<col style="width: 125px;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
									${landHtml}
									</tbody>
								</table>
							</div>
						</section>
					</div>
					<div class="tabCont">
						<section class="section type02">
							<div class="titSec div_juso"><strong>${juso}</strong></div>
							<div class="mui_link">
								${buildLiHtml}
							</div>
							<div class="table" style="max-height:180px">
								<table>
									<caption>기본정보</caption>
									<colgroup>
										<col style="width: 125px;">
										<col style="width: auto;">
									</colgroup>
									${buildHtml}
								</table>
							</div>
						</section>
					</div>
				</div>
	
			</div>
			<span class="arrow"></span>
		</div>`;

		 let popDiv = document.createElement('div');
		 popDiv.innerHTML = popHtml;
		 let marker = new odf.Marker({
			    position : coord,
			    style : {
			      element : popDiv
			    },
			    rightClickDelete : true
			  });
		 marker.setMap(map);
		 
		 //레이어 표출
		 let landFeature = odf.FeatureFactory.fromWKT(apiDatas.landInfo[0].geom);
		 let landLayer = odf.LayerFactory.produce('geojson', {
			 data: {
				 type: "FeatureCollection",
				 features: [{
					 type: "Feature",
					 geometry: {
						 type: "Point",
						 coordinates: [0, 0],
					 }
				 }]
			 }
		 });
		 landLayer.addFeature(landFeature);
		 landLayer.setMap(map);
		 landLayer.setODFId(`odf-layer-draw_${marker.id}`);
		 
		 $(popDiv).find('.buildInfo-li:eq(0)').click();
		 
		 
		
	}
	
	
	//부동산 탭버튼 클릭
	$(document).on('click','.landInfo-li', function (evt) {
		let markerli = evt.currentTarget;
		let gubn = $(markerli).hasClass('land') ? 'land' : 'build';
		if (gubn == 'land') {
			$(markerli).closest('ul').find('li').eq(0).addClass('active');
			$(markerli).closest('ul').find('li').eq(1).removeClass('active');
			$(markerli).closest('.tabContWrap').find('.tabCont').eq(0).addClass('active');
			$(markerli).closest('.tabContWrap').find('.tabCont').eq(1).removeClass('active');
		} else {
			$(markerli).closest('ul').find('li').eq(0).removeClass('active');
			$(markerli).closest('ul').find('li').eq(1).addClass('active');
			$(markerli).closest('.tabContWrap').find('.tabCont').eq(1).addClass('active');
			$(markerli).closest('.tabContWrap').find('.tabCont').eq(0).removeClass('active');
		}
	})	
	
	
	//건물 탭버튼 클릭
	$(document).on('click','.buildInfo-li', function (evt) {
		let buildli = evt.currentTarget;
		$(buildli).closest('div').find('.buildInfo-li').removeClass('mui_active');
		$(buildli).addClass('mui_active');
		let idx = $(buildli).closest('div').find('.buildInfo-li').index(this);
		let tableNode = $(buildli).closest('div').next();
		$(tableNode).find('tbody').css('display','none');
		$(tableNode).find(`tbody:eq(${idx})`).css('display','');
		//인덱스
		//해당 tbody block 나머지 hidden 
	});
	
	//부동산 삭제버튼
	$(document).on('click','.landInfo_closeBtn', function (evt) {
		let btn = evt.currentTarget;
		//console.log(btn.id);
		let markerId = btn.id.substr(0,btn.id.indexOf('_closeBtn'));
		map.removeODFLayer(`odf-layer-draw_${markerId}`);
		map.getMarker(`${markerId}`).removeMap();
		$('.btn-control-marker-deleteButton').css('display','none');	//삭제버튼 숨김처리
	});
	
	//측정도구위젯 좌표계
	$(document).on('change','.thisAddr-srs-select', function (evt) {
		let thisSelect = evt.currentTarget;
		
		let param = {};
		param.posX = thisSelect.dataset.x
		param.posY = thisSelect.dataset.y
		param.sourceSrid = '4326'
		param.targetSrid = thisSelect.value;
		param.coordType = 'DEGREE'
		app.util.callAPI({
			url: `${API_COORD}/coord/single`,
			data: param,
			type: 'POST'
		}).then(function (result) {
			//console.log(result);
			$(thisSelect).closest('.measurement_cont').find('.changeAddrDesc:eq(0)').html(`${result.result.result.posX}`);
			$(thisSelect).closest('.measurement_cont').find('.changeAddrDesc:eq(1)').html(`${result.result.result.posY}`);
			$(thisSelect).closest('.measurement_cont').find('.changeCoordTag').html(`${thisSelect.value}`);
		});
	});
	
	//측정도구 팝업 삭제버튼
	$(document).on('click','.thisAddrCloseBtn', function (evt) {
		
		let btn = evt.currentTarget;
		let featureId = $(btn).closest('.btnGroup').find('input:eq(0)').val();
		let layerId = $(btn).closest('.btnGroup').find('input:eq(1)').val();
		let layer = map.getODFLayerList().filter(v=> v.getODFId() == layerId);
		let feature = layer[0].getFeatureById(featureId);
		if (feature) layer[0].removeFeature(feature);
		
		let markerId = $(btn).closest('.odfMarker').data('id');
		map.getMarker(`${markerId}`).removeMap();
		//$('.btn-control-marker-deleteButton').css('display','none');	//삭제버튼 숨김처리
	});
	
	
	
	if(['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) { 
	    odf.event.addListener(map,'contextmenu',(evt)=>{
		  $('#odf-draw-styleBox').css('display', 'none');
	    })
	};
	//불법 건축물 button
	$(document).on('click','#illgCnst_onoffBtnSpan', function () {
		app.webmap.components.illgCnstModalVue.init();
	})
	opTbResize();

})();
