import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PostList from '../components/PostList'

function Profile({ loading, error, user }) {
  if (error) {
    return <div style={{ alignSelf: 'center', color: '#666' }}>error</div>
  }
  if (loading) {
    return <div style={{ alignSelf: 'center', color: '#666' }}>loading</div>
  }
  if (user) {
    return (
      <div>
        <h1>{user.firstname}</h1>
        <PostList authorId={user._id} />
      </div>
    )
  }
  return <div style={{ alignSelf: 'center', color: '#666' }}>Something went wrong.</div>
}

const UserQuery = gql`
  query user($id: String!) {
    user(id: $id) {
      _id
      firstname
      lastname
    }
  }
`

export default graphql(UserQuery, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ data: { loading, user, error } }) => ({
    loading,
    user,
    error,
  }),
})(Profile)
