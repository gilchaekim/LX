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
        blocks : ' .blocks',
        slide:" .swiper-wrapper > .swiper-slide",
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
        this.setSize()
        this.Swiper= new Swiper(this.target, {
            mousewheel: true,
            direction:"horizontal",
            slidesPerView: "auto",
            freeMode: true,
        });
    },

    methods: {

        setSize() {
            let itemsWidth = $$(this.blocks).reduce((size, element) => {
                return size + width(element) + toFloat(css(element, 'marginLeft'));
            }, 0);
            css($(this.slide), 'width', `${itemsWidth}px`)
        }

    }

};