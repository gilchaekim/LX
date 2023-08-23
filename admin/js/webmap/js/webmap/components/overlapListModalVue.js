app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};
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
				this.search();
			},
			search: function () {
				let param = {}
				//param.pageIndex = this['currentPageNo'][this.tab]
				param.pageIndex = this.currentPageNo
				param.pageSize = 4;
				app.cmm.api.overlap.list(param).then(function (result) {
					let overlapLayerTotalList = app.webmap.components.overlapListModalVue.data.overlapLayerTotalList = result.result
					let paginationInfo = app.webmap.data.paginationInfo.overlapList
					paginationInfo.currentPageNo = app.webmap.components.overlapListModalVue.currentPageNo; // 현재
					// 페이지번호
					paginationInfo.firstPageNo = 1; 											// 첫번째
					// 페이지번호
					paginationInfo.lastPageNo = Math.ceil(overlapLayerTotalList.pageInfo.totalCount/overlapLayerTotalList.pageInfo.pageSize); 			// 마지막
					// 페이지번호
					paginationInfo.totalPageCount =  Math.ceil(overlapLayerTotalList.pageInfo.totalCount/overlapLayerTotalList.pageInfo.pageSize); 		// 페이지
					// 총 개수
					app.util.paging(paginationInfo);
					//오더 순서리스트 갱신
					if (app.webmap.data.overlapOrderList.length == 0) {
						$('#overlapOrder-tbody').html(`	                                
								  <tr class="overlap">
	                                    <td colspan="3"  id="overlapOrder-blank-td">
	                                        <table>
	                                            <colgroup>
	                                                <col style="width:50px;">
	                                                <col style="width:auto;">
	                                            </colgroup>
	                                            <tbody>
	                                                <tr>
	                                                    <td colspan="2">선택된 중첩 영상이 없습니다.</td>
	                                                </tr>
	                                            </tbody>
	                                        </table>
	                                    </td>
	                                </tr>   `);
					} else {
						$('#overlapOrder-tbody').html('');
						app.webmap.components.overlapListModalVue.data.overlapOrderList = app.webmap.data.overlapOrderList;
						$.each(app.webmap.data.overlapOrderList, function(index,item){
							let html = `	                                
								  <tr class="overlap" name="order-tr-${item.lapId}">
	                                <td colspan="3">
	                                    <table>
	                                        <colgroup>
	                                            <col style="width:50px;">
	                                            <col style="width:auto;">
	                                        </colgroup>
	                                        <tbody>
	                                            <tr>
	                                                <td><input type="hidden" data-value="${item.lapId}" value="${item.lapName}"/></td><td>${item.lapName}</td>
	                                            </tr>
	                                        </tbody>
	                                    </table>
	                                </td>
	                              </tr>   `;	
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
				
				//callConfirm("설정 확인 알림", '설정을 완료하시겠습니까?', (result) => {
					if ($('#overlapOrder-blank-td').length > 0) {
						orderList = [];
					} else {
						//기존 띄워져 있던 레이어 목록 삭제 odf 명칭 odf-overlap-basemapid
						$.each(map.getODFLayerList().filter(v => v.getODFId().indexOf('odf-overlap') != -1), function(index,item){
							map.removeODFLayer(item.getODFId());
						});
						
						let nameList = [];
						$.each($('#overlapOrder-tbody').find('input'), function(index,item) {
							nameList.push({lapId:$(item).data('value'),lapName:item.value});
							
							//레이어 map에 추가
							//let addLyr = map._controls.get('basemap').getBaseLayer($(item).data('value'));
							
							let param ={};
							param.bcrnMapId = $(item).data('value');
							
							app.cmm.api.overlap.select(param).then(function (result) {
								let bcrnData = result.result;
								let parsingData = JSON.parse(bcrnData.mapUrlparamtr);
								parsingData.server = {
										"url" : bcrnData.mapUrl,
										"proxyURL" : "/smt/proxyUrl.jsp",
										"proxyParam" : "url"										
								}
								parsingData.service = bcrnData.lyrStleCodeNm.toLowerCase();
								let addLyr = odf.LayerFactory.produce('api', 
									parsingData
								);
								
								map.addLayer(addLyr);
								addLyr.setODFId('odf-overlap-'+$(item).data('value'));
								map.setZIndex('odf-overlap-'+$(item).data('value'), 10-index);
								
							});
							
						});
						app.webmap.data.overlapOrderList = nameList;
					}
				//});
				
				
			},
			checkOverlap : function(evt){
				
				if (evt.target.checked) {
					
					if($('#overlapOrder-blank-td').length > 0) $("#overlapOrder-tbody").empty();
					let html = `
							  <tr class="overlap" name="order-tr-${evt.target.id}">
	                            <td colspan="3">
	                                <table>
	                                    <colgroup>
	                                        <col style="width:50px;">
	                                        <col style="width:auto;">
	                                    </colgroup>
	                                    <tbody>
	                                        <tr>
	                                            <td><input type="hidden" data-value="${evt.target.id}" value="${evt.target.value}"/></td><td>${evt.target.value}</td>
	                                        </tr>
	                                    </tbody>
	                                </table>
	                            </td>
                        	  </tr>					
					`;
					$('#overlapOrder-tbody').append(html);
				} else {
					$(`tr[name=order-tr-${evt.target.id}`).remove();
					if($('#overlapOrder-tbody > tr').length ==0) {
						$('#overlapOrder-tbody').html(
								`	                                
								<tr class="overlap">
								<td colspan="3"  id="overlapOrder-blank-td">
								<table>
								<colgroup>
								<col style="width:50px;">
								<col style="width:auto;">
								</colgroup>
								<tbody>
								<tr>
								<td colspan="2">선택된 중첩 영상이 없습니다.</td>
								</tr>
								</tbody>
								</table>
								</td>
						</tr> `);
					}
				}
				this.setting();
			}
		}

	});

})(app);
