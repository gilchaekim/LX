app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
let chkIllgCnst = false;
((app) => {

	app.webmap.components.illgCnstModalVue = new Vue({
		el: "#illgCnstModal",
		data: {
			mode: "", // map or app 구분하여 사용.
			currentPageNo: 1,
			data: app.webmap.data,
			checkWebapp: app.webapp != undefined ? true : false,
			styleObj: {
				display: "none",
			},
		},
		mounted: function () {
			$("#illgCnstModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
		},
		filters : {
			yyyyMMdd : function(value){
				return value.substring(0,10);
			}
		},
		methods: {
			show: function (mode) {
				this.mode = mode == undefined ? this.mode : mode;
				this.styleObj.display = "block";
			},
			hide: function () {
				this.styleObj.display = "none";
			},
			pagination: function (page) {
				this.currentPageNo = page;
				this.illgCnstLstSearch();
			},
			
			init: function () {
				
				 let centerMove = {center : [Number(210844.55932879052) , Number(360445.7030676459)] }; 
	   			 map.setCenter(centerMove.center);
	   			 map.setZoom(14); 
				 this.illgCnstMap();
				// this.illgCnstLstSearch();
				 chkIllgCnst=true;
			},
			illgCnstMap: function () {
				let param = {};
				
				let illgCnstLayer = odf.LayerFactory.produce('geoserver', { // 레이어 호출 방법 (ex. geoserver, geojson)
                    server: `${API_MAP}/api/map/wms`, // 호출 서비스 ( api or geoserver
                    layer: "dkajj:lx_expo2023", //저장소명:레이어명
                    service: "wms", //wfs, wms, wcs
                    method: "post",
                    bbox: false,
                    matrixSet: undefined,
                    crtfckey: `${crtfckey}`, // api 통신 시 필요한 인증키
                });
					
				illgCnstLayer.setMap(map);
				illgCnstLayer.setODFId(`odf-illgCnst-Layer`);
				
				let illglayerData = getLegendGraphic('lx_expo2023','lx_expo2023');
				
				var $imgElement = $("#data-img");
				$imgElement.attr("src", illglayerData);
				
				let illgCnstLayerSe = odf.LayerFactory.produce('geoserver', { // 레이어 호출 방법 (ex. geoserver, geojson)
                    server: `${API_MAP}/api/map/wms`, // 호출 서비스 ( api or geoserver
                    layer: "dkajj:lx_expo2023_data", //저장소명:레이어명
                    service: "wms", //wfs, wms, wcs
                    method: "post",
                    bbox: false,
                    matrixSet: undefined,
                    crtfckey: `${crtfckey}`, // api 통신 시 필요한 인증키
                });
				illgCnstLayerSe.setMap(map);
				illgCnstLayerSe.setODFId(`odf-illgCnstSe-Layer`);
					
			}, 
			illgCnstLstSearch: function () {
				let param = {}
				param.pageIndex = this.currentPageNo
				param.pageSize = 10;
				app.cmm.api.illgCnst.list(param).then(function (result) {
					
					var jsonObject = JSON.parse(result.illgCnstInfo.result);
					//console.log(app.webmap.components.illgCnstModalVue.currentPageNo);
					let illgCnstInfoTotalList = app.webmap.components.overlapListModalVue.data.illgCnstInfoTotalList = jsonObject.result
					let paginationInfo = app.webmap.data.paginationInfo.illgCnstInfoTotalList
					paginationInfo.currentPageNo = app.webmap.components.illgCnstModalVue.currentPageNo; // 현재
					
					// 페이지번호
					paginationInfo.firstPageNo = 1; 											// 첫번째
					// 페이지번호
					paginationInfo.lastPageNo = Math.ceil(illgCnstInfoTotalList.pageInfo.totalCount/illgCnstInfoTotalList.pageInfo.pageSize); 			// 마지막
					// 페이지번호
					paginationInfo.totalPageCount =  Math.ceil(illgCnstInfoTotalList.pageInfo.totalCount/illgCnstInfoTotalList.pageInfo.pageSize); 		// 페이지
					// 총 개수
					app.util.paging(paginationInfo);
					//console.log(illgCnstInfoTotalList.list);
					$('#illgCntsList').html('');
					for (var keySe in illgCnstInfoTotalList.list) {
						let potogrfNmStr = "";
						
						let sggNm =illgCnstInfoTotalList.list[keySe].sggNm;
						let emdNm =illgCnstInfoTotalList.list[keySe].emdNm;
						let jibun =illgCnstInfoTotalList.list[keySe].jibun;
						let objectCenterPositionGeometry =illgCnstInfoTotalList.list[keySe].objectCenterPositionGeometry;
						//console.log(objectCenterPositionGeometry);
						//alert(objectCenterPositionGeometry);
						let reStr = objectCenterPositionGeometry.replace(" ",",");
						//alert(reStr);
						//break;
						let appendHtml = "";
						appendHtml = "<tr class='illgCnstList'>";
						appendHtml += "<td data-value="+reStr+">"+sggNm+" "+emdNm+" "+jibun+"</td>";
						appendHtml += "</tr>";
						$('#illgCntsList').append(appendHtml);
							
					}
					
				})
				this.show();
				
				
			},
			activePage: function (page) {
				if (app.webmap.data.paginationInfo.illgCnstInfoTotalList.currentPageNo == page) return true;
			}
			
		}

	});

})(app);

function getLegendGraphic(layerName, styleName) {
    let legendUrl = `${API_MAP}/api/map/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=${layerName}&STYLE=${styleName}`;
    return legendUrl; // 범례 이미지 URL 반환
}



$(document).on('click', '.illgCnstList', function() {
	
	//console.log($(this).find('td').data('value'));
	
	let positionGeometry = $(this).find('td').data('value');
	
	let reStr = positionGeometry.replace(","," ");
	//console.log(reStr);
	app.webmap.components.overlapListModalVue.pointView(reStr);
});

let illgCnstWidgetId;
$(document).on('click', '.group > ul > li', function() {
	
	illgCnstWidgetId = $(this).attr('id');
	
	  if(illgCnstWidgetId == 'illgCnstWidget') {
		  $("#data-show-div").show();
		
	  }else{
		 
		  $("#data-show-div").hide();
	  }
  });
 