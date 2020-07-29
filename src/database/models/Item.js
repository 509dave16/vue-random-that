import { Model } from '@nozbe/watermelondb'
import { field, relation, action } from '@nozbe/watermelondb/decorators'

export default class Item extends Model {
  static table = 'items'
  static associations = {
    blogs: { type: 'belongs_to', key: 'list_id' },
  }

  @field('name') name
  @field('list_id') listId
  @field('done') done
  @relation('lists', 'list_id') list

  @action updateName(name) {
    return this.update(item => {
      item.name = name
    })
  }

  @action delete() {
    return this.destroyPermanently()
  }

  @action toggleDone() {
    return this.update(item => {
      item.done = !item.done
    })
  }
}
