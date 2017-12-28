import { withApollo, compose } from 'react-apollo'
import Layout from '../components/Layout'
import withData from '../lib/withData'
import Profile from '../components/Profile'

const ProfilePage = ({ url }) => {
  return (
    <Layout>
      <Profile id={url.query.id} />
    </Layout>
  )
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
)(ProfilePage)
