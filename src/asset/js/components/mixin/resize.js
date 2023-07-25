import { observeResize } from '../../util';

export default {
    connected() {
        this.registerObserver(
            observeResize(this.$options.resizeTargets?.call(this) || this.$el, () =>
                this.$emit('resize')
            )
        );
    },
};
