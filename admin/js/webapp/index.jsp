<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<jsp:forward page="/smt/webmap.do"/>
<h1>LX TEMPLATE 페이지 입니다. </h1>

<h2>새로운 프로젝트 생성방법</h2>

1) 프로젝트 workspace 폴더에서 lx.template를 복사하여 이름을 lx.[프로젝트명] 으로 변경<br>
2) 이클립스에서 lx프로젝트 f5를 눌러 새로고침하면 나타남<br>
3) .project파일에서 lx.template를 찾아 이름변경<br>
4) pom.xml에서 template 이름 변경<br>
<br>
5) .settings 폴더의 org.eclipse.wst.common 파일에서 template 이름변경<br>
6) .settings 폴더의  org.eclipse.wst.common.project.facet.core 파일에서 jst.web 버전 3.0으로 변경<br>
<br>
7) navigator에서 마우스 우클릭 >import > Existing Projects into Workspace 선택 next > select root directory에서 복사한 프로젝트 선택 후 finish<br>
8) was에서 추가 후 기동 > localhost:[포트]/[프로젝트명] 확인


 
	
