import withObservables from '../containers/withObservables'
import getNavObservable from '../../observables/nav'
import Page from './Page'

const ObservingNav = withObservables(null, () => ({ nav: getNavObservable() }))(Page)
export default ObservingNav
