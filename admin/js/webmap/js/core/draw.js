
app = window.app || {};
app.core = window.app.core || {};

/**
 * draw
 */
(function(app) {

	let draw = app.core.draw = {
		control : null, 
		listener : null, 
		promise : null,
		defaultOptions : {
			rightClickDelete : true,
			style : {
				fill : {
					color : [ 254, 243, 255, 0.6 ]
				},
				stroke : {
					color : [ 103, 87, 197, 0.7 ],
					width : 2
				},
				image : {
					circle : {
						fill : {
							color : [ 254, 243, 255, 0.6 ]
						},
						stroke : {
							color : [ 103, 87, 197, 0.7 ],
							width : 2
						},
						radius : 5,
					},
				},
				text : {
					textAlign : 'left',
					font : '30px sans-serif',
					fill : {
						color : [ 103, 87, 197, 1 ]
					},
					stroke : {
						color : [ 255, 255, 255, 1 ]
					},
					//backgroundStroke : {color:'black'},//placement :'line' 일경우 미적용
	                //backgroundFill : {color:'white'},//placement :'line' 일경우 미적용
				},
			},
			bufferStyle : {
				stroke : {
					color : [ 255, 255, 159, 1 ],
					width : 2
				},
				fill : {
					color : [ 255, 255, 159, 0.2 ],
				},
			}
		}
	};
	

	draw.remove = function() {
		if (this.control) {
			this.control.clear();
			this.control.removeMap();
			this.control = undefined;
		}
		
		if (this.listener) {
			odf.event.removeListener(this.listener);
//			this.defaultOptions.remove;
//			this.defaultOptions.bufferStyle = "";
//			this.defaultOptions.style = "";
			this.listener = undefined;
		}
	};
	
	/**
	 * 	options
	 * 		type : 그리기타입 
	 * 			Point, LineString, Polygon, Text
	 * 
	 * 		callback : fn
	 * 
	 * 		keepOn : 연속실행여부, default false
	 * 			true / false
	 * 		
	 * 		clear : true / false
	 * 				default false
	 * 
	 * 
	 * 
	 */
	
	draw.create = function(options) {		
		//this.remove();
		if(map.getODFControls().get('draw')){
			this.control = map.getODFControls().get('draw');
		}else{
		this.control = new odf.DrawControl(Object.assign({}, this.defaultOptions, options));
		this.control.setMap(map,false);
		}
	};
	
	
	draw.activate = function(options) {
		this.create(options);
		
		if (draw.listener) {
			//draw.deactivate();
			draw.listener = null;
		}
			
		// draw.drawXxxxx 실행
		let drawFunction = 'draw' + options.type;
		draw.control[drawFunction]();
		
		draw.listener = odf.event.addListener(draw.control, 'drawend', function (feature) {
			//feature는 odf.Feature
			//좌클릭시에만 심볼 적용됨
			if(event.button!=2){
				options.callback(feature);
				return;
			};
			if (options.type != 'Text' && event.button==0){
				if (options.keepOn || false)
					draw.control[drawFunction]();
				else
					console.log("draw.deactivate()?????");
			}else if(event.button==2){
//				draw.control.clear;
				//map.getODFControls().get('draw').findDrawVectorLayer()
				//draw.deactivate();
			}
			if (options.clear){
				draw.clear();
			}
		});
		
	};
	
	draw.deactivate = function() {
		return;
		//this.remove();
	};
	
	draw.clear = function() {
		//map.getODFControls().clear()
		//app.core.map.odfMap.getODFControls().get("clear").clear();
	};
	
})(app);

