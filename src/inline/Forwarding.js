
import Vue from 'vue'
export default function(BaseComponent, Mixin) {
  const propsSchema = BaseComponent.options
    ? BaseComponent.options.props
    : BaseComponent.props
  return Vue.extend({
    mixins: [Mixin],
    inheritAttrs: false,
    name: "Forwarding",
    props: { ...propsSchema },
    components: { BaseComponent },
    render: function (createElement) {
      if (this.shouldNotRender) {
        return null
      }
      console.log('<<<Forwarding - should render!')
      return createElement(
        'BaseComponent', {
          attrs: this.$attrs,
          props: { ...this.$props, ...(this.enhancingProps || {})}
        },
      )
    },
  })
}
