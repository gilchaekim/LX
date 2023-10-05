app = window.app || {};
app.core = window.app.core || {};
/**
 * 그리기 레이어 관련
 * 
 * 
 */
(function(core) {

	let drawLayer = core.drawLayer = {
	};
	
	/**
	 * 모듈의 초기화를 정의
	 */
	drawLayer.initialized = new Promise(function(resolve, reject) {
		resolve(drawLayer);
	});
	
	
	/**
	 * 그리기 레이어를 반환한다.
	 * 화면에 그려진 항목이 없으면 레이어가 생성되지 않는다. undefined 반환
	 */
	drawLayer.getDrawLayer = function() {
//		return R.find(R.propEq('odfId', "odf-layer-draw"), core.map.odfMap.getLayers().getArray());
		return R.find(R.propEq('odfId', "odf-layer-draw-unique"), core.map.odfMap.getLayers().getArray());
	};
	/**
	 * 그리기도구 결과로 그려진 피쳐목록을 반환한다.
	 */
	drawLayer.getFeatures = function() {
		if (drawLayer.getDrawLayer())
			return drawLayer.getDrawLayer().getSource().getFeatures();
		else
			return [];
	};
	/**
	 * 그리기 결과를 피쳐컬렉션 geojson으로 반환한다.
	 */
	drawLayer.getFeatureCollectionGeoJson = function() {
		let geoJsons = R.map(function(f) {
			let geoJson = f.toGeoJson();
			geoJson.style = app.core.style.feature.getStyle(f);
			return geoJson;
		}, drawLayer.getFeatures());
		
		return {
			type: 'FeatureCollection',
			features: geoJsons
		};
	};
	/**
	 * TODO layer 카테고리로 이동 고려!
	 */
	drawLayer.createGeoJsonLayer = function(featureCollection) {
		return odf.LayerFactory.produce('geojson', {
			data: featureCollection
		});
	};
	/**
	 * 그리기 결과 초기화
	 */
	drawLayer.clear = function() {
		if (this.getDrawLayer())
			this.getDrawLayer().getSource().clear();
	};
	drawLayer.getFeatureStyles = function() {
		return R.map(function(feature) {
			
		})(drawLayer.getFeatures());
	};
	
	
	
})(app.core);

