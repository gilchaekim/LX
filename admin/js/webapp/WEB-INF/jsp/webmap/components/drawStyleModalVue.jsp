<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

 <%-- <script type="text/javascript" src='<c:url value="/js/sketchpicker/vue-color.js"/>'></script> --%>
 
  <div id="draw-sketch-app" style="position:absolute;z-index:999;display:none;">
    <div class="color-wrapper" :style="{'background-color': typeof colors === 'object' ? colors.hex8 : colors}" v-bind:value="colorChange(colors)">
       <sketch-picker v-model="colors"/>
    </div>
  </div>
  
<div class="popup movie_pop setting_style_layer" style="width:500px; display:none; top:20%; left:60%;" v-bind:style="styleObj" id="drawStyleModal">
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
		<div class="color_set">
			<section class="section type02">
				<div class="select_widget">
					<div class="group drawStyle-background-div" v-show="['polygon','box','circle','point'].includes(data.featureType)">
						<div class="titSec"><strong>배경</strong></div>
						<div class="setstyle">
							<div class="chk_group">
								<div class="chk">
									<input type="radio" name="drawStyle-fill-radio" id="drawStyle-fill-radio0" @click="opacityCheck"/>
									<label for="ck1">채우기</label>
								</div>
								<div class="chk">
									<input type="radio" name="drawStyle-fill-radio" id="drawStyle-fill-radio1" @click="opacityCheck"/>
									<label for="ck2">채우기 없음</label>
								</div>
							</div>
							<div class="color_pick_opacity">
								<div class="color_pick">
									<label for="drawStyle-box-wrapper">색상</label>
									<div class="drawStyle-box-wrapper">
										<div id="drawStyle-fillColor-box" @click="fillColorClick" v-bind:style="fillColorStyleObj" ></div>
									</div>
								</div>
								<div class="opacity_pick">
									<span class="range">
										<input type="range" name="" min="0" max="100" id="drawStyle-fill-opacity-bar">
									</span>
									<span class="inpu">
										<input type="text" id="drawStyle-fill-opacity-percent" :value="data.fillOpacity" @keyup="inputOpacity" readonly>
										<span class="text">%</span>
									</span>
								</div>
							</div>
						</div>
					</div>
 
					<div class="group drawStyle-background-div" v-show="['polygon','box','circle','point','lineString','curve'].includes(data.featureType)">
						<div class="titSec"><strong>선</strong></div>
						<div class="setstyle">
							<div class="chk_group">
								<div class="chk">
									<input type="radio" name="drawStyle-line-radio" id="drawStyle-line-radio0" @click="opacityCheck"/>
									<label for="ck1">채우기</label>
								</div>
								<div class="chk">
									<input type="radio" name="drawStyle-line-radio" id="drawStyle-line-radio1" @click="opacityCheck"/>
									<label for="ck2">채우기 없음</label>
								</div>
							</div>
							<div class="color_pick_opacity">
								<div class="color_pick">
									<label for="drawStyle-box-wrapper">색상</label>
									<div class="drawStyle-box-wrapper">
										<div id="drawStyle-lineColor-box" @click="lineColorClick" v-bind:style="lineColorStyleObj" ></div>
									</div>
								</div>
								<div class="opacity_pick">
									<span class="range">
										<input type="range" name="" min="0" max="100" id="drawStyle-line-opacity-bar">
									</span>
									<span class="inpu">
										<input type="text" id="drawStyle-line-opacity-percent" :value="data.lineOpacity" @keyup="inputOpacity" readonly>
										<span class="text">%</span>
									</span>
								</div>
							</div>
						</div>
					</div>
					
					<div class="group drawStyle-background-div" v-show="['text'].includes(data.featureType)">
						<div class="titSec"><strong>글꼴</strong></div>
						<div class="font_settiing">
							<div class="select drawStyle-text-selectdiv">
								<select name="" id="drawStyle-text-fontSelect" :value="data.textFont" @change="changeFont">
									<option value="Roboto">Roboto</option>
									<option value="Arial">Arial</option>
									<option value="sans-serif">sans-serif</option>
								</select>
								<input name="" id="drawStyle-text-sizeInput" :value="data.textSize" @keyup="inputSize">
							</div>
							<div class="select_type">
								<p class="label">글꼴굵기</p>
								<div class="inset">
									<button class="bold" @click="applyTextStyle('bold',$event)">가</button>
									<button class="italic" @click="applyTextStyle('italic',$event)">가</button>
									<button class="underline" @click="applyTextStyle('normal',$event)">가</button>
								</div>
							</div>
							<div class="select_type">
								<p class="label">글꼴색</p>
								<div class="drawStyle-box-wrapper">
									<div id="drawStyle-textColor-box" @click="textColorClick" v-bind:style="textColorStyleObj" ></div>
								</div>
							</div>
						</div>
					</div>
				</div>					
					
        		</div>        		
        	</section>
			<div class="btn_sec">
				<button type="button" class="btn black2 lg newMap"  @click="hide"><span>취소</span></button>
				<button type="button" class="btn blue lg newMap" @click="applyOption"><span>설정</span></button>
			</div>        	
        </div>
    </div>
    <!--//cont-->

</div>
<script type="text/javascript">
	
	 

</script>
<!--//popup-->