<template>
  <div>
    <div>Hello World</div>
    <button v-on:click="generate100">Generate 100 More</button>
    <ol>
      <li v-for="blog in blogs" v-bind:key="blog.id">
        {{ blog.name }}
      </li>
    </ol>
  </div>
</template>

<script>
import { generate100 } from '../../database/models/generate'
import database from '../../database'

export default {
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
