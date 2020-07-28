<template>
  <Page headerTitle="Database">
    <ion-button v-on:click="generate100">Generate 100 More</ion-button>
    <ion-list>
      <ion-item v-for="blog in blogs" v-bind:key="blog.id">
        <ion-label>{{ blog.name }}</ion-label>
      </ion-item>
    </ion-list>
  </Page>
</template>

<script>
import { generate100 } from '../../database/models/generate'
import database from '../../database'
import Page from '../../components/Page.vue'

export default {
  components: {
    Page
  },
  props: {
    blogs: {
      default: function () { return [] },
      type: Array,
    }
  },
  methods: {
    generate100: function () {
      generate100(database)
    }
  },
  watch: {
    $props: {
      handler(nextProps) {
        console.log('<<<Database.vue - watch - $props', nextProps)
      },
      deep: true,
      immediate: true,
    }
  }
}
</script>
