/**
 * 
 */
app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};

((app) => {

    app.webmap.components.calculateFieldModalVue = new Vue({
        el: "#calculateFieldModal",
        data: {
            styleObj: {
                display: "none",
                left: "50%",
                top: "20%"
            },
            fieldList: [],
            defFormulaUnits: ["+", "-", "x", "/"],
            defFormulaUnitNames: ["SUM", "IMSUB", "PRODUCT", "QUOTIENT"],
            formulaUnits: [],
            formulaFields: []
        },
        components: {

        },
        mounted: function() {

        },
        methods: {
            show: function() {

                this.getCalculateFieldList();

                if (this.fieldList.length < 1) {
                    callAlertMessage("레이어가 추가되지 않았거나, 속성정보가 없습니다.");
                    this.styleObj.display = "none";
                } else {
                    this.styleObj.display = "";
                }

            },
            hide: function() {
                this.styleObj.display = "none";
            },
            init: function() {

                const calculateFields = document.querySelectorAll("#calculateFields")[0];

                while (calculateFields.firstChild) {
                    calculateFields.removeChild(calculateFields.firstChild);
                }

            },
            getFormulaUnits: function() {
            		return this.formulaUnits;
            },
            getFormulaFields: function() {
            		return this.formulaFields;
            },
            getFieldList: function() {
            		return this.fieldList;
            },
            getDefFormulaUnitNames: function() {
            		return this.defFormulaUnitNames;
            },
            getCalculateFieldList: function() {

                const targetLayer = document.querySelectorAll("#targetLayer > option:checked")[0];

                if (!targetLayer) {
                    callAlertMessage("레이어가 추가되지 않았거나, 속성정보가 없습니다.");
                } else {

                    const targetLayerId = targetLayer.getAttributeNode("data-typename").nodeValue;

                    if (targetLayerId) {

                        const selectLayer = odf.LayerFactory.produce('geoserver', { // 레이어 호출 방법 (ex. geoserver, geojson)
                            server: `${API_MAP}/api/map/wfs`, // 호출 서비스 ( api or geoserver
                            layer: targetLayerId, //저장소명:레이어명
                            service: "wfs", //wfs, wms, wcs
                            method: "post",
                            bbox: false,
                            matrixSet: undefined,
                            crtfckey: `${crtfckey}`, // api 통신 시 필요한 인증키
                        });

                        if (selectLayer) this.fieldList = selectLayer.getAttributes(['geometry'], false);

                    }

                }

            },
            addCalculateField: function(e) {
            	
            	    this.controlDOM_calculateUnit("activated");
            	
                const tableTr = document.createElement("tr");
                let tableTd = document.createElement("td");

                const selectCalculateField = this.createDOM_calculateField();
                tableTd.appendChild(selectCalculateField);
                tableTr.appendChild(tableTd);

                const selectCalculateUnit = this.createDOM_calculateUnit();
                tableTd = document.createElement("td");                
                tableTd.appendChild(selectCalculateUnit);
                tableTr.appendChild(tableTd);

                const deleteButton = this.createDOM_deleteButton();
                tableTd = document.createElement("td");
                tableTd.appendChild(deleteButton);
                tableTr.appendChild(tableTd);

                document.querySelector("#calculateFields").insertBefore(tableTr, document.querySelector("#calculateFields").firstChild);
                
                this.controlDOM_calculateUnit("disabled");

            },
            deleteCalculateField: function(target) {
                target.parentNode.parentNode.remove();
                this.controlDOM_calculateUnit("disabled");
            },
            saveCalculateField: function() {

                this.formulaFields = [];

                const selectCalculateFields = document.querySelectorAll(".selectCalculateField");
                let textFormula = "";

                if (selectCalculateFields.length) {

                	   const selectCalculateUnits = document.querySelectorAll(".selectCalculateUnit");
                	   
                	   for (let i = 0; i < selectCalculateUnits.length; i++) {
                		   console.dir(selectCalculateUnits[i].value);
                		   this.formulaUnits.push(selectCalculateUnits[i].value);
                	   }
                	   
                    for (let i = 0; i < selectCalculateFields.length; i++) {

                        this.formulaFields.push(selectCalculateFields[i].value);
                        textFormula += selectCalculateFields[i].value;

                        if (selectCalculateFields.length > 1 && i < selectCalculateFields.length - 1) {
                            textFormula += this.getCalculateUnit(this.formulaUnits[i]);
                        }

                    }

                } else {
                    callAlertMessage("지정된 계산 필드가 없습니다.");
                }

                if (textFormula) document.querySelectorAll("#formula")[0].value = textFormula;
                this.hide();

            },
            getCalculateUnit: function(unitType) {

                let formulaUnitType;

                switch (unitType) {

                    case "SUM":
                        formulaUnitType = "+";
                        break;
                    case "IMSUB":
                        formulaUnitType = "-";
                        break;
                    case "PRODUCT":
                        formulaUnitType = "x";
                        break;
                    case "QUOTIENT":
                        formulaUnitType = "/";
                        break;
                    default:
                        break;

                }

                return formulaUnitType;

            },
            controlDOM_calculateUnit: function(mode) {
            	
            		if(mode == "disabled") {
                    setTimeout(function() {
                    		const selectCalculateUnit = document.querySelectorAll(".selectCalculateUnit");
                    		if(selectCalculateUnit.length > 1) selectCalculateUnit[selectCalculateUnit.length-1].setAttribute("disabled", "disabled");                	
                    }, 10);            			
            		} else if(mode == "activated") {
            			const selectCalculateUnit = document.querySelectorAll(".selectCalculateUnit");    
            			for(let i=0; i < selectCalculateUnit.length; i++) {
            				selectCalculateUnit[i].removeAttribute("disabled");
            			}            			
            		}
            	
            },
            createDOM_calculateUnit: function() {
            	
            	  const getDefFormulaUnitNames = this.getDefFormulaUnitNames();
               const getFieldList = this.getFieldList();
            	   const selectBox = document.createElement("select");
            	   
                selectBox.classList.add("selectCalculateUnit");
                selectBox.name = "selectCalculateUnit";
                selectBox.setAttribute("style", "width:100%;");
                selectBox.addEventListener("change", function(e){
                	
	            		if(e.target.parentNode) {
	            			
	            			const siblingTd = e.target.parentNode.parentNode.children[0];
	            			const siblingSelect = siblingTd.firstChild;
	            			const filterFieldList = getFieldList.filter(field => {
	            				return field.name == siblingSelect.value;
	            			});
	            			
	            			if(["string"].includes(filterFieldList[0].type) && e.target.value != getDefFormulaUnitNames[0]) {
	            				callAlertMessage("텍스트 유형의 필드는 더하기(SUM)만 가능합니다.");
	            			}
	            			
	            			if(["string"].includes(filterFieldList[0].type)) {
	            				e.target.value = getDefFormulaUnitNames[0];
	            			}
	            			
	            		}
            		
                });

                for (let i = 0; i < this.defFormulaUnits.length; i++) {
                    selectOption = document.createElement("option");
                    selectOption.value = this.defFormulaUnitNames[i];
                    selectOption.innerHTML = "(" + this.defFormulaUnits[i] + ") " + this.defFormulaUnitNames[i];
                    selectBox.appendChild(selectOption);
                }
            	
            		return selectBox;
            	
            },
            createDOM_calculateField: function() {
            	
            	    const getDefFormulaUnitNames = this.getDefFormulaUnitNames();
            		const getFieldList = this.getFieldList();            	
            		const selectBox = document.createElement("select");
            		
                selectBox.classList.add("selectCalculateField");
                selectBox.name = "selectCalculateField";
                selectBox.setAttribute("style", "width:100%;");
                selectBox.addEventListener("change", function(e){
                	
                		if(e.target.parentNode) {
                			
                			const siblingTd = e.target.parentNode.parentNode.children[1];
                			const siblingSelect = siblingTd.firstChild;
                			const filterFieldList = getFieldList.filter(field => {
                				return field.name == e.target.value;
                			});
                			
                			console.dir(filterFieldList[0]);
                			
                			if(["string"].includes(filterFieldList[0].type)) {
                				siblingSelect.value = getDefFormulaUnitNames[0];
                			}
                			
                		}
                		
                });
                
                let selectOption;

                for (let i = 0; i < this.fieldList.length; i++) {
                    selectOption = document.createElement("option");
                    selectOption.value = this.fieldList[i].name;
                    selectOption.innerHTML = this.fieldList[i].name;
                    selectBox.appendChild(selectOption);
                }
                
                return selectBox;
                
            },
            createDOM_deleteButton: function() {
            	   
            	   const deleteButton = document.createElement("button");
            	   
                deleteButton.classList.add("btn", "spatialAnalysis_btnRemove");
                deleteButton.addEventListener("click", function(e) {
                    app.webmap.components.calculateFieldModalVue.deleteCalculateField(this); // this scope 범위가 다르다.
                });
                
                return deleteButton; 
                
            }

        }
    });

})(app);