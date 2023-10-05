app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
((app) => {

	app.webmap.components.drawStyleModalVue = new Vue({
		el: "#drawStyleModal",
		data: {
			data: {
				featureType: "",
				fillColor: "",
				fillOpacity: "",
				lineColor: "",
				lineOpacity: "",
				textColor: "",
				textFont: "",
				textSize: "",
				textStyle: "",
				textFontArr: [ "Roboto", "Arial", "sans-serif" ],
				textStyleArr: [ "normal", "bold", "italic" ]
			},
			styleObj: {
				display: "none",
			},
			fillColorStyleObj: {
				"background-color": "",
				"opacity" : 1
			},
			lineColorStyleObj: {
				"background-color": "",
				"opacity" : 1				
			},
			textColorStyleObj: {
				"background-color": "rgba(255,0,0)"		
			},
			colorType : "fill",
			featId : '',
			eventId : '',
				
		},
		mounted: function () {
			$("#drawStyleModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head',
		        drag : function(){
		            var pos = $(this).position(); // 드래그 하는 이미지의 위치값 알아내기
		            // 현재 드래그 하는 이미지를 제외하고 위치값 설정
		            $('#draw-sketch-app').css({ top : pos.top+50, left : pos.left+130 });
		        }
			});
		},
		methods: {
			show: function (featId, featType) {
				
				$('input:radio[id^=drawStyle]').prop('checked',false);
				
				//featType 종류
				//사각형 box, 점 point, 폴리곤 polygon, 선 lineString, 텍스트 text, 곡선 curve, 원 circle
				//채우기 없는 feature - point, lineString, curve
				
				this.styleObj.display = "block";
				let feat;
				if(['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) {
					feat = map.getODFLayerList().find(v=> v.getODFId() == 'odf-layer-draw-unique').getFeatureById(featId);
				} else {
					feat = map.getODFLayerList().find(v=> v.getODFId().indexOf('odf-layer-draw-') > -1).getFeatureById(featId);
				}
				
				
				//let feat = map.getODFLayerList().find(v=> v.getODFId() == 'odf-layer-draw-unique').getFeatureById(featId);
				this.featId = featId;
				this.data.featureType = featType;
				this.data.fillColor = featType == 'point' ? feat.getStyle().getImage().getFill().getColor() : feat.getStyle().getFill().getColor();
				this.fillColorStyleObj['background-color'] = `rgba(${this.data.fillColor[0]}, ${this.data.fillColor[1]}, ${this.data.fillColor[2]})`;
				this.fillColorStyleObj['opacity'] = this.data.fillColor[3];
				$('#drawStyle-fillColor-box').css({'background-color' : `${this.fillColorStyleObj['background-color']}`, 'opacity' : `${this.fillColorStyleObj['opacity']}`});
				let opacity = parseInt(this.data.fillColor[3]*100);
				this.data.fillOpacity = opacity;
				
/*				
				.slider({
					change : function(evt,ui) {
						app.webmap.components.drawStyleModalVue.data.fillOpacity = ui.value;
						app.webmap.components.drawStyleModalVue.fillColorStyleObj['opacity'] = ui.value/100;
						if (ui.value == 0 ) {
							$('#drawStyle-fill-checkbox').prop('checked', true);
						} else {
							$('#drawStyle-fill-checkbox').prop('checked', false);
						}
					},
					value : opacity
				});*/
				
				opacity == 0 ? $('#drawStyle-fill-radio1').prop('checked', true) : $('#drawStyle-fill-radio0').prop('checked', true)
				
				//라인
				this.data.lineColor = featType == 'point' ? feat.getStyle().getImage().getStroke().getColor() : feat.getStyle().getStroke().getColor();
				this.lineColorStyleObj['background-color'] = `rgba(${this.data.lineColor[0]}, ${this.data.lineColor[1]}, ${this.data.lineColor[2]})`;
				this.lineColorStyleObj['opacity'] = this.data.lineColor[3];
				$('#drawStyle-lineColor-box').css({'background-color' : `${this.lineColorStyleObj['background-color']}`, 'opacity' : `${this.lineColorStyleObj['opacity']}`});
				let lineOpacity = parseInt(this.data.lineColor[3]*100);
				this.data.lineOpacity = lineOpacity;
				
/*				$("#drawStyle-line-opacity-bar").slider({
					change : function(evt,ui) {
						app.webmap.components.drawStyleModalVue.data.lineOpacity = ui.value;
						app.webmap.components.drawStyleModalVue.lineColorStyleObj['opacity'] = ui.value/100;
						if (ui.value == 0 ) {
							$('#drawStyle-line-checkbox').prop('checked', true);
						} else {
							$('#drawStyle-line-checkbox').prop('checked', false);
						}
					},
					value : lineOpacity
				});*/
				
				lineOpacity == 0 ? $('#drawStyle-line-radio1').prop('checked', true) : $('#drawStyle-line-radio0').prop('checked', true)
				
				//text
				this.data.textFont = this.data.textFontArr.find(v=> feat.getStyle().getText().getFont().indexOf(v) > -1);
				this.data.textSize = feat.getStyle().getText().getFont().replace(/[^0-9]/g, '');
				
				this.data.textColor = feat.getStyle().getText().getFill().getColor();
				this.textColorStyleObj['background-color'] = `rgba(${this.data.textColor[0]}, ${this.data.textColor[1]}, ${this.data.textColor[2]})`;
				$('#drawStyle-textColor-box').css('background-color', `${this.textColorStyleObj['background-color']}`);
				//style 없으면 normal
				this.data.textStyle = this.data.textStyleArr.find(v => feat.getStyle().getText().getFont().indexOf(v) > -1 )
				if (!this.data.textStyle) this.data.textStyle = 'normal';
				
				//input style적용
				$('#odf-draw-textBox-input').css({'font' : `${this.data.textStyle} ${this.data.textSize}px ${this.data.textFont}`, 'color' : `rgba(${this.data.textColor[0]}, ${this.data.textColor[1]}, ${this.data.textColor[2]})`});
				
			},
			hide: function () {
				this.styleObj.display = "none";
				$('#draw-sketch-app').css('display', 'none');
			},
			fillColorClick: function () {
				this.colorType = 'fill';
				drawSketchApp.$data.colors = rgb2hex($('#drawStyle-fillColor-box').css('background-color'));
				drawSketchApp.$reset;
				let popupTop = parseInt($('#drawStyleModal').css('top')) + 50 ;
				let popupLeft = parseInt($('#drawStyleModal').css('left')) + 130;
				$('#draw-sketch-app').css({top:`${popupTop}px`,left:`${popupLeft}px`,display:'block'});
			},
			lineColorClick: function () {
				this.colorType = 'line';
				drawSketchApp.$data.colors = rgb2hex($('#drawStyle-lineColor-box').css('background-color'));
				drawSketchApp.$reset;
				let popupTop = parseInt($('#drawStyleModal').css('top')) + 50 ;
				let popupLeft = parseInt($('#drawStyleModal').css('left')) + 130;
				$('#draw-sketch-app').css({top:`${popupTop}px`,left:`${popupLeft}px`,display:'block'});
			},
			textColorClick: function() {
				this.colorType = 'text';
				drawSketchApp.$data.colors = rgb2hex($('#drawStyle-textColor-box').css('background-color'));
				drawSketchApp.$reset;
				let popupTop = parseInt($('#drawStyleModal').css('top')) + 50 ;
				let popupLeft = parseInt($('#drawStyleModal').css('left')) + 130;
				$('#draw-sketch-app').css({top:`${popupTop}px`,left:`${popupLeft}px`,display:'block'});
			},
			inputOpacity: function(evt) {
				$(evt.target).parent().prev().slider('value', parseInt(evt.target.value));
			},
			opacityCheck: function(evt) {
				if (evt.target.id.indexOf('fill') > -1 ) {
					evt.target.id == 'drawStyle-fill-radio1' ? $("#drawStyle-fill-opacity-bar").val(0).change() : $("#drawStyle-fill-opacity-bar").val(100).change();
				} else {
					evt.target.id == 'drawStyle-line-radio1' ? $("#drawStyle-line-opacity-bar").val(0).change() : $("#drawStyle-line-opacity-bar").val(100).change();
				}

			},
			inputSize: function(evt) {
				this.data.textSize = evt.target.value;
				$('#odf-draw-textBox-input').css({'font' : `${this.data.textStyle} ${this.data.textSize}px ${this.data.textFont}`});
			},
			changeFont: function(evt) {
				this.data.textFont = evt.target.value;
				$('#odf-draw-textBox-input').css({'font' : `${this.data.textStyle} ${this.data.textSize}px ${this.data.textFont}`});
			},
			applyTextStyle: function(styleType,evt) {
				this.data.textStyle = styleType;
				$('#odf-draw-textBox-input').css({'font' : `${this.data.textStyle} ${this.data.textSize}px ${this.data.textFont}`});
			},
			applyOption: function() {
				
				callConfirm('설정 확인 알림', '설정을 완료하시겠습니까?', () => {
					let fillColorArr = $('#drawStyle-fillColor-box').css('background-color').replace(/[^0-9,]/g, '').split(',');
					let lineColorArr = $('#drawStyle-lineColor-box').css('background-color').replace(/[^0-9,]/g, '').split(',');
					let textColorArr = $('#drawStyle-textColor-box').css('background-color').replace(/[^0-9,]/g, '').split(',');
					//let currentFeat = map.getODFLayerList().find(v=> v.getODFId() == 'odf-layer-draw-unique').getFeatureById(this.featId);
					
					if(['webmap-view','webmap-detail'].includes(app.cmm.data.mode)) {
						currentFeat = map.getODFLayerList().find(v=> v.getODFId() == 'odf-layer-draw-unique').getFeatureById(this.featId);
					} else {
						currentFeat = map.getODFLayerList().find(v=> v.getODFId().indexOf('odf-layer-draw-') > -1).getFeatureById(this.featId);
					}	
					
					currentFeat.getStyle().getFill().setColor([ fillColorArr[0], fillColorArr[1], fillColorArr[2], this.data.fillOpacity/100 ]);
					currentFeat.getStyle().getStroke().setColor([ lineColorArr[0], lineColorArr[1], lineColorArr[2], this.data.lineOpacity/100 ]);
					
					if (this.data.featureType == 'point') {
						currentFeat.getStyle().getImage().getFill().setColor([ fillColorArr[0], fillColorArr[1], fillColorArr[2], this.data.fillOpacity/100 ]);
						currentFeat.getStyle().getImage().getStroke().setColor([ lineColorArr[0], lineColorArr[1], lineColorArr[2], this.data.lineOpacity/100 ]);
						currentFeat.getStyle().getImage().setRadius(5);
					} else {
						currentFeat.getStyle().getFill().setColor([ fillColorArr[0], fillColorArr[1], fillColorArr[2], this.data.fillOpacity/100 ]);
						currentFeat.getStyle().getStroke().setColor([ lineColorArr[0], lineColorArr[1], lineColorArr[2], this.data.lineOpacity/100 ]);
						currentFeat.getStyle().getText().getFill().setColor([ textColorArr[0], textColorArr[1], textColorArr[2], 1 ]);
						currentFeat.getStyle().getText().setFont(`${this.data.textStyle} ${this.data.textSize}px ${this.data.textFont}`);
					}
					
					currentFeat.setStyle(currentFeat.getStyle());
					this.hide();
				})
				
			}

		}

	});

})(app);

