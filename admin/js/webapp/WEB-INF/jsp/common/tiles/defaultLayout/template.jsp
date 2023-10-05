<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
    	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    	<meta http-equiv="X-UA-Compatible" content="ie=edge"/>
		<%@ include file="/WEB-INF/jsp/common/include/scriptInc.jspf" %>
		<%@ include file="/WEB-INF/jsp/common/include/taglibInc.jspf" %>
		<title>LX플랫폼 포털서비스</title>
		
		<script type="text/javascript">
			$(document).ready(function() {
				
				var msg = '<c:url value="${message}"/>';
				if(msg != null && msg != ""){
					callAlert('', msg);
					//alert(msg);
				}
				
			});
		</script>
	</head>
	
	<body>
		<div id="wrap">
			<tiles:insertAttribute name="header"/>
			<tiles:insertAttribute name="body"/>
			<tiles:insertAttribute name="footer"/>
		</div>
	</body>
</html>