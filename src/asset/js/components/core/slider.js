import Class from '../mixin/class';
import Swiper from '../core/swiper'
import {
    $,
    $$,
    addClass,
    children,
    css,    
    append,
    attr,
    clamp,
    data,
    dimensions,
    findIndex,
    includes,
    last,
    toFloat,
    toggleClass,
    toNumber,
    hasClass,
    removeClass,
    randomStr,
} from '../../util/index';
import {cssPrefix} from 'GC-data'
let swiperData = {}
export default {
    mixins: [Class],
    props: {
        autoplay: Boolean,
        pagination:Boolean,
        paginationType:String,
        paging:Boolean,
        controller:Boolean,
        scrollbar:Boolean,
        loop:Boolean,
    },
    data: {
        index:0,
        delay:3000,
        autoplay: false,
        slider:'.slider',
        scrollbar:false,
        loop:true,
        paging:false,
        Swiper:null,
        clickable:true,
        controller:false,
        pagination:false,
        paginationType:"bullets", //	'bullets' | 'fraction' | 'progressbar' | 'custom'
        pagingTemplate : `<div class="swiper_page_nav">
            <em class="current"></em>
            <em class="total"></em>
        </div>`,
        controllerTemplate:`<div class="swiper_controller">
            <button type="button" class="control_btn"><span>재생/정지</span></button>
        </div>`,
        paginationTemplate:`<div class="swiper_pagenation"></div>`,
        scrollbarTemplate:`<div class="swiper_scrollbar"></div>`,
    },
    beforeConnect(){
        const cls = `swiper_${randomStr(8)}`
        let {autoplay, delay, pagination, paginationType, paginationTemplate, scrollbarTemplate, scrollbar} = this.$props;
        swiperData = {};
        
        if(autoplay){
            swiperData.autoplay = {
                delay:delay
            };
        }
        if(scrollbar){
            addClass(
                append(this.$el, scrollbarTemplate), 
                cls
            );            
            swiperData.scrollbar = {
                el:`.${cls}`,
            };
        }
        if(pagination){
            addClass(
                append(this.$el, paginationTemplate), 
                cls
            );
            swiperData.pagination = {
                el:`.${cls}`,
                type:paginationType
            }
        }
    },
    connected () {
        const { $el, pagingTemplate, $props, format, slider, setCurrentIndex, controller, controllerTemplate } = this;
        const data = Object.assign({}, $props, swiperData);
        this.Swiper = new Swiper(slider, data);
        if( this.paging ){
            this.paging = append($el, pagingTemplate);
            setCurrentIndex();
            $('.total', this.paging).innerHTML = format(this.Swiper.slides.length)
        }
        if( controller ){
            this.controller = append($el, controllerTemplate);
        }
        swiperEvents(this);
    },
    computed: {
        slider({slider}, $el) {
            return $(slider, $el);
        }
    },
    events: [
        {
            name: 'click',
            delegate() {
                return '.control_btn';
            },
            handler(e) {
                const btn = e.current;
                hasClass(btn, 'stop') ? this.play(btn) :  this.stop(btn);
            },
        },
    ],
    methods: {
        format(number) {
            return String(number).length === 1 ? `0${number}` : number;
        },
        play(el){
            const { Swiper } = this;
            Swiper.autoplay.start();
            removeClass(el, 'stop');
        },
        stop(el){
            const { Swiper } = this;
            Swiper.autoplay.stop();
            addClass(el, 'stop');
        },
        setCurrentIndex() {
            const { format, paging, Swiper } = this;
            const activeEl = Swiper.slides.find((el)=>hasClass(el, 'swiper-slide-active'));
            const activeIndex = Number(attr(activeEl, 'aria-label').split('/')[0]);
            
            $('.current', paging).innerHTML = format(activeIndex);
        }
    },
};


function swiperEvents(obj) {
    const { Swiper, paging, setCurrentIndex } =  obj;
    Swiper.on('slideChange', function () {
        setTimeout(()=>{
            !!paging && setCurrentIndex();
        }, 0)
    });
}