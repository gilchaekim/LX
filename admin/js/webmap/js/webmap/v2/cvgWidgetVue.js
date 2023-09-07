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

			});

			// 융복합 카테고리 클릭했을떄 일어나는함수
			$(".cvgWidgetChild2 > dd").on("click",function(e){

				$(".cvgWidgetChild2 dd").removeClass("active");
				$(this).addClass("active");
				$("#cvgWidget3").show();
				
				let param = {};

				param.cvgTypeCode = $(this).data("cvgTypeCode");  // 카테고리종류(공공측량01,수치지도02,항공사진03,DEM04,사용자레이어05)
				param.srchPolygonInfo = $("#cvgSrchPolygon").val(); // 검색하려는범위 폴리곤정보 
				
				app.webmap.cvgWidget.getCvgList(param);

			});

			// 융복합 목록 닫기
			$("#cvgWidget3 .modal_close").on("click",function(){
				$("#cvgWidget3").hide();
			});

			$("#cvg_03 ul li").on("click",function(e){

				$("#clearBtn").trigger("click");
						
				const drawType = $(e.target).data("drawType");
				console.dir(drawType);
				
				if( ["buffer"].includes(drawType) ) {
					callAlert("error", "Buffer는 현재 지원되지 않습니다.");
				} else {

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
	//						drawControl.drawBuffer("Y");
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

			$(".cvgMenu01 li").removeClass("active");
			$(".cvgMenu02 li").removeClass("active");
			$(".cvgMenu03 li").removeClass("active");

			$(".cvgWidgetChild2 dd").removeClass("active");
		},
		getCvgList : (param) => {
			let srchPolygonInfo = param.srchPolygonInfo; // 카테고리종류(공공측량01,수치지도02,항공사진03,DEM04,사용자레이어05)
			let cvgTypeCode     = param.cvgTypeCode;     // 검색하려는범위 폴리곤정보
			
			let cvgListTitle = "";

			switch (cvgTypeCode) {
			  case "01":
				cvgListTitle = "공공측량";
				break;
			  case "02":
				cvgListTitle = "수치지도";
				break;
			  case "03":
				cvgListTitle = "항공사진";
					break;
			  case "04":
				cvgListTitle = "DEM";
					break;
			  case "05":
				cvgListTitle = "사용자 레이어";
					break;
			}

			$("#cvgListTitle").html(cvgListTitle);
			
			// 비동기통신으로 레이어 조회후 화면에 목록 표출하는거 짜야함
			console.log(param);
			
			
			//
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
