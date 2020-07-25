import { createTable } from '@nozbe/watermelondb/Schema/migrations'

export default {
  toVersion: 2,
  steps: [
    createTable({
      name: 'lists',
      columns: [
        { name: 'name', type: 'string' }
      ]
    }),
    createTable({
      name: 'items',
      columns: [
        { name: 'list_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'done', type: 'boolean' }
      ]
    })
  ]
}
