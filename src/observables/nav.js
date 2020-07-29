import { Observable } from 'rxjs'
import { distinct } from 'rxjs/operators'
import _ from 'lodash'

const debug = false

let navObservable
export default function getNavObservable() {
  if (navObservable) {
    return navObservable
  }
  let lastIonNav = null
  navObservable = new Observable(observer => {
    const targetNode = document.getElementsByTagName("ION-APP")[0]
    // console.log('<<<observable/nav - ion app node -', targetNode)
    const config = { attributes: true, subtree: true, attributeFilter: ['class'] }
    const onMutation = mutationsList => {
      let value = lastIonNav
      for (const mutation of mutationsList) {
        const { target } = mutation
        if (target.tagName === 'ION-TAB' && !target.className.includes('tab-hidden')) {
          debug && console.log('<<<ION TAB not hidden descendant mutation -', mutation)
          if (_.get(target, 'firstChild.tagName') === 'ION-NAV') {
            value = lastIonNav = target.firstChild
            debug && console.log('<<<ION TAB not hidden ion nav descendant', target.firstChild)
          } else {
            value = lastIonNav = null
          }
          break
        }
      }
      observer.next(value)
    }
    const mutation = new MutationObserver(onMutation)
    mutation.observe(targetNode, config)
    const unsubscribe = () => {
      mutation.disconnect()
    }
    return unsubscribe
  })

  return navObservable.pipe(distinct(value => value === null ? null : value.getAttribute('root')))
}
