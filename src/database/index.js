import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import schema from './models/schema'
import migrations from './migrations'
import modelClasses from './models'

const adapter = new LokiJSAdapter({
  version: 2,
  schema,
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
})

const database = new Database({
  adapter,
  modelClasses,
  actionsEnabled: true,
})

export default database
