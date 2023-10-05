app = window.app || {}; 
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
let checkboxNmArray = [];
let droneMulipolygonArry = [];
let droneLayerList = [];
let droneFeatureList = [];
let dateSelChek=false;
let droneClickCheck=false;
let droneDrawCheck=false;
((app) => {

	app.webmap.components.overlapListModalVue = new Vue({
		el: "#overlapListModal",
		data: {
			mode: "", // map or app 구분하여 사용.
			currentPageNo: 1,
			data: app.webmap.data,
			checkWebapp: app.webapp != undefined ? true : false,
			styleObj: {
				display: "none",
			},
		},
		mounted: function () {
			$("#overlapListModal").draggable({
				containment: 'parent',
				'scroll': false,
				handle: '.head'
			});
		},
		filters : {
			yyyyMMdd : function(value){
				return value.substring(0,10);
			}
		},
		methods: {
			show: function (mode) {
				this.mode = mode == undefined ? this.mode : mode;
				this.styleObj.display = "block";
			},
			hide: function () {
				this.styleObj.display = "none";
			},
			pagination: function (page) {
				this.currentPageNo = page;
				//this.search();
			},
			
			filters: function (orgList) {
				
				let yyyyMmVal = "";
				let ctpvVal = "";
				let sggVal = "";
				let emdVal = "";
				
				yyyyMmVal = $("#yyyyMMSel").val();
				ctpvVal = $("#ctpvSel option:selected").text();
				sggVal = $("#sggSel option:selected").text();
				emdVal = $("#emdSel option:selected").text();
			
				let filteredData;
				
				
				 if(yyyyMmVal != ''){
					filteredData = orgList.filter(item => {
						  return (
								item.potogrfBgnde.toLowerCase().includes(yyyyMmVal.toLowerCase())
						  );
					
					});
				 }else{
					 filteredData = orgList;
					 
				 }
				 if(ctpvVal != '' && ctpvVal != '시/도'){
					filteredData = filteredData.filter(item => {
						if(item.potogrfLegaldongNm != null ){
						  return (
								item.potogrfLegaldongNm.toLowerCase().includes(ctpvVal.toLowerCase())
						  );
						}
					});
				 }
				 if(sggVal != '' && sggVal != '시/군/구'){
					 filteredData = filteredData.filter(item => {
						if(item.potogrfLegaldongNm != null ){
						  return (
								item.potogrfLegaldongNm.toLowerCase().includes(sggVal.toLowerCase())
						  );
						 }					
					}); 
				 }
				 if(emdVal != '' && emdVal != '읍/면/동'){
					 filteredData = filteredData.filter(item => {
						 if(item.potogrfLegaldongNm != null ){
						  return (
								item.potogrfLegaldongNm.toLowerCase().includes(emdVal.toLowerCase())
						  );
						 }
					}); 
				 }
		
				return filteredData;
				
			},
			
			hasDuplicates: function (arr) {
				
				for (let i = 0; i < arr.length; i++) {
				    if (arr.indexOf(arr[i]) !== i) {
				      return true; // 중복된 값이 존재함
				    }
				  }
				  return false; // 중복된 값이 없음
				
				
			},
			setDataList: function (pageNum, countPerPage, showPageCnt) {
				
				let overlapDroneListJsonResult = app.webmap.components.overlapListModalVue.data.overlapLayerTotalList;
				let filterVal = app.webmap.components.overlapListModalVue.filters(overlapDroneListJsonResult);
				const filterData = _.slice(filterVal,(pageNum - 1)* countPerPage, pageNum * countPerPage);
		 
				$('#droneList').html('');
				for (var keySe in filterData) {
					let serviceCodeResultString = "";
					let serviceCodeStr		  = "";
						serviceCodeStr		  = filterData[keySe].serviceCode;
					let potogrfNmStr 		  = filterData[keySe].potogrfNm;
					let potogrfLegaldongNmStr = filterData[keySe].potogrfLegaldongNm;
					let potogrfBgndeStr		  = filterData[keySe].potogrfBgnde;
					let potogrfEnddeStr		  = filterData[keySe].potogrfEndde;
					let chrgInsttNmStr		  = filterData[keySe].chrgInsttNm;
					let messageStr			  = filterData[keySe].message;
					if(serviceCodeStr != null){
					  	serviceCodeResultString = serviceCodeStr.replace("uav:", "");
					    $('#droneList').append(`<tr>
                             <td> 
                                 <div class="checkbox">
                                     <input type="checkbox" class="overlapCheck" data-value="`+potogrfNmStr+`" id=`+serviceCodeResultString+`  >
                                     <label for=`+serviceCodeResultString+`></label>
                                 </div>
                             </td>
                             <td class="infoDrone">`+potogrfNmStr+`<span class="tooltiptext">`+chrgInsttNmStr+'<br>'+potogrfLegaldongNmStr+`</span></td>
                             <td>`+potogrfBgndeStr+`</td>
                         </tr>`);
					}
					
				
				   
				}
				//기존 띄워져 있던 레이어 목록 삭제 odf 명칭 odf-overlap-basemapid
//				$.each(map.getODFLayerList().filter(v => v.getODFId().indexOf('odf-overlap') != -1), function(index,item){
//					map.removeODFLayer(item.getODFId());
//				});
				let checkDroneVal = false;
				$.each($('#droneList').find('input'), function(index,item) {
					
					let checkboxId = $(this).attr('id');
				
					for(let z=0; checkboxNmArray.length>z; z++){
						if(checkboxNmArray[z] == checkboxId){
							$("#"+checkboxId).attr('checked', true);
						}
					}
					
					let param = {};
					param = {"serviceCode":checkboxId};
					let droneMulipolygon = "";
					
					app.cmm.api.overlap.getFeatureInfoCall(param).then(function (result) {
						
						let featureInfoList = JSON.parse(result.overlapDroneFeatureInfoList);
						let getResult = JSON.parse(featureInfoList.result);
						let getMessage = getResult.message;
						
						if(getMessage == ''){//데이터가 있을때 
							
							droneMulipolygon = getResult.footprintWkt;
							droneMulipolygonArry.push(droneMulipolygon);
							let droneFeature = odf.FeatureFactory.fromWKT(droneMulipolygon,null);
							
							let droneLayer = odf.LayerFactory.produce('geojson', {
								 data: {
									 type: "FeatureCollection",
									 features: [{
										 type: "Feature",
										 geometry: {
											 type: "Point",
											 coordinates: [0, 0],
										 }
									 }]
								 }
							 });
							droneLayer.addFeature(droneFeature);
							droneFeature.setId(`odf-overlap-feature-${checkboxId}`)
							droneLayer.setMap(map);
							map.removeODFLayer(`odf-overlap-${checkboxId}`);
							 
							droneLayer.setODFId(`odf-overlap-${checkboxId}`);
							map.setZIndex(`odf-overlap-${checkboxId}`, 10-index);
							droneFeatureList.push(droneFeature);
							droneLayerList.push(droneLayer);
							let pStyle = odf.StyleFactory.produce(
									  {
									      "geometryType": "free",
									      "name": "기본 스타일",
									      "fill": {
										        "color": [175,247,255,0.4
										        ]
										    },
										    "stroke": {
										        "color": [
										            175, 247, 255
										        ],
									          "width": 2
									      }
									  } 
									);
							droneLayer.setStyle(pStyle);
							
							let reDroneMulipolygon = droneMulipolygon.replace("MULTIPOLYGON(((", "");
			                let char = ",";
			                let indexVal = reDroneMulipolygon.indexOf(char);
		                    let parts = droneFeature.getCenterPoint();
		                    $("#"+checkboxId).data("center", Number(parts[0])+" "+Number(parts[1]));
		                   
			                if (indexVal !== -1) {
			                   let centerMove = {center : [Number(parts[0]) , Number(parts[1])] }; 
				   			   map.setCenter(centerMove.center);
				   			   map.setZoom(11); 
			                } else {
			               	   let centerMove = {center : [276179.88560667867, 413632.9594010007] };
				   			   map.setCenter(centerMove.center); 
				   			   map.setZoom(11);
			                }
							
			                checkDroneVal = true;
							
					   	}else{
					   		$("#"+checkboxId).data("center", 276179.88560667867+" "+413632.9594010007);
					   		let centerMove = {center : [276179.88560667867, 413632.9594010007] };
					   		map.setCenter(centerMove.center);
					   		map.setZoom(11);
					   	}
					
					}); 
					    
				});
				
				
			},
			setDataPaging: function (pageNum, countPerPage, showPageCnt) {
				
				  const currentPage = pageNum;
				  let overlapDroneListJsonResult = app.webmap.components.overlapListModalVue.data.overlapLayerTotalList;
				  let filterVal = app.webmap.components.overlapListModalVue.filters(overlapDroneListJsonResult);
				  const totalPage = Math.floor(filterVal.length / countPerPage) + (filterVal.length % countPerPage == 0 ? 0 : 1);
				
				  $('#first_page').show();
				  $('#prev_page').show();
				  $('#next_page').show();
				  $('#last_page').show();
				  
				  
				  if (currentPage <= showPageCnt) {
				    $('#first_page').hide();
				    $('#prev_page').hide();
				  }
				  if (
				    totalPage <= showPageCnt ||
				    Math.floor((currentPage - 1) / showPageCnt) * showPageCnt + showPageCnt + 1 > totalPage
				  ) {
				    $('#next_page').hide();
				    $('#last_page').hide();
				  }
	
				  let start = Math.floor((currentPage - 1) / showPageCnt) * showPageCnt + 1;
				  let sPagesHtml = '';
				  for (const end = start + showPageCnt; start < end && start <= totalPage; start++) {
				    sPagesHtml += `<a href="#">`+start+`</a>`;
				  }
				  $("#pagesNum").html(sPagesHtml);
			
			},
			
			addrInit: function () {
				let param = {}
					param = {"addrGubun":"ctpv"};
				app.cmm.api.overlap.addrCall(param).then(function (result) {
					//1.시/도 축출
					let addrCtpvJson = JSON.parse(result.addrList);
					
					//2.select box 생성
					const ctpvSelDate = document.getElementById('ctpvSel');
					$("#ctpvSel").append("<option value='' data-value='' >시/도</option>");
					for (let i = 0; addrCtpvJson.result.length > i; i++) {
						
					  const optionCtpv = document.createElement('option');
					  const cdVal = addrCtpvJson.result[i].cd;
					  const korNmVal = addrCtpvJson.result[i].korNm;
					  optionCtpv.textContent = korNmVal;
					  optionCtpv.value = cdVal;
					  ctpvSelDate.append(optionCtpv);
						
					}
					
					const sggSelDate = document.getElementById('sggSel');
					const emdSelDate = document.getElementById('emdSel');
					
					$("#sggSel").append("<option value=''>시/군/구</option>");
					$("#emdSel").append("<option value=''>읍/면/동</option>");
					
					$("#ctpvSel").on('change', function() {
						let param = {}
						let ctpvVal = $(this).val();
						
						if(ctpvVal == ''){
							$("#sggSel").html('');
							$("#emdSel").html('');
							$("#sggSel").append("<option value=''>시/군/구</option>");
							$("#emdSel").append("<option value=''>읍/면/동</option>");
							return;  
						}
						param = {"addrGubun":"sgg","ctprvnCd":ctpvVal};
					   
						app.cmm.api.overlap.addrCall(param).then(function (result) {
							//1.시/군/구 축출
							let addrSggJson = JSON.parse(result.addrList);
							
							$("#sggSel").html('');
							$("#sggSel").append("<option value=''>시/군/구</option>");
							for (let i = 0; addrSggJson.result.length > i; i++) {
								
							  const optionSgg = document.createElement('option');
							  const cdVal = addrSggJson.result[i].cd;
							  const korNmVal = addrSggJson.result[i].korNm;
							  
							  optionSgg.textContent = korNmVal;
							  optionSgg.value = cdVal;
							  $("#sggSel").append(optionSgg);
							}
							
						});
						
					});
					
					$("#sggSel").on('change', function() {
						let param = {}
						let sggVal = $(this).val();
						
						if(sggVal == ''){
							$("#emdSel").html('');
							$("#emdSel").append("<option value=''>읍/면/동</option>");
							return;  
						}
						param = {"addrGubun":"emd","sigCd":sggVal};
					   
						app.cmm.api.overlap.addrCall(param).then(function (result) {
							//1.읍/면/동 축출
							let addrEmdJson = JSON.parse(result.addrList);
							
							$("#emdSel").html('');
							$("#emdSel").append("<option value=''>읍/면/동</option>");
							for (let i = 0; addrEmdJson.result.length > i; i++) {
								
							  const optionEmd = document.createElement('option');
							  const cdVal = addrEmdJson.result[i].cd;
							  const korNmVal = addrEmdJson.result[i].korNm;
							  
							  optionEmd.textContent = korNmVal;
							  optionEmd.value = cdVal;
							  $("#emdSel").append(optionEmd);
							}
							
						});
						
					});
					
				})
			},
			
			pagesNumGo: function (clickPage,countPerPage, showPageCnt) {
				
				app.webmap.components.overlapListModalVue.setDataList(clickPage, countPerPage, showPageCnt);
			},
			
			
			initSetting: function () {
				map.removeODFLayer('odf-layer-draw-unique');
				let layerListLen = map.getODFLayerList().length;
				let odfIdArray = [];
				for(let i=0; layerListLen>i; i++){
					let layerOdfId = map.getODFLayerList()[i].getODFId();
					let searchString = "df-overlap-";
					
		    		if (layerOdfId.includes(searchString)) {
		    			odfIdArray.push(layerOdfId);
		    		} 
				}   
				
				for(let j=0; odfIdArray.length>j; j++){
					map.removeODFLayer(odfIdArray[j]);
				}
			},
			
			init: function () {
				    
				app.webmap.components.overlapListModalVue.initSetting();
				
				let param = {};
				$.each($('#droneList').find('input'), function(index,item) {
					
					let checkboxId = $(this).attr('id');
					for(let z=0; checkboxNmArray.length>z; z++){
						if(checkboxNmArray[z] == checkboxId){
							$("#"+checkboxId).attr('checked', false);
						}
					}
					checkboxNmArray=[];
				});
				
				
				app.cmm.api.overlap.listCall(param).then(function (result) {
					const countPerPage = 4;
					const showPageCnt = 5; 
					let overlapDroneListJson = JSON.parse(result.overlapDroneList);
					let overlapDroneListJsonResult = JSON.parse(overlapDroneListJson.result);
					if(!dateSelChek){
						//1.날짜 축출
						let potogrfBgnde = [];
						for (var key in overlapDroneListJsonResult) {
							let dateStr = overlapDroneListJsonResult[key].potogrfBgnde;
							let [year, month, day] = dateStr.split("-");
							let dateStrRe = year+month;
							
							potogrfBgnde.push(dateStrRe);
						    
						}
						//2.중복제거
						let resultFilter = potogrfBgnde.filter((v, i) => potogrfBgnde.indexOf(v) === i);  
				
						
						//3.최신순으로 sort
						resultFilter.sort(function(a, b)  {
						  return b - a;
						});
						
						//4.select box 생성
						const appendSelectDate = document.getElementById('yyyyMMSel');
						$("#yyyyMMSel").append("<option value=''>YYYY-MM</option>");
						
						for (let i = 0;  i<resultFilter.length; i++) {
							
							  const option = document.createElement('option');
							  const yearVal = resultFilter[i].slice(0, 4);
							  const monthVal = resultFilter[i].slice(4, 6);
							  
							  option.textContent = yearVal+"년 "+monthVal+"월";
							  option.value = yearVal+"-"+monthVal;
							  appendSelectDate.append(option);
						}  
						dateSelChek = true;
					}
					
					app.webmap.components.overlapListModalVue.data.overlapLayerTotalList = overlapDroneListJsonResult;
					
					app.webmap.components.overlapListModalVue.setDataList(1, countPerPage, showPageCnt);
					app.webmap.components.overlapListModalVue.setDataPaging(1, countPerPage, showPageCnt);
					
					
					$(document).on('click', '.pagination>button', function() {
						
					    const id = $(this).attr('id');
					    //const totalPage = Math.floor(overlapDroneListJsonResult.length / countPerPage) + (overlapDroneListJsonResult.length % countPerPage == 0 ? 0 : 1);
					    let filterVal = app.webmap.components.overlapListModalVue.filters(overlapDroneListJsonResult);
						const totalPage = Math.floor(filterVal.length / countPerPage) + (filterVal.length % countPerPage == 0 ? 0 : 1);
					    if (id == 'first_page') {
					     
					      app.webmap.components.overlapListModalVue.setDataList(1, countPerPage, showPageCnt);
						  app.webmap.components.overlapListModalVue.setDataPaging(1, countPerPage, showPageCnt);
					      
					    } else if (id == 'prev_page') {
					      let arrPages = [];
					      $("#pagesNum>a").each(function(idx, item) {
					        arrPages.push(Number($(this).text()));
					      });
					      
					      const prevPage = _.min(arrPages) - showPageCnt;
					   
					      app.webmap.components.overlapListModalVue.setDataList(prevPage, countPerPage, showPageCnt);
						  app.webmap.components.overlapListModalVue.setDataPaging(prevPage, countPerPage, showPageCnt);
					      
					    } else if (id == 'next_page') {
					      let arrPages = [];
					      $("#pagesNum>a").each(function(idx, item) {
					        arrPages.push(Number($(this).text()));
					      });
					      
					      const nextPage = _.max(arrPages) + 1;
					      app.webmap.components.overlapListModalVue.setDataList(nextPage, countPerPage, showPageCnt);
						  app.webmap.components.overlapListModalVue.setDataPaging(nextPage, countPerPage, showPageCnt);
					    } else if (id == 'last_page') {
					      const lastPage = Math.floor((totalPage - 1) / showPageCnt) * showPageCnt + 1;
					      
					      app.webmap.components.overlapListModalVue.setDataList(lastPage, countPerPage, showPageCnt);
						  app.webmap.components.overlapListModalVue.setDataPaging(lastPage, countPerPage, showPageCnt);
					    }
					  });
					
					//오더 순서리스트 갱신
					if (app.webmap.data.overlapOrderList.length == 0) {

						$('#overlapOrder-tbody').html(`	  
									<div class="list">
									    <p class="title">선택된 중첩 영상이 없습니다.</p>
									</div>
									  `);
						
					} else {
						$('#overlapOrder-tbody').html('');
						app.webmap.components.overlapListModalVue.data.overlapOrderList = app.webmap.data.overlapOrderList;
						$.each(app.webmap.data.overlapOrderList, function(index,item){

							let html = `
							<div class="list">
								<p class="title">${item.lapName}</p>
								<input type="hidden" data-value="${item.lapId}" value="${item.lapName}"/>
								<div class="btns">
									<button type="button" class="link"></button>
									<button type="button" class="delete"></button>
								</div>
							</div>
							`;
							$('#overlapOrder-tbody').append(html);
						});
					}
				})
				
				this.show();
				
				//sortable
				$("#overlapOrder-tbody").sortable({
					stop : function(event,ui){
						app.webmap.components.overlapListModalVue.setting();
					}
				});
				
			},
			
			
			activePage: function (page) {
				if (app.webmap.data.paginationInfo.overlapList.currentPageNo == page) return true;
			},
			setting : function () {
				let zIndexArry = [];
				//callConfirm("설정 확인 알림", '설정을 완료하시겠습니까?', (result) => {
					if ($('#overlapOrder-blank-td').length > 0) {
						orderList = [];
					} else {
					 
						//레이어 순위 변경
						let nameList = [];
						let zIndexArry = [];
						let odfLayerCnt = map.getODFLayerList().length;
						
						//for(let q=0; odfLayerCnt>q; q++){
						for (let q = odfLayerCnt-1; q >= 0; q--) {
							
				    		let odfIdMove = map.getODFLayerList()[q].getODFId();
				    		let odfZIndex = map.getODFLayerList()[q].getZIndex();
				    		
				    		let searchString = "move_";
				    		let newOdfIdMove = ""
				    		if (odfIdMove.includes(searchString)) {
				    			
				    			zIndexArry.push(odfZIndex);
				    		}
				    	}
						$.each($('#overlapOrder-tbody').find('input'), function(index,item) {
							nameList.push({lapId:$(item).data('value'),lapName:item.value});
							
							let param ={};
							param.bcrnMapId = $(item).data('value');      
							let idValMove = "move_"+item.value;
						
							map.setZIndex(`odf-overlap-${idValMove}`, zIndexArry[index]);
							
						});
						app.webmap.data.overlapOrderList = nameList;
					}
			
			},
			drawEndRe: function(extent_){
				const countPerPage = 4;
				const showPageCnt = 5;
				let param = {};
				let minX = 0;
				let minY = 0;
				let maxX = 0;
				let maxY = 0;
				minX = extent_[0];
				minY = extent_[1];
				maxX = extent_[2];
				maxY = extent_[3];
				param = {"minX":minX, "minY":minY, "maxX":maxX,"maxY":maxY };
		
				if(!droneClickCheck){
					app.cmm.api.overlap.getDroneEnvelopCall(param).then(function (result) {
						let overlapDroneFeatureInfoByEnvelopJson = JSON.parse(result.overlapDroneFeatureInfoByEnvelop);
						let overlapDroneFeatureInfoByEnvelopJsonResult = JSON.parse(overlapDroneFeatureInfoByEnvelopJson.result);
						app.webmap.components.overlapListModalVue.data.overlapLayerTotalList = "";
						app.webmap.components.overlapListModalVue.data.overlapLayerTotalList = overlapDroneFeatureInfoByEnvelopJsonResult;
						app.webmap.components.overlapListModalVue.setDataList(1, countPerPage, showPageCnt);
						app.webmap.components.overlapListModalVue.setDataPaging(1, countPerPage, showPageCnt);
						
					});
				}
				
				    
			},
			
			controlBox: function(){
				droneClickCheck = false;
				map.removeODFLayer('odf-overlap-drone');
				let drawControl = new odf.DrawControl();
			   	drawControl.removeMap();
				drawControl.setMap(map,false); 
				drawControl.drawDroneBox();
			},

		}

	});

})(app);


