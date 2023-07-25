import Media from "../mixin/media";
import {
  $,
  addClass,
  after,
  Animation,
  assign,
  attr,
  css,
  fastdom,
  hasClass,
  inBrowser,
  isNumeric,
  isString,
  isVisible,
  noop,
  offset,
  offsetPosition,
  query,
  remove,
  removeClass,
  replaceClass,
  scrollTop,
  toFloat,
  toggleClass,
  toPx,
  trigger,
  within,
  dimensions,
  height as getHeight
} from '../../util';
import {cssPrefix} from 'GC-data';
export default {
  mixins: [Media],

  props: {
    start: null,
    end: null,
    offset: String,
    position: String,
    clsActive: String,
  },

  data: {
    
    /**
     * sticky 적용 시작점 위치
     * 
     * @property +-숫자, 셀렉터(#abcd), (px, vh, % 단위)
     * @default 0
     */
    start:0,

    /**
     * sticky 적용 끝 점 위치
     * 
     * @property +-숫자, 셀렉터(#abcd), (px, vh, % 단위)
     * @default 0
     */
    end: 0,

    offset: 0,

    position: 'top',

    clsActive: `${cssPrefix}active`,

    clsInactive: "",

    clsFixed: `${cssPrefix}fixed`,

    clsBelow: `${cssPrefix}below`,

    clsPlaceholder: `${cssPrefix}placeholder`

  },

  computed: {

  },

  connected() {

    this.placeholder = $(`+ .${this.clsPlaceholder}`, this.$el) || $(`<div>class="${this.clsPlaceholder}"</div>`);
    this.isActive = false,
    this.inactive = true
  
  },

  disconnected() {
  
    if (this.isActive) {
      this.hide();
      removeClass(this.selTarget, this.clsInactive);
    }
    remove(this.placeholder);
    this.placeholder = null;
    this.widthElement = null;

  },

  events: [
    {
      name: 'load hashchange popstate',
      el: window,
      handler() {
        // console.log('hahahaha');
      }
    }
  ],

  update: [
    {
      read({height = 0, margin}, types) {
        this.inactive = !this.matchMedia || isVisible(this.$el);
        // 비활성화 되었거나 미디어쿼리 범위에 벗어나면 실행 취소
        // if (this.inactive) return false

        if (this.isActive && types.has('resize')) {
          this.hide();
          height = this.$el.offsetHeight;
        }

        height = this.isActive ? height : this.$el.offsetHeight;

        const referenceElement = this.isActive ? this.placeholder : this.$el;
        
        this.topOffset = offset(referenceElement).top;

        const start = !!!this.start || parseProp(this.start, this.$el);

        this.width = dimensions(isVisible(this.widthElement) ? this.widthElement : this.$el).width;

        // this._data로 들어감
        return {
          height,
          start,
          margins: css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight']),
        };

      },

      write(data) {
        
        const { height, margins, start } = data;
        const { $el, placeholder } = this;
        css(placeholder, assign({height}, margins));

        if (!within(placeholder, document)) {
          after($el, placeholder);
          placeholder.hidden = true;
        }

      },

      events: ['resize'],
    },
    {
      read({scroll = 0}) {
        this.scroll = window.pageYOffset;
        return {
          dir: scroll <= this.scroll ? 'down' : 'up',
          scroll: this.scroll,
          visible: isVisible(this.$el),
          top: offsetPosition(this.placeholder)[0]
        };

      },
      write(data, type) {
        const {initTimestamp = 9, dir, lastDir, lastScroll, start, visible} = data;
        const now = performance.now();

        data.lastScroll = scroll;
        if ((this.topOffset - this.offset) <= this.scroll) {
          this.show();
        }else{
          this.hide();
        }
      },

      events: ['scroll', 'resize'],

    }
  ],
  methods: {
    show() {

      this.isActive = true;
      this.update();
      attr(this.placeholder, 'hidden', null);

    },

    hide() {

      this.isActive = false;
      removeClass(this.$el, this.clsFixed, this.clsBelow);
      css(this.$el, {position: '', top: '', width: ''});
      attr(this.placeholder, 'hidden', '');

    },
    update() {

      const active = this.top !== 0 || this.scroll > this.top;
      const {start} = this._data;
      let top = Math.max(0, this.offset);
      let position = 'fixed';

      if(isNumeric(this.bottom) && this.scroll > this.bottom - this.offset) {
        top = this.bottom - this.offsetParentTop;
        position = 'absolute';
      }

      css(this.$el, {
        position,
        top: `${top}px`,
        width: this.width
      })

    },
    setActive(active) {
      
      const prev = this.active;
      this.active = active;
      if(active) {
        replaceClass(this.selTarget, this.clsInactive, this.clsActive);
        prev !== active && trigger(this.$el, 'active');
      }else{
        replaceClass(this.selTarget, this.clsActive, this.clsInactive);
        prev !== active && trigger(this.$el, 'inactive');
      }

    }
  }

}

function parseProp(value, el, propsOffset = 0, padding) {
  if (!value) return 0;

  if (isNumeric(value) || (isString(value) && value.match(/^-?\d/))) {
    return propsOffset + toPx(value, 'height', el, true);
  } else {
    const refElement = value === true ? parent(el) : query(value, el);
    return (
      offset(refElement).bottom - 
      (
        padding && refElement && within(el, refElement)
          ? toFloat(css(refElement, 'paddingBottom')) : 0
      )
    )
  }
}
