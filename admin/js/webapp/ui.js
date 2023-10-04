$(document).ready(function () {
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
    //    $('#header .dep1 > li > .tool').on({
    //        "click":function (){
    //            $(this).closest('li').toggleClass('active').siblings('li').removeClass('active');
    //            $(this).closest('.group').siblings('.group').find('li').removeClass('active');
    //            if($(this).closest('li').hasClass('tocToggle')){
    //                if($(this).closest('.tocToggle').hasClass('active')){
    //                    $('#toc').toggleClass('active')
    //                    $('#analysis').removeClass('active')
    //                }else{
    //                    $('#toc').removeClass('active')
    //                }
    //            }else if($(this).closest('li').hasClass('analysis')){
    //                if($(this).closest('.analysis').hasClass('active')){
    //                    $('#analysis').toggleClass('active')
    //                    $('#toc').removeClass('active')
    //                }else{
    //                    $('#analysis').removeClass('active')
    //                }
    //            }else if($(this).closest('li').hasClass('detail')){
    //                if($(this).closest('.detail').hasClass('active')){
    //                    $('#detailSetting').toggleClass('active');
    //                }else{
    //                    $('#detailSetting').removeClass('active')
    //                }
    //            }else if($(this).closest('li').hasClass('library')){
    //                if($(this).closest('.library').hasClass('active')){
    //                    $('#library').toggleClass('active');
    //                }
    //            }
    //        }
    //    });
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


    //    $('.btnUser, .btnAlarm').on({
    //        "click":function (){
    //            $(this).siblings().toggle();
    //        }
    //    })
    /* 알림 팝업 닫기 */
    $('.btnPopClose').on({
        "click": function () {
            $(this).closest('.alarmPop').hide();
            $(this).closest('.popup').hide();
        }
    })
    /*레이어 팝업 닫기 */
    $('.btnClose').on({
        "click": function () {
            $(this).closest('.layerPopup').hide();
        }
    });

    /* 워크플로우 라이브러리 확대 축소 */
    $('.btnPopSizeToggle').on({
        "click": function () {
            $(this).closest('.popup').toggleClass('small')
        }
    });

    /* toc 보이기 숨기기 */
    $('.btnTocHide').on({
        "click": function () {
            $(this).closest('.toc').toggleClass('hide')
            map.updateSize();
        }
    })
    $('.btnTocClose').on({
        "click": function () {
            // $('#layerDetailDiv').removeClass('active');
            $(this).closest('.toc').toggleClass('active');
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
    /* 탭 */
    //    $('.tabList > li').on({
    //        "click":function (){
    //            $(this).addClass('active').siblings('li').removeClass('active');
    //            $(this).closest('.tabNav').siblings('.tabCont').eq($(this).index()).addClass('active').siblings('.tabCont').removeClass('active');
    //        }
    //    })
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
    // $('.btnEdit.txt, .btnEdit.img').on({
    //     "click": function () {
    //         $(this).siblings('.editBox').toggleClass('active');
    //     }
    // });
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

    /* 행정구역선택 */
    $('#location > ul > li > span').on({
        "click": function () {
            $(this).siblings('.dep2').toggleClass('active').closest('li').siblings('li').children('.dep2').removeClass('active')
        }
    });

    /* 주소 검색결과 */
    $('#userMenu .searchArea .inputBox input[type="text"]').on({
        "keyup": function (e) {
            let val = e.target.value;
            const addrWidget = $(this).closest('.inputBox').siblings('.addressSearchWidget');
            addrWidget.find('.val').text(val);
            if (val === '') {
                addrWidget.removeClass('active');
            } else {
                addrWidget.addClass('active');
            }
        }
    });

    /*속성테이블 체크박스*/
    $("#chkEdit").on({
        "click": function () {
            if ($(this).is(":checked") === true) {
                $(this).closest('.checkbox').siblings('.editMode').hide().siblings('.editMode2').css('display', 'flex');
            } else {
                $(this).closest('.checkbox').siblings('.editMode').css('display', 'flex').siblings('.editMode2').hide();
            }
        }
    })

    //분석위젯
    $(document).on('click', '#spatialAnalysisWidget_top button', function () {
        let length = $('#spatialAnalysisWidget').children().length;
        if (length > 0) {
            $('#analysis').toggleClass('active');
        } else {
            callAlert('fail', '분석 옵션을 설정해 주세요.')
            $('#analysis').removeClass('active');
        }
        map.updateSize();
    });




    $('.addressSearchWidget .btnAddrClose').on({
        "click": function () {
            $(this).closest('.addressSearchWidget').removeClass('active');
        }
    })

    //    /* 레이아웃 선택 토글*/
    //    $('.layoutArea .layoutBox').on({
    //        "click":function (){
    //            $(this).closest('.sectionArea').find('.layoutBox').removeClass('active');
    //            $(this).addClass('active')
    //        }
    //    });


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
//    let nestedSortables = document.getElementsByClassName('sortList');
//    for (let i = 0; i < nestedSortables.length; i++) {
//        new Sortable(nestedSortables[i], {
//            group: 'item',
//            handle: '.handle',
//            animation: 150,
//            fallbackOnBody: true,
//            swapThreshold: 0.65
//        });
//    }

})
