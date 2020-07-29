<template>
  <Page headerTitle="Lists" v-bind:backButton="false">
    <ion-list ref="ionList">
      <ion-item-sliding v-for="list in lists" v-bind:key="list.id">
        <ion-item v-on:click="goTo(list)">
          <ion-label>{{list.name}}</ion-label>
        </ion-item>
        <ion-item-options>
          <ion-item-option color="primary" v-on:click="editList(list)">Edit</ion-item-option>
          <ion-item-option color="danger" v-on:click="deleteList(list)">Delete</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
    <ion-fab vertical="bottom" horizontal="end">
      <ion-fab-button v-on:click="toggleEditMode()">
        <ion-icon name="add" />
      </ion-fab-button>
    </ion-fab>
    <template v-slot:footer>
      <ion-toolbar v-show="editMode">
        <ion-buttons slot="start">
          <ion-button color="danger" v-on:click="cancelCreateList">Cancel</ion-button>
        </ion-buttons>
        <ion-input v-bind:value="listName" v-on:ionChange="listNameChange" placeholder="Enter list name" />
        <ion-buttons slot="end">
          <ion-button v-on:click="createList">Submit</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </template>
  </Page>
</template>

<style>
Page {
  text-align: center;
}
.confirm-deletion {
  color: #eb445a !important;
}
</style>

<script>
import { alertController } from '@modus/ionic-vue'
import Page from '../../components/Page'
import database from '../../database'

import _ from 'lodash'

export default {
  components: {
    Page,
  },
  props: {
    lists: {
      default: () => [],
      type: Array,
    },
    nav: {
      default: () => null,
      type: HTMLElement,
    },
  },
  data: function() {
    return {
      editingList: null,
      listName: '',
      editMode: false,
    }
  },
  methods: {
    deleteList: function(list) {
      const ionListRef = this.$refs.ionList
      alertController
        .create({
          header: 'Confirm Deletion',
          message: `Are you sure you want to delete the list ${list.name}?`,
          buttons: [
            'Cancel',
            {
              text: 'Confirm',
              cssClass: 'confirm-deletion',
              handler: async function() {
                await list.delete()
                ionListRef.closeSlidingItems()
              },
            },
          ],
        })
        .then(alert => alert.present())
    },
    listNameChange: function(event) {
      // console.log('Lists - listName - ioniChange event', event)
      this.listName = event.detail.value
    },
    createList: async function() {
      if (!this.editingList) {
        const listsCollection = database.collections.get('lists')
        await database.action(async () => {
          await listsCollection.create(list => {
            list.name = this.listName
          })
        })
      } else {
        await this.editingList.updateName(this.listName)
      }
      this.toggleEditMode()
    },
    cancelCreateList: function() {
      this.toggleEditMode()
    },
    editList: function(list) {
      this.toggleEditMode(list.name, list)
    },
    toggleEditMode: function(listName = '', editingList = null) {
      this.listName = listName
      this.editingList = editingList
      this.$refs.ionList.closeSlidingItems()
      this.editMode = !this.editMode
    },
    goTo: function(list) {
      if (this.nav) {
        this.nav.push('vrt-list', { listId: list.id, listName: list.name })
      }
    },
  },
  watch: {
    $props: {
      handler(nextProps, prevProps) {
        console.log('<<<Lists.vue - watch - $props', nextProps)
        console.log('Is lists array same as before?', prevProps.lists === nextProps.lists)
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
