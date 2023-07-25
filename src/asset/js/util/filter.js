import {inBrowser} from './env';
import {isDocument, isElement, isString, noop, startsWith, toNode, toNodes} from './lang';

const voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};

/**
 * 요소가 다음에 해당되는 태그인지 확인 [area, base, br, col, embed, hr, img, input, keygen, link, menuitem, meta, param, source, track, wbr]
 * @param {element} element 
 * @returns Boolean
 */
export function isVoidElement(element) {
    return toNodes(element).some(element => voidElements[element.tagName.toLowerCase()]);
}

/**
 * 요소가 화면에  dislplay상태인지 확인
 * @param {element} element 
 * @returns Boolean
 */
export function isVisible(element) {
    return toNodes(element).some(element => element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

export const selInput = 'input,select,textarea,button';

/**
 * 요소가 form [input,select,textarea,button] 중 하나인가
 * @param {element} element 
 * @returns Boolean
 */
export function isInput(element) {
    return toNodes(element).some(element => matches(element, selInput));
}

export const selFocusable = `${selInput},a[href],[tabindex]`;

/**
 * 포커싱이 가능한 요소인가
 * @param {element} element 
 * @returns boolean
 */
export function isFocusable(element) {
    return matches(element, selFocusable);
}

/**
 * 부모요소 선택
 * @param {element} element 
 * @returns element의 부모 요소
 */
export function parent(element) {
    element = toNode(element);
    return element && isElement(element.parentNode) && element.parentNode;
}

export function filter(element, selector) {
    return toNodes(element).filter(element => matches(element, selector));
}

const elProto = inBrowser ? Element.prototype : {};
const matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || noop;

/**
 * element가 selector의 셀렉터로 css에서 선언되었는가
 * @param {element} element 
 * @param {string} selector css 셀렉터 문자열
 * @returns Boolean
 */
export function matches(element, selector) {
    return toNodes(element).some(element => matchesFn.call(element, selector));
}

const closestFn = elProto.closest || function (selector) {
    let ancestor = this;

    do {

        if (matches(ancestor, selector)) {
            return ancestor;
        }

    } while ((ancestor = parent(ancestor)));
};

/**
 * element의 상위 요소 중 selector와 일치되는 엘리먼트 반환
 * @param {element} element 
 * @param {string} selector 검색할 셀렉터 문자열
 * @returns element
 */
export function closest(element, selector) {
    return isElement(element)
        ? element.closest(startsWith(selector, '>') ? selector.slice(1) : selector)
        : toNodes(element)
            .map((element) => closest(element, selector))
            .filter(Boolean);
}

export function within(element, selector) {
    return isString(selector)
        ? !!closest(element, selector)
        : toNode(selector).contains(toNode(element));
}



/**
 * element의 부모 요소들 중 selector와 매칭되는 요소들 전부 선택
 * @param {element} element 
 * @param {string} selector 셀렉터 문자열
 * @returns 매칭되는 엘리먼드 배열
 */
export function parents(element, selector) {
    const elements = [];

    while ((element = parent(element))) {
        if (!selector || matches(element, selector)) {
            elements.push(element);
        }
    }

    return elements;
}

/**
 * element의 자식요소 중 selector와 매칭되는 엘리먼트를 반환
 * @param {element} element 
 * @param {string} selector 검색할 셀렉터 문자열
 * @returns selector와 매칭되는 엘리먼트
 */
export function children(element, selector) {
    element = toNode(element);
    const children = element ? toNodes(element.children) : [];
    return selector ? filter(children, selector) : children;
}
/**
 * array 중 몇번째에 element가 속해있는가
 * @param {array} element node lists
 * @param {element} ref 찾을 엘리먼트
 * @returns index
 */
export function index(element, ref) {
    return ref ? 
        toNodes(element).indexOf(toNode(ref)) : 
        children(parent(element)).indexOf(element);
}
