import Lists from './Lists'
import withObservables from '../../components/containers/withObservables'
import getNavObservable from '../../observables/nav'
import database from '../../database'
import { customElement } from '../../utility/webComponent'

const ObservingLists = withObservables(null, function() {
  return {
    lists: database.collections.get('lists').query().observeWithColumns(['name'])
  }
})(Lists)
const ObservingNav = withObservables(null, () => ({ nav: getNavObservable() }))(ObservingLists)

customElement('vrt-lists', ObservingNav)

export default ObservingNav
