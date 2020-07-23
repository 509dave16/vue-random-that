import { Model } from '@nozbe/watermelondb'
import { field, children } from '@nozbe/watermelondb/decorators'

export default class Blog extends Model {
  static table = 'blogs'

  static associations = {
    posts: { type: 'has_many', foreignKey: 'blog_id' },
  }

  @field('name') name
  @children('posts') posts
}