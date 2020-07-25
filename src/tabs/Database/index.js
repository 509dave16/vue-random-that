import Database from './Database.vue'
import withObservables from '../../containers/withObservables'
import database from '../../database'

export default withObservables(null, () => ({
  blogs: database.collections.get('blogs').query().observe()
}))(Database)