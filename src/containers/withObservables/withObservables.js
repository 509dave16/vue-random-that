import combineLatestObject from './combineLatestObject'
import mapObject from './mapObject'
import scheduleForCleanup from './garbageCollector'
import Forwarding from '../../inline/Forwarding'

const toObservable = value =>
  typeof value.observe === 'function' ? value.observe() : value

function identicalArrays(left, right) {
  if (left.length !== right.length) {
    return false
  }

  for (let i = 0, len = left.length; i < len; i += 1) {
    if (left[i] !== right[i]) {
      return false
    }
  }

  return true
}

const makeGetNewProps = getObservables =>
  // Note: named function for easier debugging
  function withObservablesGetNewProps(props) {
    const rawObservables = getObservables(props)
    const observables = mapObject(toObservable, rawObservables)
    return combineLatestObject(observables)
  }

function getTriggeringProps(props, propNames) {
  if (!propNames) {
    return []
  }

  return propNames.map(name => props[name])
}

export default function(triggerProps, getObservables) {
  let _subscription
  let _prefetchTimeoutCanceled = false

  const cancelPrefetchTimeout = () => {
    _prefetchTimeoutCanceled = true
  }

  const unsubscribe = () => {
    _subscription && _subscription.unsubscribe()
    cancelPrefetchTimeout()
  }

  const getNewProps = makeGetNewProps(getObservables)

  const Mixin = {
    data: function() {
      return {
        withObservablesData: {
          isFetching: true,
          values: {},
          triggeredFromProps: getTriggeringProps(this.$props, triggerProps),
        },
      }
    },
    computed: {
      shouldNotRender: function() {
        return this.withObservablesData.isFetching
      },
      enhancingProps: function() {
        console.log('<<<withObservables - computed - enhancingProps', this.withObservablesData)
        return { ...this.withObservablesData.values }
      },
    },
    methods: {
      subscribe(props, triggeredFromProps) {
        this.withObservablesData = {
          isFetching: true,
          values: {},
          triggeredFromProps,
        }
        this.subscribeWithoutSettingState(props)
      },
      subscribeWithoutSettingState(props) {
        unsubscribe()
        _subscription = getNewProps(props).subscribe(
          values => this.withObservablesOnChange(values),
          error => {
            // we need to explicitly log errors from the new observables, or they will get lost
            // TODO: It can be difficult to trace back the component in which this error originates. We should maybe propagate this as an error of the component? Or at least show in the error a reference to the component, or the original `getProps` function?
            console.error(`Error in Rx composition in withObservables()`, error)
          }
        )
      },
      // DO NOT rename (we want on call stack as debugging help)
      withObservablesOnChange(values) {
        console.log('<<<withObservables - withObservablesOnChange - values', values)
        this.withObservablesData = {
          ...this.withObservablesData,
          values,
          isFetching: false,
        }
      },
    },
    created: function() {
      this.subscribeWithoutSettingState(this.$props)
      scheduleForCleanup(() => {
        if (!_prefetchTimeoutCanceled) {
          console.warn(`withObservables - unsubscribing from source. Leaky component!`)
          unsubscribe()
        }
      })
    },
    watch: {
      $props: {
        handler(nextProps) {
          const { triggeredFromProps } = this.withObservablesData
          const newTriggeringProps = getTriggeringProps(nextProps, triggerProps)

          if (!identicalArrays(triggeredFromProps, newTriggeringProps)) {
            this.subscribe(nextProps, newTriggeringProps)
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted: function() {
      cancelPrefetchTimeout()

      if (!_subscription) {
        console.warn(
          `withObservables - component mounted but no subscription present. Slow component (timed out) or something weird happened! Re-subscribing`
        )

        const newTriggeringProps = getTriggeringProps(this.$props, triggerProps)
        this.subscribe(this.$props, newTriggeringProps)
      }
    },
    beforeDestroy: function() {
      unsubscribe()
    },
  }

  return function(BaseComponent) {
    return Forwarding(BaseComponent, Mixin)
  }
}
