app = window.app || {};
app.oui = app.oui || {};
((app) => {

	let process = app.oui.process = {};
	//toc에 필요한 레이어 정리하는 함수
	//data는 레이어 목록

	//지도에 레이어 추가하는 함수 
	//contentInfo : 레이어 정보
	/* jshint esversion: 6 */
	//레이어 검색 추가 버튼 클릭시 레이어 정보 넘어옴

	process.getLayerObject = async (layerInfo) => {
		let { svcTySeCode = null, lyrGroupId, cntntsId, lyrClCode, lyrId, lyrTySeCode, lyrClSeCode, typeName, upperGroupId = null, lyrGroupSeCode, flterCndCn = null, title, symbolCndCn = null, popup = null, attributes = [], onOffAt = 'Y', holdDataSeCode, style, cntmSeCode } = layerInfo;
		//contetnId 넘어올 값 그룹의경우 'GR000' , 레이어의경우 'L10000'
		let refineContentInfo = {};
		//레이어의 경우
		let serviceType = (svcTySeCode != null ? (svcTySeCode == 'M' ? 'wms' : (svcTySeCode == 'T' ? 'wmts' : 'wfs')) : 'wfs');

		if (lyrClCode == 'MPD011' && lyrClSeCode == '04') {
			serviceType = "heatmap";
		} else if (lyrClCode == 'MPD011' && lyrClSeCode == '06') {
			serviceType = "cluster";
		} else if (lyrClCode == "MPD013" && lyrClSeCode == '06' && lyrTySeCode == '5') {
			serviceType = "group";
		}

		//let _method = serviceType === 'wms' ? 'post' : 'get';

		//해당 정보로 레이어 만들기['heatmap', 'cluster'
		let layer = odf.LayerFactory.produce('geoserver', { // 레이어 호출 방법 (ex. geoserver, geojson)
			method: 'post',
			server: `${API_MAP}/api/map/${['heatmap', 'cluster'].includes(serviceType) ? 'wfs' : (serviceType == "group" ? "wms" : serviceType)}`, // 레이어가 발행된 서버 주소
			layer: typeName, // 발행된 레이어 명칭 (ex. 저장소명:레이어명)
			service: serviceType, // 호출하고자 하는 레이여 형태(wms, wfs, wmts)
			bbox: false,
			matrixSet: serviceType === 'wmts' ? `EPSG:${cntmSeCode}` : undefined,
			crtfckey: crtfckey,
			//sortBy : 'fid'
		});

		//스타일 값이 있을경우, 스타일 셋팅
		if (symbolCndCn) {
			let style = JSON.parse(symbolCndCn);

			if (['vector', 'cluster'].includes(style.serviceType)) {
				layer.setStyle(odf.StyleFactory.produceFunction(style.styleObject));
			} else if ('image' === style.serviceType) {
				layer.setSLD(odf.StyleFactory.produceSLD(style.styleObject));
			} else if ('heatmap' === style.serviceType) {
				layer.setBlur(style.styleObject.blur);
				layer.setGradient(style.styleObject.gradient);
				layer.setRadius(style.styleObject.radius);

				if (style.styleObject.maxResolution) {
					layer.setMaxResolution(style.styleObject.maxResolution);
				}
				if (style.styleObject.minResolution) {
					layer.setMinResolution(style.styleObject.minResolution);
				}
			}

			if (style.opacity) {
				layer.setOpacity(style.opacity);
			}
		}
		else if (serviceType === 'group') {
			//group레이어 스타일 적용
		}
		else if (style) {
			layer.setStyle(style);
		}
		else if (['MPD011', 'MPD012', 'MPD016', 'MPD017'].includes(lyrClCode)/*분석레이어 발행일 경우*/
			&& ['1', '2', '3'].includes(lyrTySeCode)/*점/선/면 타입(타일, GeoTIFF 타입 제외)*/) {

			//분석으로 발행된 레이어이면서 스타일 값이 없는 경우, 분석 기본 스타일 적용
			let _param = {
				service: 'wfs',
				version: '1.0.0',
				request: 'GetFeature',
				typeNames: typeName,
				outputFormat: 'application/json'
			};

			await app.cmm.api.api.getFeature(_param)
				.catch(e => {
					throw { error: e.responseJSON };
				})
				.then(async (res) => {
					let style = oui.SpatialAnalysisWidget.getAnalysisStyle(res.features, lyrClCode, lyrClSeCode);
					if (style) {
						layer.setStyle(style);
					}

				});
		}
		//스타일이 없을 경우, 랜덤 스타일 지정
		else if (symbolCndCn == null && serviceType == 'wfs') {

			let randomColor = odf.ColorFactory.produceRandomColor(1, 1)[0];
			//dxf로 발행된 레이어일 경우
			if (lyrClCode === 'MPD013' && lyrClSeCode === '06') {
				if (lyrTySeCode === '1'/*점*/) {
					layer.setStyle(odf.StyleFactory.produceFunction(`[{"seperatorFunc":"default","style":{"stroke":{},"image":{"circle":{"stroke":{"color":"#00000000","width":1},"radius":5,"fill":{"color":"#2BF92E00"}}},"text":{"fill":{"color":"#000000FF"},"stroke":{"color":"#FFFFFF00","width":1},"font":"normal normal 10px 굴림","placement":"point","offsetX":0,"offsetY":0,"overflow":true},"name":"기본 스타일"},"callbackFunc":"function anonymous(style, feature, resolution, produce) {/*oui style callbackFunc*//*oui wfs setText start*/style.getText().setText(String(feature.getProperties().Text));/*oui wfs setText end*/}","priority":99}]`));
				}
				else if (lyrTySeCode === '2'/*선*/) {
					layer.setStyle(odf.StyleFactory.produceFunction(`[{"seperatorFunc":"default","style":{"geometryType":"free","name":"기본 스타일","fill":{"color":[${randomColor.toString()}]},"stroke":{"color":[${randomColor.toString()}],"width":1},"image":{"circle":{"radius":5,"snapToPixel":true,"fill":{"color":[243,75,199,1]},"stroke":{"color":"#000000","width":1}}}},"priority":-1,"callbackFunc":"(t,e,i)=>{}"}]`));
				}
				else if (lyrTySeCode === '3'/*면*/) {
					layer.setStyle(odf.StyleFactory.produceFunction(`[{"seperatorFunc":"default","style":{"stroke":{"color":"#000000","width":1},"image":{},"text":{"fill":{"color":"#000000FF"},"stroke":{"color":"#FFFFFF00","width":2},"font":"normal normal 20px 굴림","placement":"point","offsetX":0,"offsetY":0,"overflow":true},"fill":{"color":"#6FB57C00"},"name":"기본 스타일"},"priority":99,"callbackFunc":"(style, feature, resolution) => {}"}]`));
				}
			} else {
				let geometryType = layer.getProperties().geometryType.toLowerCase();

				let styleOption = odf.StyleFactory.produce({
					geometryType: 'free',
					image: {
						circle: {
							radius: 5,
							fill: { color: randomColor },
							stroke: { color: '#000000', width: 1 },
						},
					},
					fill: { color: randomColor },
					stroke: { color: (geometryType.includes('linestring') ? randomColor : '#000000'), width: 1 },
				});
				layer.setStyle(styleOption);
			}

			//저장된 스타일 정보가 없고 wms인 경우 fid 순으로 셋팅
		} else if (symbolCndCn == null && serviceType == 'wms'&& ['1', '2', '3'].includes(lyrTySeCode)) {
			let _sld = layer.getSLD();
			if (!_sld) {
				_sld = await layer.getDefaultSLD();
			}
			layer.setSLD(_sld);
		}
		//    layer.setMap(_map);
		//    layer.fit();
		return layer;
	}
	//
	//
	//
	////레이어 추가 함수
	//
	process.getAddLayerInfo = (layerInfo) => {
		//toc 레이어 추가 갯수 제한
		if (app.widget.tocWidget.getLayerList().length >= tocMaxNum) {
			callAlert('fail', `레이어 목록에 레이어를 ${tocMaxNum}개까지만 추가할 수 있습니다.`);
		} else {
			layerInfo.lyrGroupSeCode = "02";
			process.refineTocContentList([layerInfo]).then((data) => {
				data[0].linkedLayer.setMap(map);
				if (layerInfo.lyrClCode && layerInfo.lyrClSeCode && !(layerInfo.lyrClCode == 'MPD013' && layerInfo.lyrClSeCode == '11')) {
					data[0].linkedLayer.fit();
				}
				app.widget.tocWidget.setContent(data[0]);
			});
		}
	}

	process.getLayerStyleOption = async (layer, options, layerInfo) => {

		let _labelFlag = false;
		let _sourceOption = layer.getInitialOption();
		let _serviceType = '';
		let _style;
		let _opacity = layer.getOpacity();

		switch (_sourceOption.type) {
			case 'geoserver': _serviceType = _sourceOption.params.service; break;
			case 'kml': _serviceType = 'kml'; break;
			case 'csv': _serviceType = 'csv'; break;
			case 'api': _serviceType = _sourceOption.params.service; break;
			case 'empty': _serviceType = 'geojson'; break;
		}

		//api 타입은 wfs일때만 스타일 허용
		if (_sourceOption.type === 'api' && _serviceType !== 'wfs') {
			return undefined;
		}

		if (['wfs', 'kml', 'csv', 'geojson'].includes(_serviceType) || 'cluster' === _serviceType) {
			let sObj = layer.getStyle().getObject();
			if (sObj instanceof Array) {
				_style = sObj;
			} else {
				_style = [{
					seperatorFunc: 'default',
					style: layer.getStyle().getObject()
				}];
			}

			if ((_style[0].style.text && _style[0].style.text.text) ||
				(_style[0].callbackFunc && _style[0].callbackFunc.toString().includes('setText'))) {
				_labelFlag = true;
			}
		} else if (_serviceType === 'wms') {
			let _sld = layer.getSLD();
			if (!_sld) {
				_sld = await layer.getDefaultSLD();
			}
			_style = _sld.getObject();
			_style.rules.forEach(rule => {
				rule.symbolizers.forEach(symbolizer => {
					if (symbolizer.kind == 'Text' && symbolizer.label && symbolizer.label !== '') {
						_labelFlag = true;
					}
				})
			})
		} else if (_serviceType === 'heatmap') {
			_style = {
				blur: layer.getBlur(),
				gradient: layer.getGradient(),
				opacity: layer.getOpacity(),
				radius: layer.getRadius(),
				minResolution: layer.getMaxResolution(),
				maxResolution: layer.getMinResolution()
			}
		} else if (_serviceType === 'group') {
			_style = {}
		}

		let _styleService = '';
		if (['heatmap', 'cluster'].includes(_serviceType)) {
			_styleService = _serviceType;
		}
		else if (['wfs', 'kml', 'csv', 'geojson'].includes(_serviceType)) {
			_styleService = 'vector';
		} else if ('wms' === _serviceType) {
			_styleService = 'image';
		} else if ('group' === _serviceType) {
			_styleService = 'group';
		}

		//임의  ==> 추후 레이어별 서버에서 어떤 타입인지 조회
		let _geometryType;


		if (_styleService === 'group') {
			_geometryType = 'group';
		}
		else if (!['heatmap', 'cluster'].includes(_styleService)) {

//			if (layer.getAttributes && _sourceOption.type !== 'api') {
//				_geometryType = layer.getAttributes(['geometry'])[0].geometryType.toLowerCase();
//			}
//			else if (_styleService === 'vector' && layer.getFeatures().length > 0) {
//				_geometryType = layer.getFeatures()[0].getGeometry().getType().toLowerCase();
//			}
			//else 
				if (_sourceOption.type === 'api' && _styleService === 'vector') {

				// web 레이어의 경우 점선면 정보를 사용자가 입력하는 것이기 때문에 잘못 입력할 가능성이 존재한다.
				// 때문에 getFeature로 실제 데이터를 가져와 geometryType을 확인하는데,
				// arcGIS에서 피쳐를 조회하는 방식이 아래와 다르다면, layer정보에 있는 점선면 정보를 조회하여 사용하는것도 하나의 방법이다.
				let { type, params } = _sourceOption;
				let param = {
					service: 'WFS',
					request: 'GetFeature',
					outputFormat: 'application/json',
					...params,
					maxfeatures: 1,
				};
				delete param.server;
				delete param.originalOption;
				let url = typeof params.server === 'string' ? params.server : params.server.url;

				let xhr = new XMLHttpRequest();
				xhr.onload = function (e) {
					if (this.status === 200) {
						let reData = JSON.parse(this.responseText);
						_geometryType = reData.features[0].geometry.type.toLowerCase();
					}
				};
				let paramString = '';
				Object.entries(param).forEach(([key, value]) => {
					paramString += `${key}=${value}&`;
				});

				xhr.open('get', `${url}?${paramString}`, false);
				xhr.send(undefined);
			}

//			_geometryType = _geometryType.includes('point') ? 'point' : _geometryType;
//			_geometryType = _geometryType.includes('line') ? 'line' : _geometryType;
//			_geometryType = _geometryType.includes('polygon') ? 'polygon' : _geometryType;
			_geometryType = options.geometryType;
		} else {
			_geometryType = _styleService;
		}

		return {
			...options,
			labelFlag: _labelFlag,
			targetLayer: layer,
			targetLayerService: _styleService,//타겟 레이어 유형 'vector', 'image', 'cluster', 'hotspot'
			//초기화를 위해 DB에 저장된 스타일값
			originStyleObject: {
				styleObject: _style,
				opacity: _opacity,
				...layerInfo
			},
			//수정중 스타일 값
			nowStyleObject: {
				styleObject: _style,
				opacity: _opacity,
				...layerInfo
			},
			//미리보기 스타일 값
			previewStyleObject: {
				option: {
					type: undefined,
					useManualEditing: true,
					styleOption: undefined,
				},
				styleObject: _style,
				opacity: _opacity,
			},
			geometryType: _geometryType
		}
	}


	process.refineTocContentList = async (data) => {
		let result = [];
		for (let index = 0; index < data.length; index++) {
			let item = data[index];
			item.onOffAt = item.onOffAt == null ? 'Y' : item.onOffAt;
			//그룹의 경우
			if (item.lyrGroupSeCode == "01") {
				result.push({
					lyrGroupSeCode: item.lyrGroupSeCode
					, contentId: item.lyrGroupId
					, title: item.lyrGroupNm
					, lyrGroupId: item.lyrGroupId //lyrGroupId
					, onOffAt: item.onOffAt
					, upperGroupId: item.upperGroupId
					, lyrGroupSn: item.lyrGroupSn
					, registerId: item.registerId
				});
				//레이어의 경우
			} else if (item.lyrGroupSeCode == "02") {
				//		chr9613:L100003218
				//		  "apiUseSn": null,
				//		    "cntntsId": "L100003218",
				//		    "lyrNm": "[점]가로등데이터_SHP파일 업로드",
				//		    "lyrClCode": "MPD013",
				//		    "lyrClSeCode": "01",
				//		    "lyrPosesnSeCode": "1",
				//		    "lyrTySeCode": "1",
				//		    "cntmSeCode": "5186",
				//		    "lyrOpertSpcNm": "chr9613",
				//		    "opertUsrId": "chr9613",
				//		    "registDt": "2021-06-18 05:45:19",
				//		    "updtDt": null,
				//		    "namespace": "chr9613"

				let _layer;
				let _layerCallType = '1';
				//웹레이어 추가 의 경우
				if (item.lyrClCode && item.lyrClCode == 'MPD013' && item.lyrClSeCode && item.lyrClSeCode == '11') {
					_layerCallType = '2';
					let param = JSON.parse(item.mapUrlParamtr);

					_layer = odf.LayerFactory.produce('api', {
						...param
					});

					if (item.svcTySeCode === 'F') {
						//저장된 스타일값 지정
						if (item.symbolCndCn) {
							let style = JSON.parse(item.symbolCndCn);
							_layer.setStyle(odf.StyleFactory.produceFunction(style.styleObject));
							if (style.opacity) {
								_layer.setOpacity(style.opacity);
							}
						} else {
							//스타일이 없을경우 랜덤 스타일 지정
							let geometryType = item.lyrTySeCode === '1' ? 'point' : item.lyrTySeCode === '2' ? 'linestring' : 'polygon';
							let randomColor = odf.ColorFactory.produceRandomColor(1, 1)[0];

							let styleOption = odf.StyleFactory.produce({
								geometryType: 'free',
								image: {
									circle: {
										radius: 5,
										fill: { color: randomColor },
										stroke: { color: '#000000', width: 1 },
									},
								},
								fill: { color: randomColor },
								stroke: { color: (geometryType.includes('linestring') ? randomColor : '#000000'), width: 1 },
							});
							_layer.setStyle(styleOption);
						}
					}
				} else {
					let _apiContent = app.cmm.api.layer.getContentDetail({
						cntntsId: item.cntntsId
					}).responseJSON.result;
					item.typeName = _apiContent.lyrOpertSpcNm + ':' + _apiContent.cntntsId;
					_layer = await process.getLayerObject(item);
				}
				let _style = undefined;

				if (!(item.lyrClCode === "MPD011" && item.lyrClSeCode === "15")//이상치 찾기의 경우 스타일 옵션 x
					//&& !(item.lyrClCode === "MPD013" && item.lyrClSeCode === "11")//웹레이어의 경우 스타일 옵션 x
					&& ((item.svcTySeCode == 'F'
						|| (item.svcTySeCode == 'M' && !(item.lyrClCode === 'MPD013' && item.lyrClSeCode == '11'))
					))
				) {
					//isTypeStyleFieldLimit 사용안함
					let options = {
						//isTypeStyleFieldLimit : item.lyrClCode == 'MPD011' && item.lyrClSeCode =='14' ? false : true
						isTypeStyleFieldLimit: false,
						geometryType : item.lyrTySeCode == 1 ? 'point' : (item.lyrTySeCode == 2 ? 'line' : (item.lyrTySeCode == 3 ? 'polygon' : undefined)),	
					}
					let _layerInfo = {}
					if(item.symbolCndCn && JSON.parse(item.symbolCndCn).imageInfo){
						_layerInfo.imageInfo = JSON.parse(item.symbolCndCn).imageInfo;
					}
//					if(item.symbolCndCn && JSON.parse(item.symbolCndCn).resolutionRange){
//						_layerInfo.resolutionRange = JSON.parse(item.symbolCndCn).resolutionRange;
//					}
					_style = await process.getLayerStyleOption(_layer, options, _layerInfo);
					_style.targetLayerId = item.lyrId;
					_style.useMultiStyle = item.jobClCode !== '00' && item.svcTySeCode !== 'M';
				}

				result.push({
					mapUrl: item.mapUrl
					, lyrGroupSeCode: item.lyrGroupSeCode
					, title: item.lyrNcm != null ? item.lyrNcm : item.lyrNm
					, contentId: _layer.getODFId()
					, odfLayerId: _layer.getODFId()
					, cntntsId: item.cntntsId
					, upperGroupId: item.upperGroupId
					, linkedLayer: _layer
					, layerId: item.lyrId
					, onOffAt: item.onOffAt
					, style: _style
					, filter: item.flterCndCn //필터정보
					, attributes: []
					, jobClCode: item.jobClCode
					, lyrClCode: item.lyrClCode
					, lyrClSeCode: item.lyrClSeCode
					, svcTySeCode: item.svcTySeCode
					, popup: {
						originPopupObject: item.popupEstbs
						, nowPopupObject: item.popupEstbs
						, layerInfo: { layerObject: _layer, layerId: item.lyrId, lyrGroupSn: item.lyrGroupSn, layerNm: item.lyrNm, layerCallType: _layerCallType }
					}
					, lyrGroupSn: item.lyrGroupSn
					, registerId: item.registerId
					, lyrTySeCode: item.lyrTySeCode,
				});

			}
		}
		return result;
	};

	process.startLoadingBar = (test) => {
		callLoadingBar({ message: "레이어를 업로드중입니다.", status: true });
	};
	process.endLoadingBar = (test) => {
		callLoadingBar({ status: false });
	};

})(app);
