<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>

	#cvgLocation {
		position: absolute;
		right: 625px;
		top: 67px;
		height: 38px;
		display: flex;
		background-color: #fff;
		box-shadow: 0.5px 0.9px 4px 0 rgba(0, 0, 0, 0.27);
		border-radius: 3px;
		width: 0px;	
	}
	
	#cvgLocation2 {
		position: absolute;
		right: 230px;
		top: 190px;
		height: 38px;
		display: flex;
		background: #fff;
		box-shadow: 0.5px 0.9px 4px 0 rgba(0, 0, 0, 0.27);
		border-radius: 3px;
		width : 0px;
	}
	
	#cvgLocation3 {
		position: absolute;
 		right: 238px;
 		top: 190px;
		height: 38px;
		display: flex;
		background: #fff;
		box-shadow: 0.5px 0.9px 4px 0 rgba(0, 0, 0, 0.27);
		border-radius: 3px;	
	}
	
	#cvgWidget1 {
		padding: 10px; 
		background-color: white; 
		border-radius: 3px; 
		width: 527px;
	}
	
	#cvgLocation2 #cvgWidget2 .cvgWidgetChild2 dd {
		background-color: #fff !important;
	}
	
	#cvgLocation2 #cvgWidget2 .cvgWidgetChild2 {
		width: 150px !important;
	}
	
	#cvgLocation2 #cvgWidget2 .cvgWidgetChild2 .border-top-radius-3{
		border-radius: 3px 3px 0px 0px !important;
	}
	
	#cvgLocation2 #cvgWidget2 .cvgWidgetChild2 .border-bottom-radius-3{
		border-radius: 0px 0px 3px 3px !important;
	}

	#cvgLocation2 #cvgWidget2 .cvgWidgetChild2 > dd > span {
		font-size: 14px;
	}
	#cvgLocation2 #cvgWidget2 .cvgWidgetChild2 .active{
		background-color: #2f5597 !important;
		color : #fff;
	}
	
	#cvgLocation3 #cvgWidget3 .inner {
		max-height: 650px; 
		padding: 20px; 
		background-color: white; 
		border-radius: 3px;
	}
	
	#cvgLocation3 #cvgWidget3 .inner .titSec .modal_close {
		right: 5px; 
		position:absolute; 
		background-color: #2f5597;
	}
	
	#cvgLocation3 #cvgWidget3 .inner .section .tabContWrap .btnArea .btn {
		width: 100%;
		justify-content: center;
		background-color: #2f5597;
	}
	
	.cvgCountText {
		color:#c18b29;
	}

</style>

<div class="cvgLocation" id="cvgLocation">
	
	<div class="cont" >
		<div class="inner" style="display:none;" id="cvgWidget1">
			<div class="tabContWrap type03">
				<div class="tabNav">
					<ul class="tabList cvgMenu01">
						<li data-menu-id="cvg_01" class="">인덱스</li>
						<li data-menu-id="cvg_02"class="">행정구역</li>
						<li data-menu-id="cvg_03"class="">도형</li>
					</ul>
				</div>
			</div>

			<div class="tabContWrap type03" style="margin-top:10px; display: none;" id="cvg_01">
				<div class="tabNav">
					<ul class="tabList cvgMenu02">
						<li data-menu-id="1" class="">1:1,000</li>
						<li data-menu-id="2" class="">1:5,000</li>
						<li data-menu-id="3" class="">1:25,000</li>
						<li data-menu-id="4" class="">1:50,000</li>
						<li data-menu-id="5" class="">1:250,000</li>
					</ul>
				</div>
			</div>
			
			<!-- 데이터 조회해오는 js 는 oui꺼 못쓰고 회원가입시 지역선택 함수 참조해서 써야할듯-->
			<div class="tabContWrap type03" style="margin-top:10px; display: none;" id="cvg_02">
				<div class="tabNav">
					<ul class="tabList cvgMenu03">
						<li data-menu-id="1" data-administ-type="1" class="">
							<select id="cvgSidoList" style="width:100%;">
								<option>시도 선택</option>
							</select>
						</li>
						<li data-menu-id="2" data-administ-type="2" class="">
							<select id="cvgSigunguList" style="width:100%;">
								<option>시군구 선택</option>
							</select>
						</li>
						<li data-menu-id="3" data-administ-type="3" class="">
							<select id="cvgEupMyeonDongList" style="width:100%;">
								<option>읍면동 선택</option>
							</select>						
						</li>
					</ul>
				</div>
			</div>

			<div class="tabContWrap type03" style="margin-top:10px; display: none;" id="cvg_03">
				<div class="tabNav cvgMenu04">
					<ul class="tabList">
						<li data-menu-id="1" data-draw-type="point" class="">점</li>
						<li data-menu-id="2" data-draw-type="line" class="">선</li>
						<li data-menu-id="3" data-draw-type="box" class="">사각형</li>
						<li data-menu-id="4" data-draw-type="circle" class="">원</li>
						<li data-menu-id="5" data-draw-type="buffer" class="">버퍼</li>
					</ul>
				</div>
			</div>

		</div>
	</div>
