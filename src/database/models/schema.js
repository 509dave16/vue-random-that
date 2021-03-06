import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'blogs',
      columns: [{ name: 'name', type: 'string' }],
    }),
    tableSchema({
      name: 'posts',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string', isOptional: true },
        { name: 'body', type: 'string' },
        { name: 'blog_id', type: 'string', isIndexed: true },
        { name: 'is_pinned', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'comments',
      columns: [
        { name: 'body', type: 'string' },
        { name: 'post_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'lists',
      columns: [{ name: 'name', type: 'string' }],
    }),
    tableSchema({
      name: 'items',
      columns: [
        { name: 'list_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'done', type: 'boolean' },
      ],
    }),
  ],
})
