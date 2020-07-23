import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, relation } from '@nozbe/watermelondb/decorators'

export default class Comment extends Model {
  static table = 'comments'
  static associations = {
    posts: { type: 'belongs_to', key: 'post_id' },
  }

  @field('body') body
  @field('post_id') postId
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
  @relation('posts', 'post_id') post
}