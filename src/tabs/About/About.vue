<template>
  <Page headerTitle="About" v-bind:backButton="false">
    <ion-button color="primary" fill="clear" v-on:click="goTo('vrt-about-codera')">Codera</ion-button>
    <ion-button color="primary" fill="clear" v-on:click="goTo('vrt-about-limelyte')">Limelyte</ion-button>
    <ion-button color="primary" fill="clear" v-on:click="goTo('vrt-about-test-innovators')">Test Innovators</ion-button>
  </Page>
</template>

<style>
ion-button:nth-child(2) {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

Page {
  text-align: center;
}
</style>

<script>
import Page from '../../components/Page'

export default {
  components: {
    Page,
  },
  props: {
    nav: {
      default: () => null,
      type: HTMLElement,
    },
  },
  methods: {
    goTo: function(page) {
      if (this.nav) {
        this.nav.push(page)
      }
    },
  },
}
</script>
