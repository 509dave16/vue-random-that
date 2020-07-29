<template>
  <Page headerTitle="About Codera">
    <ion-grid class="ion-justify-content-center">
      <ion-row>
        <ion-text>
          Codera has been a great company to work for. Aside from pay not being received on the same day every month.
          I get to work remotely. The projects are all social platform mobile apps with a twist. And I get to work in React Native!
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
