/*
 * data 구조
 * mapTemplateInfo = 템플릿 별 기본 설정 정보 (용도 : 초기 템플릿 목록 표출, 템플릿별 상세설정 메뉴 구조) 템플릿 선택시 해당하는 템플릿에 detailSetting을 webAppOptions.detailSetting에 밀어넣습니다.
 * webAppOptions : { db에 저장할 웹앱 정보
 *     detailSetting : { //저장된 상세설정 메뉴 정보 (용도 : 웹앱 불러오기시 사용)
 *     
 * 	   },
 * 	   sampleFrame : // 저장된 웹앱 화면 정보 (용도 : 미리보기 및 발행, 웹앱 불러오기시 사용 )
 *    
 *    
 * */
app = window.app || {};
app.webapp = app.webapp || {};

((app) => {
	app.webapp.data = {
		tempToolbarList: [], // 웹앱 처음 불러오기시 툴바위젯의 갯수를 세기위한 임시적인 툴바 리스트. 불러오기
		// 사용후 사용x
		// 웹앱
		webappList: {
			pageInfo: {
				fullShareUserAppCount: 0,
				noneShareUserAppCount: 0,
				partialShareUserAppCount: 0,
				totalUserAppCount: 0,
				totalPageIndex: 0
			},
			list: {},
		},
		// 페이징
		paginationInfo: {
			webappList: { pageSize: 10 }// 하단에 보이는 페이지 개수

		},
		webmapView: {

		},
		webappView: {
			shareList: {
				totalWebappTmplatShareCount: 0,
				webappTmplatShareInstCount: 0,
				webappTmplatShareUserCount: 0,
				webappTmplatShareList: [],
				webappTmplatShareUserList: [],
				webappTmplatShareInstList: [],
				list: []
			}
		},

		mapTemplateInfo: [
			{
				type: "STD",
				tit: "표준 템플릿",
				desc: "지도 조회 서비스를 위한 템플릿으로, 웹맵의 화면구성 중 설정 기능만 제외한 구성입니다.",
				imgSrc: `${contextPath}/images/webapp/img-type-01.png`,
				className: 'themeType01',// 퍼블이주는 css 이름 '.sampleFrame' 에
				// addClass
				detailSetting: {
					mainTab: {
						tabName: '메인',
						webmap: {},
						mapScope: {}
					},
					layoutTab: {
						tabName: '레이아웃',
						titSec: '표준',
						webappTmplatTyCode: 'STD',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},

					},
					themaTab: {
						tabName: '테마',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					widgetTab: {
						tabName: '위젯',
						toolbar: [], // 전체 툴바
						toolbarWidget: [],
						headerWidget: [],
						layerWidget: [],
						layerWidgetOption: {
							layerSearch: true, // 레이어 검색
							layerUpload: true, // 레이어 업로드
							styleSet: true,// 스타일설정
							popupSet: true, // 팝업설정
							attributeGrid: true // 속성 그리드
						},
						topWidget: [],
						bottomWidget: [],
						landInfoCheckedList: {
							'buildColumn_bdMgtSn':true,
							'buildColumn_bdtypCd':true,
							'buildColumn_bsiZonNo':true,
							'buildColumn_bulManBo':true,
							'buildColumn_buldMnnm':true,
							'buildColumn_buldSlno':true,
							'buildColumn_buldNm':true,
							'buildColumn_buldNmDc':true,
							'buildColumn_groFloCo':true,
							'buildColumn_undFloCo':true,
							'buildColumn_mvmnDe':true,
							'buildColumn_mvmnResn':true,
							'buildColumn_ntfcDe':true,
							'buildColumn_rnCd':true,
							'buildColumn_sigCd':true,
							'landColumn_jibun':true,
							'landColumn_pnu':true,
							'landColumn_a12':true,
							'landColumn_a4':true,
							'landColumn_a6':true,
							'landColumn_a9':true,
						}
					},

				}
			},
			{
				type: "QUV",
				tit: "간편보기 템플릿",
				desc: "다른 프로그램에 삽입되는 지도 조회 서비스를 위한 템플릿으로, TOC없이 최소한의 위젯을 사용한 구성입니다.",
				imgSrc: `${contextPath}/images/webapp/img-type-02.png`,
				className: 'themeType01',
				detailSetting: {
					mainTab: {
						tabName: '메인',
					},
					layoutTab: {
						webappTmplatTyCode: 'QUV',
						tabName: '레이아웃',
						titSec: '간편보기',
						type01: {
							className: 'style01',
							imgSrc: `${contextPath}/images/webapp/img-layout-02-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-02-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-02-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-02-04.png`,
						},
					},
					themaTab: {
						tabName: '테마',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					widgetTab: {
						tabName: '위젯',
						toolbar: [], // 전체 툴바
						toolbarWidget: [],
						headerWidget: [],
						layerWidget: [],
						layerWidgetOption: {},
						topWidget: [],
						bottomWidget: [],
						landInfoCheckedList: {
							'buildColumn_bdMgtSn':true,
							'buildColumn_bdtypCd':true,
							'buildColumn_bsiZonNo':true,
							'buildColumn_bulManBo':true,
							'buildColumn_buldMnnm':true,
							'buildColumn_buldSlno':true,
							'buildColumn_buldNm':true,
							'buildColumn_buldNmDc':true,
							'buildColumn_groFloCo':true,
							'buildColumn_undFloCo':true,
							'buildColumn_mvmnDe':true,
							'buildColumn_mvmnResn':true,
							'buildColumn_ntfcDe':true,
							'buildColumn_rnCd':true,
							'buildColumn_sigCd':true,
							'landColumn_jibun':true,
							'landColumn_pnu':true,
							'landColumn_a12':true,
							'landColumn_a4':true,
							'landColumn_a6':true,
							'landColumn_a9':true,
						}
					},
				}
			},
			{
				type: "EDT",
				tit: "편집 템플릿",
				desc: "레이어 편집 서비스를 위한 템플릿으로, 피처의 위상 및 속성을 관리 할 수 있는 위젯과 TOC를 포함한 구성입니다.",
				className: 'themeType01',// 퍼블이주는 css 이름 '.sampleFrame' 에
				// addClass
				imgSrc: `${contextPath}/images/webapp/img-type-03.png`,
				detailSetting: {
					mainTab: {
						tabName: '메인',
					},
					layoutTab: {
						tabName: '레이아웃',
						titSec: '편집',
						webappTmplatTyCode: 'EDT',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},
						/*
						 * type01: { active: 'N', imgSrc:
						 * `${contextPath}/images/webapp/img-layout-03-01.png`, },
						 * type02: { active: 'N', imgSrc:
						 * `${contextPath}/images/webapp/img-layout-03-02.png`, },
						 * type03: { active: 'N', imgSrc:
						 * `${contextPath}/images/webapp/img-layout-03-03.png`, },
						 * type04: { active: 'N', imgSrc:
						 * `${contextPath}/images/webapp/img-layout-03-04.png`, },
						 */
					},
					themaTab: {
						tabName: '테마',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					widgetTab: {
						tabName: '위젯',
						toolbar: [], // 전체 툴바
						toolbarWidget: [],
						headerWidget: [],
						layerWidget: [],
						topWidget: [],
						layerWidgetOption: {},
						bottomWidget: [],
						layerWidgetOption: {
							layerSearch: true, // 레이어 검색
							layerUpload: true, // 레이어 업로드
							styleSet: true,// 스타일설정
							popupSet: true, // 팝업설정
							attributeGrid: true // 속성 그리드
						},
						landInfoCheckedList: {
							'buildColumn_bdMgtSn':true,
							'buildColumn_bdtypCd':true,
							'buildColumn_bsiZonNo':true,
							'buildColumn_bulManBo':true,
							'buildColumn_buldMnnm':true,
							'buildColumn_buldSlno':true,
							'buildColumn_buldNm':true,
							'buildColumn_buldNmDc':true,
							'buildColumn_groFloCo':true,
							'buildColumn_undFloCo':true,
							'buildColumn_mvmnDe':true,
							'buildColumn_mvmnResn':true,
							'buildColumn_ntfcDe':true,
							'buildColumn_rnCd':true,
							'buildColumn_sigCd':true,
							'landColumn_jibun':true,
							'landColumn_pnu':true,
							'landColumn_a12':true,
							'landColumn_a4':true,
							'landColumn_a6':true,
							'landColumn_a9':true,
						}
					},
				}
			},
			{
				type: "SES",
				tit: "시리즈 맵 템플릿",
				className: 'themeType04',
				desc: "통합 서비스를 위한 템플릿으로, 여러 페이지의 콘텐츠를 탭 메뉴로 이동할 수 있는 구성입니다.",
				imgSrc: `${contextPath}/images/webapp/img-type-04.png`,
				textEditorTarget: '.tocArea .active .desc',
				detailSetting: {
					layoutTab: {
						tabName: '레이아웃',
						titSec: '시리즈',
						webappTmplatTyCode: 'SES',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},
					},
					sectionTab: {
						tabName: '섹션',
						mainTab: [
							/*{
								tabSn: 0,
								tabName: "탭1",
								tabText: "ssssssssssssssssssssss",
								tabContent: {
									contentType: 'map',
									contentValue: {
										userMapId: '',
										userMapSj: '',
										webmapInfo: '',
										center: '',
										zoom: ''
									}
								},
								active: "active"
							}*/
						]
					},
					themaTab: {
						per: "per", //저널형, 시리즈 맵일 경우만 사용.
						panel: "",//패널 사이즈 클래스명
						tabName: '테마',
						theme: "theme01", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						},
						section: {
							fontColor: "#333",
							backgroundColor: "2F5597"
						}
					},
					contentsTab: {
						tabName: '콘텐츠',
					},
					mainTab: {
						tabName: '메인',
					}
				}
			},
			{
				type: "JOR",
				tit: "저널형 맵 템플릿",
				className: 'themeType04',
				desc: "통합 서비스를 위한 템플릿으로, 여러개의 콘텐츠를 스크롤로 이동할 수 있는 한페이지 구성입니다",
				imgSrc: `${contextPath}/images/webapp/img-type-05.png`,
				textEditorTarget: '.articleList .desc',
				detailSetting: {
					layoutTab: {
						tabName: '레이아웃',
						titSec: '저널',
						webappTmplatTyCode: 'JOR',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},
					},
					sectionTab: {
						tabName: '섹션',
						mainTab: [
							//							{
							//								tabSn: 0,
							//								tabName: "탭1",
							//								tabText: "",
							//								tabContent: {
							//									contentType: 'map',
							//									contentValue: {
							//										userMapId: '',
							//										userMapSj: '',
							//										webmapInfo: '',
							//										center: '',
							//										zoom: ''
							//									}
							//								},
							//								active: "active"
							//							},
						]
					},
					themaTab: {
						per: "per", //저널형, 시리즈 맵일 경우만 사용.
						panel: "",//패널 사이즈 클래스명
						tabName: '테마',
						theme: "type01", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						},
						section: {
							fontColor: "#333",
							backgroundColor: "#e2ffd2",
						}
					},
					contentsTab: {
						tabName: '콘텐츠',
					},
					mainTab: {
						tabName: '메인',
					}
				}
			},{
				type: "STR",
				tit: "스토리맵 투어 템플릿",
				desc: "위치기반의 순차적인 이야기를 이미지, 텍스트를 통해 보여줄 수 있는 페이지 구성입니다.",
				imgSrc: `${contextPath}/images/webapp/img-type-01.png`,
				className: 'themeType01',// 퍼블이주는 css 이름 '.sampleFrame' 에
				// addClass
				detailSetting: {
					mainTab: {
						tabName: '메인',
						webmap: {},
						mapScope: {}
					},
					layoutTab: {
						tabName: '레이아웃',
						titSec: '스토리맵',
						webappTmplatTyCode: 'STR',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},

					},
					themaTab: {
						per: "per", //저널형, 시리즈 맵일 경우만 사용.
						panel: "",//패널 사이즈 클래스명
						tabName: '테마',
						theme: "theme01", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						},
						section: {
							fontColor: "#333",
							backgroundColor: "2F5597"
						}
					},
//					themaTab: {
//						tabName: '테마',
//						theme: "편집", // 테마 클래스명
//						style: "",// 레이아웃 클래스명
//						head: {
//							title: "웹앱 타이틀",
//							subTitle: "웹앱 서브타이틀",
//							logoFileName: "",
//							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
//							logoLink: "#",
//							info: "편집한 웹앱의 정보를 표출합니다",
//							backgroundColor: "#000000",
//							fontColor: "#ffffff",
//						},
//						foot: {
//							titleLogo: "",
//							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
//							logoFileName: "",
//							logoToDataURL: "",
//							backgroundColor: "#f5f5f5",
//							fontColor: "#9e9fae",
//							useYn: true
//						}
//					},
					sectionTab: {
						tabName: '섹션',
						mainTab: [
							/*{
								tabSn: 0,
								tabName: "탭1",
								tabText: "ssssssssssssssssssssss",
								tabContent: {
									contentType: 'map',
									contentValue: {
										userMapId: '',
										userMapSj: '',
										webmapInfo: '',
										center: '',
										zoom: ''
									}
								},
								active: "active"
							}*/
						]
					},

				}
			},
			{
				type: "CMPR",
				tit: "비교 템플릿",
				desc: "2개의 맵을 연결하여 비교하거나 각 맵을 개별적으로 탐색할 수 있는 페이지 구성입니다.",
				imgSrc: `${contextPath}/images/webapp/img-type-01.png`,
				className: 'themeType01',// 퍼블이주는 css 이름 '.sampleFrame' 에
				// addClass
				detailSetting: {
					mainTab: {
						tabName: '메인',
						webmap: {},
						mapScope: {}
					},
					layoutTab: {
						tabName: '레이아웃',
						titSec: '비교',
						webappTmplatTyCode: 'CMPR',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},

					},
					themaTab: {
						tabName: '테마',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					widgetTab: {
						tabName: '위젯',
						toolbar: [], // 전체 툴바
						toolbarWidget: [],
						headerWidget: [],
						layerWidget: [],
						layerWidgetOption: {
							layerSearch: true, // 레이어 검색
							layerUpload: true, // 레이어 업로드
							styleSet: true,// 스타일설정
							popupSet: true, // 팝업설정
							attributeGrid: true // 속성 그리드
						},
						topWidget: [],
						bottomWidget: []
					},

				}
			},
			{
				type: "TMRZ",
				tit: "시간인식 템플릿",
				desc: "타임 슬라이더를 활용하여 시간 경과에 따른 데이터의 변경을 시각화 할 수 있는 페이지 구성입니다.",
				imgSrc: `${contextPath}/images/webapp/img-type-01.png`,
				className: 'themeType01',// 퍼블이주는 css 이름 '.sampleFrame' 에
				// addClass
				detailSetting: {
					mainTab: {
						tabName: '메인',
						webmap: {},
						mapScope: {}
					},
					layoutTab: {
						tabName: '레이아웃',
						titSec: '시간인식',
						webappTmplatTyCode: 'TMRZ',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},
						type05: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type06: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},

					},
					themaTab: {
						tabName: '테마',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					widgetTab: {
						tabName: '위젯',
						toolbar: [], // 전체 툴바
						toolbarWidget: [],
						headerWidget: [],
						layerWidget: [],
						layerWidgetOption: {
							layerSearch: true, // 레이어 검색
							layerUpload: true, // 레이어 업로드
							styleSet: true,// 스타일설정
							popupSet: true, // 팝업설정
							attributeGrid: true // 속성 그리드
						},
						topWidget: [],
						bottomWidget: []
					},

				}
			},
			{
				type: "ALT",
				tit: "고도 프로파일 템플릿",
				desc: "사용자가 선택한 피처 혹은 라인에 대한 고도(지형단면도)를 보여주는 페이지 구성입니다.",
				imgSrc: `${contextPath}/images/webapp/img-type-01.png`,
				className: 'themeType01',// 퍼블이주는 css 이름 '.sampleFrame' 에
				// addClass
				detailSetting: {
					mainTab: {
						tabName: '메인',
						webmap: {},
						mapScope: {}
					},
					layoutTab: {
						tabName: '레이아웃',
						titSec: '고도',
						webappTmplatTyCode: 'ALT',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},

					},
					themaTab: {
						tabName: '테마',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					widgetTab: {
						tabName: '위젯',
						toolbar: [], // 전체 툴바
						toolbarWidget: [],
						headerWidget: [],
						layerWidget: [],
						layerWidgetOption: {
							layerSearch: true, // 레이어 검색
							layerUpload: true, // 레이어 업로드
							styleSet: true,// 스타일설정
							popupSet: true, // 팝업설정
							attributeGrid: true // 속성 그리드
						},
						topWidget: [],
						bottomWidget: []
					},

				}
			},
			{
				type: "DPT",
				tit: "부서 데이터 관리 템플릿",
				desc: "특정 부서간 레이어 및 데이터를 공유할 수 있는 페이지 구성입니다.",
				imgSrc: `${contextPath}/images/webapp/img-type-01.png`,
				className: 'themeType01',// 퍼블이주는 css 이름 '.sampleFrame' 에
				// addClass
				detailSetting: {
					mainTab: {
						tabName: '메인',
						webmap: {},
						mapScope: {}
					},
					layoutTab: {
						tabName: '레이아웃',
						titSec: '부서',
						webappTmplatTyCode: 'DPT',
						type01: {
							className: 'style01',// 퍼블이주는 css 이름
							// '.sampleFrame' 에 addClass
							imgSrc: `${contextPath}/images/webapp/img-layout-01-01.png`,
						},
						type02: {
							className: 'style02',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-02.png`,
						},
						type03: {
							className: 'style03',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-03.png`,
						},
						type04: {
							className: 'style04',
							imgSrc: `${contextPath}/images/webapp/img-layout-01-04.png`,
						},

					},
					themaTab: {
						tabName: '테마',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "편집한 웹앱의 정보를 표출합니다",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					widgetTab: {
						tabName: '위젯',
						toolbar: [], // 전체 툴바
						toolbarWidget: [],
						headerWidget: [],
						layerWidget: [],
						layerWidgetOption: {
							layerSearch: true, // 레이어 검색
							layerUpload: true, // 레이어 업로드
							styleSet: true,// 스타일설정
							popupSet: true, // 팝업설정
							attributeGrid: true // 속성 그리드
						},
						topWidget: [],
						bottomWidget: []
					},
					infoTab: {
						tabName: '정보창',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					dataTab: {
						tabName: '데이터',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},
					deptTab: {
						tabName: '부서설정',
						theme: "편집", // 테마 클래스명
						style: "",// 레이아웃 클래스명
						head: {
							title: "웹앱 타이틀",
							subTitle: "웹앱 서브타이틀",
							logoFileName: "",
							logoToDataURL: `${contextPath}/images/common/logo-main.png`,
							logoLink: "#",
							info: "",
							backgroundColor: "#000000",
							fontColor: "#ffffff",
						},
						foot: {
							titleLogo: "",
							desc: "COPYRIGHT(C) LX, ALL RIGHTS",
							logoFileName: "",
							logoToDataURL: "",
							backgroundColor: "#f5f5f5",
							fontColor: "#9e9fae",
							useYn: true
						}
					},

				}
			},								
		],

		// db에저장할 데이터
		webAppOptions: {
			mapTmplatTyCode: "",
			mapTmplatSj: "웹앱 명",
			mapTmplatId: "",
			mapTmplatPblonsipTyCode: "",
			registerId: userId,
			registDt: '',
			updusrId: userId,
			updtDt: '',
			detailSetting: {
				themaTab: {
					tabName: '테마',
					theme: "", // 테마 클래스명
					style: "",// 레이아웃 클래스명
					head: {
						title: "웹앱 타이틀",
						subTitle: "웹앱 서브타이틀",
						logoFileName: "",
						logoToDataURL: `${contextPath}/images/common/logo-main.png`,
						logoLink: "#",
						info: "편집한 웹앱의 정보를 표출합니다",
						backgroundColor: "#000000",
						fontColor: "#ffffff",
					},
					foot: {
						titleLogo: "",
						desc: "COPYRIGHT(C) LX, ALL RIGHTS",
						logoFileName: "",
						logoToDataURL: "",
						backgroundColor: "#f5f5f5",
						fontColor: "#9e9fae",
						useYn: true
					}
				},

			},

		},
		webmapList: {
			pageInfo: {
				fullShareUserMapCount: 0,
				noneShareUserMapCount: 0,
				partialShareUserMapCount: 0,
				totalUserMapCount: 0,
				totalPageIndex: 0
			},
			list: {},
		},
		widgetList: {
			webMapUserInfoWidget: {
				className: 'webMapUserInfoWidget'
				, onOffYn: true
				, name: '사용자'
				, ouiWidgetYn: false
				, subElement:
					`
						<div class="userPop hidden">
							<div class="inner">
								<strong class="position">최고관리자</strong>
								<b class="name">${userId}<span>님</span></b>
								<ul>
									<li>
											<a href="#" title="알림"><i class="ico alarm"></i>
												<span class="new">0</span>
												<span>알림</span></a>
									</li>
									<li>
											<a href="#" title="mypage"><i class="ico myPage"></i><span>마이페이지</span></a>
									</li>
									<li>
											<a href="#" title="logout"><i class="ico logout"></i><span>로그아웃</span></a>
									</li>
								</ul>
							</div>
						</div>
					`
			},
			webMapShareWidget: {
				className: 'webMapShareWidget'
				, onOffYn: false, name: '공유'
				, ouiWidgetYn: false
			},
			webMapSaveWidget: {
				className: 'webMapSaveWidget'
				, onOffYn: true
				, name: '웹맵저장'
				, ouiWidgetYn: false
				, subElement: '<ul class="dep2 hidden"><li><button type="button" class="type01"><span>저장</span></button></li> <li><button type="button" class="type02"><span>다른이름<br>으로저장</span></button></li></ul>'
			},
			webMapInfoWidget: {
				className: 'webMapInfoWidget'
				, onOffYn: false, name: '기본정보'
				, ouiWidgetYn: false
			},
			loginWidget: {
				className: 'loginWidget'
				, onOffYn: false, name: '로그인'
				, ouiWidgetYn: false
			},

		},
		// header/top + 에 생기지 않는 예외 위젯
		headerTopExceptionWidget: ['addressSearchWidget', 'administrativeDistrictSearchWidget'],
		// 예외적으로 widgetTarget이 지정 되있는 경우 주소검색 또는 행정구역 영역 같은
		analysisInfoList: [
			{
				analysisName: '포인트 집계'
				, analysisId: 'ag'
				, categoryName: '데이터 요약'
				, categoryId: "1"
			}, {
				analysisName: '조인 피처'
				, analysisId: 'join'
				, categoryName: '데이터 요약'
				, categoryId: "1"
			}, {
				analysisName: '주변 요약'
				, analysisId: 'nrby'
				, categoryName: '데이터 요약'
				, categoryId: "1"
			}, {
				analysisName: '범위 내 요약'
				, analysisId: 'range'
				, categoryName: '데이터 요약'
				, categoryId: "1"
			}, {
				analysisName: '중심 및 분산 요약'
				, analysisId: 'center'
				, categoryName: '데이터 요약'
				, categoryId: "1"
			}, {
				analysisName: '기존 위치 찾기'
				, analysisId: 'searchLegacy'
				, categoryName: '위치 찾기'
				, categoryId: "2"
			}, {
				analysisName: '새 위치 파생'
				, analysisId: 'searchNew'
				, categoryName: '위치 찾기'
				, categoryId: "2"
			}, {
				analysisName: '중심 찾기'
				, analysisId: 'searchCenter'
				, categoryName: '위치 찾기'
				, categoryId: "2"
			}, {
				analysisName: '유사한 위치 찾기'
				, analysisId: 'searchSimilar'
				, categoryName: '위치 찾기'
				, categoryId: "2"
			}, {
				analysisName: '밀도맵'
				, analysisId: 'density'
				, categoryName: '공간 패턴'
				, categoryId: "3"
			}, {
				analysisName: '핫스팟'
				, analysisId: 'hotspot'
				, categoryName: '공간 패턴'
				, categoryId: "3"
			}, {
				analysisName: '포인트 군집'
				, analysisId: 'gatherPoints'
				, categoryName: '공간 패턴'
				, categoryId: "3"
			}, {
				analysisName: '포인트 내삽 찾기'
				, analysisId: 'interpolatePoints'
				, categoryName: '공간 패턴'
				, categoryId: "3"
			}, {
				analysisName: '이상지 찾기'
				, analysisId: 'searchOutliers'
				, categoryName: '공간 패턴'
				, categoryId: "3"
			}, {
				analysisName: '출발지와 목적지 연결'
				, analysisId: 'connectDestination'
				, categoryName: '근접도'
				, categoryId: "4"
			}, {
				analysisName: '버퍼 생성'
				, analysisId: 'buffer'
				, categoryName: '근접도'
				, categoryId: "4"
			}, {
				analysisName: '운전시간 영역 생성'
				, analysisId: 'drivingArea'
				, categoryName: '근접도'
				, categoryId: "4"
			}, {
				analysisName: '최근접 위치찾기'
				, analysisId: 'findNearestPoint'
				, categoryName: '근접도'
				, categoryId: "4"
			}, {
				analysisName: '경로계획 분석'
				, analysisId: 'findPath'
				, categoryName: '근접도'
				, categoryId: "4"
			}, {
				analysisName: '다중 출발지 경로 분석'
				, analysisId: 'severalDeparturesFindPath'
				, categoryName: '근접도'
				, categoryId: "4"
			}, {
				analysisName: '다중 목적지 경로 분석'
				, analysisId: 'severalDestinationFindPath'
				, categoryName: '근접도'
				, categoryId: "4"
			}, {
				analysisName: '경로예측 분석'
				, analysisId: 'predictPath'
				, categoryName: '근접도'
				, categoryId: "4"
			}, 
			{
				analysisName: '경계 디졸브'
				, analysisId: 'dsslve'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '데이터 추출'
				, analysisId: 'extrc'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '공간 분할 생성'
				, analysisId: 'dvsion'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '레이어 병합'
				, analysisId: 'merge'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '레이어 중첩(지우기)'
				, analysisId: 'ovrlay/erase'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '레이어 중첩(교차)'
				, analysisId: 'ovrlay/intsct'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '레이어 중첩(유니온)'
				, analysisId: 'ovrlay/union'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '클러스터링'
				, analysisId: 'clustering'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '면적계산'
				, analysisId: 'ar'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '길이계산'
				, analysisId: 'lt'
				, categoryName: '데이터 관리'
				, categoryId: "5"
			}, {
				analysisName: '파일 좌표 변환'
				, analysisId: 'file'
				, categoryName: '좌표 변환'
				, categoryId: "6"
			}, {
				analysisName: '단일 좌표 변환'
				, analysisId: 'single'
				, categoryName: '좌표 변환'
				, categoryId: "6"
			}
		],
		textEditorTarget: '.tocArea .desc',
		textEditorTargetActive: '.tocArea .active .desc',
		defaultToolbarWidget: ['homeControlWidget', 'basemapWidget', 'fullScreenControlWidget'],
		defaultSeriesContentValue: {
			map: {
				userMapId: '',
				userMapSj: '',
				webmapInfo: '',
				center: '',
				zoom: ''
			},
			img: {
				innerType: ''
				, uploadValue: ''
				, file: ''
			},
			video: {
				innerType: ''
				, uploadValue: ''
				, file: ''
			},
			weburl: {
				url: ''
			}
		},
		editorObject: {}, //{tabSn_0 : <obj>, tabSn_1 : <obj>}
		gridOptions: [
			'chart',        //차트
			'geomSearch',   //공간검색
			'attributeEditor', //설정
			'modify',           //편집모드 - 공간편집
			'filter',           //필터
			'export',           //추출
			'delete',           //편집모드 - 삭제
			'insert',           //편집모드 - 추가
			'clear',            //필터초기화 & 선택초기화
			'editMode'],
			landInfoList: [
				{
					landColumnName: '지번'
					, landColumnId: 'jibun'
					, landGubn: "land"
				},
				{
					landColumnName: '필지고유번호'
					, landColumnId: 'pnu'
					, landGubn: "land"
				},
				{
					landColumnName: '지목'
					, landColumnId: 'a12'
					, landGubn: "land"
				},
				{
					landColumnName: '대장구분명'
					, landColumnId: 'a4'
					, landGubn: "land"
				},
				{
					landColumnName: '지번지목부호'
					, landColumnId: 'a6'
					, landGubn: "land"
				},
				{
					landColumnName: '개별공시지가'
					, landColumnId: 'a9'
					, landGubn: "land"
				},
				{
					landColumnName: '이전건물관리번호'
					, landColumnId: 'bdMgtSn'
					, landGubn: "build"
				},
				{
					landColumnName: '건물용도코드'
					, landColumnId: 'bdtypCd'
					, landGubn: "build"
				},
				{
					landColumnName: '기초구역번호'
					, landColumnId: 'bsiZonNo'
					, landGubn: "build"
				},
				{
					landColumnName: '건물일련번호'
					, landColumnId: 'bulManBo'
					, landGubn: "build"
				},
				{
					landColumnName: '건물본번'
					, landColumnId: 'buldMnnm'
					, landGubn: "build"
				},
				{
					landColumnName: '건물부번'
					, landColumnId: 'buldSlno'
					, landGubn: "build"
				},
				{
					landColumnName: '건물명'
					, landColumnId: 'buldNm'
					, landGubn: "build"
				},
				{
					landColumnName: '상세건물명'
					, landColumnId: 'buldNmDc'
					, landGubn: "build"
				},
				{
					landColumnName: '지상층수'
					, landColumnId: 'groFloCo'
					, landGubn: "build"
				},
				{
					landColumnName: '지하층수'
					, landColumnId: 'undFloCo'
					, landGubn: "build"
				},
				{
					landColumnName: '이동일자'
					, landColumnId: 'mvmnDe'
					, landGubn: "build"
				},
				{
					landColumnName: '이동사유'
					, landColumnId: 'mvmnResn'
					, landGubn: "build"
				},
				{
					landColumnName: '고시일자'
					, landColumnId: 'ntfcDe'
					, landGubn: "build"
				},
				{
					landColumnName: '도로명코드'
					, landColumnId: 'rnCd'
					, landGubn: "build"
				},
				{
					landColumnName: '시군구코드'
					, landColumnId: 'sigCd'
					, landGubn: "build"
				},

			],
			landInfoCheckedList: {
				'buildColumn_bdMgtSn':true,
				'buildColumn_bdtypCd':true,
				'buildColumn_bsiZonNo':true,
				'buildColumn_bulManBo':true,
				'buildColumn_buldMnnm':true,
				'buildColumn_buldSlno':true,
				'buildColumn_buldNm':true,
				'buildColumn_buldNmDc':true,
				'buildColumn_groFloCo':true,
				'buildColumn_undFloCo':true,
				'buildColumn_mvmnDe':true,
				'buildColumn_mvmnResn':true,
				'buildColumn_ntfcDe':true,
				'buildColumn_rnCd':true,
				'buildColumn_sigCd':true,
				'landColumn_jibun':true,
				'landColumn_pnu':true,
				'landColumn_a12':true,
				'landColumn_a4':true,
				'landColumn_a6':true,
				'landColumn_a9':true,
			}
	};



})(app);
