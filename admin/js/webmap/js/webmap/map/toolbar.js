$(document).ready(function(){
	/* 
	 * 현재 시연 대응으로 ODF로 기능을 구현합니다. 
	 * 추후 위젯으로 변경 예정입니다.
	 *  */

	/* 2뎁스가있는 툴바 공통 클릭 이벤트 */
	const toobarAddOnClickEvent = (tool) => {
		
		tool.addEventListener('click', () => {
			const siblingNodes = Array.from(tool.closest('li').parentElement.children); //이벤트툴의 형제 노드 배열화		
			siblingNodes.forEach((item)=> {
				if(!item.classList.contains(tool.closest('li').classList[0])) { //이미열려있는 다른툴의 2뎁스 off
					item.classList.contains('active') && item.classList.remove('active');
				} else { //누른툴의 2뎁스 on off
					if(item.closest('li').classList.contains('active')) {
						item.closest('li').classList.remove('active');
					} else {
						item.closest('li').classList.add('active');
					}
				}
			});
			
		});
	};
	/* ---------- TODO 축척 슬라이더 ---------- */
	/* ODF 줌 컨트롤 생성 */
//	const zoomControl = new odf.ZoomControl({ zoomSlider: true, });
//	zoomControl.setMap(map);
//
//	/* 지도 확대 */
//	const btnZoomIn = document.querySelector('#btnZoomIn');
//	btnZoomIn.addEventListener('click', () => {
//		zoomControl.zoomIn();
//	});
//
//	/* 지도 축소 */
//	const btnZoomOut = document.querySelector('#btnZoomOut');
//	btnZoomOut.addEventListener('click', () => {
//		zoomControl.zoomOut();
//	});
//
//	/* 지도 확대 축소 슬라이더 아래 변경이벤트 축척 슬라이더 제어 참고 */
//	$('.slideBar.mapStyle').slider({
//		orientation: "vertical",
//	  	min : 8,
//	  	max : 23,
//	  	value : 9,
//	  	step: 1,
//	  	range: "min",
//	  	slide: function( event, ui ) {
//	  		map.getView().setZoom(ui.value);	
//		}
//	});
//
//	/* ODF 툴바 감추기 */
//	const odfControl = document.querySelector("#map_odfControl");
//	odfControl.style.display = "none";

})
	


