<template>
  <Page  headerTitle="Home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </Page>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Page from '../components/Page'

export default {
  name: "Home",
  components: {
    HelloWorld,
    Page,
  },
}
</script>
