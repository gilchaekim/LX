import Class from './class';
import Container from './container';
import Togglable from './togglable';
import {
    $,
    addClass,
    append,
    attr,
    css,
    endsWith,
    includes,
    isFocusable,
    last,
    matches,
    on,
    once,
    parent,
    pointerCancel,
    pointerDown,
    pointerUp,
    removeClass,
    toFloat,
    within,
} from '../../util';
import { isSameSiteAnchor, preventBackgroundScroll } from './utils';

const active = [];

export default {
    mixins: [Class, Container, Togglable],

    props: {
        selPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean,
        role: String,
        layerd:Boolean,
    },

    data: {
        cls: 'mui_open',
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false,
        role: 'dialog',
        returnFocusTarget:null,
        layerd:true,
    },

    computed: {
        panel({ selPanel }, $el) {
            return $(selPanel, $el);
        },

        transitionElement() {
            return this.panel;
        },

        bgClose({ bgClose }) {
            return bgClose && this.panel;
        },
    },

    connected() {
        attr(this.panel || this.$el, 'role', this.role);

        if (this.overlay) {
            attr(this.panel || this.$el, 'aria-modal', true);
        }
    },

    beforeDisconnect() {
        if (includes(active, this)) {
            this.toggleElement(this.$el, false, false);
        }
    },

    events: [
        {
            name: 'click',

            delegate() {
                return `${this.selClose},a[href*="#"]`;
            },

            handler(e) {
                const { current, defaultPrevented } = e;
                const { hash } = current;
                if (
                    !defaultPrevented &&
                    hash &&
                    isSameSiteAnchor(current) &&
                    !within(hash, this.$el) &&
                    $(hash, document.body)
                ) {
                    this.hide();
                } else if (matches(current, this.selClose)) {
                    e.preventDefault();
                    this.hide();
                }
            },
        },

        {
            name: 'toggle',

            self: true,

            handler(e) {
                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                if (this.isToggled() === includes(active, this)) {
                    this.returnFocusTarget = e.detail[0].$el;
                    this.toggle();
                }
            },
        },

        {
            name: 'beforeshow',

            self: true,

            handler(e) {
                if (includes(active, this)) {
                    return false;
                }

                if (!this.stack && active.length ) {
                    if (this.layerd) {
                        active.push(this);
                        return false;    
                    }
                    Promise.all(active.map((modal) => modal.hide())).then(this.show);
                    e.preventDefault();
                } else {
                    active.push(this);
                }
            },
        },

        {
            name: 'show',

            self: true,

            handler() {
                if (this.stack) {
                    css(this.$el, 'zIndex', toFloat(css(this.$el, 'zIndex')) + active.length);
                }

                const handlers = [
                    this.overlay && preventBackgroundFocus(this),
                    this.overlay && preventBackgroundScroll(this.$el),
                    this.bgClose && listenForBackgroundClose(this),
                    this.escClose && listenForEscClose(this),
                ];

                once(
                    this.$el,
                    'hidden',
                    () => handlers.forEach((handler) => handler && handler()),
                    { self: true }
                );

                addClass(document.documentElement, this.clsPage);
            },
        },

        {
            name: 'shown',

            self: true,

            handler() {
                if (!isFocusable(this.$el)) {
                    attr(this.$el, 'tabindex', '-1');
                }
                active.forEach((arr, i) => (arr.$el !== this.$el) ? attr(arr.$el, 'tabindex', '') : '' )
                if (!matches(this.$el, ':focus-within') || this.layerd) {
                    this.$el.focus();
                }
            },
        },

        {
            name: 'hidden',

            self: true,

            handler() {
                if (includes(active, this)) {
                    active.splice(active.indexOf(this), 1);
                }

                css(this.$el, 'zIndex', '');

                if (!active.some((modal) => modal.clsPage === this.clsPage)) {
                    removeClass(document.documentElement, this.clsPage);
                }
                active.forEach((arr, i) => {
                    if (arr.$el !== this.$el) {
                        arr.$el.focus()
                        attr(arr.$el, 'tabindex', '-1');
                    }
                })
            },
        },
    ],

    methods: {
        toggle() {
            return this.isToggled() ? this.hide() : this.show();
        },

        show() {
            if (this.container && parent(this.$el) !== this.container) {
                append(this.container, this.$el);
                return new Promise((resolve) =>
                    requestAnimationFrame(() => this.show().then(resolve))
                );
            }

            return this.toggleElement(this.$el, true, animate);
        },

        hide() {
            return this.toggleElement(this.$el, false, animate);
        },
    },
};

function animate(el, show, self) {
    const { transitionElement, _toggle } = self;
    return new Promise((resolve, reject) =>
        once(el, 'show hide', () => {
            el._reject?.();
            el._reject = reject;

            _toggle(el, show);
            const off = once(
                transitionElement,
                'transitionstart',
                () => {
                    once(transitionElement, 'transitionend transitioncancel', resolve, {
                        self: true,
                    });
                    clearTimeout(timer);
                },
                { self: true }
            );

            const timer = setTimeout(() => {
                off();
                resolve();
            }, toMs(css(transitionElement, 'transitionDuration')));
        })
    ).then(() => {
        if(!show && !!self.returnFocusTarget){
            setTimeout(() => {
                self.returnFocusTarget.focus();
            }, 0);
        }
        return delete el._reject
    });
}

function toMs(time) {
    return time ? (endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000) : 0;
}

function preventBackgroundFocus(modal) {
    return on(document, 'focusin', (e) => {
        if (last(active) === modal && !within(e.target, modal.$el)) {
            modal.$el.focus();
        }
    });
}

function listenForBackgroundClose(modal) {
    return on(document, pointerDown, ({ target }) => {
        if (
            last(active) !== modal ||
            (modal.overlay && !within(target, modal.$el)) ||
            within(target, modal.panel)
        ) {
            return;
        }

        once(
            document,
            `${pointerUp} ${pointerCancel} scroll`,
            ({ defaultPrevented, type, target: newTarget }) => {
                if (!defaultPrevented && type === pointerUp && target === newTarget) {
                    modal.hide();
                }
            },
            true
        );
    });
}

function listenForEscClose(modal) {
    return on(document, 'keydown', (e) => {
        if (e.keyCode === 27 && last(active) === modal) {
            modal.hide();
        }
    });
}
