<template>
  <ion-page class="ion-page">
    <slot name="header">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button v-bind:default-href="backHref"></ion-back-button>
          </ion-buttons>
          <ion-title mode="ios" class="ion-text-center">{{headerTitle}}</ion-title>
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

<script>
export default {
  name: 'Page',
  props: {
    headerTitle: {
      type: String,
      default: 'Title',
    },
    backHref: String,
  },
}
</script>
