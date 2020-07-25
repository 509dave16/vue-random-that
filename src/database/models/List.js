import { Model } from '@nozbe/watermelondb'
import { field, children } from '@nozbe/watermelondb/decorators'

export default class List extends Model {
  static table = 'lists'

  static associations = {
    items: { type: 'has_many', foreignKey: 'list_id' },
  }

  @field('name') name
  @children('items') items
}
