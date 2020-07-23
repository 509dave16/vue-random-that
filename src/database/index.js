import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import schema from './models/schema'
import modelClasses from './models'

const adapter = new LokiJSAdapter({
  version: 1,
  schema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
})

const database = new Database({
  adapter,
  modelClasses,
  actionsEnabled: true,
})

export default database
