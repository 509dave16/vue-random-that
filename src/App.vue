<template>
  <div class="ion-page ion-text-center">
    <ion-tabs id="tabs" ref="tabs" v-on:ionTabsDidChange="onTabChange">
      <ion-tab tab="home">
        <Home />
      </ion-tab>
      <ion-tab tab="about">
        <ion-nav root="vrt-about" />
      </ion-tab>
      <ion-tab tab="database">
        <ion-nav root="vrt-database" />
      </ion-tab>
      <ion-tab tab="lists">
        <ion-nav root="vrt-lists" />
      </ion-tab>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-icon class="tab-icon" v-bind:name="getIconName('home', 'home')"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="about">
          <ion-icon class="tab-icon" v-bind:name="getIconName('about', 'information-circle')" />
          <ion-label>About</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="database">
          <ion-icon class="tab-icon" v-bind:name="getIconName('database', 'cloud')" />
          <ion-label>Database</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="lists">
          <ion-icon class="tab-icon" v-bind:name="getIconName('lists', 'list')" />
          <ion-label>Lists</ion-label>
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
/* eslint-disable vue/no-unused-components */
import Home from './tabs/Home.vue'
import getNavObservable from './observables/nav'

const debug = false

export default {
  name: 'App',
  components: {
    Home,
  },
  data: function() {
    return {
      activeTab: 'home',
    }
  },
  methods: {
    onTabChange: function(event) {
      debug && console.log('<<<onTabChange - event', event)
      this.activeTab = event.detail.tab
    },
    getIconName: function(tab, iconName) {
      return iconName + (tab === this.activeTab ? '' : '-outline')
    },
  },
  mounted: function() {
    if (debug) {
      getNavObservable().subscribe(value => {
        if (value) {
          console.log('<<<APP - ion nav for tab', value.getAttribute('root'))
        }
      })
    }
  },
}
</script>
