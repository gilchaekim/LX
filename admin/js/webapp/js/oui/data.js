app = window.app || {};
app.oui = app.oui || {};

((app) => {
	
	app.oui.data = {
			spatialAnalysisWidget : {
			    sumry: {
			        name: '데이터 요약 분석',
			        child: {
			            ag: {
			                name: '포인트집계 분석'
			            },
			            join: {
			                name: '조인피처 분석'
			            },
			            nrby: {
			                name: '주변요약 분석'
			            },
			            range: {
			                name: '범위내요약 분석'
			            },
			            center: {
			                name: '중심 및 분산요약 분석',
			            },
			            extractPoint: {
			            	name: '포인트 속성값 추출'
			            }
			        }
			    },
			    lc: {
			        name: '위치찾기 분석',
			        child: {
			            searchLegacy: {
			                name: '기존 위치 찾기 분석'
			            },
			            searchNew: {
			                name: '새 위치 파생 분석'
			            },
			            searchCenter: {
			                name: '중심찾기 분석'
			            },
			            searchSimilar: {
			                name: '유사한 위치 찾기 분석'
			            },
			            searchLine: {
			                name: '라인 위치 찾기 분석'
			            },
			            searchGeoPoint: {
		            		name: "좌표 포인트 생성",
			            }			            
			        }
			    },
			    pttrn: {
			        name: '공간패턴 분석',
			        child: {
			        	density: {
			                name: '밀도 계산 분석'
			        	},
		        	    hotspot: {
		        	    	name: '핫 스팟 분석'
		        	    },
		        	    gatherPoints: {
		                    name: '포인트 군집 분석'
		                },
		                interpolatePoints: {
		                    name: '포인트 내삽 찾기 분석'
		                },
		                searchOutliers: {
		                    name: '이상치 찾기 분석'
		                }
			        }
			    },
			    proximity: {
			        name: '근접도 분석',
			        child: {
			        	connectDestination: {
			                name: '출발지와 목적지 연결 분석'
			            },
			            buffer: {
			                name: '버퍼 생성 분석'
			            },
			            drivingArea: {
			                name: '운전시간 영역 생성 분석'
			            },
			            findNearestPoint: {
			                name: '최근접 위치찾기 분석'
			            },
			            findPath: {
			                name: '경로계획 분석'
			            },
			            severalDeparturesFindPath: {
			                name: '다중 출발지 경로 분석'
			            },
			            severalDestinationFindPath: {
			                name: '다중 목적지 경로 분석'
			            },
			            predictPath: {
			            	name: '경로예측 분석'
			            }
			        }
			    },
			    manage: {
			        name: '데이터 관리 분석',
			        child: {
			        	dsslve: {
			                name: '경계 디졸브'
			            },
			            extrc: {
			                name: '데이터 추출'
			            },
			            dvsion: {
			                name: '공간 분할 생성'
			            },
			            merge: {
			                name: '레이어 병합'
			            },
			            'ovrlay/erase': {
			                name: '레이어 중첩(지우기)'
			            },
			            'ovrlay/intsct': {
			                name: '레이어 중첩(교차)'
			            },
			            'ovrlay/union': {
			                name: '레이어 중첩(유니온)'
			            },
			            clustering: {
			                name: '클러스터링'
			            },
			            ar: {
			                name: '면적 계산'
			            },
			            lt: {
			                name: '길이 계산'
			            },
			            calculateField: {
		            		name: "필드 계산"
			            },			            
			            multiToSingle: {
			                name: '다중 객체분할'
			            },
			            boundary : {
			                name: '객체 최소 경계 표출'
			            },
			            featureVertice: {
			            	name: '정점 추출'
			            },
			            shapeFill: {
			            	name: '도형 채우기'
			            }
			        }
			    },
			    coord: {
			        name: '좌표변환',
			        child: {
			        	file: {
			                name: '파일 좌표 변환'
			            },
			            single: {
			                name: '단일 좌표 변환'
			            }
			        }
			    }
			}
	}
})(app);             