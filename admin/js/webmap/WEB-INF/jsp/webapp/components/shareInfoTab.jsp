<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<share-info-tab inline-template ref="shareInfo"
	v-if="data.webappView">
<div class="tabCont" v-bind:class="{'active' : classObj.active}">
	<!--section-->
	<section class="section type02">
		<div class="titSec">
			<strong>공유 현황</strong>
		</div>
		<!--tabContWrap-->
		<div class="tabContWrap type03">
			<!--tabNav-->
			<div class="tabNav">
				<ul class="tabList">
					<li v-bind:class="{active :tabBtn.classObj.all}"
						@click="tabShow('all')">전체 <span class="leng">(<span
							class="red">{{data.webappView.shareList.totalWebappTmplatShareCount}}</span>건)
					</span>
					</li>
					<li v-bind:class="{active :tabBtn.classObj.insts}"
						@click="tabShow('insts')">기관 <span class="leng">(<span
							class="red">{{data.webappView.shareList.webappTmplatShareInstCount}}</span>건)
					</span>
					</li>
					<li v-bind:class="{active :tabBtn.classObj.users}"
						@click="tabShow('users')">사용자 <span class="leng">(<span
							class="red">{{data.webappView.shareList.webappTmplatShareUserCount}}</span>건)
					</span>
					</li>
				</ul>
			</div>
			<!--//tabNav-->
			<!--tabCont-->
			<div class="tabCont active">
				<!--table-->
				<div class="table txt-center cScroll" style="height: 341px;">
					<table>
						<caption>공유 현황</caption>
						<colgroup>
							<col style="width: 120px;" />
							<col style="width: auto;" />
							<col style="width: 150px;" />
							<col style="width: 225px;" />
						</colgroup>
						<thead>
							<tr>
								<th scope="col">구분</th>
								<th scope="col">기관</th>
								<th scope="col">이름</th>
								<th scope="col">공유 시작일</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in data.webappView.shareList.list">
								<td v-text="pblonsipScopeSeCode(item.pblonsipScopeSeCode)"></td>
								<td>{{item.orgnNm}}</td>
								<td>{{item.userNm}}</td>
								<td>{{item.registDt}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--//table-->
			</div>

			<!--//tabCont-->
		</div>
		<!--//tabContWrap-->
	</section>
	<!--//section-->
</div>
</share-info-tab>