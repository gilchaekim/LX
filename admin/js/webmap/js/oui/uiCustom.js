(() => {
	//분석 1뎁스 명칭 변경
	Object.entries(app.oui.data.spatialAnalysisWidget).forEach(group=>{
	    // ex) group[0] => 'sumry' , group[1] => {name: '데이터 요약 분석', child: {…}}
		if(group[1].name){
			$(`.analysis_${group[0]} > span`).text(group[1].name);
		}
		//분석 2뎁스 명칭 변경
		if(group[1].child){
			Object.entries(group[1].child).forEach(analysis=>{
				// ex) analysis[0] => 'ag' , analysis[1] => {name: '포인트집계 분석'}
				if(analysis[0].indexOf('ovrlay/') >= 0 ){
					analysis[0] = analysis[0].split('ovrlay/')[1]; 
				}
				if(analysis[1].name){
					$(`.${group[0]}_${analysis[0]} > span`).text(analysis[1].name);
				}
			});
		}
	})
})();