</div>
<div class="cvgLocation" id="cvgLocation2">
	<div class="layerSearch_layerMenu" id="cvgWidget2" style="display: none;">
	
		<dl class="layerSearch_filter cvgWidgetChild2">
			<dd class="border-top-radius-3" data-cvg-type-cd="01" >
				<span>국가공간정보  <b class="cvgCountText">(<span id="cvgCount1">0</span>)</b></span>
			</dd>
			<dd class=""  data-cvg-type-cd="02" >
				<span>지도서비스 <b class="cvgCountText">(<span id="cvgCount2">0</span>)</b></span>
			</dd>
			<dd class=""  data-cvg-type-cd="03" >
				<span>통계서비스 <b class="cvgCountText">(<span id="cvgCount3">0</span>)</b></span>
			</dd>
			<dd class=""  data-cvg-type-cd="04" >
				<span>데이터서비스 <b class="cvgCountText">(<span id="cvgCount4">0</span>)</b></span>
			</dd>
			<dd class="border-bottom-radius-3"  data-cvg-type-cd="05" >
				<span>사용자레이어 <b class="cvgCountText">(<span id="cvgCount5">0</span>)</b></span>
			</dd>
		</dl>
	</div>
</div>

<div class="cvgLocation" id="cvgLocation3">
	<div class="cont" id="cvgWidget3" style="display: none;">
		<div class="inner cScroll" style="">
			<section class="section type02">
				<div class="titSec" style="margin-bottom: 20px;">
					<strong><span id="cvgListTitle"></span> 목록</strong>
					<button class="modal_close" style=""><span> × </span></button>
				</div>
				
				<div class="tabContWrap type03">
<!-- 					<div class="tabNav"> -->
<!-- 						<ul class="tabList"></ul> -->
<!-- 					</div> -->
					<div class="tabCont active">
						<div class="table txt-center cScroll" style="height: 232px;">
							<table>
								<caption>레이어 목록</caption>
								<colgroup>
									<col style="width: 50px;">
									<col style="width: 225px;">
									<col style="width: 50px;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">선택</th>
										<th scope="col">레이어 명</th>
										<th scope="col">비고</th>
									</tr>
								</thead>
								<tbody id="cvgLayerList">
<!-- 									<tr> -->
<!-- 										<td><input type="checkbox" name="test"/></td> -->
<!-- 										<td>구멍여러개</td> -->
<!-- 										<td><div class="icoBox"><i class="ico ico-plane"></i></div></td> -->
<!-- 									</tr> -->
<!-- 									<tr> -->
<!-- 										<td><input type="checkbox" name="test"/></td> -->
<!-- 										<td>wgs84정보로하기</td> -->
<!-- 										<td><div class="icoBox"><i class="ico ico-dot"></i></div></td> -->
<!-- 									</tr> -->
<!-- 									<tr> -->
<!-- 										<td><input type="checkbox" name="test"/></td> -->
<!-- 										<td>레이어 별칭</td> -->
<!-- 										<td><div class="icoBox"><i class="ico ico-dot"></i></div></td> -->
<!-- 									</tr> -->
<!-- 									<tr> -->
<!-- 										<td><input type="checkbox" name="test"/></td> -->
<!-- 										<td>레이어 별칭</td> -->
<!-- 										<td><div class="icoBox"><i class="ico ico-dot"></i></div></td> -->
<!-- 									</tr> -->
								</tbody>
							</table>   
						</div>
					</div>


					<div class="btnArea" style="margin-top: 20px;">
						<button type="button" class="btn" style=""><span>데이터 병합</span></button></div>
				</div>
				</section>
		</div>
	</div>
</div>