<template>
  <div class="ion-page ion-text-center">
    <ion-tabs ref="tabs" v-on:ionTabsDidChange="onTabChange">
      <ion-tab tab="home">
        <Home />
      </ion-tab>
      <ion-tab tab="about">
        <ion-nav root="vrt-about" />
      </ion-tab>
      <ion-tab tab="database">
        <Database />
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
import Database from './tabs/Database'
import { handleNavigationDuplicated } from './utility/errors'

export default {
  name: 'App',
  components: {
    Home,
    Database,
  },
  data: function() {
    return {
      activeTab: 'home',
    }
  },
  methods: {
    onTabChange: function(event) {
      console.log('<<<onTabChange - event', event)
      this.activeTab = event.detail.tab
      this.$router.replace({ name: 'App', params: { tab: this.activeTab } }).catch(handleNavigationDuplicated)
    },
    getIconName: function(tab, iconName) {
      return iconName + (tab === this.activeTab ? '' : '-outline')
    },
  },
  watch: {
    $route(toRoute, fromRoute) {
      // react to route changes...
      console.log('<<<route change', toRoute, fromRoute)
      if (this.activeTab !== toRoute.params.tab) {
        this.activeTab = toRoute.params.tab
        this.$refs.tabs.select(this.activeTab)
      }
    },
  },
}
</script>
