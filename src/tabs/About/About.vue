<template>
  <Page headerTitle="About">
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
import { push } from '../../utility/nav'
import Page from '../../components/Page'

export default {
  components: {
    Page,
  },
  methods: {
    goTo: function(page) {
      push(page)
    },
  },
}
</script>
