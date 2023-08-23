app = window.app || {};
app.oui = app.oui || {};
((app) => {
	let api = app.oui.api = {};

	api.commonCodeApi = oui.CommonCodeApi(app.oui.client.layerClient, { crtfckey: crtfckey });

	api.layerDownloadApi = oui.LayerDownloadApi(app.oui.client.noticeClient, { crtfckey: crtfckey });

	api.columnInfoApi = oui.ColumnInfoApi(app.oui.client.layerClient, { lyrId: 'LR0000030049', userId: userId, crtfckey: crtfckey });

	api.cqlInfoApi = oui.CqlInfoApi(app.oui.client.layerClient, { userMapId: userMapId, userId: userId, crtfckey: crtfckey });

	api.addressApi = oui.AddressApi(app.oui.client.addressClient, {
		projection: mainProjection.split(':')[1],
		crtfckey: crtfckey
	});

	api.administApi = oui.AdministApi(app.oui.client.administClient, {
		projection: mainProjection.split(':')[1],//사용 좌표계
		crtfckey: crtfckey
	});

	api.mapApi = oui.MapApi(app.oui.client.mapClient, { crtfckey: crtfckey });

	api.tocApi = oui.TOCApi(app.oui.client.layerClient, { userMapId: userMapId, userId: userId, crtfckey: crtfckey });

	api.uploadApiOptions = {
		sendOpertNtcnInfo: app.cmm.process.receiveOpertNtcnInfo,
		userId: userId,
		crtfckey: crtfckey
	};

	api.uploadApi = oui.UploadApi(app.oui.client.uploadClient, api.uploadApiOptions);

	api.geocodingApiOption = {
		sendOpertNtcnInfo: app.cmm.process.receiveOpertNtcnInfo,
		crtfckey: crtfckey
	}

	api.geocodingApi = oui.GeocodingApi(app.oui.client.geocodingClient, api.geocodingApiOption);

	api.noticeApi = oui.NoticeApi(app.oui.client.noticeClient, {
		userId: userId,
		crtfckey: crtfckey
	});

	// 레이어 api
	api.layerApi = oui.LayerApi(app.oui.client.layerClient, {
		userId: userId,
		userMapId: userMapId,
		sendLayerInfo: app.oui.process.getAddLayerInfo,
		crtfckey: crtfckey
	});

	//분석 api
	api.analysisApi = oui.AnalysisApi(app.oui.client.analysisClient, {
		userId: userId,
		projection: mainProjection.split(':')[1],
		//작업일련번호를 리턴해줘야할 함수
		sendOpertNtcnInfo: app.cmm.process.receiveOpertNtcnInfo,
		crtfckey: crtfckey,
	});

	//좌표변환 api
	api.coordApi = oui.CoordApi(app.oui.client.coordClient, {
		userId: userId,
		crtfckey: crtfckey
	});


	api.layerSearchTypeApi = oui.LayerApi(app.oui.client.layerClient, {
		crtfckey: crtfckey,
		groupCode: 'MPD003'
	});

	//레이어 업로드 공통 코드 api
	api.layerUploadCodeOption = {
		paramList: [
			{ params: { groupCode: 'MPD003' }, type: 'detail' },
			{ params: { groupCode: 'MPD007' }, type: 'detail' },
			{ params: { groupCode: 'MPD025' }, type: 'detail' },
		],
		categoryId: 'layerUpload',
		crtfckey: crtfckey
	};
	api.layerUploadCodeApi = oui.CommonCodeApi(app.oui.client.commonCodeClient, api.layerUploadCodeOption);
	api.basemapApi = oui.BasemapApi(app.oui.client.basemapClient, { crtfckey: crtfckey });
	api.cctvApi = oui.CCTVApi(app.oui.client.cctvClient, { apiKey: '46d62a1ce207492aa55ee90017079639', crtfckey: crtfckey });
	api.bookmarkApi = oui.BookmarkApi(app.oui.client.bookmarkClient, { userId: userId, crtfckey: crtfckey });

	api.getNavInfo = (callback) => {
		//ajax 통신으로 
		//레이어 그룹목록 가져오기
		//usserId
		let _userId = $('#loginUserId').val();
		let _param = {
			pageIndex: 1,
			pageSize: 10000,
			othbcAt: "Y"
		}
		if (_userId != "") {
			_param.userId = _userId;
		}
		let layerGroupList = app.cmm.api.layer.getLayerGroupList(_param).responseJSON != undefined ? 
				app.cmm.api.layer.getLayerGroupList(_param).responseJSON.result.lyrGroupList
				: [];
		let navList = [
			// {
			//   title: '워크플로우',
			//   options: { holdDataSeCode: '9999' }
			// },
			//            {
			//              title: '전체',
			//              options: { holdDataSeCode: '0' }
			//            },
			{
				title: '국가공간정보',
				options: { holdDataSeCode: '9' },
				//subNavList: ''
			},
			{
				title: '사용자데이터',
				options: { holdDataSeCode: '1' }
			}, {
				title: '공유데이터',
				options: { holdDataSeCode: '2' },
				subNavList: [
					{
						title: '전체 공유',
						options: { subHoldDataSeCode: '21' }
					},
					{
						title: '기관 공유',
						options: { subHoldDataSeCode: '22' }
					},
					{
						title: '사용자 공유',
						options: { subHoldDataSeCode: '23' }
					}
				]
			}
		];
		if (layerGroupList.length > 0) {
			layerGroupList = layerGroupList.map(item => {
				return {
					title: item.groupNm,
					options: { subHoldDataSeCode: item.lyrGroupId }
				};
			});
			navList.map(item => {
				if (item.title == "국가공간정보") {
					item.subNavList = layerGroupList;
				}
				return item;
			});
		}
		callback({ navList: navList, initNavValue: _userId ? '1' : '9' });
	};
})(app);