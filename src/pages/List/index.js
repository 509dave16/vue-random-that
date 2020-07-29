import List from './List'
import { Q } from '@nozbe/watermelondb'
import withObservables from '../../components/containers/withObservables'
import database from '../../database'
import { customElement } from '../../utility/webComponent'

const ObservingListAndItems = withObservables(['listId'], function({ listId }) {
  return {
    list: database.collections.get('lists').findAndObserve(listId),
    items: database.collections.get('items').query(Q.where('list_id', listId)).observeWithColumns(['name']),
  }
})(List)

customElement('vrt-list', ObservingListAndItems)
export default ObservingListAndItems
