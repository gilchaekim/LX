/**
 * 
 */
((app) => {
	
	app.calculateField = {};
	app.calculateField.layer = {};
	
	app.calculateFieldInit = (e) => {
		app.formulaButtonShow(e);
		app.formulaButtonClickEvent(e);
		
		$("#newCalculateUnit").on("change", function(e){
			console.dir(e.target.value);
			
			if(["DECIMAL"].includes(e.target.value)) {
				$("#newCalculateFieldDistance").val("").prop("disabled", "");
			} else {
				$("#newCalculateFieldDistance").val("").prop("disabled", "disabled");
			}
			
		});
		
		$("#formula").val("").prop("disabled", "disabled");
		$("#updateTargetField").val("").prop("disabled", "");			
		$("#newCalculateFieldLength").val("").prop("disabled", "disabled");
		$("#newCalculateFieldDistance").val("").prop("disabled", "disabled");
		$("#newCalculateField").val("").prop("disabled", "disabled");
		$("#newCalculateUnit").val("INTEGER").prop("disabled", "disabled");
		
	};
	
	app.formulaButtonShow = (e) => {
		$("#formulaButton").addClass("spatialAnalysis_btn spatialAnalysis_searchPoint spatialAnalysis_hasTooltip");
		$("#formulaButton").parent("span").show(); 
		$("#formulaButton").css({"display":"inline-block"}).show();
	};
	
	app.formulaButtonClickEvent = (e) => { 
		 
		$("#formulaButton").on("click", function(e) {
//			console.dir(app.calculateField.layer); 
			app.webmap.components.calculateFieldModalVue.show();
			app.webmap.components.calculateFieldModalVue.init();
		});
	};
	
	app.checkCreateCalculateField = (e) => {
		
		var isChecked = e.target.checked;
		
		if(isChecked) {
			$("#updateTargetField").val("").prop("disabled", "disabled");			
			$("#newCalculateFieldLength").val("").prop("disabled", "");
//			$("#newCalculateFieldDistance").val("").prop("disabled", "");
			$("#newCalculateField").val("").prop("disabled", "");
			$("#newCalculateUnit").val("INTEGER").prop("disabled", "");
		} else {			
			$("#updateTargetField").val("").prop("disabled", "");			
			$("#newCalculateFieldLength").val("").prop("disabled", "disabled");
//			$("#newCalculateFieldDistance").val("").prop("disabled", "disabled");
			$("#newCalculateField").val("").prop("disabled", "disabled");
			$("#newCalculateUnit").val("INTEGER").prop("disabled", "disabled");
		}
		
	};
	
})(app);