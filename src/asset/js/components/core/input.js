import {
    $,
    addClass,
    removeClass,
    parent,
    hasAttr
} from '../../util';
export default {
    data: {
        active: 'mui_active',
    },
    events: [
        {
            name: 'focusin',
            handler(e) {
                if (hasAttr(this.$el, 'readonly') || hasAttr(this.$el, 'disabled')) return;
                addClass(parent(this.$el), this.active)
                
            }
        },
        {
            name: 'focusout',
            handler(e) {
                if (hasAttr(this.$el, 'readonly') || hasAttr(this.$el, 'disabled')) return;
                removeClass(parent(this.$el),  this.active)
            }
        }
    ],
};
