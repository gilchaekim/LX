app = window.app || {};
app.webmap = app.webmap || {};

((app) => {

	app.webmap.cvgWidget = {
		
		cvg: {},
		onOff: (e) => {

			const cvgWidget1 = document.querySelectorAll("#cvgWidget1")[0];

			if(cvgWidget1.style.display == "none") {
				app.webmap.cvgWidget.show();
			} else {
				app.webmap.cvgWidget.hide();
			}

		},
		init: () => {
			
			$("#cvgControlWidget").on("click",function(e){
				app.webmap.cvgWidget.onOff();
			});

			// 융복합 위젯 1 클릭이벤트 (인덱스,행정구역, 도형)
			$(".cvgMenu01").on("click",function(e){

				let menuId = $(".cvgMenu01 .active").data("menuId");

				$("#cvg_01, #cvg_02, #cvg_03").hide();
				$("#"+menuId).show();
				$("#cvgWidget2").show();
				
				if(menuId == "cvg_02") {
					app.webmap.cvgWidget.getAddressList("01", {}, "cvgSidoList");
				}

			});

			// 융복합 카테고리 클릭했을떄 일어나는함수
			$(".cvgWidgetChild2 > dd").on("click",function(e){

				const cvgTypeCd = $(this).data("cvgTypeCd"); // 카테고리종류(공공측량01,수치지도02,항공사진03,DEM04,사용자레이어05)
				const cvgLayerCount = $("dd[data-cvg-type-code="+cvgTypeCd+"] > span > b > span").html();

//				if(!isNaN(cvgLayerCount) && Number(cvgLayerCount)) {
				
					const searchSido = $("#cvgSidoList").val();
					const searchSigungu = $("#cvgSigunguList").val();
					const searchEupMyeonDong = $("#cvgEupMyeonDong").val();
				
					if(searchSido && (searchSigungu || searchEupMyeonDong)) {
						
						$(".cvgWidgetChild2 dd").removeClass("active");
						$(this).addClass("active");
						$("#cvgWidget3").show();
						
						switch (cvgTypeCd) {
						  case "01":
							$("#cvgListTitle").html("국가공간정보");
							break;
						  case "02":
							$("#cvgListTitle").html("지도서비스");
							break;
						  case "03":
							$("#cvgListTitle").html("통계서비스");
							break;
						  case "04":
							$("#cvgListTitle").html("데이터서비스");
							break;
						  case "05":
							$("#cvgListTitle").html("사용자레이어");
							break;
						}
						
					} else {
						callAlertMessage("시군구 또는 읍면동까지 선택해주세요.");
						return false;						
					}
					
//				} else {
//					callAlertMessage("해당 카테고리의 레이어가 존재하지 않습니다.");
//					return false;
//				}
				
			});

			// 융복합 목록 닫기
			$("#cvgWidget3 .modal_close").on("click",function(){
				$("#cvgWidget3").hide();
			});
			
			$("#cvg_02 ul li[data-menu-id=1]").on("change", function(e) {

				const searchSidoCd = $("#cvgSidoList").val();

				$("#cvgCount1, #cvgCount2, #cvgCount3, #cvgCount4, #cvgCount5").html("0");
				
				app.webmap.cvgWidget.setAdministDefaultOption("시군구", "cvgSigunguList", true);
				app.webmap.cvgWidget.setAdministDefaultOption("읍면동", "cvgEupMyeonDongList", true);	
				
				if(searchSidoCd) {
					var param = { ctprvnCd : searchSidoCd };					
					app.webmap.cvgWidget.getAddressList("02", param, "cvgSigunguList");
				}

			});
			
			$("#cvg_02 ul li[data-menu-id=2]").on("change", function(e) {
				
				const searchSidoCd = $("#cvgSidoList").val();
				const searchSigunguCd = $("#cvgSigunguList").val();
				
				if(!searchSidoCd) {
					callAlertMessage("검색할 시/도를 선택해주세요.");						
					return false;
				}
				
				app.webmap.cvgWidget.setAdministDefaultOption("읍면동", "cvgEupMyeonDongList", true);
				
				if(searchSigunguCd) {
					
					var param = { sigCd : searchSigunguCd };
					
					$("#cvgCount1, #cvgCount2, #cvgCount3, #cvgCount4, #cvgCount5").html("0");
					
					app.webmap.cvgWidget.getAddressList("03", param, "cvgEupMyeonDongList");
//					app.webmap.cvgWidget.getCvgCountList("02");
					
				}
				
			});
			
			$("#cvg_02 ul li[data-menu-id=3]").on("change", function(e) {
				
				const searchEupMyeonDongCd = $("#cvgEupMyeonDongList").val();		
				
				if(searchEupMyeonDongCd) {
					
					$("#cvgCount1, #cvgCount2, #cvgCount3, #cvgCount4, #cvgCount5").html("0");
//					app.webmap.cvgWidget.getCvgCountList("03");
					
				}
				
			});

			// 융복합 도형 클릭 시
			$("#cvg_03 ul li").on("click", function(e){

				const drawType = $(e.target).data("drawType");
				
				if( ["buffer"].includes(drawType) ) {
					callAlert("error", "Buffer는 현재 지원되지 않습니다.");
				} else {
					
					document.querySelectorAll("#clearBtn")[0].click();
					
					let drawControl = new odf.DrawControl();
	
					drawControl.setMap(map, false);
					
					switch(drawType) {
						case "point":
							drawControl.drawPoint("Y");
							break;
						case "line":
							drawControl.drawLineString("Y");
							break;
						case "box":
							drawControl.drawBox("Y");
							break;
						case "polygon":
							drawControl.drawPolygon("Y");
							break;
						case "circle":
							drawControl.drawCircle("Y");
							break;
						case "buffer":
//							drawControl.drawBuffer("Y");
							break;
					}
				
				}
				
				// 범위 내에 그러져 있는 도형에 대한 융복합 데이터셋 검색
				//app.webmap.cvgWidget.searchCvg();

			});

		},
		show: () => {
			document.querySelectorAll("#cvgWidget1")[0].style.display = "";
		},
		hide: () => {
			document.querySelectorAll("#cvgWidget1")[0].style.display = "none";
			document.querySelectorAll("#cvgWidget2")[0].style.display = "none";
			document.querySelectorAll("#cvgWidget3")[0].style.display = "none";
			document.querySelectorAll("#cvgWidget4")[0].style.display = "none";

			$(".cvgMenu01 li").removeClass("active");
			$(".cvgMenu02 li").removeClass("active");
			$(".cvgMenu03 li").removeClass("active");
			$(".cvgMenu04 li").removeClass("active");

			$(".cvgWidgetChild2 dd").removeClass("active");
		},
		setAdministDefaultOption: (defText, selectId, isAppend) => {
						
			$("#" + selectId).empty();
			
			
			if(isAppend) {
			
				let option = document.createElement("option");
				option.innerHTML = defText + " 선택";
				option.value = "";
				
				$("#" + selectId).append(option);
			
			}
			
		},
		getAddressList: (addressType, param, selectId) => {

			let defText = "";
			
			if(addressType == "01") {
				defText = "시도";
			} else if(addressType == "02") {
				defText = "시군구";
			} else if(addressType == "03") {
				defText = "읍면동";
			}
			
			app.cmm.api.administ.getAddressList(addressType, param)
			.then(function(response){

				const resultList = response.result;

				if(resultList &&  resultList.length > 0) {
					
					app.webmap.cvgWidget.setAdministDefaultOption(defText, selectId, true);					
					resultList.forEach(function(administ){
						 
						option = document.createElement("option");						
						option.innerHTML = administ.korNm;
						option.value = administ.cd;
						
						$("#" + selectId).append(option);
						
					});				
				}

			});

		},
		getCvgCountList: (bfCvgTypeCd) => {
			
			app.cmm.api.convergence.getCvgCountList(bfCvgTypeCd).then((response) => {
				
				const cvgCountList = response.result;
				let refCvgTypeCd;
				let refCvgCountObject;
				
				if(cvgCountList) {
					
					$(".cvgWidgetChild2 > dd").each((index, child) => {
						
						refCvgTypeCd = $(child).data("cvgTypeCd");						
						refCvgCountObject = cvgCountList.filter((element) => {
							return element.cvgTypeCd === refCvgTypeCd; 
						});
						
						$("dd[data-cvg-type-cd="+refCvgTypeCd+"] > span > b > span").html(refCvgCountObject[0].count);
						
					});
					
				}
				
			});
			
		},
		getCvgList : (cvgTypeCd) => {
			
			
			
			console.log(cvgTypeCd); // 카테고리종류(공공측량01,수치지도02,항공사진03,DEM04,사용자레이어05)
			
		},
		getCvg : (srchPolygonInfo) => {
			
			alert("위젯으로 따로빼기");
			alert(srchPolygonInfo);
			
			return false;
			
		},
		searchCvg : () => {
			
			let cvgSrchPolygon = $("#cvgSrchPolygon").val();
			
			alert(cvgSrchPolygon);
			
		}		

	};

})(app);

window.onload = function(e) {
	app.webmap.cvgWidget.init();
}
