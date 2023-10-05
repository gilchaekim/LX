<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page trimDirectiveWhitespaces="true" %>
<%@page import="org.slf4j.LoggerFactory"%>
<%@page import="org.slf4j.Logger"%>
<%@page import="java.net.*,java.io.*" %>
<%@page import="java.util.*" %>
<%@page import="java.net.URLDecoder" %>
<%@page import="javax.servlet.http.*" %>
<%@page import="org.springframework.util.StringUtils"%>
<%@page import="egovframework.com.cmm.service.EgovProperties"%>
<%@page import="org.springframework.web.util.HtmlUtils"%>
<%@page import="org.springframework.http.HttpStatus"%>
<%!
	private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger("proxyUrl.jsp");

	public int copyStream(InputStream in, OutputStream out) throws Exception {
		int length;
		byte[] buff = new byte[8192];

		while ((length = in.read(buff)) != -1) {
			out.write(buff, 0, length);
		}
		out.flush();
		return length;
	}

%>
<%
	String method = request.getMethod();
	String queryString = request.getQueryString();
	String url = request.getParameter("url");
	if(!StringUtils.isEmpty(queryString))
	{
		//throw new Exception("no parameters.");
		//String url = makeCallUrl(request);
		int questionIndex = url.indexOf("?");
		if(questionIndex >= 0) {
			url = url.substring(0, questionIndex);
			url = url + queryString.replaceAll("url=" + url, "");
		} else {
			url = url + "?" + queryString.replaceAll("url=" + url, "");
		}
	}
	
	System.out.println("url: " + url);

	out.clear(); // 제거시 spring 으로 구성된 프로젝트에서 getOutputStream() 에러가 발생합니다.
	URL resolved = new URL(url);
	HttpURLConnection connection = (HttpURLConnection)resolved.openConnection();
	connection.setConnectTimeout(1000 * 60);
	connection.setReadTimeout(1000 * 60);
	connection.setRequestProperty("apikey", EgovProperties.getPropertyCommon("api.key"));

	/* logger.info(method); */
	/* logger.info(EgovProperties.getPropertyCommon("api.key")); */

	if("POST".equalsIgnoreCase(method)) {
		connection.setDoOutput(true);
		connection.setRequestMethod(request.getMethod().toString());
		connection.setRequestProperty("Content-type", request.getContentType());
		
		if ((request.getContentType() != null && request.getContentType().startsWith("application/x-www-form-urlencoded"))) {
			
			StringBuffer parameters = new StringBuffer();
        	Enumeration<String> parameterNames = request.getParameterNames();
        	if(parameterNames.hasMoreElements()) {
        		while(parameterNames.hasMoreElements()) {
        			String parameterName = parameterNames.nextElement();
        			String[] parameterValues = request.getParameterValues(parameterName);
        			String parameterValue = Arrays.toString(parameterValues);
        			System.out.println("기존: " + parameterValue);
        			parameterValue = parameterValue.substring(1, parameterValue.length() - 1);
        			
        			//parameterName = URLDecoder.decode(parameterName, "UTF-8");
        			parameterName = parameterName.replaceAll("%", "%25");
        			parameterName = HtmlUtils.htmlUnescape(parameterName);
        			parameterName = parameterName.replaceAll("&apos;", "'");
    				//parameterValue = URLDecoder.decode(parameterValue, "UTF-8");
        			System.out.println("디코딩 : " + parameterValue);
        			parameterValue = parameterValue.replaceAll("%", "%25");
        			parameterValue = parameterValue.replaceAll("\\+", "%2B");
        			//parameterValue = parameterValue.split("\\*")[0];
    				parameterValue = HtmlUtils.htmlUnescape(parameterValue);
    				parameterValue = parameterValue.replaceAll("&apos;", "'");
        			System.out.println("html 태그변환 : " + parameterValue);
    				
        			parameters.append(parameterName + "=" + parameterValue);
        			parameters.append("&");
        		}
        	}
    		ByteArrayInputStream parameterStream = new ByteArrayInputStream(parameters.toString().getBytes());
        	copyStream(parameterStream, connection.getOutputStream());

        }
		
		copyStream(request.getInputStream(), connection.getOutputStream());
		
	} else {
		//
	}
	
	int responseCode = connection.getResponseCode();
	response.setStatus(responseCode);
	response.setContentType(connection.getContentType());
	
	if(!HttpStatus.valueOf(responseCode).is2xxSuccessful()) {
		copyStream(connection.getErrorStream(), response.getOutputStream());
	}
	else {
		copyStream(connection.getInputStream(), response.getOutputStream());
	}
	connection.disconnect();

%>