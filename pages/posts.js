import { withApollo, compose } from 'react-apollo'
import Layout from '../components/Layout'
import withData from '../lib/withData'
import withFacebook from '../lib/withFacebook'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

const PostsPage = () => {
  return (
    <Layout>
      <PostForm />
      <PostList />
    </Layout>
  )
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
)(PostsPage)
