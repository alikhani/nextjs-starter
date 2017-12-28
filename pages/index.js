import { withApollo, compose } from 'react-apollo'
import Layout from '../components/Layout'
import withData from '../lib/withData'
import withFacebook from '../lib/withFacebook'

const IndexPage = () => {
  return (
    <Layout>
      <h1>hello</h1>
    </Layout>
  )
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
)(IndexPage)
