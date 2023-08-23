app = window.app || {};
app.core = window.app.core || {};

/**
 * download
 */
(function(core) {

	let map = core.map = {
		odfMap : null,
	};
	
	let resolve;
	map.initialized = new Promise(function(_resolve, _reject) {
		resolve = _resolve;
	});
	
	map.initialize = function(odfMap) {
		this.odfMap = odfMap;
		resolve(odfMap);
	};
	
	map.getProjectionCode = function() {
		return map.odfMap.getView().getProjection().getCode();
	};
	
	map.getProjection = function() {
		return map.odfMap.getProjection();
	};
	
	map.getCenter = function() {
		return map.odfMap.getCenter();	
	};
	
	map.setCenter = function(coord) {
		return map.odfMap.setCenter(coord);
	};	
	
	
	
	
})(app.core);

