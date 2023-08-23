app = window.app || {};
app.webmap = app.webmap || {};
((app) => {
	app.webmap.cvgWidget = {

		onoff : function () {
			if($("#cvgWidget1").css("display") == "none"){
				$("#cvgWidget1").show();
			}else{
				cvgUiReset();
			}
			
		},
		getCvg : function(srchPolygonInfo){
			alert("위젯으로 따로빼기");
			alert(srchPolygonInfo);
		}
	};

})(app);
$("#cvgControlWidget").on("click",function(){
	app.webmap.cvgWidget.onoff();
});

// 융복합 위젯 1 클릭이벤트 (인덱스,행정구역, 도형)
$(".cvgMenu01").on("click",function(e){	
	let menuId = $(".cvgMenu01 .active").data("menuId");
	$("#cvg_01,#cvg_02,#cvg_03").hide();
	$("#"+menuId).show();
	$("#cvgWidget2").show()
});
// 융복합 카테고리 클릭했을떄 일어나는함수
$(".convergenceWidget2 > dd").on("click",function(e){
	$(".convergenceWidget2 dd").removeClass("active");
	$(this).addClass("active");
	$("#cvgWidget3").show();
	
	let param = {}
	param.cvgTypeCode = $(this).data("cvgTypeCode");  // 카테고리종류(공공측량01,수치지도02,항공사진03,DEM04,사용자레이어05)
	param.srchPolygonInfo = $("#cvgSrchPolygon").val(); // 검색하려는범위 폴리곤정보 
	
	getCvgList(param);
});

// 융복합 레이어목록 조회하는 함수 짜야함.
function getCvgList(param){
	let srchPolygonInfo = param.srchPolygonInfo; // 카테고리종류(공공측량01,수치지도02,항공사진03,DEM04,사용자레이어05)
	let cvgTypeCode     = param.cvgTypeCode;     // 검색하려는범위 폴리곤정보
	
	let cvgTitleNm = "";
	switch (cvgTypeCode) {
	  case "01":
		  cvgTitleNm = "공공측량";
	    break;
	  case "02":
		  cvgTitleNm = "수치지도";
	    break;
	  case "03":
		  cvgTitleNm = "항공사진";
		    break;
	  case "04":
		  cvgTitleNm = "DEM";
		    break;
	  case "05":
		  cvgTitleNm = "사용자 레이어";
		    break;
	}
	console.log(cvgTitleNm);
	$("#cvgTitleNm").html(cvgTitleNm);
	
	
	// 비동기통신으로 레이어 조회후 화면에 목록 표출하는거 짜야함
	console.log(param);
	
	
	//
}

// 융복합 목록 닫기
$("#cvgWidget3 .modal_close").on("click",function(){
	$("#cvgWidget3").hide();
});

$("#cvg_03 ul li").on("click",function(){
	//일단 사각형일때만 되도록 
	if(3 == $(this).data("menuId")){
		$("#clearBtn").trigger("click");
		let drawControl = new odf.DrawControl();
		drawControl.setMap(map,false);		
		drawControl.drawBox("Y");  // drawBox라는 odf.min.js에   Y라는 매개변수를 넣어서 <input type="hidden" id="cvgSrchPolygon" /> 값에다 검색하려는 폴리곤정보를 셋팅한다
		// 해당 범위내에있는 데이터 검색
		//srchCvg();
	}
});

function srchCvg(){
	let cvgSrchPolygon = $("#cvgSrchPolygon").val();
	alert(cvgSrchPolygon);
}

function cvgUiReset(){
	$("#cvgWidget1").hide();
	$("#cvgWidget2").hide();
	$("#cvgWidget3").hide();
	$(".cvgMenu01 li").removeClass("active");
	$(".cvgMenu02 li").removeClass("active");
	$(".cvgMenu03 li").removeClass("active");
	$(".convergenceWidget2 dd").removeClass("active");
}