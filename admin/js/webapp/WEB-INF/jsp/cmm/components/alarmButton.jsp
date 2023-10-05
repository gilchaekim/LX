<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<alarm-button inline-template ref="alarmButton">
	<div class="btnAlarmDiv">
	<button type="button" class="btnAlarm" @click="alarmModalShowAndHide()">
	    <span class="hidden">알림</span>
	    <template v-if="data.alarmData">
	    	<span class="new type02">{{ data.alarmData.pageInfo.totalCount }}</span>
	    </template>
	    <template v-else>
	    	<span class="new type02">0</span>
	    </template>
	</button>
	<div class="alarmLoading"></div>
	</div>
</alarm-button>