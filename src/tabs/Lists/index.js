import Lists from './Lists'
import withObservables from '../../containers/withObservables'
import database from '../../database'
import { customElement } from '../../utility/webComponent'

const ObservingLists = withObservables(null, function() {
  return {
    lists: database.collections.get('lists').query().observe()
  }
})(Lists)

customElement('vrt-lists', ObservingLists)

export default ObservingLists
