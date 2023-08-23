app = window.app || {};
app.webmap = app.webmap || {};

((app) => {
	
	app.webmap.data = {
		param:{
			lyr:{},
			share:{lyrId : "",
				   ownerId:""	
			}
		}, 
		//웹맵 상세
		webmapView : {   
			userMapInfo : {
				crtfckey : "",
				imageFileData : "",
				originImageFileData : "",
				imageFileInfo : "",
				pblonsipScopeSeCode : "",
				registDt : "",
				registerId : "",
				trgetSchema : "",
				updtDt : "",
				updusrId : "",
				usePblonsipSeCode : "",
				useSttusSeCode : "",
				userMapCn : "",
				userMapId : "",
				userMapNcm : "",
				userMapScopeValue : "",
				userMapSj : "",
			},
			tocGroup : {
				userMapSj: "",
		        userMapCn: "",
		        userMapScopeValue: "",
		        userMapId: "",
		        lyrGroupSn: 0,
		        lyrSortOrdr: 0,
		        lyrGroupLevelCode: "",
		        lyrGroupId: "",
		        upperGroupId: "",
		        lyrGroupNm: "",
		        lyrGroupSeCode: "",
		        lyrId: "",
		        registerId: "",
		        registDt: "",
		        updusrId: "",
		        updtDt: "",
		        userId: "",
		        lyrFomSeCode: "",
		        symbolCndCn: "",
		        symbolUpdtDt: "",
		        filterCndCn: "",
		        filterUpdtDt: "",
		        onOffAt: "",
		        onOffUpdtDt: "",
		        cntntsSn: "",
		        jobClCode: "",
		        lyrNm: "",
		        lyrClCode: "",
		        lyrClSeCode: "",
		        lyrPosesnSeCode: "",
		        lyrTySeCode: "",
		        svcTySeCode: "",
		        cntmSeCode: "",
		        usePblonsipSeCode: "",
		        useSttusSeCode: "",
		        holdDataId: "",
		        lyrDc: ""
			},
			shareList : {
				totalUserMapShareCount: 0,
			    userMapShareInstCount: 0,
			    userMapShareInstList: [],
			    userMapShareList: [],
			    userMapShareUserCount: 0,
			    userMapShareUserList: [],
			    list:[]
			},
			lyrList : []
				
		},
		// 웹맵
		webmapList:{  
			pageInfo : {
				fullShareUserMapCount : 0,
				noneShareUserMapCount : 0,
				partialShareUserMapCount: 0,
				totalUserMapCount:0,
				totalPageIndex:0
			},
			list:{},
		},
		// 페이징
		paginationInfo : { 
			webmapList : { pageSize : 10 },// 하단에 보이는 페이지 개수,
			overlapList : { pageSize : 10 }
						  
		},
		//웹레이어 상세 
		webLyr:{
		     	lyrId :  "" ,
			    cntntsSn : "",
			    jobClCode :  "" ,
			    lyrNm :  "" ,
			    lyrClCode :  "" ,
			    lyrClSeCode :  "" ,
			    lyrPosesnSeCode :  "" ,
			    lyrTySeCode :  "" ,
			    svcTySeCode :  "" ,
			    cntmSeCode :  "" ,
			    usePblonsipSeCode :  "" ,
			    useSttusSeCode :  "" ,
			    holdDataId : "",
			    lyrDc :  "" ,
			    mapUrl : "",
			    mapUrlParamtr : "",
			    xyOrdrNrmltAt : "",
			    registerId :  "",
			    registDt :  "" ,
			    updusrId :  "" ,
			    updtDt :  "",
			    base64:"",
			    shareList : [],
			    instList:[],
			    userList:[]
		},
		//그리기,측정위젯 구분
		drawWidgetBool : true,
		//중첩영상 목록
		overlapLayerTotalList : {
			list:{},
			pageInfo:{
				totalCount:0
			},
		},
		overlapOrderList:[]
		,
		landInfoList: [
			{
				landColumnName: '지목'
				, landColumnId: 'jimok'
				, landGubn: "land"
			},
			{
				landColumnName: '면적'
				, landColumnId: 'parea'
				, landGubn: "land"
			},
			{
				landColumnName: '대장 소유'
				, landColumnId: 'ownerNm'
				, landGubn: "land"
			},
			{
				landColumnName: '공유인 수'
				, landColumnId: 'shrCnt'
				, landGubn: "land"
			},
			{
				landColumnName: '토지이동일자'
				, landColumnId: 'movde'
				, landGubn: "land"
			},
			{
				landColumnName: '토지등급'
				, landColumnId: 'grdNm'
				, landGubn: "land"
			},
			{
				landColumnName: '공시지가'
				, landColumnId: 'jigaIlp'
				, landGubn: "land"
			},
			{
				landColumnName: '건물명'
				, landColumnId: 'bldNm'
				, landGubn: "build"
			},
			{
				landColumnName: '기초구역번호'
				, landColumnId: 'bsiZonNo'
				, landGubn: "build"
			},
			{
				landColumnName: '건물본번'
				, landColumnId: 'bldMnnm'
				, landGubn: "build"
			},
			{
				landColumnName: '건물부번'
				, landColumnId: 'bldSlno'
				, landGubn: "build"
			}
		],
		landInfoCheckedList: {
			'buildColumn_bldNm':true,
			'buildColumn_bsiZonNo':true,
			'buildColumn_bldMnnm':true,
			'buildColumn_bldSlno':true,
			'landColumn_jimok':true,
			'landColumn_parea':true,
			'landColumn_ownerNm':true,
			'landColumn_shrCnt':true,
			'landColumn_movde':true,
			'landColumn_grdNm':true,
			'landColumn_jigaIlp':true,
		}
	}

})(app);
