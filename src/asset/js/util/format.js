import { toNumber } from "./lang";

/**
 * length 길이만큼 str길이를 잘라서 반환
 * @param {string} str 입력값
 * @param {number} length maxlength 길이
 * @returns str 길이 중 length길이만큼 자른 값
 */
export function headStr(str, length) {
  return str.slice(0, length);
}

/**
 * 숫자만 추출하여 반환
 * @param {string} val 평가 값
 * @returns val 숫자만
 */
export function numberOnly(val) {
  return val
    .replace(/[A-Za-z]/g, "")
    .replace(/[^\dM-]/g, "")
    .replace(/\-/g, "");
}

/**
 * 날짜 형식의 값으로 변환
 * @param {string} value 입력 값
 * @param {array} pattern 날짜 패턴 ([yyyy, mm, dd], [yy, mm, dd])
 * @returns 주어진 날짜 형식의 값
 */
export function dateFormat(value, pattern) {
  let valArr;
  let newVal = "";
  value = numberOnly(value);
  valArr = value.split("");
  for (let i = 0; i < pattern.length; i++) {
    let str = valArr.splice(0, pattern[i].length).join("");
    switch (pattern[i]) {
      case "yyyy": {
        break;
      }
      case "yy": {
        break;
      }
      case "mm": {
        if (str === "00") {
          str = "01";
        } else if (toNumber(str.slice(0, 1)) > 1) {
          str = `0${toNumber(str)}`;
        } else if (toNumber(str) > 12) {
          str = "12";
        }
        break;
      }
      case "dd": {
        if (str === "00") {
          str = "01";
        } else if (toNumber(str.slice(0, 1)) > 3) {
          str = `0${toNumber(str)}`;
        } else if (toNumber(str) > 31) {
          str = "31";
        }
        break;
      }
    }

    newVal += str;
  }
  return newVal;
}

/**
 * 숫자만 추출하여 반환
 * @param {string} value 입력 값
 * @param {string} delimiter 기호
 * @returns value 에서 delimiter를 뺀 값
 */
export function numerFormat(value, delimiter) {
  return numberOnly(value).replace(/(\d)(?=(\d{3})+$)/g, `$1${delimiter}`);
}

/**
 * 숫자만 추출하여 반환
 * @param {array} blocks 
 * @returns value 에서 delimiter를 뺀 값
 */
export function getMaxlength(blocks) {
  return blocks.reduce(function (previous, current) {
    return previous + current;
  }, 0);
}

export function uppercaseFormat(value) {
  return value.toUpperCase();
}
export function lowercaseFormat(value) {
  return value.toLowerCase();
}
/**
 * [ . ? * + ^ $ [ \ ] \ \ ( ) { } | - ]
 * 구분자를 받아 구분자를 검색하는 정규식문자를 만들어 반환
 * @param {string} delimiter 구분자
 * @returns 구분자를 찾는 정규식
 */
export function getDelimiterREByDelimiter(delimiter) {
  return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g");
}

/**
 * 입력값 중 delimiter, delimiters 와 일치하는 문자가 있으면 삭제 후 반환
 * @param {String} value 입력 값
 * @param {string} delimiter 구분자 문자열
 * @param {array} delimiters 구분자 배열
 * @returns 구분자를 삭제한 값
 */
export function getRawValue(value, delimiter, delimiters, maxlength) {
  // single delimiter
  if (delimiters.length === 0) {
    var delimiterRE = delimiter ? getDelimiterREByDelimiter(delimiter) : "";

    value = value.replace(delimiterRE, "");
  } else {
    // multiple delimiters
    delimiters.forEach(function (current) {
      current.split("").forEach(function (letter) {
        value = value.replace(getDelimiterREByDelimiter(letter), "");
      });
    });
  }

  return maxlength !== 0 ? headStr(value, maxlength) : value;
}

/**
 * value 에서 re를 검사하여 제거한 후 반환
 * @param {string} value 검사할 값
 * @param {RegExp} re 정규식
 * @returns 치횐된 값
 */
export function strip(value, re) {
  return value.replace(re, "");
}

/**
 * 입력값을 받아 가공하여 반환
 * @param {string} value 입력값
 * @param {array} blocks 구분 배열
 * @param {number} blocksLength 구분배열 길이
 * @param {string} delimiter 구분자
 * @param {array} delimiters 구분자 배열
 * @param {boolean} delimiterLazyShow 값이 입력된 후에 구분자를 붙일 것인가?
 * @returns 가공된 값
 */
