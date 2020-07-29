<template>
  <Page v-bind:headerTitle="listName">
    <ion-list ref="ionList">
      <ion-item-sliding v-for="item in items" v-bind:key="item.id">
        <ion-item>
          <ion-label>{{item.name}}</ion-label>
        </ion-item>
        <ion-item-options>
          <ion-item-option color="primary" v-on:click="editItem(item)">Edit</ion-item-option>
          <ion-item-option color="danger" v-on:click="deleteItem(item)">Delete</ion-item-option>
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
          <ion-button color="danger" v-on:click="cancelSaveItem">Cancel</ion-button>
        </ion-buttons>
        <ion-input v-bind:value="itemName" v-on:ionChange="itemNameChange" placeholder="Enter item name" />
        <ion-buttons slot="end">
          <ion-button v-on:click="createItem">Submit</ion-button>
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
    }
  },
  methods: {
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
              handler: async function() {
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
    createItem: async function() {
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
    toggleEditMode: function(itemName = '', editingItem = null) {
      this.itemName = itemName
      this.editingItem = editingItem
      this.$refs.ionList.closeSlidingItems()
      this.editMode = !this.editMode
    },
  watch: {
    $props: {
      handler(nextProps, prevProps) {
        console.log('<<<List.vue - watch - $props', nextProps)
        console.log('Is items array same as before?', prevProps.items === nextProps.items)
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
