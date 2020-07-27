import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)

export function customElement(tagName, component, options) {
  Vue.customElement(tagName, component, options)
}