export function getFormattedValue(
  value,
  blocks,
  delimiter,
  delimiters,
  delimiterLazyShow
) {
  var result = "",
    multipleDelimiters = delimiters.length > 0,
    currentDelimiter = "";

  // no options, normal input
  if (blocks.length === 0) {
    return value;
  }

  blocks.forEach(function (length, index) {
    if (value.length > 0) {
      var sub = value.slice(0, length),
        rest = value.slice(length);

      if (multipleDelimiters) {
        currentDelimiter = delimiters[index] || currentDelimiter;
      } else {
        currentDelimiter = delimiter;
      }

      if (delimiterLazyShow) {
        if (index > 0) {
          result += currentDelimiter;
        }

        result += sub;
      } else {
        result += sub;

        if (sub.length === length && index < blocks.length - 1) {
          result += currentDelimiter;
        }
      }

      // update remaining string
      value = rest;
    }
  });
  return result;
}

/**
 * 커서가 값의 끝에 위치할 경우 새 값의 길이 반환,
 *
 * @param {number} prevPos 입력박스 커서 위치 값 selectionEnd
 * @param {string} oldValue 입력박스 값
 * @param {string} newValue pps.result 값
 * @param {string} delimiter 구분자
 * @param {array} delimiters 구분자 배열
 * @returns 계산된 커서 인덱스
 */
export function getNextCursorPosition(
  prevPos,
  oldValue,
  newValue,
  delimiter,
  delimiters
) {
  // If cursor was at the end of value, just place it back.
  // Because new value could contain additional chars.
  if (oldValue.length === prevPos) {
    return newValue.length;
  }

  return (
    prevPos +
    getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters)
  );
}

export function getPositionOffset(
  prevPos,
  oldValue,
  newValue,
  delimiter,
  delimiters
) {
  var oldRawValue, newRawValue, lengthOffset;

  oldRawValue = getRawValue(oldValue.slice(0, prevPos), delimiter, delimiters);
  newRawValue = getRawValue(newValue.slice(0, prevPos), delimiter, delimiters);
  lengthOffset = oldRawValue.length - newRawValue.length;

  return lengthOffset !== 0 ? lengthOffset / Math.abs(lengthOffset) : 0;
}

/**
 * 입력박스 내 값의 선택영역을 설정한다.
 * start, end 두 값으로 지정하는데 시작과 끝의 값은 같다.
 * @param {element} element 엘리먼트
 * @param {number} position 커서 마지막 위치
 * @param {document} doc
 */
export function setSelection(element, position, doc) {
  if (element !== getActiveElement(doc)) {
    return;
  }

  // cursor is already in the end
  if (element && element.value.length <= position) {
    return;
  }

  if (element.createTextRange) {
    var range = element.createTextRange();

    range.move("character", position);
    range.select();
  } else {
    try {
      element.setSelectionRange(position, position);
    } catch (e) {
      // eslint-disable-next-line
      console.warn("The input element type does not support selection");
    }
  }
}

/**
 * document.actoveElement 반환
 * shadowRoot가 랜더랑 되었다면 shadowRoot에서 포커싱된 엘리먼드 재 검사
 * @param {element} parent 엘리먼트
 * @returns 포커싱 된 엘리먼트 반환
 */
export function getActiveElement(parent) {
  var activeElement = parent.activeElement;
  if (activeElement && activeElement.shadowRoot) {
    return getActiveElement(activeElement.shadowRoot);
  }
  return activeElement;
}

/**
 * 입력값의 마지막 문자가 delimiter 와 일치하는가? delimiter : ""
 * @param {string} value 입력 값
 * @param {string} delimiter 구분자 문자열
 * @param {array} delimiters 구분자 배열
 * @returns 구분자 또는 빈 문자열
 */
export function getPostDelimiter(value, delimiter, delimiters) {
  // single delimiter
  if (delimiters.length === 0) {
    return value.slice(-delimiter.length) === delimiter ? delimiter : "";
  }

  // multiple delimiters
  var matchedDelimiter = "";
  delimiters.forEach(function (current) {
    if (value.slice(-current.length) === current) {
      matchedDelimiter = current;
    }
  });

  return matchedDelimiter;
}