$(document).on('click', '.overlapCheck', function() {

	let checkboxId = $(this).attr('id');
	let checkboxNm = $("#"+checkboxId).data('value');
	let checkboxIdFilter="";
	checkboxNmArray.push(checkboxId);
	let filteredArray = "";
	let dupcheck = app.webmap.components.overlapListModalVue.hasDuplicates(checkboxNmArray);

	if(dupcheck){
		checkboxNmArray = checkboxNmArray.filter((value) => {
			  return value !== checkboxId;
		});
	}
	
	if(checkboxNmArray.length == 0){
		$('#overlapOrder-tbody').html('');
		$('#overlapOrder-tbody').html(`	                                
				  					<div class="list">
									    <p class="title">선택된 중첩 영상이 없습니다.</p>
										
									</div>   `);

		let odfLayerId = "odf-overlap-move_"+checkboxId; 
		map.removeODFLayer(odfLayerId);
		
		let pStyle = odf.StyleFactory.produce(
				  {
				      "geometryType": "free",
				      "name": "기본 스타일",
				      "fill": {
					        "color": [175,247,255,0.4
					        ]
					    },
					    "stroke": {
					        "color": [
					            175, 247, 255
					        ],
				          "width": 2
				      }
				  } 
				);
		
		droneLayerList.forEach(function(droneLayerNm) {
     		let odfIdVal = droneLayerNm.getODFId(); 
			    odfIdVal = odfIdVal.replace("odf-overlap-","");
			if(odfIdVal == checkboxId){
				droneLayerNm.setStyle(pStyle);
			} 
    	});
		
		
	}else{
		if(!dupcheck){

			if(checkboxNmArray.length == 1){
			
				$('#overlapOrder-tbody').html('');
			}
			
			let html = `
				<div class="list" id="list_`+checkboxId+`">
						<p class="title">`+checkboxNm+`</p>
						<input type="hidden" data-value=`+checkboxId+` value=`+checkboxId+`>
						<div class="btns">
							<button type="button" id="move_`+checkboxId+`" data-value="uav:`+checkboxId+`" class="link"></button>
							<button type="button" id="del_`+checkboxId+`" data-value="uav:`+checkboxId+`" class="delete"></button>
						</div>
					</div>
				`;
			
			$('#overlapOrder-tbody').prepend(html);
			 let centerVal = $("#"+checkboxId).data("center");
             let trElements = $(".list");
             let trCount = trElements.length;

             let delimiter = " ";  
             let parts = centerVal.split(delimiter);
            
			 if(trCount > 0){
				
				 let centerMove = {center : [Number(parts[0]) , Number(parts[1])] }; 
	   			 map.setCenter(centerMove.center);
	   			 //map.setZoom(15);  
	   			 $("#move_"+checkboxId).data("center", Number(parts[0])+" "+Number(parts[1]));
	   			 let moveRecheckId = "move_"+checkboxId;
	   			 droneView(moveRecheckId);
			 }
			 
		}else{
			let odfLayerId = "odf-overlap-move_"+checkboxId; 
			map.removeODFLayer(odfLayerId);
			$("#list_"+checkboxId).remove();
			
		}
	}
	
});  


