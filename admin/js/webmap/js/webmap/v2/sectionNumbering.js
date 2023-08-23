/**
 * 
 */
((app) => {
	
	app.sectionNumberReduce = (e) => {
		
		const titNums = $(".spatialAnalysis_section .spatialAnalysis_titSec .spatialAnalysis_titNum");
		
		for(let i=0; i < titNums.length; i++) {
			$(titNums[i]).html(i+1);
		}
		
	};
	
	app.sectionNumbering = (e) => {

		var snr = setTimeout(function(e) {
			
			app.sectionNumberReduce(e);
			
			$("#publishDirect").on("click", function(e) {
				setTimeout(function(e){
					app.sectionNumberReduce(e);
				},10); 
			});
			
		}, 100);
		
	};
	
})(app);
