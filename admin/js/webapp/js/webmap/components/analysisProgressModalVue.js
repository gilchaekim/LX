/**
 * 
 */
app = window.app || {};
app.webmap = app.webmap || {};
app.webmap.components = app.webmap.components || {};

((app) => {

    app.webmap.components.analysisProgressModalVue = new Vue({
        el: "#analysisProgressModal",
        data: {
            styleObj: {
                display: "none"
            },
            progressLoaded: 0,
            progressFnc: null
        },
        data() {
        	return {
        		styleObj: {
                    display: "none"
                },
        		progressLoaded: 0,
        		progressFnc: null
        	}
        },
        mounted: function() {

        },
        methods: {
        	setProgressEvent: function(axios) {
                this.progressFnc = setInterval(app.webmap.components.analysisProgressModalVue.progressExecute, 1);        		
        	},
        	clearProgressEvent: function() {
        		clearInterval(this.progressFnc);
        		this.progressFnc = null;
        	},
        	update: function(percent) { 
        		this.progressLoaded = percent;
        	},
        	progressExecute: function() {
        		if(this.progressLoaded < 100) {
        			const diff = 100 - this.progressLoaded;
        			const inc = diff / (10 + this.progressLoaded * (1 + this.progressLoaded / 100)); // 증가값        			
        			const progressPercent = this.progressLoaded + Math.round(inc);        			
        			app.webmap.components.analysisProgressModalVue.update(progressPercent);
        		}
        	},
            show: function() {          
            	this.init(); 
            	document.querySelectorAll("#analysisProgressModal")[0].style.display = "";
            	document.querySelectorAll("#analysisProgressModal > #dimmed")[0].style.display = "";
            	document.querySelectorAll("#analysisProgressModal > .loadingBox")[0].style.display = "";
            },
            hide: function() {
            	this.init();
            	document.querySelectorAll("#analysisProgressModal")[0].style.display = "none";
            	document.querySelectorAll("#analysisProgressModal > #dimmed")[0].style.display = "none";
            	document.querySelectorAll("#analysisProgressModal > .loadingBox")[0].style.display = "none";            	
            },
            init: function() {
            	this.progressLoaded = 0; 	
            }
       }
    });
    
})(app);