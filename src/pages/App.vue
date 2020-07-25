<template>
  <div class="ion-page ion-text-center">
    <ion-tabs ref="tabs" v-on:ionTabsDidChange="onTabChange">
      <ion-tab tab="Home">
        <Home />
      </ion-tab>
      <ion-tab tab="About">
        <About />
      </ion-tab>
      <ion-tab tab="Database">
        <Database />
      </ion-tab>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Home">
          <ion-icon class="tab-icon" v-bind:name="getIconName('Home', 'home')"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="About">
          <ion-icon class="tab-icon" v-bind:name="getIconName('About', 'information-circle')" />
          <ion-label>About</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Database">
          <ion-icon class="tab-icon" v-bind:name="getIconName('Database', 'cloud')" />
          <ion-label>Database</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </div>
</template>

<style>
.tab-icon {
  --color-selected: primary;
}
</style>

<script>
import Home from './Home.vue'
import About from './About.vue'
import Database from './Database'

import { home, homeOutline, informationCircleOutline, informationCircle, cloudOutline, cloud, } from "ionicons/icons";
import { addIcons } from "ionicons";
addIcons({
  home,
  'home-outline':homeOutline,
  'information-circle-outline': informationCircleOutline,
  'information-circle': informationCircle,
  'cloud-outline': cloudOutline,
  cloud,
});

export default {
  name: 'App',
  components: {
    Home,
    About,
    Database
  },
  data: function() {
    return {
      activeTab: 'Home'
    }
  },
  methods: {
    onTabChange: function (event) {
      console.log('<<<onTabChange - event', event)
      this.activeTab = event.detail.tab
    },
    getIconName: function (tab, iconName) {
      return iconName + (tab === this.activeTab ? '' : '-outline')
    }
  }
}
</script>
