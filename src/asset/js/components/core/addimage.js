import {
    $,
    addClass,
    removeClass,
    parent,
    hasAttr,
    css
} from '../../util';
export default {
    props: {
        target: String,
        addfile: String,
    },
    data: {
        active: 'mui_active',
        addfile: ' input[type="file"]',
        target:'',
        activeClass:"mui_active",
    },

    computed: {
        target({target}, $el) {
            return $(target, $el)
        },
    },
    events: [
        {
            name: 'change',
            delegate(){
                return this.$props.addfile;
            },
            handler(e) {
                const imageSrc = URL.createObjectURL(e.target.files[0]);
                addClass(this.target, this.activeClass)
                css(
                    this.target, {
                        "background-image":`url(${imageSrc})`,
                        "background-repeat":"no-repeat",
                        "background-position":"center",
                        "background-size":"100%"
                    }
                )
                // css(this.target, {"background":"#f00"})
            }
        },
    ],
};
