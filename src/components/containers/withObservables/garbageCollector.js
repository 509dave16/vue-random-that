const cleanUpBatchingInterval = 250 // ms
const cleanUpInterval = 2000 // ms

let pendingCleanupActions = []
let scheduledCleanUpScheduler = null

function cleanUpWithObservablesActions(actions) {
  actions.forEach(action => action())
}

function scheduleCleanUp() {
  scheduledCleanUpScheduler = null
  const actions = pendingCleanupActions.slice(0)
  pendingCleanupActions = []
  setTimeout(() => {
    cleanUpWithObservablesActions(actions)
  }, cleanUpInterval)
}

// Apparently, setTimeout/clearTimeout functions are very expensive (22 microseconds/call)
// But we must schedule a cleanup / garbage collection action
// (https://github.com/facebook/react/issues/15317#issuecomment-491269433)
// The workaround is this: all cleanup actions scheduled within a 250ms window will be scheduled
// together (for 2500ms later).
// This way, all actions within that window will only call setTimeout twice
function scheduleForCleanup(fn) {
  pendingCleanupActions.push(fn)

  if (!scheduledCleanUpScheduler) {
    scheduledCleanUpScheduler = setTimeout(scheduleCleanUp, cleanUpBatchingInterval)
  }
}

export default scheduleForCleanup
