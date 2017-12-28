import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Post from './Post'

function PostDetail({ loading, error, post }) {
  if (error) {
    return <div style={{ alignSelf: 'center', color: '#666' }}>error</div>
  }
  if (loading) {
    return <div style={{ alignSelf: 'center', color: '#666' }}>loading</div>
  }
  if (post) {
    return <Post post={post} />
  }
  return <div style={{ alignSelf: 'center', color: '#666' }}>Something went wrong.</div>
}

const PostQuery = gql`
  query post($id: String!) {
    post(id: $id) {
      _id
      author {
        _id
        firstname
        lastname
      }
      title
      createdAt
    }
  }
`

export default graphql(PostQuery, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ data: { loading, post, error } }) => ({
    loading,
    post,
    error,
  }),
})(PostDetail)
