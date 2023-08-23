app = window.app || {};
app.webapp = app.webapp || {};
app.webapp.components = app.webapp.components || {};
((app) => {
	app.webapp.components.themaTab = {
		name : 'thema-tab',
		data : function() {
			return {
				data : app.webapp.data,
				footUseYn : true,
				
			}
		},
		mounted: function () {
			let themapTab = app.webapp.data.webAppOptions.detailSetting.themaTab;
			$('#headBackColorPicker').css('backgroundColor', themapTab.head.backgroundColor);
			$('#headFontColorPicker').css('backgroundColor', themapTab.head.themaTabfontColor);
			$('#footBackColorPicker').css('backgroundColor', themapTab.foot.backgroundColor);
			$('#footFontColorPicker').css('backgroundColor', themapTab.foot.fontColor);
			$('#headBackColorPicker').next().text(themapTab.head.backgroundColor);
			$('#headFontColorPicker').next().text(themapTab.head.fontColor);
			$('#footBackColorPicker').next().text(themapTab.foot.backgroundColor);
			$('#footFontColorPicker').next().text(themapTab.foot.fontColor);
			$('#headBackColorPicker').ColorPicker({
		        color: '#0000ff',
		        onShow: function (colpkr) {
		            $(colpkr).fadeIn(500);
		            return false;
		        },
		        onHide: function (colpkr) {
		            $(colpkr).fadeOut(500);
		            return false;
		        },
		        onChange: function (hsb, hex, rgb) {
		            $('#headBackColorPicker').css('backgroundColor', '#' + hex);
		            $('#headBackColorPicker').next().text(`#${hex}`);
		        }
		    });
			$('#headFontColorPicker').ColorPicker({
		        color: '#0000ff',
		        onShow: function (colpkr) {
		            $(colpkr).fadeIn(500);
		            return false;
		        },
		        onHide: function (colpkr) {
		            $(colpkr).fadeOut(500);
		            return false;
		        },
		        onChange: function (hsb, hex, rgb) {
		            $('#headFontColorPicker').css('backgroundColor', '#' + hex);
		            $('#headFontColorPicker').next().text(`#${hex}`);
		        }
		    });
			$('#footBackColorPicker').ColorPicker({
		        color: '#0000ff',
		        onShow: function (colpkr) {
		            $(colpkr).fadeIn(500);
		            return false;
		        },
		        onHide: function (colpkr) {
		            $(colpkr).fadeOut(500);
		            return false;
		        },
		        onChange: function (hsb, hex, rgb) {
		            $('#footBackColorPicker').css('backgroundColor', '#' + hex);
		            $('#footBackColorPicker').next().text(`#${hex}`);
		        }
		    });
			$('#footFontColorPicker').ColorPicker({
		        color: '#0000ff',
		        onShow: function (colpkr) {
		            $(colpkr).fadeIn(500);
		            return false;
		        },
		        onHide: function (colpkr) {
		            $(colpkr).fadeOut(500);
		            return false;
		        },
		        onChange: function (hsb, hex, rgb) {
		            $('#footFontColorPicker').css('backgroundColor', '#' + hex);
		            $('#footFontColorPicker').next().text(`#${hex}`);
		        }
		    });
			
		},
		methods : {
			themaText : function(){
				 let theme = this.data.webAppOptions.detailSetting.themaTab.theme;
				 let result;
				 switch (theme)  {
				 	case "theme01" : 
				 		result = "테마1";
				 		break;
					case "theme02" : 
				 		result = "테마2";
				 		break;
					case "theme03" : 
				 		result = "테마3";
				 		break;
				 }
				 return result;
			},
			apply : function() {
				let footUseYn = this.footUseYn
				let themapTab = app.webapp.data.webAppOptions.detailSetting.themaTab;
				// 헤드 타이틀			
				if(this.$refs.headTitle.value) {
					themapTab.head.title = this.$refs.headTitle.value;
				}
				// 헤드 서브타이틀
				if(this.$refs.headSubTitle.value) {
					themapTab.head.subTitle = this.$refs.headSubTitle.value;
				}
				
				if(this.$refs.headInfo.value) {
					themapTab.head.info = this.$refs.headInfo.value;
				}
				if(this.$refs.footDesc.value) {
					themapTab.foot.desc = this.$refs.footDesc.value;
				}
				themapTab.head.backgroundColor = $('#headBackColorPicker').next().text();
				themapTab.head.fontColor =$('#headFontColorPicker').next().text();
				this.data.webAppOptions.detailSetting.themaTab.foot.useYn = footUseYn;
				
				if(footUseYn){
					themapTab.foot.backgroundColor = $('#footBackColorPicker').next().text();
					themapTab.foot.fontColor = $('#footFontColorPicker').next().text();	
				}
				
				/*테마 유형 변경*/
				app.webapp.data.webAppOptions.detailSetting.themaTab.theme = app.webapp.components.themaTabModalVue.theme;	
				let section = this.data.webAppOptions.detailSetting.themaTab.section;
				if(section){
					section.fontColor = $('#sectionFontColorPicker').next().text();
					section.backgroundColor = $('#sectionBackColorPicker').next().text();
					if(section.backgroundColor =="#ffffff"){
						switch (this.theme){
							case 'theme01' :
								section.backgroundColor	= '#ffffff'
							break;
							case 'theme02' :
								section.backgroundColor	= '#2F5597'
							break;
							case 'theme03' :
								section.backgroundColor	= '#2F5597'
							break;
						}
					}
				}
				themapTab.head.logoFileName = $('#headFile').parent().find('.fileLocal').value;
				
				themapTab.head.logoLink =  this.$refs.headTitleLink.value.trim() === '' ? '#' :  this.$refs.headTitleLink.value ;
				
			},
			themaPop : function(){
				app.webapp.components.themaTabModalVue.show();
			},
			logoUpload : function(e) {
				let themapTab = app.webapp.data.webAppOptions.detailSetting.themaTab;
				const _target = e.target;
				const file = e.target.files[0];
				const fileName = file.name;
				const fileType = file.type;
				const reader = new FileReader();
				reader.onload = (e) => {
					const tempImg = document.createElement('img');
					tempImg.src = e.target.result;
					tempImg.onload = () => {
						themapTab.head.logoToDataURL = app.util.imgResize(tempImg, 50, 43);		
					}
				};
				reader.readAsDataURL(file);
				$('#headFile').parent().find('.fileLocal').val(file.name);
				$("#sampleLogo").css("height","43px");
				$("#sampleLogo").css("width","50px");
			},
			
		}
	}
})(app);