function rgb2hex(rgb) {
    if (  rgb.search("rgb") == -1 ) {
         return rgb;
    } else {
         rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
         function hex(x) {
              return ("0" + parseInt(x).toString(16)).slice(-2);
         }
         return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
    }
}

var sketch = VueColor.Sketch
Vue.use(VueColor);
const drawSketchApp = new Vue({
	el : '#draw-sketch-app',
    components: {
	    'sketch-picker': sketch,
	},
  	data() {
	    return {
	    	 colors: '#D0021B'
	    }
	},
	methods : {
		colorChange: function (returnColor) {
			//console.log(returnColor);
			if ('fill'.indexOf(app.webmap.components.drawStyleModalVue.colorType) > -1) {
				$('#drawStyle-fillColor-box').css({'background-color': returnColor.hex8, 'opacity' : $('#drawStyle-fill-opacity-percent').val()/100});
			} else if('line'.indexOf(app.webmap.components.drawStyleModalVue.colorType) > -1){
				$('#drawStyle-lineColor-box').css({'background-color': returnColor.hex8, 'opacity' : $('#drawStyle-line-opacity-percent').val()/100});
			} else {
				$('#drawStyle-textColor-box').css({'background-color': returnColor.hex8});
				$('#odf-draw-textBox-input').css({'color' : returnColor.hex8});
			}
		}
	},
});

$(document).on('click', '#drawStyleModal', function(evt){
	if (evt.target.id.indexOf('Color-box') == -1) $('#draw-sketch-app').css('display', 'none');
});

$(document).on('change', '#drawStyle-fill-opacity-bar', function(evt){
	
	app.webmap.components.drawStyleModalVue.data.fillOpacity = this.value;
	app.webmap.components.drawStyleModalVue.fillColorStyleObj['opacity'] = this.value/100;
	if (this.value == 0 ) {
		$('#drawStyle-fill-radio1').prop('checked', true);
	} else {
		$('#drawStyle-fill-radio0').prop('checked', true);
	}
	
})

$(document).on('change', '#drawStyle-line-opacity-bar', function(evt){
	
	app.webmap.components.drawStyleModalVue.data.lineOpacity = this.value;
	app.webmap.components.drawStyleModalVue.lineColorStyleObj['opacity'] = this.value/100;
	if (this.value == 0 ) {
		$('#drawStyle-line-radio1').prop('checked', true);
	} else {
		$('#drawStyle-line-radio0').prop('checked', true);
	}
	
})


