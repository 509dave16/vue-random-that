import { Model } from '@nozbe/watermelondb'
import { field, children, action } from '@nozbe/watermelondb/decorators'

export default class List extends Model {
  static table = 'lists'

  static associations = {
    items: { type: 'has_many', foreignKey: 'list_id' },
  }

  @field('name') name
  @children('items') items

  @action updateName(name) {
    return this.update(list => {
      list.name = name
    })
  }
  @action delete() {
    return this.destroyPermanently()
  }
}
