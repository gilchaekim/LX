import * as commonUtils from "/smt/js/cmm/commonUtils.js";
import * as alarm from "/smt/js/webmap/model/alarm.js";
import { data } from "/smt/js/webapp/model/data.js"
import { data as mapData } from "/smt/js/webmap/model/data.js"
import {detailSettingVue}  from "/smt/js/webapp/vues/detailSetting/detailSettingVue.js";
import HomeControlWidget from "/smt/js/webapp/core/homeControlWidget.js"
import TocWidget from "/smt/js/webapp/core/tocWidget.js"
import AddressSearchWidget from "/smt/js/webapp/core/addressSearchWidget.js"
import DrawControlWidget from "/smt/js/webapp/core/drawControlWidget.js"
import AdministrativeDistrictSearchWidget from "/smt/js/webapp/core/administrativeDistrictSearchWidget.js"
//newWebAppModalVue.js 에서 생성중  생성 후 Webapp 클래스는 webapp 전역 변수에 참조
//위젯관리목적 클래스 
//메서드는 파라미터 없이 data.js 기준으로합니다
export class Webapp {

	//위젯
	previewHTML;//미리보기시 사용하는 html 구조
	
	constructor() {
		this.widget = new Map();// 추가된위젯 넣기
		console.log(commonUtils);
	}
	
	//샘플프레임호출
	callSampleFrame() {
		let templateType = data.webAppOptions.mapTmplatTyCode;
		if(templateType ==='STD') {
			return commonUtils.callHTML({
				url : `${contextPath}/html/standard.html`,
				cashe : false,
				async : false,
				type : 'get'
			});
		}
	}
	
	//헤드스크립트 호출
	callHead() {
		return commonUtils.callHTML({
			url : `${contextPath}/html/head.html`,
			cashe : false,
			async : false,
			type : 'get'
		});
	}
	
	initHeadFrame() {
		let sampleFrame = data.webAppOptions.sampleFrame;
		let headFrame = 
			`<div class="head" style="background : ${sampleFrame.head.backgroundColor}">
	            <div class="logo">
	                <a href="${sampleFrame.head.logoLink}"><img src="${sampleFrame.head.logoToDataURL}"/></a>
	            </div>
	            <strong class="mainTit" style="color : ${sampleFrame.head.fontColor}">${sampleFrame.head.title}</strong>
	            <b class="subTit" style="color : ${sampleFrame.head.fontColor}">- ${sampleFrame.head.subTitle}</b>
	            <div class="toolGroup">
                    <ul>
                        <li>
                            <button type="button" class="tool">
                                <img src="../images/common/ico-in-add-hover.png"/>
                                <span>출력</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="tool">
                                <img src="../images/common/ico-in-add-hover.png"/>
                                <span>출력</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="tool">
                                <img src="../images/common/ico-in-add-hover.png"/>
                                <span>출력</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="tool">
                                <img src="../images/common/ico-in-add-hover.png"/>
                                <span>출력</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="tool">
                                <img src="../images/common/ico-in-add-hover.png"/>
                                <span>출력</span>
                            </button>
                        </li>
                    </ul>
                </div>
	        </div>`;
		return headFrame; 
		
	}
	
	initFootFrame() {
		let sampleFrame = data.webAppOptions.sampleFrame;
		let footFrame =
			`<div class="foot" style="background : ${sampleFrame.foot.backgroundColor}">
            	<p style="color : ${sampleFrame.foot.fontColor}">${sampleFrame.foot.desc}</p>
			</div>`;
		return footFrame; 
		
	}

