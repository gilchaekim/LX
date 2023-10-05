
(() => {
	odf.init(`js/odf-config-wavus-${environmentType}.json`); //odf 배경지도 관련 초기 설정 옵션 json 파일
	const mapContainer = document.querySelector('#map');//맵컨테이너 생성
	/* 맵 초기 좌표 */
	const coord = new odf.Coordinate(276179.88560667867, 413632.9594010007);//전국중심 5186 좌표 기준
	/*const coord = new odf.Coordinate(1041877.7830101907, 1824837.0688751182); //전국중심 5179 좌표 기준 
	*///const coord = new odf.Coordinate(1041877.7830101907, 1824837.0688751182); //전국중심 5179 좌표 기준 
	/* 지도 옵션 */
	const mapOption = {
		center: coord,
		zoom: 9,
		projection: mainProjection,
		//		maxZoom : 23,
		//		minZoom : 9,
		//		proxyURL: '/smt/proxy.jsp',
//				proxyURL: '/smt/proxyUrl.jsp',
//				proxyParam: 'url',
		basemap: {
			baroEMap: ['eMapAIR'],
			//vWorld : true,
			//		    kakao : ['kakaoSkyview'],

		},
			//kakaoURL : 'http://map0.daumcdn.net',
		crtfckey : crtfckey, 
	};

	//var tilelayer = odf.LayerFactory.produce('tile', {
	//	    server : {
	////	    	url: 'https://map1.daumcdn.net/map_shaded_relief/3.00/',
	//	    	url: 'https://r2.maps.daum-img.net/mapserver/file/realtimeroad',
	//	    	proxyURL : '/smt/proxyUrl.jsp',
	//	    	proxyParam: 'url',
	//	    },
	//
	//	    tileGrid: {
	//	      origin: [-30000, -60000],
	//	      resolutions: [4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125],
	//	    },
	//
	//	    extent: [-30000, -60000, 494288, 988576],
	//	    projection: 'DAUMPROJ',
	//  });


	/* 지도생성 */
	map = new odf.Map(mapContainer, mapOption);

	/* 초기 지도생성후 높이 부족으로 인해 지도가 화면에 꽉차지않는 문제 */
	/* ui 변경시 지도 리사이징 */
	const updateMapSize = () => {
		const mapArea = document.querySelector('.mapArea');
		map.setSize([mapArea.offsetWidth, mapArea.offsetHeight]);// 지도 리사이즈
	};
	updateMapSize();
	//map.setResizable(true);// 반응형 지도크기 설정 ui 문제생김

	//추후 고도화 예정..
	webmapWidgetList.split(',').forEach((value,index)=>{
		let html = app.util.ouiWebmapToolbarCreate(value);
		let groupNum = Math.floor(index/6) + 1;
		//console.log(value + " : " +groupNum);
		$(`#webmapToolGroup${groupNum} ul`).append(html);

		
		if( value == 'bookmarkControlWidget'){
			app.oui.bookMarkControlWidget().setTarget('#bookmarkDiv').build();			
		}
		else if(value == 'swiperControlWidget'){
		}
		else if(value == 'roadViewWidget'){
		}
		else if(value == 'dataAddWidget'){
		}
		else if(value == 'geoCodingWidget'){
		}
		else if(value == 'tocPopupWidget'){
		}
		else if(value == 'layerStyleControlWidget'){
		}
		else if(value == 'analysisSumryWidget'){
		}
		else if(value == 'analysisLcWidget'){
		}
		else if(value == 'analysisPttrnWidget'){
		}
		else if(value == 'analysisProximityWidget'){
		}
		else if(value == 'analysisManageWidget'){
		}
		else if(value == 'analysisCoordWidget'){
		}
		else if(value == 'overlapWidget'){
		}
		else if(value == 'landInfoWidget'){
		}
		else if(value == 'cvgControlWidget'){
		}
		else if(value == 'illgCnstWidget'){
		}
		else{
			app.oui[value]().build();
		}
	})
	app.oui.tocWidget().build();
	app.oui.popupWidget().build();
	app.oui.administrativeDistrictSearchWidget().build();
	app.oui.addressSearchWidget().build();
	app.oui.spatialAnalysisWidget().build();
	app.oui.scaleControlWidget().build();
	app.oui.zoomControlWidget().build();
	am4core.addLicense("CH243704829");
	if(webmapWidgetList.includes('clearControlWidget')){
		app.widget.clearControlWidget.addToClearFunction(app.widget.addressSearchWidget.clear);
		app.widget.clearControlWidget.addToClearFunction(app.widget.administrativeDistrictSearchWidget.clear);
	}
	if(userMapId == '' && userId && administzoneCode){
		app.cmm.api.layer.getAdminist({code : administzoneCode, targetSrid : mainProjection.split(':')[1]}).then(function(res){
			let homeControlOption = {center : [Number(res.result[0].x) , Number(res.result[0].y)] };
			if(administzoneCode.substring(2) == '000'){
				map.setCenter(homeControlOption.center);
				map.setZoom(11);
				homeControlOption = {...homeControlOption,
						zoom : 11};
				app.oui.zoomControlWidget().changeOptions({zoom : 11})
			}
			else{
				map.setCenter(homeControlOption.center);
				map.setZoom(13);
				homeControlOption = {...homeControlOption,
						zoom : 13};
				app.oui.zoomControlWidget().changeOptions({zoom : 13})
			}
			if(app.webmap.data.webmapView.userMapInfo.userMapScopeValue){
				homeControlOption = {
						center : [JSON.parse(app.webmap.data.webmapView.userMapInfo.userMapScopeValue).mapCenter.x , JSON.parse(app.webmap.data.webmapView.userMapInfo.userMapScopeValue).mapCenter.y],
						zoom : JSON.parse(app.webmap.data.webmapView.userMapInfo.userMapScopeValue).mapCenter.zoom
				}
				app.oui.zoomControlWidget().changeOptions({zoom : JSON.parse(app.webmap.data.webmapView.userMapInfo.userMapScopeValue).mapCenter.zoom})
			}
			app.oui.homeControlWidget().changeOption(homeControlOption);
		})
	}
	
})();
