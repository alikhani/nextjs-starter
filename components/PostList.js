import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FaUser } from 'react-icons/lib/fa'
import moment from 'moment'

import Post from './Post'

function PostList({ loading, error, posts }) {
  if (error) {
    return <div style={{ alignSelf: 'center', color: '#666' }}>error</div>
  }
  if (loading) {
    return <div style={{ alignSelf: 'center', color: '#666' }}>loading</div>
  }
  if (posts) {
    return (
      <div className="PostWrapper">
        <div className="PostList">
          {posts.map((post, i) =>
            <Post key={i} post={post} />
          )}
        </div>
        <style jsx>{`
          .PostWrapper {
            margin: 1em 0;
          }
        `}</style>
      </div>
    )
  }
  return <div style={{ alignSelf: 'center', color: '#666' }}>Something went wrong.</div>
}

const PostsQuery = gql`
  query posts($authorId: String) {
    posts(authorId: $authorId) {
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

export default graphql(PostsQuery, {
  options: ({ authorId }) => ({ variables: { authorId } }),
  props: ({ data: { loading, posts, error } }) => ({
    loading,
    posts,
    error,
  }),
})(PostList)
