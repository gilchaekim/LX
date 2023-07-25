import Container from '../mixin/container';
import Togglable from '../mixin/togglable';
import Position from '../mixin/position';
import {
    isTouch,
    flipPosition,
    pointerEnter,
    pointerDown,
    pointerLeave,
    on,
    once,
    append,
    within,
    matches,
    remove,
    offset,
    includes,
    css,
    $,
} from '../../util';
export default {
    mixins: [Container, Togglable, Position],
    props: {
        text: String,
    },
    data: {
        text: '',
        delay:0,
        offset:15,
        pos: 'bottom-center',
        animation: ['mui-animation-tooltip'],
        duration: 200,
        cls: 'mui_active',
    },
    connected () {
        // console.log(this.text);
    },
    events: {
        focus: 'show',
        blur: 'hide',

        [`${pointerEnter} ${pointerLeave}`](e) {
            if (!isTouch(e)) {
                this[e.type === pointerEnter ? 'show' : 'hide']();
            }
        },

        [pointerDown](e) {
            if (isTouch(e)) {
                this.show();
            }
        },
    },
    methods: {
        show() {
            if (this.isToggled(this.tooltip || null) || !this.text) {
                return;
            }

            this._unbind = once(
                document,
                `show keydown ${pointerDown}`,
                this.hide,
                false,
                (e) =>
                    (e.type === pointerDown && !within(e.target, this.$el)) ||
                    (e.type === 'keydown' && e.keyCode === 27) ||
                    (e.type === 'show' && e.detail[0] !== this && e.detail[0].$name === this.$name)
            );
            clearTimeout(this.showTimer);
            this.showTimer = setTimeout(this._show, this.delay);
        },
        _show() {
            this.tooltip = append(
                this.container,
                `<div class="mui_${this.$options.name}_content">
                    <div class="mui_arrow"></div>
                    <div class="mui_${this.$options.name}_inner"><span class="text">${this.text}</div>
                 </div>`
            );
            on(this.tooltip, 'toggled', (e, toggled) => {
                if (!toggled) {
                    return;
                }

                const position = this.positionAt(this.tooltip, this.$el);
                
                if (!!position?.cale) {
                    // console.log($('.mui_arrow', this.tooltip));
                    console.log(position.cale);
                    css($('.mui_arrow', this.tooltip), 'transform', `translateX(${position.cale * -1}px)`)
                }

                const [dir, align] = getAlignment(this.tooltip, this.$el, this.pos);
                this.origin =
                    this.axis === 'y'
                        ? `${flipPosition(dir)}-${align}`
                        : `${align}-${flipPosition(dir)}`;
            });

            this.toggleElement(this.tooltip, true);

        },
        async hide() {
            if (matches(this.$el, 'input:focus')) {
                return;
            }

            clearTimeout(this.showTimer);

            if (!this.isToggled(this.tooltip || null)) {
                return;
            }

            await this.toggleElement(this.tooltip, false, false);
            remove(this.tooltip);
            this.tooltip = null;
            this._unbind();
        },
    }
};


function getAlignment(el, target, [dir, align]) {
    const elOffset = offset(el);
    const targetOffset = offset(target);
    const properties = [
        ['left', 'right'],
        ['top', 'bottom'],
    ];

    for (const props of properties) {
        if (elOffset[props[0]] >= targetOffset[props[1]]) {
            dir = props[1];
            break;
        }
        if (elOffset[props[1]] <= targetOffset[props[0]]) {
            dir = props[0];
            break;
        }
    }

    const props = includes(properties[0], dir) ? properties[1] : properties[0];
    if (elOffset[props[0]] === targetOffset[props[0]]) {
        align = props[0];
    } else if (elOffset[props[1]] === targetOffset[props[1]]) {
        align = props[1];
    } else {
        align = 'center';
    }

    return [dir, align];
}
