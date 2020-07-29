<template>
  <Page headerTitle="About Test Innovators">
    <ion-grid class="ion-justify-content-center">
      <ion-row>
        <ion-text>
          Test Innovators was a different kind of experience. Working on only one platform. But it was a product line of sorts,
          which made it very interesting to work on. And there were always new, complex features to add. Plus we had the fixins
          to make lunch provided to us every day!
        </ion-text>
      </ion-row>
    </ion-grid>
  </Page>
</template>

<style>
ion-grid {
  height: 100%;
}
ion-row {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<script>
import Page from '../../components/Page'
export default {
  components: {
    Page,
  },
}
</script>
