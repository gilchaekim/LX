<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

 <%-- <script type="text/javascript" src='<c:url value="/js/sketchpicker/vue-color.js"/>'></script> --%>
 
  <div id="draw-sketch-app" style="position:absolute;z-index:999;display:none;">
    <div class="color-wrapper" :style="{'background-color': typeof colors === 'object' ? colors.hex8 : colors}" v-bind:value="colorChange(colors)">
       <sketch-picker v-model="colors"/>
    </div>
  </div>
  
<div class="popup" style="width:400px; display:none; top:20%; left:60%;" v-bind:style="styleObj" id="drawStyleModal">
    <!--head-->
    <div class="head blue">
        <strong class="titPop">스타일 설정</strong>
        <div class="btnGroup">
            <button type="button" class="btnPopClose" @click="hide"><span class="hidden">팝업 닫기</span></button>
        </div>
    </div>
    <!--//head-->
    <!--cont-->
    <div class="cont">
        <div class="inner cScroll" style="max-height:650px;">
			<div class="drawStyle-background-div" v-show="['polygon','box','circle','point'].includes(data.featureType)">
				<span style="font-size:17px;">채우기</span>
				<br/>
				<input type="checkbox" id="drawStyle-fill-checkbox" style="margin:15px 0px 15px 0px;" @click="opacityCheck"/>
				<label for ="drawStyle-background-checkbox">채우기 없음</label>
				<br/>
				<div style="height:30px;font-size:15px;display:inline-block">색</div>
				<div class="drawStyle-box-wrapper">
				<div id="drawStyle-fillColor-box" @click="fillColorClick" v-bind:style="fillColorStyleObj" ></div>
				</div>
				<br/>
				<span style="font-size:15px;">투명도</span>
				<div id="drawStyle-fill-opacity-bar" style="display: inline-block;"></div>
				<div style="display: inline-block;margin-left:15px;">
					<input type="number" style="height:30px;width:43px;"id="drawStyle-fill-opacity-percent" :value="data.fillOpacity" @keyup="inputOpacity" /> %
				</div>
			</div>
			<div class="drawStyle-line-div" style="margin-top:20px;" v-show="['polygon','box','circle','point','lineString','curve'].includes(data.featureType)">
				<span style="font-size:17px;">선</span>
				<br/>
				<input type="checkbox" id="drawStyle-line-checkbox" style="margin:15px 0px 15px 0px;" @click="opacityCheck"/>
				<label for ="drawStyle-line-checkbox">선 없음</label>
				<br/>
				<div style="height:30px;font-size:15px;display:inline-block">색</div>
				<div class="drawStyle-box-wrapper">
				<div id="drawStyle-lineColor-box" @click="lineColorClick" v-bind:style="lineColorStyleObj" ></div>
				</div>
				<br/>
				<span style="font-size:15px;">투명도</span>
				<div id="drawStyle-line-opacity-bar" style="display: inline-block;"></div>
				<div style="display: inline-block;margin-left:15px;">
					<input type="number" style="height:30px;width:43px;"id="drawStyle-line-opacity-percent" :value="data.lineOpacity" @keyup="inputOpacity" /> %
				</div>
			</div>
			<div class="drawStyle-background-div" v-show="['text'].includes(data.featureType)">
				<span style="font-size:17px;">글꼴</span>
				<br/>
				<div class="drawStyle-text-selectdiv">
					<select id="drawStyle-text-fontSelect" :value="data.textFont" @change="changeFont">
						<option value="Roboto">Roboto</option>
						<option value="Arial">Arial</option>
						<option value="sans-serif">sans-serif</option>
					</select>
					<input type="number" id="drawStyle-text-sizeInput" maxlength="2" :value="data.textSize" @keyup="inputSize"/>
				</div>
				<div class="drawStyle-text-bold">
				<span style="font-size:17px">글꼴 굵기</span>
				<button class="drawStyle-text-boldBtn" @click="applyTextStyle('bold',$event)"><span style="font-weight:bold ">가</span></button>
				<button class="drawStyle-text-boldBtn" @click="applyTextStyle('italic',$event)"><span style="font-style: italic;">가</span></button>
				<button class="drawStyle-text-boldBtn" @click="applyTextStyle('normal',$event)"><span>가</span></button>
				</div>
				<div style="height:30px;font-size:17px;display:inline-block;margin-top:60px;">글꼴 색</div>
				<div class="drawStyle-box-wrapper">
				<div id="drawStyle-textColor-box" @click="textColorClick" v-bind:style="textColorStyleObj" ></div>
				</div>
			</div>	
			<div class="layerUpload_btnArea">
				<input type="button" class="layerUpload_btnUploadFileLayer" value="취소" @click="hide" style="margin-right:20px;background:#d6d6d6;">
				<input type="button" class="layerUpload_btnUploadFileLayer" value="설정" @click="applyOption" style="margin-right:90px;">
			</div>
        </div>
    </div>
    <!--//cont-->

</div>
<script type="text/javascript">
	
	 

</script>
<!--//popup-->