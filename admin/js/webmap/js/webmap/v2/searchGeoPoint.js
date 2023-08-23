/**
 * 
 */
app.oui = app.oui || {};

((app) => {
	
	app.searchGeoPoint = {};	
	app.searchGeoPoint.extractExcelColumnList = (e) => {

		$("#fieldX").empty(); // X 필드명 설정 목록 초기화
		$("#fieldY").empty(); // Y 필드명 설정 목록 초기화
		
		let dataJson = {}; // Data
		
		var file = e.target.files[0]; // 업로드 시 선택한 파일
		var rd = new FileReader(); // 파일을 읽기 위한 Reader
		
		// ###############################################
		// 분석 실행 시 JSON을 전달하기 위한 임의 변수 생성
		// ###############################################
		app.searchGeoPoint.sourceJson = {};
		// ###############################################
		
		// FileReader OnLoad
		rd.onload = (e) => {

			var data = e.target.result;
			  
			var wb = XLSX.read(data); // 엑셀 데이터 불러오기
			var sheet = wb.Sheets[wb.SheetNames[0]]; // 엑셀 시트 선택
			dataJson = XLSX.utils.sheet_to_json(sheet); // 시트에서 데이터 JSON 추출
			
			// json 검증
			if(dataJson != null && dataJson.length > 0) {
				
				var dataJsonKeys = Object.keys(dataJson[0]);
				var _options;
				
				for(var i=0; i < dataJsonKeys.length; i++) {
					_options = $("<option value='" + dataJsonKeys[i] + "'>" + dataJsonKeys[i] + "</option>");
					$("select[name=fieldX]").append(_options);
				}
				
				for(var i=0; i < dataJsonKeys.length; i++) {
					_options = $("<option value='" + dataJsonKeys[i] + "'>" + dataJsonKeys[i] + "</option>");
					$("select[name=fieldY]").append(_options);
				}
				
				
				
			}
			
			app.searchGeoPoint.sourceJson = dataJson;
			
		};
		
		rd.readAsArrayBuffer(file);
		
	};
	
	app.searchGeoPoint.parseRequestJson = (queryString) => {
		
		if(!queryString) {
			return {};
		}
		
		const nameValuePairs = queryString.split('&');
		
		let parseJson = {};
		
		nameValuePairs.forEach((pair) => {
    		
			pair = pair.split('=');
    		
			var name = pair[0];
			var value = pair[1];
			
			if (name.length) {
				
				if (parseJson[name]) {
					
					if (!parseJson[name].push) {
						parseJson[name] = [parseJson[name]];
					} else {
						parseJson[name].push(value || '');
					}
					
				} else {
					parseJson[name] = value || '';
				}
			
			}
		});
		
		return parseJson;
		
	}
	
})(app);