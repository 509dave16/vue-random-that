<template>
  <Page v-bind:headerTitle="listName" backHref="vrt-list">
    <ion-list ref="ionList">
      <ion-item-sliding v-for="item in sortedItems" v-bind:key="item.id">
        <ion-item v-on:click="toggleItemDone(item)" class="ion-activatable ripple-container">
          <ion-icon v-bind:name="itemIcon(item)" slot="start"/>
          <ion-label>{{item.name}}</ion-label>
          <ion-ripple-effect type="unbounded"></ion-ripple-effect>
        </ion-item>
        <ion-item-options>
          <ion-item-option color="primary" v-on:click="editItem(item)">Edit</ion-item-option>
          <ion-item-option color="danger" v-on:click="deleteItem(item)">Delete</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
    <ion-fab vertical="bottom" horizontal="end">
      <ion-fab-button v-on:click="toggleFabMenu">
        <ion-icon name="add" />
      </ion-fab-button>
      <ion-fab-list v-bind:activated="fabMenuActivated" side="top">
        <ion-fab-button v-on:click="toggleEditMode()">
          <ion-icon name="create-outline" />
        </ion-fab-button>
        <ion-fab-button v-on:click="showRandomItem()">
          <ion-icon name="shuffle" />
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
    <template v-slot:footer>
      <ion-toolbar v-show="editMode">
        <ion-buttons slot="start">
          <ion-button color="danger" v-on:click="cancelSaveItem">Cancel</ion-button>
        </ion-buttons>
        <ion-input v-bind:value="itemName" v-on:ionChange="itemNameChange" placeholder="Enter item name" />
        <ion-buttons slot="end">
          <ion-button v-on:click="saveItem">Submit</ion-button>
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

.ripple-container {
  overflow: hidden;
  position: relative;
}
</style>

<script>
import { alertController } from '@modus/ionic-vue'
import Page from '../../components/Page'
import database from '../../database'

import _ from 'lodash'

function randomNumber(max) {
  return Math.floor(Math.random() * max)
}

export default {
  components: {
    Page,
  },
  props: {
    listId: {
      default: () => null,
      type: String,
    },
    listName: {
      default: () => '',
      type: String,
    },
    list: {
      default: () => ({}),
      type: Object,
    },
    items: {
      default: () => [],
      type: Array,
    },
  },
  data: function() {
    return {
      editingItem: null,
      itemName: '',
      editMode: false,
      fabMenuActivated: false,
    }
  },
  computed: {
    sortedItems: function() {
      return _.sortBy(this.items, ['name'])
    },
  },
  methods: {
    itemIcon: function(item) {
      return item.done ? 'checkbox-outline' : 'square-outline'
    },
    deleteItem: function(item) {
      const ionListRef = this.$refs.ionList
      alertController
        .create({
          header: 'Confirm Deletion',
          message: `Are you sure you want to delete the item ${item.name}?`,
          buttons: [
            'Cancel',
            {
              text: 'Confirm',
              cssClass: 'confirm-deletion',
              handler: async () => {
                await item.delete()
                ionListRef.closeSlidingItems()
              },
            },
          ],
        })
        .then(alert => alert.present())
    },
    itemNameChange: function(event) {
      // console.log('Lists - listName - ioniChange event', event)
      this.itemName = event.detail.value
    },
    saveItem: async function() {
      if (!this.editingItem) {
        const itemsCollection = database.collections.get('items')
        await database.action(async () => {
          await itemsCollection.create(item => {
            item.name = this.itemName
            item.listId = this.listId
            item.done = false
          })
        })
      } else {
        await this.editingItem.updateName(this.itemName)
      }
      this.toggleEditMode()
    },
    cancelSaveItem: function() {
      this.toggleEditMode()
    },
    editItem: function(item) {
      this.toggleEditMode(item.name, item)
    },
    toggleFabMenu: function() {
      this.fabMenuActivated = !this.fabMenuActivated
    },
    toggleEditMode: function(itemName = '', editingItem = null) {
      this.fabMenuActivated = false
      this.itemName = itemName
      this.editingItem = editingItem
      this.$refs.ionList.closeSlidingItems()
      this.editMode = !this.editMode
    },
    showRandomItem: async function() {
      this.fabMenuActivated = false
      const randomItemResult = await this.randomItem()
      const ionListRef = this.$refs.ionList
      alertController
        .create({
          header: 'Accept Random Selection',
          message: `Do you want to accept the random selection of "${randomItemResult.item.name}"?`,
          buttons: [
            'Cancel',
            {
              text: 'Accept',
              handler: async () => {
                if (randomItemResult.resetDoneItems) {
                  await database.action(async () => {
                    const preparedUpdates = this.items.map(item => item.prepareUpdate(draftItem => (draftItem.done = false)))
                    await database.batch(preparedUpdates)
                  })
                }
                await this.toggleItemDone(randomItemResult.item)
                ionListRef.closeSlidingItems()
              },
            },
          ],
        })
        .then(alert => alert.present())
    },
    randomItem: async function() {
      if (this.items.length === 0) {
        return
      }
      const incompleteItems = this.items.filter(item => !item.done)
      let randomItem
      let resetDoneItems = false
      if (incompleteItems.length !== 0) {
        randomItem = incompleteItems[randomNumber(incompleteItems.length)]
      } else {
        resetDoneItems = true
        randomItem = this.items[randomNumber(this.items.length)]
      }
      return { item: randomItem, resetDoneItems }
    },
    toggleItemDone: async function(item) {
      await item.toggleDone()
    },
  },
}
</script>
