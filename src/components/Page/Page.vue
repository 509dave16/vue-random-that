<template>
  <ion-page class="ion-page">
    <slot name="header">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button v-on:click.prevent="onBack" v-bind:default-href="defaultHref"></ion-back-button>
          </ion-buttons>
          <ion-title mode="ios" class="center">{{headerTitle}}</ion-title>
        </ion-toolbar>
      </ion-header>
    </slot>

    <ion-content>
      <slot></slot>
    </ion-content>

    <ion-footer>
      <slot name="footer"></slot>
    </ion-footer>
  </ion-page>
</template>

<style>
.center {
  text-align: center;
}
</style>

<script>
export default {
  name: 'Page',
  props: {
    headerTitle: {
      type: String,
      default: 'Title',
    },
    nav: {
      default: () => null,
      type: HTMLElement,
    },
    backButton: {
      default: () => true,
      type: Boolean,
    },
  },
  computed: {
    defaultHref: function() {
      if (!this.backButton || !this.nav) {
        return undefined
      }
      return this.nav.children.length > 1 ? '#' : undefined
    },
  },
  methods: {
    onBack: function() {
      console.log('<<<List.vue - Responding to back button press')
      if (this.nav) {
        this.nav.pop()
      }
    },
  },
}
</script>
