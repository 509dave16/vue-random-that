export default function(BaseComponent, Mixin = {}, options= {}) {
  const propsSchema = BaseComponent.options
    ? BaseComponent.options.props
    : BaseComponent.props
  return {
    mixins: [Mixin],
    inheritAttrs: false,
    name: 'Forwarding',
    props: { ...propsSchema, ...{ forwardingDelayRender: {
      type: Boolean, default: () => options.forwardingDelayRender !== undefined ? options.forwardingDelayRender : true
    }} },
    components: { BaseComponent },
    render: function(createElement) {
      if (this.forwardingDelayRender === true && this.shouldNotRender) {
        return null
      }
      if (this.$props.listName) {
        console.log('<<<Forwarding - rendiering vrt-list with enhancing props', this.enhancingProps)
      }
      return createElement('BaseComponent', {
        attrs: this.$attrs,
        props: { ...this.$props, ...(this.enhancingProps || {}) },
        scopedSlots: this.$scopedSlots,
      })
    },
  }
}
