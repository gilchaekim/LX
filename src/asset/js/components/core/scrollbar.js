import Class from '../mixin/class';
import {default as Togglable, toggleHeight} from '../mixin/togglable';
import {$, $$, attr, filter, getIndex, hasClass, includes, index, isInView, scrollIntoView, toggleClass, unwrap, wrapAll, within, width, css, toFloat, addClass, removeClass, Transition} from '../../util';
import Swiper from '../core/swiper';

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
        target: ' .edit_contents',
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
        target({target}, $el) {
            return $(target, $el)
        },
    },
    connected() {
        // new Swiper(slider, data);
        console.dir(Swiper);
        this.Swiper= new Swiper(this.target, {
            mousewheel: true,
            direction:"horizontal",
            slidesPerView: "auto",
            freeMode: true,
        });
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