	changeSampleFrame() {
		let templateType = data.webAppOptions.mapTmplatTyCode;
		this.callSampleFrame(templateType).then(html => {
			$('#app').html(html);
			$('.sampleFrame').addClass(data.webAppOptions.sampleFrame.theme);//템플릿변경
			$('.sampleFrame').addClass(data.webAppOptions.sampleFrame.style);//스타일변경
			$('.sampleFrame').prepend(this.initHeadFrame()); // 헤드 
			$('.sampleFrame').append(this.initFootFrame()); // 푸터
			this.previewHTML = $('.sampleFrame').html(); //미리보기에 필요한 html 구조 저장 위젯생성전에 저장해야  미리보기시 위젯이 두개가 생기지않음
			
			//템플릿공통
			let mapCode = this.createMap();
			let commonCode = this.createCommonCode(); 
			
			let tocCode = new TocWidget()
								.setTarget('#tocWidget')
								.build();
			let addressSearchCode = new AddressSearchWidget()
										.setTarget('#searchAreaWidget')
										.build();
			let administDistCode = new AdministrativeDistrictSearchWidget()
										.setTarget('#location')
										.build();
			//홈위젯 코드 생성
			let homeCode = new HomeControlWidget()
											.setTarget('#homeControlWidget')
											.setZoom(9)
											.setCenter([276179.88560667867, 413632.9594010007])
											.build();
			//그리기도구 코드 생성
			let drawCode = new DrawControlWidget()
								.setTarget('#drawControlWidget')
								.build();
			
			
			//ui코드 생성
			let uiCode = this.createUiCode();
			$('#sample_script').append(mapCode);
			$('#sample_script').append(commonCode);
			$('#sample_script').append(tocCode);
			
			$('#sample_script').append(addressSearchCode);
			$('#sample_script').append(administDistCode);
			$('#sample_script').append(homeCode);
			$('#sample_script').append(drawCode);
			$('#sample_script').append(uiCode);
			let userMapId =detailSettingVue.$refs.mainTab.webmap.userMapId;
			if(userMapId){
				$('#sample_script').append(this.createWebmapCode);
			}
			
			let changeHtml = $('#app').html()
			$('#app').html(changeHtml);
		});
	}
	//레이아웃 변경
	changeLayout() {
		const layout = document.querySelector('#app > .sampleFrame');
		layout.classList.remove(layout.classList[2]);// 스타일제거
		layout.classList.add(data.webAppOptions.sampleFrame.style); // 새 스타일
	}
	
	//테마 변경
	changeThema() {
		$('.mainTit').text(data.webAppOptions.sampleFrame.head.title);
		$('.subTit').text(`- ${data.webAppOptions.sampleFrame.head.subTitle}`); 
		$('#headTipDesc > p').text(data.webAppOptions.sampleFrame.head.info);
		$('.foot > p').text(data.webAppOptions.sampleFrame.foot.desc);
		$('.sampleFrame > .head').css('background',data.webAppOptions.sampleFrame.head.backgroundColor);
		$('.mainTit').css('color',data.webAppOptions.sampleFrame.head.fontColor);
		$('#headTip').css('color', data.webAppOptions.sampleFrame.head.fontColor);
		$('#headTip').css('border-color', data.webAppOptions.sampleFrame.head.fontColor);
		$('.subTit').css('color',data.webAppOptions.sampleFrame.head.fontColor);
		$('.foot').css('background',data.webAppOptions.sampleFrame.foot.backgroundColor);
		$('.foot > p').css('color',data.webAppOptions.sampleFrame.foot.fontColor);
		$('.head > .logo').children().children().attr("src", data.webAppOptions.sampleFrame.head.logoToDataURL); 
		$('.head > .logo').children().attr("href", data.webAppOptions.sampleFrame.head.logoLink); 
		const tempDiv = document.createElement('div');
		$(tempDiv).html(this.previewHTML);
		$(tempDiv).find('.mainTit').text(data.webAppOptions.sampleFrame.head.title);
		$(tempDiv).find('.subTit').text(`- ${data.webAppOptions.sampleFrame.head.subTitle}`); 
		$(tempDiv).find('#headTipDesc > p').text(data.webAppOptions.sampleFrame.head.info);
		$(tempDiv).find('.foot > p').text(data.webAppOptions.sampleFrame.foot.desc);
		$(tempDiv).find('.logo').parent().css('background',data.webAppOptions.sampleFrame.head.backgroundColor);
		$(tempDiv).find('.mainTit').css('color',data.webAppOptions.sampleFrame.head.fontColor);
		$(tempDiv).find('#headTip').css('color', data.webAppOptions.sampleFrame.head.fontColor);
		$(tempDiv).find('#headTip').css('border-color', data.webAppOptions.sampleFrame.head.fontColor);
		$(tempDiv).find('.subTit').css('color',data.webAppOptions.sampleFrame.head.fontColor);
		$(tempDiv).find('.foot').css('background',data.webAppOptions.sampleFrame.foot.backgroundColor);
		$(tempDiv).find('.foot > p').css('color',data.webAppOptions.sampleFrame.foot.fontColor);
		$(tempDiv).find('.logo > a > img').attr("src",data.webAppOptions.sampleFrame.head.logoToDataURL);
		$(tempDiv).find('.logo > a').attr("href",data.webAppOptions.sampleFrame.head.logoLink);
		this.previewHTML = $(tempDiv).html();
	}
	//미리보기
	preview() {
		//바로부르면 소스가 두번 되므로 새 html 생성필요
		let templateType = data.webAppOptions.mapTmplatTyCode;
		let themeType = data.webAppOptions.sampleFrame.theme; //템플릿 종류
		let styleType = data.webAppOptions.sampleFrame.style;//템플릿 레이아웃 타입
		this.callHead().then(head => {
			//head태크 넣기
			const headElement = document.createElement('head');
			headElement.innerHTML = head;
			this.callSampleFrame(templateType).then(html => {
				
				//sampleFrame 추가된 위젯에 맞게 구조변경
				const mapAreaDiv = document.createElement('div');
				mapAreaDiv.className ='mapArea';
				const mapContainerDiv = document.createElement('div');
				mapContainerDiv.className ='mapContainer';
				const wrapDiv = document.createElement('div');
				wrapDiv.id = 'wrap';
				const appDiv = document.createElement('div');
				appDiv.id = 'app';
				appDiv.innerHTML= html;
				const sampleFrame = appDiv.firstElementChild;
				sampleFrame.classList.add(themeType);
				sampleFrame.classList.add(styleType);
				sampleFrame.innerHTML = this.previewHTML;
				
				//코드교체
				appDiv.lastElementChild.remove();
				const currentScript = document.querySelector('#sample_script').cloneNode(true);
				appDiv.append(currentScript);
				mapAreaDiv.append(appDiv);
				mapContainerDiv.append(mapAreaDiv);
				wrapDiv.append(mapContainerDiv);
	            const preview = window.open('','',"fullscreen = yes");
	            const previewDoc = preview.document;
	            previewDoc.open()
	            previewDoc.writeln(headElement.innerHTML,wrapDiv.outerHTML);
	            previewDoc.close();
				appDiv.remove();
			});
        })
	}
	