let droneView  = (idVal) => {
	 
	let param = {};
	let moveCenterId =  idVal;
	let reId = "";
	let orgCenter = $("#"+moveCenterId).data("center");
	let delimiter = " ";  
    let parts = orgCenter.split(delimiter);
	let centerMove = {center : [Number(parts[0]) , Number(parts[1])] }; 
	map.setCenter(centerMove.center);
	
	reId = moveCenterId.replace("move_", "");
	reId = "uav:"+reId;

	
	let serverUrl = contextPath+"/overlapDroneView.do?serviceCode="+reId;
    let moveLayerId = `move-layer-${moveCenterId}`;
    let apiLayer = odf.LayerFactory.produce('api', {
      //  server: 'https://uav.lx.or.kr/uavApiService/api/uavMap?crtfcKey=6u348oi156p352q1ue4p&SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=uav:980_UAV&TILED=true&SRS=EPSG%3A5186&STYLES=', // API 주소
       server: serverUrl, 
       // layers: moveLayerId, //레이어명. 여러개일경우, 쉼표(,)로 구분
        service: 'wms', // wms/ wfs/xyz/wmts
        //crs : 'EPSG:5186', // 요청 좌표계
        //bgcolor : '0xRRGGBB', //배경색
        transparent : 'true',//반환 이미지 배경의 투명 여부-'true'/'false'
        //exceptions:''//예외 발생 시 처리 방법 - 'blank'/'xml'/'inimage'
        //originalOption : {//odf에서 제공해주는 기본 파라미터 적용 여부
          //SERVICE : true,//(기본값 true)   
          //REQUEST : true, //(기본값 true)
          //WIDTH : true,//(기본값 true) 
          //HEIGHT : true,//(기본값 true)
          //BBOX : true,//(기본값 true)
         // &BBOX=90484.18858102235,280178.828641786,248455.36122316166,359126.239232396
          //FORMAT : true,//(기본값 false)
          //TRANSPARENT : true,//(기본값 false)
          //STYLES : true,//(기본값 false)
          //CRS : false,//(기본값 false)
          //VERSION : false,//(기본값 false)
       // },
        authkey : 'bce6dea6d2676d7ce90f98',//발급받은 api key
    }); 
    apiLayer.setMap(map);
    apiLayer.setODFId(`odf-overlap-${moveCenterId}`);
   
    indexChange(moveCenterId);
}


