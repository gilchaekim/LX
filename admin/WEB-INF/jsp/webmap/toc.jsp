<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <div id="toc">
        <!-- toc 1뎁스-->
        <div class="toc dep1 tocWidget">
            <div class="inner">
                <!--head-->
                <div class="head">
                    <strong class="titToc" id="tocNm">새 지도</strong>
                    <div class="btnGroup">
                        <button type="button" class="btnTocHide"><span class="hidden">숨기기</span></button>
                    </div>
                </div>
                <!--//head-->
                <!--cont-->
                <div class="cont cScroll">
                    <div class="inner" id="tocWidget">
                    </div>
                </div>
                <!--//cont-->
            </div>
        </div>
        <!--// toc 1뎁스-->
        <!-- toc 2뎁스-->
        <div class="toc dep2 popupWidget" id="layerDetailDiv">
            <div class="inner">
                <!--head-->
                <div class="head">
                    <div class="titBox">
                        <strong class="titToc" id="layerTile"></strong>
                        <button type="button" class="btnTip" id="lyrDetailBtn"><span
                                class="hidden">팁</span><span>!</span></button>
                    </div>
                    <div class="btnGroup">
                        <button type="button" class="btnTocHide" id="btnTocHide_toc"><span
                                class="hidden">숨기기</span></button>
                        <button type="button" class="btnTocClose" id="btnTocClose_toc"><span
                                class="hidden">닫기</span></button>
                    </div>
                </div>
                <!--//head-->
                <!--cont-->
                <div class="cont cScroll">
                    <div id="layerDetailWidget"></div>
                    <!--//cont-->
                </div>
            </div>
            <!--// toc 2뎁스-->
        </div>
    </div>