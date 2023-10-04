<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="popup newLayer" style="display:none; width:900px;" v-bind:style="styleObj" id="newWebMapModal">
    <!--head-->
    <div class="head blue">
        <strong class="titPop">새 웹맵</strong>
        <div class="btnGroup">
            <button type="button" class="btnPopClose" @click="hide()" ><span class="hidden">팝업 닫기</span></button>
        </div>
    </div>
    <!--//head-->
    <!--cont-->
    <div class="cont">
        <div class="inner cScroll" style="max-height:650px;">
            <!--table-->
            <div class="table">
                <table>
                    <caption>상세정보</caption>
                    <colgroup>
                        <col style="width:200px;"/>
                        <col style="width:auto;"/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row"><span class="redDot"></span>제목<span class="colorType red">*</span></th>
                        <td><input type="text" ref="mapTitleInput" style="width:100%;"/></td>
                    </tr>
                    <tr>
                        <th scope="row"><span class="redDot"></span>설명</th>
                        <td><textarea ref="mapCnTextarea" style="width:100%;height:66px;"></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">썸네일</th>
                        <td>
                            <div class="innerMap">
                                <div class="imgArea">
                                	<img alt="썸네일" ref="thumImg" v-bind:style="thumImg.styleObj" width="210" height="140" style="display:none;"/>
                                    <div class="noImg" v-bind:style="noImgDiv.styleObj">
                                        <p>등록된 미리보기가 없습니다.</p>
                                    </div>
                                    <button type="button" class="btnEdit img" @click="editBoxShowAndHide"><span class="hidden">수정</span></button>
                                    <div class="editBox img" v-bind:class="{active : editBox.classObj.active}">
                                    	<input type="file" ref="imgRealUploadBtn" accept="image/*" @change="imgToDataURL" style="display:none;"/>
                                        <button type="button" 
                                        	class="btn" 
                                        	v-bind:class="{'black' : uploadBtn.classObj.black, 'grey2' : uploadBtn.classObj.grey2}" 
                                        	@click="imgUpload"  
                                        	@mouseover="uploadBtnMouseOver" 
                                        	@mouseleave="uploadBtnMouseLeave">
                                        	<span>업로드</span>
                                       	</button>
                                        <button type="button"
                                       	 	class="btn" 
                                       	 	v-bind:class="{'black' : currentDisplayBtn.classObj.black, 'grey2' : currentDisplayBtn.classObj.grey2}" 
                                       	 	@click="imgCurrentDisplay" 
                                       	 	@mouseover="currentDisplayBtnMouseOver" 
                                       	 	@mouseleave="currentDisplayBtnMouseLeave">
                                       	 	<span>현재화면</span>
                                    	</button>
                                        <button type="button" 
                                        	class="btn" 
                                        	v-bind:class="{'black' : deleteBtn.classObj.black, 'grey2' : deleteBtn.classObj.grey2}" 
                                        	@click="imgDelete" 
                                        	@mouseover="deleteBtnMouseOver" 
                                        	@mouseleave="deleteBtnMouseLeave">
                                        	<span>삭제</span>
                                       	</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--//table-->
            <div class="btnArea flexRight" style="margin-top:20px;">
                <button type="button" @click="save" class="btn blue lg newMap"><span>저&nbsp;&nbsp;&nbsp;장</span></button>
            </div>
        </div>
    </div>
    <!--//cont-->
</div>