let indexChange  = (idVal) => {
	let zIndexArry = [];
    let rowCount = $("#overlapOrder-tbody .list").length;
    let odfLayerCnt = map.getODFLayerList().length;
    let pStyle = odf.StyleFactory.produce(
				  {
				      "geometryType": "free",
				      "name": "기본 스타일",
				      "fill": {
				          "color": [175,247,255,0.4
				          ]
				      },
				      "stroke": {
				          "color": [
				        	  255, 242, 0
				          ],
				          "width": 2
				      } 
				  }
				);
    if(rowCount > 0){
    	
    	for(let q=0; odfLayerCnt>q; q++){
    		let odfZIndex = map.getODFLayerList()[q].getZIndex();
    		
    		let odfIdMove = map.getODFLayerList()[q].getODFId();
    		let searchString = "move_";
    		let newOdfIdMove = ""
    		if (odfIdMove.includes(searchString)) {
    			zIndexArry.push(odfZIndex);
    		}
    	}
    	
    	let maxNumber = Math.max(...zIndexArry);
    	map.setZIndex(`odf-overlap-${idVal}`, maxNumber);
    	 
    	$("#overlapListModal").css('left','70%');
    	
    	droneLayerList.forEach(function(droneLayerNm) {
     		let odfIdVal = droneLayerNm.getODFId(); 
			    odfIdVal = odfIdVal.replace("odf-overlap-","");
			let odfIdMove = idVal.replace("move_","");
			if(odfIdVal == odfIdMove){
				droneLayerNm.setStyle(pStyle); 
				droneFeatureList.forEach(function(droneFeatureNm) {
					let odfFeatureId = droneFeatureNm.getId();
					odfFeatureId = odfFeatureId.replace("odf-overlap-feature-","");
					if(odfIdVal == odfFeatureId){
						let extent = droneFeatureNm.getGeometry().extent_;
						let size = map.getSize();
						var zoomLevel = getZoomForExtent(map, extent, size);
						zoomLevel = parseInt(zoomLevel);
						$("#move_"+odfIdVal).data("zoom", zoomLevel);
						
						map.setZoom(zoomLevel);
						map.setCenter(droneFeatureNm.getCenterPoint());
					}
					
		    	});
			}  
    	});  
    } 
}

