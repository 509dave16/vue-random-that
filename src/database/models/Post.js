import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, children, relation } from '@nozbe/watermelondb/decorators'

export default class Post extends Model {
  static table = 'posts'
  static associations = {
    blogs: { type: 'belongs_to', key: 'blog_id' },
    comments: { type: 'has_many', foreignKey: 'post_id' },
  }

  @field('title') title
  @field('subtitle') subtitle
  @field('body') body
  @field('is_pinned') isPinned
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
  @children('comments') comments
  @relation('blogs', 'blog_id') blog
}