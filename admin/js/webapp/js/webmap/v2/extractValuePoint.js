/**
 * 
 */

app.oui = app.oui || {};

((app) => {
	
	app.extractValuePoint ={};
	app.extractValuePoint.event ={};
	
	app.extractValuePoint.event.clickCmprLayer = (e) => {
		
		document.querySelectorAll("#extractPoint #rasterCmprLayer")[0].value = "";
		document.querySelectorAll("#extractPoint #rasterCmprLayer")[0].setAttribute("readonly", "readonly");
		
		$("#extractPoint #rasterCmprLayer").on("click", function(){
			app.webmap.components.geoTiffSearchModal.show();
		});
		
		$(".layerTypeMenu01 > li").on("click", function(e){	
			let menuId = $(e.target).data("menuId");
			$(".layerTypeMenu01 > li").removeClass("active");
			$("#"+menuId).toggleClass("active");
		});
		
	};
	
})(app);