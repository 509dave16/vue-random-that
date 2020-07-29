import Database from './Database.vue'
import withObservables from '../../components/containers/withObservables'
import database from '../../database'
import { customElement } from '../../utility/webComponent'

const ObservingBlogs = withObservables(null, () => ({
  blogs: database.collections.get('blogs').query().observe()
}))(Database)
customElement('vrt-database', ObservingBlogs)

export default ObservingBlogs
