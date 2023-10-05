app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.widgetTab = {
		name: 'widget-tab',
		data: function () {
			return {
				data: app.webapp.data,
				widget: {
					/*상단 위젯 */
					rotationControlWidget: { img: "/smt/images/widget/회전active.png", text: "회전/나침반" },
					administrativeDistrictSearchWidget: { img: "/smt/images/widget/행정경계표시active.png", text: "행정경계 표시" },
					addressSearchWidget: { img: "/smt/images/widget/검색active.png", text: "주소검색" },
					overViewMapControlWidget: { img: "/smt/images/widget/오버뷰active.png", text: "오버뷰" },
					downloadControlWidget: { img: "/smt/images/widget/저장active.png", text: "저장" },
					bookMarkControlWidget: { img: "/smt/images/widget/북마크active.png", text: "북마크" },
					featureAttributeFormWidget: { img: "/smt/images/widget/피쳐속성폼active.png", text: " 피쳐속성 폼" },
					printControlWidget: { img: "/smt/images/widget/인쇄active.png", text: "인쇄" },
					homeControlWidget: { img: "/smt/images/widget/홈active.png", text: "홈" },
					currentViewControlWidget: { img: "/smt/images/widget/현재위치active.png", text: "현재위치" },
					roadViewWidget: { img: "/smt/images/widget/로드뷰active.png", text: "로드뷰" },
					fullScreenControlWidget: { img: "/smt/images/widget/전체화면active.png", text: "전체화면" },
					clearControlWidget: { img: "/smt/images/widget/초기화active.png", text: "초기화" },
					timeSliderControlWidget: { img: "/smt/images/widget/타임슬라이더active.png", text: "타임슬라이더" },
					swiperControlWidget: { img: "/smt/images/widget/스와이프active.png", text: "스와이프" },
					spatialAnalysisWidget: { img: "/smt/images/widget/공간분석active.png", text: "공간분석" },
					tocPopupWidget: { img: "/smt/images/widget/공간분석active.png", text: "지도TOC" },
					layerStyleControlWidget: { img: "/smt/images/widget/공간분석active.png", text: "레이어Style" },
					overlapWidget: { img: "/smt/images/widget/공간분석active.png", text: "중첩 영상" },
					landInfoWidget: { img: "/smt/images/widget/공간분석active.png", text: "부동산정보" },

					/*헤더 위젯 */
					webMapUserInfoWidget: { img: "/smt/images/widget/사용자정보active.png", text: "사용자 정보" },
					webMapShareWidget: { img: "/smt/images/widget/공유active.png", text: "웹맵 공유" },
					webMapSaveWidget: { img: "/smt/images/widget/헤더저장active.png", text: "웹맵 저장" },
					webMapInfoWidget: { img: "/smt/images/widget/기본정보active.png", text: "웹맵 기본정보" },
					loginWidget: { img: "/smt/images/widget/기본정보active.png", text: "로그인" },

					/*툴바 위젯*/
					homeControlWidget: { img: "/smt/images/widget/홈active.png", text: "홈" },
					currentViewControlWidget: { img: "/smt/images/widget/현재위치active.png", text: "현재위치" },
					roadViewWidget: { img: "/smt/images/widget/로드뷰active.png", text: "로드뷰" },
					clearControlWidget: { img: "/smt/images/widget/초기화active.png", text: "초기화" },
					moveControlWidget: { img: "/smt/images/widget/이동이전active.png", text: "이동위젯" },
					basemapWidget: { img: "/smt/images/widget/배경지도active.png", text: "배경지도" },
					divideMapWidget: { img: "/smt/images/widget/분할지도active.png", text: "분할지도" },
					drawControlWidget: { img: "/smt/images/widget/그리기active.png", text: "그리기" },
					fullScreenControlWidget: { img: "/smt/images/widget/전체화면active.png", text: "전체화면" }, //이미지 변경 필요.
					cctvControlWidget: { img: "/smt/images/widget/icon_cctv_2f5597.png", text: "CCTV" },
					limsControlWidget: { img: "/smt/images/widget/국토정보기본도_hover.png", text: "국토정보기본도" },
					lsmdControlWidget: { img: "/smt/images/widget/연속지적도_hover.png", text: "연속도" },
					//.............Widget: { img: "/smt/images/widget/icon_cctv.png", text: "로드뷰" }, //[수정필요] 로드뷰위젯 추가 

					rotationControlWidget: { img: "/smt/images/widget/회전active.png", text: "회전/나침반" },
					measureControlWidget: { img: "/smt/images/widget/측정active.png", text: "측정" },
					
					//분석
					analysisSumryWidget: { img: "/smt/images/widget/이동이전active.png", text: "데이터요약 분석" },
					analysisLcWidget: { img: "/smt/images/widget/이동이전active.png", text: "위치찾기 분석" },
					analysisPttrnWidget: { img: "/smt/images/widget/이동이전active.png", text: "공간패턴 분석" },
					analysisProximityWidget: { img: "/smt/images/widget/이동이전active.png", text: "근접도 분석" },
					analysisManageWidget: { img: "/smt/images/widget/이동이전active.png", text: "데이터관리 분석" },
					analysisCoordWidget: { img: "/smt/images/widget/이동이전active.png", text: "좌표변환" },

					/*하단 위젯*/
					mousePositionControlWidget: { img: "/smt/images/widget/마우스좌표표시active.png", text: "좌표표시" },
					zoomControlWidget: { img: "/smt/images/widget/확대축소active.png", text: "확대/축소" },
					scaleControlWidget: { img: "/smt/images/widget/축척입력active.png", text: "축적입력" }
					//.............Widget: { img: "/smt/images/widget/icon_cctv.png", text: "줌" }, //[수정필요] 줌컨트롤 위젯 추가 


				}
			}
		},

		methods: {


			/* param  : widgetName
			 * 
			 * 
			 * */

			widgetEdit: function (widgetName) {
				if (widgetName = "spatialAnalysisWidget") {
					app.webapp.components.spatialAnalysisWidgetModal.show();
					return;
				}

			},
			/*	param : toolbar, top, bottom, header, all
			 * 
			 * */
			widgetListShow: function (tab) {
				app.webapp.components.widgetList.hide();
				app.webapp.components.widgetList.mode = tab
				$(".widgetSection").hide();
				
				switch (tab) {
					case "toolbar":
						this.widgetToolbarListShow();
						break;
						
					case "top":
						this.widgetTopListShow();
						break;
						
					case "bottom":
						this.widgetBottomListShow();
						break;
						
					case "header":
						this.widgetHeaderListShow();
						break;
						
					// 위젯 전체보기
					case "all":
						this.widgetToolbarListShow();
						this.widgetTopListShow();
						this.widgetBottomListShow();
						this.widgetHeaderListShow();
						break;
				}
				
				$("#widgetList").show();
			},
			widgetToolbarListShow: function () {
				$("#toolbarWidgetListDiv").show();//툴바 위젯
				/*
				$("#storeWigetList").show(); //저장
				$("#editWigetList").show(); //편집
				*/
				/*제어위젯*/
				if (app.util.widgetTabIf("fullScreenControlWidget")) $("#fullScreenControlWidgetBox").show(); //전체화면 위젯
				if (app.util.widgetTabIf("rotationControlWidget")) $("#rotationControlWidgetBox").show(); //회전/나침반 위젯
				//$("#conditionFilterWidgetBox").show(); //조건식편집기 위젯
				/*저장위젯*/
				//if(app.util.widgetTabIf("printControlWidget")) $("#printControlWidgetBox").show(); //출력 위젯
				/*편집위젯*/
				//$("#gridWidgetBox").show(); //속성테이블 위젯
			},
			widgetTopListShow: function () {
				$("#topWidgetListDiv").show();//상단 위젯
				if (app.webapp.data.webAppOptions.detailSetting.layoutTab.titSec != "간편보기") $("#editWigetList").show(); //편집

				/*제어위젯*/
				//if (app.util.widgetTabIf("fullScreenControlWidget")) $("#fullScreenControlWidgetBox").show(); //전체화면 위젯
				//if(app.util.widgetTabIf("rotationControlWidget")) $("#rotationControlWidgetBox").show(); //나침반
				if (app.util.widgetTabIf("timeSliderControlWidgetBox")) $("#timeSliderControlWidgetBox").show(); //타임슬라이더 위젯
				/*저장위젯*/
				if (app.util.widgetTabIf("printControlWidget")) $("#printControlWidgetBox").show(); //출력 위젯
				if (app.webapp.data.webAppOptions.detailSetting.layoutTab.titSec != "간편보기") {
					//[필독] 분석 위젯을 사용하고 싶은 경우 hide를 show로 변경
					$("#spatialAnalysisWidgetBox").hide();//분석위젯
					$("#featureAttributeFormWidgetBox").show(); //피쳐속성 폼 위젯
				}
			},
			widgetBottomListShow: function () {
				$("#bottomWidgetListDiv").show(); // 하단 위젯
			},
			widgetHeaderListShow: function () {
				$('#headerWidgetListDiv').show();
			},
			widgetDelete: function (widgetName, mode) {
				callConfirm("위젯을 제거 하시겠습니까?", '선택한 해당 위젯 제거 됩니다', (result) => {
					if (widgetName == "printControlWidget") {
						$(`#printWidget_${mode}`).hide();
						$(`#printWidget_${mode}`).remove()
					};
					//취소한 위젯 제거 및 박스에서 안보이게하기
					if (mode == "header") {
						let widgetClassName = app.webapp.data.widgetList;
						$(`#${widgetName}_${widgetClassName[widgetName].onOffYn ? 'Icon' : mode}`).remove();
						$(`#widget_${mode} ul.widget_${mode}_ul`).append(createLiHtml(widgetName, 'origin'));
					}

					if (app.widget[widgetName] && mode != "header") {
						app.widget[widgetName].remove();
					}
					app.widget[widgetName] && delete app.widget[widgetName];

					if (mode == "toolbar") {
						$(`#${widgetName}`).remove()
					} else {
						mode == "bottom" ? $(`#${widgetName}_${mode}`).hide() : (($(`#${widgetName}_${mode}Icon`).length <= 0) ? $(`#${widgetName}_${mode}`).remove() : null);
					}
					$(`#${widgetName}Box_${mode}`).hide();
					//widget div 요소 꺼주기
					if (widgetName == "printControlWidget") $(`#printWidget_${mode}`).hide();
					$(`#${widgetName}_${mode}`).hide();
					//위젯 리스트에서 active 꺼주기
					$(`#${widgetName}Box`).closest('div').css("border-color", "#e9e9e9");

					switch (widgetName) {
						case "timeSliderControlWidget":
							$(`#timeSliderControlWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#timeSliderControlWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[widgetName] = false;
							break;
						case "featureAttributeFormWidget":
							$(`#featureAttributeFormWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#featureAttributeFormWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[widgetName] = false;
							break;
						// case "bookMarkControlWidget_toolbarIcon":
						case "bookMarkControlWidget":
							$(`#bookMarkControlWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#bookMarkControlWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[widgetName] = false;
							break;
						case "swiperControlWidget":
							$(`#swiperControlWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#swiperControlWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[widgetName] = false;
							break;
						case "tocPopupWidget":
							$(`#tocPopupWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#tocPopupWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[widgetName] = false;
							break;
						case "layerStyleControlWidget":
							$(`#layerStyleControlWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#layerStyleControlWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[widgetName] = false;
							break;
						case "overlapWidget":
							$(`#overlapWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#overlapWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[widgetName] = false;
							break;
						case "landInfoWidget":
							$(`#landInfoWidget_${mode}Icon`).hide();
							if (mode == "top") $(`#landInfoWidget_${mode}Icon`).remove();
							app.webapp.components.sampleFrameVue[widgetName] = false;
							break;
					}
					//					if (widgetName == 'timeSliderControlWidget') $(`#timeSliderControlWidget_${mode}Icon`).hide();
					//					if (widgetName == 'featureAttributeFormWidget') $(`#featureAttributeFormWidget_${mode}Icon`).hide();
					//					if (widgetName == 'bookMarkControlWidget') $(`#bookMarkControlWidget_${mode}Icon`).hide();
					// 취소한 위젯 관리하고 있는 배열에서 제거
					let idx = app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbar.indexOf(widgetName);
					app.webapp.data.webAppOptions.detailSetting.widgetTab.toolbar.splice(idx, 1);
					idx = app.webapp.data.webAppOptions.detailSetting.widgetTab[`${mode}Widget`].indexOf(widgetName);
					app.webapp.data.webAppOptions.detailSetting.widgetTab[`${mode}Widget`].splice(idx, 1);
					idx = app.webapp.components.widgetList.list.indexOf(widgetName);
					app.webapp.components.widgetList.list.splice(idx, 1);
				})
			},
			updateTocOptions: (optionType, event) => {
				let _type = 'toc';
				let _value = false;
				if (app.webapp.data.gridOptions.includes(optionType)) {
					_type = 'grid';
				}

				//onoff버튼에 off 클래스 토글
				$(event.target).toggleClass('off');
				//위젯 버튼에 off 클래스 토글 (off의 경우 위젯을 회색으로 표시)
				$(event.target).parents('div.widgetBox').toggleClass('off');


				if (!$(event.target).hasClass('off')) {
					_value = true;
				}

				let obj = { type: _type, options: {} };
				obj.options[optionType] = _value;

				//toc 옵션 정보 가지고 가지고 있기
				app.webapp.data.webAppOptions.detailSetting.widgetTab.layerWidgetOption = {
					...app.webapp.data.webAppOptions.detailSetting.widgetTab.layerWidgetOption
					, ...obj.options
				}

				//TOC 옵션 변경
				app.widget.tocWidget.changeOptions([obj]);

				// setVisibleAll: true,//전체 레이어 가시성 조정
				// deleteAll: true,//전체 레이어 삭제
				// addGroup: true,//그룹추가
				// layerSearch: true,//검색
				// layerUpload: true,//업로드

				// icon: true,//아이콘 표현 여부

				// setGroupName: true,//그룹명 변경
				// setLayerNcm: true,//레이어 별칭 변경
				// setViisible: true, //가시성 조정
				// setLabel: true,//라벨 셋팅
				// attributeGrid: true,//속성 그리드 셋팅
				// delete: true,//삭제
				// layerDetail: true,//레이어 상세

				// styleSet: true, //스타일설정
				// popupSet: true,

				//toggleclass off
			}
		}
	}
})(app);