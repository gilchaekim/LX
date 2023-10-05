
(() => {
    /* 툴바 1뎁스 버튼 클릭*/
    $('#widget .dep1 > li > .tool').on({
        "click": function () {
            if (!$(this).closest('li').hasClass('reset')) {
                $(this).closest('li').toggleClass('active').siblings('li').removeClass('active');
            } else {
                $(this).closest('li').siblings('li').removeClass('active'); //리셋버튼
            }
        }
    });

    /* 헤더 버튼 클릭*/
    $('#header .dep1 > li > .tool').on({
        "click": function () {
            if (!$(this).closest('li').hasClass('save')) {
                $(this).closest('li').toggleClass('active').siblings('li').removeClass('active');
                $(this).closest('.group').siblings('.group').find('li').removeClass('active');
            }
            if ($(this).closest('li').hasClass('tocToggle')) {
            	$('.toc.dep1').css('display','block');
                if ($(this).closest('.tocToggle').hasClass('active')) {
                    if ($('.spatialAnalysisGrid-box').length > 0) {
                        $('.btnOpTableClose').click();
                    }
                    
                    //toc 팝업 -> 탭 변경
                	$("#toc").draggable().draggable('option', 'disabled',true).css({'width':'', 'height': '100%', 'left':'', 'top':'' });
                	$("#toc > .toc.dep1").draggable().draggable('option', 'disabled',true).css({'width':'', 'height': '100%', 'left':'', 'top':'' });
                	if ($('#layerTile').html() !=='레이어 스타일') {
                		$("#toc > .toc.dep2").draggable().draggable('option', 'disabled',true).css({'width':'', 'height': '100%', 'left':'', 'top':'' });
                	} else {
                		$("#toc > .toc.dep2").css({'left':'1030px', 'top':'72px' });
                	}
                	$('.btnTocHide').css('display', 'block');
                	$("#tocPopClose").remove();
                	$('#toc').removeClass('active');
                    	
                	
                    $('#toc').toggleClass('active')
                    
                    //공간분석이 팝업일 경우 레이어탭을 켜도 닫히지않도록
                    if ($('#spatialAnalysisDetailDiv').css('height') !== '800px') {
                    	$('#analysis').removeClass('active')
                    	$('#spatialAnalysisDetailDiv').removeClass('active');
                    } else {
                    	$('#analysis > .toc.dep1').css('display','none');
                    	$('.analysis').addClass('active');
                    }
                    
                } else {
                	if ( $('#layerTile').html() =='레이어 스타일' && $('#layerDetailDiv').hasClass('active')) {
                		$('.toc.dep1').css('display','none');
                	} else {
                		$('#toc').removeClass('active')
                	}
                	//공간분석이 팝업일 경우 공간분석 1차탭이 닫혀있도록
                	if ($('#spatialAnalysisDetailDiv').css('height') == '800px') $('#analysis > .toc.dep1').css('display','none');
                }
            } else if ($(this).closest('li').hasClass('analysis')) {
            	//toc탭이 켜져있고, 공간분석 팝업상태
            	
            } else if ($(this).closest('li').hasClass('detail')) {
                if ($(this).closest('.detail').hasClass('active')) {
                    $('#detailSetting').toggleClass('active');
                }
            } else if ($(this).closest('li').hasClass('library')) {
                if ($(this).closest('.library').hasClass('active')) {
                    $('#library').toggleClass('active');
                }
            }
            opTbResize();
            map.updateSize();
        }
    });
    /* 지도 확대,축소 슬라이더 */
    $('.slideBar.mapStyle').slider({
        orientation: "vertical",
        range: "min",
        step: '9.09'
    });

    /* toc 가시거리 슬라이더 */
    $(".slideBar.tocStyle").slider({
        orientation: "horizontal",
        range: true,
        values: [20, 80],
    });

    odf.event.addListener(map, 'moveend', (evt) => {
        //축척 슬라이더 제어
        let zoom = evt.map.getView().getZoom();
        $('.slideBar.mapStyle').slider("value", zoom);

    });

    //    $('.btnUser, .btnAlarm').on({
    //        "click":function (){
    //            $(this).siblings().toggle();
    //        }
    //    })
    /* 알림 팝업 닫기 */
    //    $('.btnPopClose').on({
    //        "click":function (){
    //            $(this).closest('.alarmPop').hide();
    //            $(this).closest('.popup').hide();
    //        }
    //    })
    /*레이어 팝업 닫기 */
    $('.btnClose').on({
        "click": function () {
            $(this).closest('.layerPopup').hide();
            map.updateSize();
        }
    });



    /* 워크플로우 라이브러리 확대 축소 */
    $('.btnPopSizeToggle').on({
        "click": function () {
            $(this).closest('.popup').toggleClass('small')
        }
    });

    /* toc 상세 닫기 */
    $('.btnTocClose').on({
        "click": function (evt) {
            //분석인경우 경로계획, 출발지 목적지는 분석창을 닫을 때 
            if ($(evt.target).parents('#analysis')[0] != undefined) {
            	// 공간분석위젯 탭을 닫을 시 다 닫히도록
            	if ($('#btnTocHide_anal').css('display') =='none') {
            		$('.analysis').removeClass('active');
            		$('#analysis').removeClass('active');
            	}
                switch ($('.spatialAnalysis_detailFrame').attr('id')) {
                    //출발지 목적지 연결
                    case 'connectDestination':
                    case 'findPath':
                        app.widget.spatialAnalysisWidget.removeTempAnalysisLayer();
                        break;
                    case 'drivingArea':
                        //그리드가 열려있을 경우 분석창 닫아도 임시분석레이어 삭제안되야함
                        if ($('#gridWidget').children().length <= 0) {
                            app.widget.spatialAnalysisWidget.removeTempAnalysisLayer();
                        }
                        break;
                    default:
                        break;
                }
            }
            $(this).closest('.toc').toggleClass('active')
            opTbResize();
            map.updateSize();
        }
    })



    /* toc 보이기 숨기기 */
    $('.btnTocHide').on({
        "click": function () {
            $(this).closest('.toc').toggleClass('hide')
            opTbResize();
            map.updateSize();
        }
    })

    //    $('.btnOpTableHide').on({
    //        "click": function () {
    //            $(this).closest('#optionTable').toggleClass('hide')
    //            window.setTimeout(function () {
    //                map.updateSize();
    //            }, 401)
    //        }
    //    })

    var widgetIdx = 0;
    $('.btnLeft').on({
        "click": function () {
            widgetIdx--;
            //console.log(widgetIdx);
            $(this).closest('.group').removeClass('active').closest('.flex').children('.group').eq(widgetIdx).addClass('active')
        }
    })
    $('.btnRight').on({
        "click": function () {
            widgetIdx++;
            //console.log(widgetIdx);
            $(this).closest('.group').removeClass('active').closest('.flex').children('.group').eq(widgetIdx).addClass('active')
        }
    })

    //    $('.btn.scale').on({
    //        "click": function () {
    //            if ($(this).hasClass('up')) {
    //                if ($('#optionTable').hasClass('active')) {
    //                    $(this).siblings('.btn.scale').show();
    //                    $('#optionTable').addClass('middle').removeClass('active');
    //                    $('.ag-theme-alpine').css('height', '500px');
    //                    window.setTimeout(function () { map.updateSize() }, '401');
    //                } else if ($('#optionTable').hasClass('middle')) {
    //                    $('#optionTable').addClass('full').removeClass('middle');
    //                    $(this).hide();
    //                    $('.ag-theme-alpine').css('height', '800px');
    //                    window.setTimeout(function () { map.updateSize() }, '401');
    //                }
    //            } else if ($(this).hasClass('down')) {
    //                if ($('#optionTable').hasClass('full')) {
    //                    $('#optionTable').addClass('middle').removeClass('full');
    //                    $('.ag-theme-alpine').css('height', '500px');
    //                    $(this).siblings('.btn.scale').show();
    //                    window.setTimeout(function () { map.updateSize() }, '401');
    //                } else if ($('#optionTable').hasClass('middle')) {
    //                    $('#optionTable').addClass('active').removeClass('middle');
    //                    $(this).hide();
    //                    $('.ag-theme-alpine').css('height', '306px');
    //                    window.setTimeout(function () { map.updateSize() }, '401');
    //                }
    //            }
    //        }
    //    });
    //
    //    $('.btnOpTableClose').on({
    //        "click": function () {
    //            //grid header에 닫기 버튼 있으면 동작시키기
    //            if ($('#optionTable #close')) {
    //                $('#optionTable #close').trigger("click");
    //            }
    //            /*임시로css 바꿔서 테이블 맵 뒤로 숨기기. -김정헌 */
    //            //        	$(this).closest('#optionTable').css("z-index",-1);
    //            //        	$(this).closest('#optionTable').css("top","50px");
    //            //        	$(this).closest('#optionTable').css("position","absolute")
    //            app.widget.geocodingGridWidget && app.widget.geocodingGridWidget.addTo(false);
    //            $(this).closest('#optionTable').hide();
    //            map.updateSize();
    //            document.querySelector('.titOpTable').innerText = "속성 테이블";
    //        }
    //    })

    $('.groupBox .titGroup').on({
        "click": function () {
            $(this).closest('.groupBox').toggleClass('active');
        }
    })
    /*
    $('.groupList').css('height',$(window).height() - 103)
    $('.sortList').css('maxHeight',$(window).height() - 274)
    $('.dataArea').css('height',$(window).height() - 232)
    $('.sectionArea').css('maxHeight',$(window).height() - 169)
    $('.layer.cScroll').css('maxHeight',$(window).height() - 123)
    $(window).on({
        "resize":function (){
            $('.groupList').css('height',$(window).height() - 103)
            $('.sortList').css('maxHeight',$(window).height() - 274)
            $('.dataArea').css('height',$(window).height() - 232)
            $('.sectionArea').css('maxHeight',$(window).height() - 169)
            $('.layer.cScroll').css('maxHeight',$(window).height() - 123)
            opTbResize();
        }
    })
    */
    $(window).on({
        "resize": function () {
            opTbResize();
        }
    });
    /* 탭 */
    $('.tabList > li').on({
        "click": function () {
            $(this).addClass('active').siblings('li').removeClass('active');
            $(this).closest('.tabNav').siblings('.tabCont').eq($(this).index()).addClass('active').siblings('.tabCont').removeClass('active');
        }
    })
    /* 템플릿 선택 */
    //    $('.tempList .temp').on({
    //        "click":function (){
    //            $(this).addClass('active').siblings('.temp').removeClass('active');
    //        }
    //    })

    /* 커스텀 콤보박스 */
    $('.comboBox > span').on({
        "click": function () {
            $(this).siblings('.comboList').toggleClass('active')
        }
    });
    $('.comboList li span').on({
        "click": function () {
            let text = $(this).html();
            $(this).closest('.comboBox').children('span').html(text)
            $(this).closest('.comboList').removeClass('active');
        }
    });

    $(document).mouseup(function (e) {
        let combolist = $('.comboBox')
        if (combolist.has(e.target).length === 0) {
            combolist.find('.comboList').removeClass('active');
        }
    });
    $('.dragUI').draggable({
        containment: 'parent',
        scroll: false,
        cancel: '.layerCont'
    });
    $('.colorPicker').ColorPicker({
        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('.colorPicker').css('backgroundColor', '#' + hex);
        }
    });

    /* accordion */
    $('.accordion .toolList > li > span').on({
        "click": function () {
            $(this).siblings('.innerList').slideToggle();
            $(this).closest('li').toggleClass('active').siblings('li').removeClass('active').children('.innerList').slideUp();
        }
    })

    /* 팝업 내용 수정버튼 */
    //    $('.btnEdit.txt, .btnEdit.img').on({
    //        "click":function (){
    //            $(this).siblings('.editBox').toggleClass('active');
    //        }
    //    })
    $('.editBox.textarea .btn, .editBox.input .btn').on({
        "click": function () {
            if ($(this).hasClass('black')) {
                if ($(this).closest('.editBox').hasClass('input')) {
                    let txt = $(this).siblings('input[type="text"]').val();
                    $(this).closest('.editBox').siblings('span').text(txt)
                } else if ($(this).closest('.editBox').hasClass('textarea')) {
                    let txt = $(this).siblings('textarea').val();
                    $(this).closest('.editBox').siblings('span').text(txt)
                }
                $(this).closest('.editBox').removeClass('active');
            } else {
                $(this).closest('.editBox').removeClass('active');
            }
        }
    })
    /* toc 그룹,레이어명 수정버튼 */
    $('.btnGroupEdit, .btnLayerEdit, .btnSortEdit').on({
        "click": function () {
            $(this).closest('.btnGroup').siblings('.editBox').toggleClass('active')
        }
    })
    $('.editBox.tocGroup .btn').on({
        "click": function () {
            if ($(this).hasClass('black')) {
                let val = $(this).siblings('input').val();
                $(this).closest('.editBox').toggleClass('active').siblings('.titGroup').text(val);
            } else {
                $(this).closest('.editBox').toggleClass('active');
            }
        }
    })
    $('.editBox.tocLayer .btn').on({
        "click": function () {
            if ($(this).hasClass('black')) {
                let val = $(this).siblings('input').val();
                $(this).closest('.editBox').toggleClass('active').siblings('.tit').children('p').text(val);
            } else {
                $(this).closest('.editBox').toggleClass('active');
            }
        }
    })

    $('.btnMapAnalysis, .btnGeoPlay').on({
        "click": function () {
            if ($('.confirmBox input[type="text"]').val() === '') {
                $('.confirmBox').addClass('invalid');
            } else {
                $('.confirmBox').removeClass('invalid');
            }
        }
    })
    /*속성테이블 편집모드버튼*/
    $('.btnEditMode').on({
        "click": function () {
            $(this).toggleClass('active');
        }
    })

    /* 새 웹맵 클릭시 팝업보이기 */
    //    $('.webMap .tool.type01').on({
    //        "click":function (){
    //            $('.popup.newLayer').show();
    //            $(this).closest('.webMap').removeClass('active')
    //        }
    //    })

    /* 업로드팝업 */
    $('.btnTocUpload').on({
        "click": function () {
            $('.popup.upload').show();
        }
    })

    /* 지오코딩 업로드 실행*/
    $(document).on('click', '.btnGeoPlay', function () {
        $(this).closest('.popup').hide();
        $('.alarmPop').show();
    })

    /* 밀도맵 클릭 2뎁스 */
    $('.accordion .innerList li').on({
        "click": function () {
            $('#analysis .toc.dep2').show();
        }
    })
    /*옵션팝업 열기*/
    $('.btn.openOption').on({
        "click": function () {
            $('.popup.optionPop').show();
        }
    })
    $('.btnMapAnalysis').on({
        "click": function () {
            $('#analysis .toc.dep2').hide();
            $('.popup.optionPop').hide();
            $('.toc .groupList').append('<div class="layerBox">\n' +
                '                            <div class="inner">\n' +
                '                                <div class="tit">\n' +
                '                                    <i class="ico ico-hitmap"></i>\n' +
                '                                    <p>파일 업로드 shp 밀도맵</p>\n' +
                '                                </div>\n' +
                '                                <div class="editBox tocLayer">\n' +
                '                                    <input type="text" style="width:190px;">\n' +
                '                                    <button type="button" class="btn black"><span>적용</span></button>\n' +
                '                                    <button type="button" class="btn grey2"><span>취소</span></button>\n' +
                '                                </div>\n' +
                '                                <div class="btnGroup">\n' +
                '                                    <button type="button" class="btnLayerEdit"><span class="hidden">수정</span></button>\n' +
                '                                    <button type="button" class="btnLayerRemove"><span class="hidden">레이어 삭제</span></button>\n' +
                '                                    <button type="button" class="btnLayerView"><span class="hidden">레이어 보기/숨기기</span></button>\n' +
                '                                    <button type="button" class="btnLayerBookmark"><span class="hidden">레이어 북마크</span></button>\n' +
                '                                    <button type="button" class="btnLayerProperty"><span class="hidden">레이어 속성</span></button>\n' +
                '                                    <button type="button" class="btnLayerMore"><span class="hidden">더보기</span></button>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>')
            $('#header .dep1 .tocToggle').addClass('active').siblings('.analysis').removeClass('active');
            $('#analysis').removeClass('active');
            $('#toc').addClass('active');
        }
    })

    $(document).on('click', '.btnFileLayer', function () {
        $(this).closest('.popup').hide();
        $('.toc .groupList').append('<div class="layerBox">\n' +
            '                            <div class="inner">\n' +
            '                                <div class="tit">\n' +
            '                                    <i class="ico ico-hitmap"></i>\n' +
            '                                    <p>파일 업로드 shp</p>\n' +
            '                                </div>\n' +
            '                                <div class="editBox tocLayer">\n' +
            '                                    <input type="text" style="width:190px;">\n' +
            '                                    <button type="button" class="btn black"><span>적용</span></button>\n' +
            '                                    <button type="button" class="btn grey2"><span>취소</span></button>\n' +
            '                                </div>\n' +
            '                                <div class="btnGroup">\n' +
            '                                    <button type="button" class="btnLayerEdit"><span class="hidden">수정</span></button>\n' +
            '                                    <button type="button" class="btnLayerRemove"><span class="hidden">레이어 삭제</span></button>\n' +
            '                                    <button type="button" class="btnLayerView"><span class="hidden">레이어 보기/숨기기</span></button>\n' +
            '                                    <button type="button" class="btnLayerBookmark"><span class="hidden">레이어 북마크</span></button>\n' +
            '                                    <button type="button" class="btnLayerProperty"><span class="hidden">레이어 속성</span></button>\n' +
            '                                    <button type="button" class="btnLayerMore"><span class="hidden">더보기</span></button>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>')
    })
    $('.dayBox .log').on({
        "click": function () {
            $('#optionTable').show();
            $('.alarmPop').hide();
        }
    })

    $('.btn.newMap').on({
        "click": function () {
            $(this).closest('.popup').hide();
            $('#toc').addClass('active');
        }
    })

    $(document).on('click', '.btn.addLayer', function () {

        $('#optionTable').hide();
        $('.toc .groupList').append('<div class="layerBox">\n' +
            '                            <div class="inner">\n' +
            '                                <div class="tit">\n' +
            '                                    <i class="ico ico-hitmap"></i>\n' +
            '                                    <p>레이어 업로드 엑셀 지오코딩 </p>\n' +
            '                                </div>\n' +
            '                                <div class="editBox tocLayer">\n' +
            '                                    <input type="text" style="width:190px;">\n' +
            '                                    <button type="button" class="btn black"><span>적용</span></button>\n' +
            '                                    <button type="button" class="btn grey2"><span>취소</span></button>\n' +
            '                                </div>\n' +
            '                                <div class="btnGroup">\n' +
            '                                    <button type="button" class="btnLayerEdit"><span class="hidden">수정</span></button>\n' +
            '                                    <button type="button" class="btnLayerRemove"><span class="hidden">레이어 삭제</span></button>\n' +
            '                                    <button type="button" class="btnLayerView"><span class="hidden">레이어 보기/숨기기</span></button>\n' +
            '                                    <button type="button" class="btnLayerBookmark"><span class="hidden">레이어 북마크</span></button>\n' +
            '                                    <button type="button" class="btnLayerProperty"><span class="hidden">레이어 속성</span></button>\n' +
            '                                    <button type="button" class="btnLayerMore"><span class="hidden">더보기</span></button>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>')
    })

    $(document).on('click', '.btnLayerMore', function () {
        $('#toc .toc.dep2').show();
    })


    /* 파일첨부 */
    var fileTarget = $('.fileSelect .fileHidden');
    fileTarget.on('change', function () { // 값이 변경되면
        if (window.FileReader) { // modern browser
            var filename = $(this)[0].files[0].name;
        } else { // old IE
            var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
        } // 추출한 파일명 삽입
        $(this).siblings('.fileLocal').val(filename);
    });

    /* sortable */
    let nestedSortables = document.getElementsByClassName('sortList');
    for (let i = 0; i < nestedSortables.length; i++) {
        new Sortable(nestedSortables[i], {
            group: 'item',
            handle: '.handle',
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.65
        });
    }

    /* 속성테이블 리사이즈시 레이아웃 변경 */
    function opTbResize() {
        if ($('#optionTable').outerWidth() < 1672) {
            $('#optionTable').addClass('small');
        } else {
            $('#optionTable').removeClass('small');
        }
    }
    
    opTbResize();
})();