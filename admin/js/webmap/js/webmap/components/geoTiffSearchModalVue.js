/**
 * 
 */
app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};

((app) => {
	
	app.webmap.components.geoTiffSearchModal = new Vue({
		
		el: "#geoTiffSearchModal",
		data: {
            styleObj: {
                display: "none",
                left: "40%",
                top: "10%"
            }
        },
        data() {
        	return {
        		styleObj: {
                    display: "none",
                    left: "40%",
                    top: "10%"                    
                }
        	}
        },
		mounted: function() {
			
		},
		created: function() {
			
		},
		methods: {
			
			getLayerList: function(pageIndex, pageSize, lyrTySeCode) {
				
				const geoTiffList = document.querySelectorAll("#geoTiffList")[0];

                while (geoTiffList.firstChild) {
                	geoTiffList.removeChild(geoTiffList.firstChild);
                }
				
				const paramPageIndex = (pageIndex) ? pageIndex : 0;
				const paramPageSize = (pageSize) ? pageSize: 20;
				
				const apiParam = {
					wspcUserId: `${userId}`,
					pageIndex: `${paramPageIndex}`,
					pageSize: `${paramPageSize}`
				};
				
				const apiUrl = `${API_SMT}/geoserver/rest/geotiff/list`;
				
				app.util.callAPI({
					url: apiUrl,
					data: apiParam,
					type: 'get'
				}).then(function(response){		

					if(response.result) {
						
						const coverageStores = JSON.parse(response.result);						
						let coverageStore;
						
						let listTr = null;						
						let listTd = null;						
						let listLyrId = null;
						let listLyrTxt = null;
						
						let listLayerTypeBoxDiv = null;
						let listLayerTypeBoxIcon = null;
						
						for(let i=0; i < coverageStores.length; i++) {
							
							coverageStore = coverageStores[i];
							
							console.dir(coverageStore);
							
							listTr = document.createElement("tr");
							
							// ##############################################	
							
							listTd = document.createElement("td");
							
							listLyrId = document.createElement("input");
							listLyrId.type = "radio";
							listLyrId.name = "selectCmprLayer";
							listLyrId.value = coverageStore.cntnts_id;
							
							listTd.appendChild(listLyrId);
							listTr.appendChild(listTd);
							
							// ##############################################
							
							listTd = document.createElement("td");
							
							listLayerTypeBoxDiv = document.createElement("div");
							listLayerTypeBoxIcon = document.createElement("i");
							
							listLayerTypeBoxDiv.classList.add("layerSearch_layerTypeBox");
							listLayerTypeBoxIcon.classList.add("layerSearch_layerType" + coverageStore.lyr_ty_se_code);
//							listLayerTypeBoxIcon.classList.add("layerSearch_layerType" + paramLyrTySeCode);
							
							listLayerTypeBoxDiv.appendChild(listLayerTypeBoxIcon);							
							listTd.appendChild(listLayerTypeBoxDiv);
							listTr.appendChild(listTd);
							
							// ##############################################
							
							listTd = document.createElement("td");
							
							listLayerTypeBoxDiv = document.createElement("div");
							
//							if(lyrInfo.svcTySeCode == "T") {
//								listLayerTypeBoxDiv.classList.add("layerSearch_iconWmts");
//							} else if(lyrInfo.svcTySeCode == "M") {
//							}
							
							listLayerTypeBoxDiv.classList.add("layerSearch_iconWms");
							
							listTd.appendChild(listLayerTypeBoxDiv);
							listTr.appendChild(listTd);
							
							// ##############################################
							
							listTd = document.createElement("td");
							
							listLyrTxt = document.createElement("span");
							listLyrTxt.classList.add = "layerSearch_lyrTxt";
							listLyrTxt.innerHTML = (coverageStore && coverageStore.hasOwnProperty("lyr_nm")) ? coverageStore.lyr_nm : "";

							listTd.appendChild(listLyrTxt);
							listTr.appendChild(listTd);
							// ##############################################
							
							listTd = document.createElement("td");
							
							listLyrTxt = document.createElement("span");
							listLyrTxt.classList.add = "layerSearch_lyrTxt";
							listLyrTxt.innerHTML = (coverageStore && coverageStore.hasOwnProperty("lyr_dc")) ? coverageStore.lyr_dc : "";

							listTd.appendChild(listLyrTxt);
							listTr.appendChild(listTd);
							// ##############################################
							
							geoTiffList.appendChild(listTr);
							
						}
						
					} else {
						console.error("래스터 레이어 목록 오류");
					}
					
				});
				
			},
			show: function() {
				this.getLayerList(0, 20, "");
				document.querySelectorAll("#geoTiffSearchModal")[0].style.display = "";
			},
			hide: function() {
				document.querySelectorAll("#geoTiffSearchModal")[0].style.display = "none";
			},
			selectGeoTiff: function() {
				
				const selectCmprLayer = (document.querySelectorAll("#geoTiffSearchModal input[name=selectCmprLayer]:checked")[0]) ? document.querySelectorAll("#geoTiffSearchModal input[name=selectCmprLayer]:checked")[0].value : "";
				
				if(!selectCmprLayer) {
					callAlertMessage("래스터 레이어를 먼저 선택해주세요");
					return false;
				}
				
				callConfirm('래스터 레이어 선택 완료', '래스터 레이어 선택을 완료하시겠습니까?',function(){	
					document.querySelectorAll("#extractPoint #rasterCmprLayer")[0].value = selectCmprLayer; // TODO : 값 할당
					document.querySelectorAll("#geoTiffSearchModal")[0].style.display = "none";
				});
				
			}
			
		}
		
	});
	
})(app);
