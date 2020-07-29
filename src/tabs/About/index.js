import withObservables from '../../components/containers/withObservables'
import getNavObservable from '../../observables/nav'
import { customElement } from '../../utility/webComponent'
import About from './About'

const ObservingNav = withObservables(null, () => ({ nav: getNavObservable() }))(About)
customElement('vrt-about', ObservingNav)

export default ObservingNav
