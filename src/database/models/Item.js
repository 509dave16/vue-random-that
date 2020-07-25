import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Item extends Model {
  static table = 'posts'
  static associations = {
    blogs: { type: 'belongs_to', key: 'list_id' },
  }

  @field('name') title
  @field('list_id') listId
  @field('done') done
  @relation('lists', 'list_id') list
}