	//맵 생성
	createMap() {
		let code = 
			`	//맵 생성
			const mapContainer = document.querySelector('#map');
			const coord = new odf.Coordinate(276179.88560667867, 413632.9594010007);//5186 좌표 기준 전국중심
			const mapOption = {
				center:coord,
				zoom:9,
				projection:'EPSG:5186',
				basemap:{
					baroEMap:['eMapBasic','eMapAIR']
				},
			};
			const map = new odf.Map(mapContainer, mapOption);
			
			//저작도구에서 같이사용하는 map
		    if(typeof webAppMap ==='string') {
		    	webAppMap = map;
		    }
			map.updateSize();\n`
		return code;
	}
	
	
	//공통함수 정의 client and api 코드생성  oui.-> 으로된 함수들 toString.. 불가... 대안필요
	createCommonCode (){
		let code =
		/// 사용자 정의 클라이언트 정의 ///
		`const commonUtils = {};
		const data =  ${JSON.stringify(mapData)};
		commonUtils.callAPI = ${commonUtils.callAPI.toString()}
		
		const getToday = ${commonUtils.getToday.toString()}
		const startLoadingBar = (test) => {
			callLoadingBar({ message: "레이어를 업로드중입니다.", status: true });
		};
		const endLoadingBar = (test) => {
			callLoadingBar({ status: false });
		};
		const uploadClient = oui.HttpClient({
		    baseURL: 'http://10.0.0.212:10040',
		    // params: {registerId: 'test',},
		});
		const geocodingClient = oui.HttpClient({
		    baseURL: 'http://10.0.0.212:10060',
		    // params: {registerId: 'test',},
		});
		const addressClient = oui.HttpClient({
		    baseURL: 'http://10.0.0.212:10060',
		    //params: {registerId: 'test',},
		});
		const administClient = oui.HttpClient({
			baseURL: 'http://10.0.0.212:10060',
		});
		const mapClient = oui.HttpClient({
		    baseURL: 'http://10.0.0.212:10010',
		});
		const noticeClient = oui.HttpClient({
		    baseURL: 'http://10.0.0.212:10020',
		});
		const layerClient = oui.HttpClient({
		    baseURL: 'http://10.0.0.212:10010',
		});
		const analysisClient = oui.HttpClient({
		    baseURL: 'http://10.0.0.212:10020',
		});
		const bookmarkClient = oui.HttpClient({
		    baseURL: 'http://10.0.0.212:10010',
		});
	
		/// API 정의 ///
		const commonCodeApi = oui.CommonCodeApi(layerClient);
		const columnInfoApi = oui.ColumnInfoApi(layerClient, { lyrId: 'LR0000030049', userId: 'lxuser' });
		const addressApi = oui.AddressApi(addressClient, {
			projection: '5186',
		});
		const administApi = oui.AdministApi(administClient, {
			projection: '5186',//사용 좌표계
		});
		const mapApi = oui.MapApi(mapClient);
		const tocApi = oui.TOCApi(layerClient);
		let uploadApiOptions = {
			sendOpertNtcnInfo: null,
			userId: "lxuser"
		};
		const uploadApi = oui.UploadApi(uploadClient, uploadApiOptions);
		const geocodingApiOption = {
			sendOpertNtcnInfo: null
		}
		const geocodingApi = oui.GeocodingApi(geocodingClient, geocodingApiOption);
		const noticeApi = oui.NoticeApi(noticeClient, {
			userId: 'lxuser',
		});
		const layerApi = oui.LayerApi(layerClient, {
			userId: 'lxuser',
		});
		const analysisApi = oui.AnalysisApi(analysisClient, {
			userId: 'lxuser',
			projection: '5186',
			//작업일련번호를 리턴해줘야할 함수
			sendOpertNtcnInfo: null,
		});`;
		return code;
	}
	//웹맵 정보 추가
	 createWebmapCode(){
		 let _userMapInfo =data.webmapView.userMapInfo;
		 let _userMapId = detailSettingVue.$refs.mainTab.webmap.userMapId
		 let _view = app.cmm.api.webmap.view;
		 let code =
			 ` //jh.kim
            //메인에서 선택한 맵이 있을 경우
           	let param= {};
           	param.userMapId  = '${_userMapId}'
           	let userMapId = param.userMapId;
           	param.userId  = "lxuser";
           	let view = ${_view.toString()}
           	view(param)
           	.then(res => {
               	let webmapView = res.result;
           		let userMapInfo = webmapView.userMapInfo
	 			let tocGroup = webmapView.tocGroup;
	 			$("#tocNm").text(userMapInfo.userMapSj);
           	    if(userMapInfo.userMapScopeValue){
	 				let userMapScopeValue = JSON.parse(userMapInfo.userMapScopeValue);
	 				map.getView().setCenter([userMapScopeValue.mapCenter.x,userMapScopeValue.mapCenter.y]);
	 				map.setZoom(userMapScopeValue.mapCenter.zoom);
	 				refineTocContentList(tocGroup)
 					.then(res =>{
						res.forEach((item,i)=>{
							if(item.linkedLayer){
								item.linkedLayer.setMap(map);
			 				}
						})
						toc.createContentList(res);
			 			//TOC켜기.
						if(!$(".tocToggle").hasClass("active")) $(".tocToggle .tool").click();
               		})
	 		   	}
			})`
			 return code;
	 }	


	//ui 제어 코드생성 
	createUiCode() {
		let code = 
			`
			//이벤트 해제후 다시등록 (중복문제)
			$('.btnTocHide').unbind('click');
			$('#btnTocClose').unbind('click');
			$('#headTip').unbind('click');
			$('.btnTocHide').on({
		        "click":function (){
		            $(this).closest('.toc').toggleClass('hide');
		            map && map.updateSize();
		        }
		    });
		    $('.btnTocClose').on({
		    	"click":function (){
		    		$('#layerDetailDiv').removeClass('active');
		    		map && map.updateSize();
		    	}
		    });
		    $('#headTip').on({
		    	"click":function (){
		    		$('#headTipDesc').css('display') === "none" ? $('#headTipDesc').show() : $('#headTipDesc').hide(); 
		    	}
		    })
		    `
		return code;
	}
}