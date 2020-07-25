import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

import addListsAndItemsCollectionsV2 from './addListsAndItemsCollectionsV2'

export default schemaMigrations({
  migrations: [addListsAndItemsCollectionsV2],
})
