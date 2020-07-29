import List from './List'
import { Q } from '@nozbe/watermelondb'
import withObservables from '../../containers/withObservables'
import database from '../../database'
import { customElement } from '../../utility/webComponent'

const ObservingList = withObservables(['listId'], function({ listId }) {
  return {
    list: database.collections.get('lists').findAndObserve(listId),
  }
})(List)

const ObservingItems = withObservables(['list'], function({ listId, list }) {
  console.log('<<<list - ', list)
  return {
    items: database.collections.get('items').query(Q.where('list_id', listId)).observeWithColumns(['name']),
  }
})(ObservingList)

customElement('vrt-list', ObservingItems)

export default ObservingItems
