import { withApollo, compose } from 'react-apollo'
import Layout from '../components/Layout'
import withData from '../lib/withData'
import withFacebook from '../lib/withFacebook'
import PostDetail from '../components/PostDetail'

const PostPage = ({ url }) => {
  return (
    <Layout>
      <PostDetail id={url.query.id} />
    </Layout>
  )
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
)(PostPage)
