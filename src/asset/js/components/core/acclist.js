import Class from '../mixin/class';
import {default as Togglable, toggleHeight} from '../mixin/togglable';
import {$, $$, attr, filter, getIndex, hasClass, includes, index, isInView, scrollIntoView, toggleClass, unwrap, wrapAll, within, width, css, toFloat, addClass, removeClass, Transition} from '../../util';

export default {

    mixins: [Togglable],

    props: {
        targets: String,
        active: null,
        openText: String,
        closeText: String,
        collapsible: Boolean,
        multiple: Boolean,
        toggle: String,
        content: String,
        transition: String,
        offset: Number
    },

    data: {
        targets: '> .list',
        active: false,
        animation: [true],
        openSize:null,
        closeSize:null,
        openText:"열기",
        closeText:"닫기",
        clsOpen: 'mui_active',
        toggle: ' .ctrl',
        transition: 'ease',
        duration:300,
        offset: 0
    },

    computed: {

        items: {

            get({targets}, $el) {
                return $$(targets, $el);
            },

            watch(items, prev) {
                
                items.forEach(el => hide($(this.content, el), !hasClass(el, this.clsOpen)));

                if (prev || hasClass(items, this.clsOpen)) {
                    return;
                }
                
                const active = this.active !== false && items[Number(this.active)]
                    || !this.collapsible && items[0];

                if (active) {
                    this.toggle(active, false);
                }

            },

            immediate: true

        },

        toggles({toggle}) {
            return this.items.map(item => $(toggle, item));
        }

    },

    events: [

        {

            name: 'click',

            delegate() {
                return `${this.targets} ${this.$props.toggle}`;
            },

            handler(e) {
                e.preventDefault();
                console.log(index(this.toggles, e.current));
                this.toggle(index(this.toggles, e.current));
            }

        }

    ],

    methods: {

        toggle(item, animate) {
            
            let items = [this.items[getIndex(item, this.items)]];
            const activeItems = filter(this.items, `.${this.clsOpen}`);
            this.closeSize = toFloat(css(items, 'paddingLeft')) + toFloat(css(items, 'paddingRight')) + width(items);
            this.openSize = width(this.$el) - (this.closeSize * (this.items.length -1))
            
            // css(items, 'width', `${itemWidth}px`)
            // css(activeItems, 'width', `${minWidth}px`)
            // addClass(items, this.clsOpen);
            // removeClass(activeItems, this.clsOpen);
            if (!this.multiple && !includes(activeItems, items[0])) {
                items = items.concat(activeItems);
            }
            
            // console.log(items);
            items.forEach(el => this.toggleElement(el, !hasClass(el, this.clsOpen), (el, show) => {
                toggleClass(el, this.clsOpen, show);
                // return toggleAccordion(this)(el, show)
                css(items, 'width', `${this.openSize}px`);
                css(activeItems, 'width', `${this.closeSize}px`);
            }));
        }

    }

};

function hide(el, hide) {
    el && (el.hidden = hide);
}

function toggleAccordion({isToggled, duration, initProps, hideProps, transition, closeSize, openSize, _toggle}) {
    return (el, show) => {

        const inProgress = Transition.inProgress(el);
        // console.log(hideProps);
        // Transition.cancel(el);
        if(show){
            Transition.start(el, {width:`${openSize}px`}, 500, transition)
        }else{
            Transition.start(el, {width:`${closeSize}px`}, 500, transition)
        }
        
        // const inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
        // const currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;

        

        // if (!isToggled(el)) {
        //     _toggle(el, true);
        // }

        // height(el, '');

        // // Update child components first
        // fastdom.flush();

        // const endHeight = height(el) + (inProgress ? 0 : inner);
        // height(el, currentHeight);

        // return (show
        //     ? Transition.start(el, assign({}, initProps, {overflow: 'hidden', height: endHeight}), Math.round(duration * (1 - currentHeight / endHeight)), transition)
        //     : Transition.start(el, hideProps, Math.round(duration * (currentHeight / endHeight)), transition).then(() => _toggle(el, false))
        // ).then(() => css(el, initProps));

    };
}