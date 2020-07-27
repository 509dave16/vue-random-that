<template>
  <Page headerTitle="About Limelyte" backHref="about">
    <ion-grid class="ion-justify-content-center">
      <ion-row>
        <ion-text>
          Limelyte has one of the best open office environments I have had the pleasure to work in. There's tons of project variety ranging
          from background investigation, real estate, ecommerce, intranet tools, etc... . I even got to work on an app in Ionic with Angular!
          Unfortunately I was probably never going to make more than $55k. And I wanted to work on mobile apps fulltime, which wasn't going to happen
          to due a background investigation heavy clientele.
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
