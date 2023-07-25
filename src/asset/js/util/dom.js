import {on} from './event';
import {parent} from './filter';
import {find, findAll} from './selector';
import {isElement, isString, isUndefined, toNode, toNodes} from './lang';


/**
 * readyState 이후 실행
 * @param {function} fn readyState 이후 실행할 함수 내용
 */
export function ready(fn) {

    if (document.readyState !== 'loading') {
        fn();
        return;
    }

    const unbind = on(document, 'DOMContentLoaded', function () {
        unbind();
        fn();
    });
}

export function isTag(element, tagName) {
    return element?.tagName?.toLowerCase() === tagName.toLowerCase();
}

/**
 * element 자식노드의 내용을 모두 비움
 * @param {element} element 
 * @returns element
 */
export function empty(element) {
    element = $(element);
    element.innerHTML = '';
    return element;
}



export function html(parent, html) {
    parent = $(parent);
    return isUndefined(html)
        ? parent.innerHTML
        : append(parent.hasChildNodes() ? empty(parent) : parent, html);
}

/**
 * parent 자식 첫번째로 element 를 추가
 * @param {element} parent 타겟 엘리먼트
 * @param {element} element 추가 할 엘리먼드
 * @returns 추가된 엘리먼트
 */
export function prepend(parent, element) {

    parent = $(parent);

    if (!parent.hasChildNodes()) {
        return append(parent, element);
    } else {
        return insertNodes(element, element => parent.insertBefore(element, parent.firstChild));
    }
}

/**
 * parent 자식 마지막으로 element 를 추가
 * @param {element} parent 타겟 엘리먼트
 * @param {element} element 추가 할 엘리먼드
 * @returns 추가된 엘리먼트
 */
export function append(parent, element) {
    parent = $(parent);
    return insertNodes(element, element => parent.appendChild(element));
}

/**
 * ref의 이전 노드에 element를 추가
 * @param {element} ref 타겟 요소
 * @param {element} element 추가 할 엘리면트
 * @returns 추가된 엘리먼트
 */
export function before(ref, element) {
    ref = $(ref);
    return insertNodes(element, element => ref.parentNode.insertBefore(element, ref));
}

/**
 * ref의 다음 노드에 element를 추가
 * @param {element} ref 타겟 요소
 * @param {element} element 추가 할 엘리면트
 * @returns 추가된 엘리먼트
 */
export function after(ref, element) {
    ref = $(ref);
    return insertNodes(element, element => ref.nextSibling
        ? before(ref.nextSibling, element)
        : append(ref.parentNode, element)
    );
}

function insertNodes(element, fn) {
    element = isString(element) ? fragment(element) : element;
    return element
        ? 'length' in element
            ? toNodes(element).map(fn)
            : fn(element)
        : null;
}

/**
 * element를 삭제
 * @param {element} element 
 */
export function remove(element) {
    toNodes(element).forEach(element => element.parentNode && element.parentNode.removeChild(element));
}

/**
 * element를 structure로 랩핑
 * @param {element} element 
 * @param {string} structure  랩핑할 엘리먼트 문자열 ex) `<div>`
 * @returns structure element
 */
export function wrapAll(element, structure) {

    structure = toNode(before(element, structure));

    while (structure.firstChild) {
        structure = structure.firstChild;
    }

    append(structure, element);

    return structure;
}

/**
 * element하위요소 전부를 structure로 랩핑
 * @param {element} element 
 * @param {string} structure  랩핑할 엘리먼트 문자열 ex) `<div>`
 * @returns structure element
 */
export function wrapInner(element, structure) {
    return toNodes(toNodes(element).map(element =>
        element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure)
    ));
}

/**
 * 랜덤문자열 생성
 * @param {number} 길이
 * @return {string} 랜덤문자열
 */
export function randomStr(len){
    var keystr = '', x;
    for (var i = 0; i < len; i++) {
        x = Math.floor((Math.random() * 36));
        if (x < 10) {
            keystr += String(x);
        } else {
            keystr += String.fromCharCode(x + 87);
        }
    }
    return keystr;
}

/**
 * element요소의 하위 요소를 제외하고 제거 
 * @param {element} element 
 */
export function unwrap(element) {
    toNodes(element)
        .map(parent)
        .filter((value, index, self) => self.indexOf(value) === index)
        .forEach(parent => {
            before(parent, parent.childNodes);
            remove(parent);
        });
}

const fragmentRe = /^\s*<(\w+|!)[^>]*>/;
const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

/**
 * 전달된 문자열 형식의 html을 실제 엘리먼트러 전환
 * @param {string} html 엘리먼트로 전환될 문자열 형식의 html
 * @returns element
 */
export function fragment(html) {

    const matches = singleTagRe.exec(html);
    if (matches) {
        return document.createElement(matches[1]);
    }

    const container = document.createElement('div');
    if (fragmentRe.test(html)) {
        container.insertAdjacentHTML('beforeend', html.trim());
    } else {
        container.textContent = html;
    }

    return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;

}

/**
 * node 하위요소를 전부 탐색하여 fn으로 전달된 함수를 살행
 * @param {element} node 탐색할 node element
 * @param {function} fn 실행할 함수 
 */
export function apply(node, fn) {

    if (!isElement(node)) {
        return;
    }

    fn(node);
    node = node.firstElementChild;
    while (node) {
        const next = node.nextElementSibling;
        apply(node, fn);
        node = next;
    }
}

/**
 * selector와 매칭되는 단일 엘리먼트
 * @param {String} selector css 선택자 형식의 문자열
 * @param {element} context context
 * @returns element
 */
export function $(selector, context) {
    return isHtml(selector)
        ? toNode(fragment(selector))
        : find(selector, context);
}

/**
 * selector와 매칭되는 하나이상의 엘리먼트
 * @param {String} selector css 선택자 형식의 문자열
 * @param {element} context context
 * @returns element
 */
export function $$(selector, context) {
    return isHtml(selector)
        ? toNodes(fragment(selector))
        : findAll(selector, context);
}

function isHtml(str) {
    return isString(str) && (str[0] === '<' || str.match(/^\s*</));
}