$(document).on('click', '.link', function() {
	let param = {};
	let moveCenterId =  $(this).attr('id');
	let reId = "";
	let orgCenter = $("#"+moveCenterId).data("center");
	let delimiter = " ";  
    let parts = orgCenter.split(delimiter);
	let centerMove = {center : [Number(parts[0]) , Number(parts[1])] }; 
	let zoomLevel = $("#"+moveCenterId).data("zoom");
	    
	map.setZoom(zoomLevel);
	map.setCenter(centerMove.center);
	   
});

$(document).on('click', '.delete', function() {
	let param = {};
	let delId =  $(this).attr('id');
	let delIdRe = "";
	delIdRe = delId.replace("del_","");
	let odfLayerId = "odf-overlap-move_"+delIdRe; 
	map.removeODFLayer(odfLayerId);
	$("#list_"+delIdRe).remove();
	$("#"+delIdRe).attr('checked', false );
	checkboxNmArray.push(delIdRe);
	let dupcheck = app.webmap.components.overlapListModalVue.hasDuplicates(checkboxNmArray);

	if(dupcheck){
		checkboxNmArray = checkboxNmArray.filter((value) => {
			  return value !== delIdRe;
		});
	}
	
	
});

$(document).on('click', "#pagesNum>a", function() {
	const countPerPage = 4;
	const showPageCnt = 5;
	let clickPage = Number($(this).text());
	app.webmap.components.overlapListModalVue.pagesNumGo(clickPage, countPerPage, showPageCnt);
	 
});

$(document).on('click', '.drawControl_boxSpan', function() {
	droneClickCheck = true;
});


function getZoomForExtent(map, extent, size) {
	var view = map.getView();
    var closest = false; // 기본값은 정확한 확대 수준을 반환
 // 확대 수준 계산
    var zoomLevel = view.getZoomForResolution(view.getResolutionForExtent(extent, size), closest);
    return zoomLevel;
}


