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
			overlapList : { pageSize : 10 },
			illgCnstInfoTotalList : { pageSize : 5 }	
						  
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
			result:{},
			pageInfo:{
				totalCount:0
			},
		},
		overlapOrderList:[]
		,
		illgCnstInfoTotalList : {
			list:{},
			result:{},
			pageInfo:{
				totalCount:0
			},
		},
		landInfoList: [
			{
				landColumnName: '지번'
				, landColumnId: 'jibun'
				, landGubn: "land"
			},
			{
				landColumnName: '필지고유번호'
				, landColumnId: 'pnu'
				, landGubn: "land"
			},
			{
				landColumnName: '지목'
				, landColumnId: 'a12'
				, landGubn: "land"
			},
			{
				landColumnName: '대장구분명'
				, landColumnId: 'a4'
				, landGubn: "land"
			},
			{
				landColumnName: '지번지목부호'
				, landColumnId: 'a6'
				, landGubn: "land"
			},
			{
				landColumnName: '개별공시지가'
				, landColumnId: 'a9'
				, landGubn: "land"
			},
			{
				landColumnName: '이전건물관리번호'
				, landColumnId: 'bdMgtSn'
				, landGubn: "build"
			},
			{
				landColumnName: '건물용도코드'
				, landColumnId: 'bdtypCd'
				, landGubn: "build"
			},
			{
				landColumnName: '기초구역번호'
				, landColumnId: 'bsiZonNo'
				, landGubn: "build"
			},
			{
				landColumnName: '건물일련번호'
				, landColumnId: 'bulManBo'
				, landGubn: "build"
			},
			{
				landColumnName: '건물본번'
				, landColumnId: 'buldMnnm'
				, landGubn: "build"
			},
			{
				landColumnName: '건물부번'
				, landColumnId: 'buldSlno'
				, landGubn: "build"
			},
			{
				landColumnName: '건물명'
				, landColumnId: 'buldNm'
				, landGubn: "build"
			},
			{
				landColumnName: '상세건물명'
				, landColumnId: 'buldNmDc'
				, landGubn: "build"
			},
			{
				landColumnName: '지상층수'
				, landColumnId: 'groFloCo'
				, landGubn: "build"
			},
			{
				landColumnName: '지하층수'
				, landColumnId: 'undFloCo'
				, landGubn: "build"
			},
			{
				landColumnName: '이동일자'
				, landColumnId: 'mvmnDe'
				, landGubn: "build"
			},
			{
				landColumnName: '이동사유'
				, landColumnId: 'mvmnResn'
				, landGubn: "build"
			},
			{
				landColumnName: '고시일자'
				, landColumnId: 'ntfcDe'
				, landGubn: "build"
			},
			{
				landColumnName: '도로명코드'
				, landColumnId: 'rnCd'
				, landGubn: "build"
			},
			{
				landColumnName: '시군구코드'
				, landColumnId: 'sigCd'
				, landGubn: "build"
			},

		],
		landInfoCheckedList: {
			'buildColumn_bdMgtSn':true,
			'buildColumn_bdtypCd':true,
			'buildColumn_bsiZonNo':true,
			'buildColumn_bulManBo':true,
			'buildColumn_buldMnnm':true,
			'buildColumn_buldSlno':true,
			'buildColumn_buldNm':true,
			'buildColumn_buldNmDc':true,
			'buildColumn_groFloCo':true,
			'buildColumn_undFloCo':true,
			'buildColumn_mvmnDe':true,
			'buildColumn_mvmnResn':true,
			'buildColumn_ntfcDe':true,
			'buildColumn_rnCd':true,
			'buildColumn_sigCd':true,
			'landColumn_jibun':true,
			'landColumn_pnu':true,
			'landColumn_a12':true,
			'landColumn_a4':true,
			'landColumn_a6':true,
			'landColumn_a9':true,
		}
	}

})(app);
