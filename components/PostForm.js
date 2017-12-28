import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  updateTitle(e) {
    const title = e.target.value.trim();
    if (title) {
      this.setState({ title });
    }
  }

  submitPost(e) {
    e.preventDefault()
    const { title } = this.state;
    this.props.createPost({ title });
    this.setState({ title: '' });
  }

  render() {
    return (
      <div className="FormBox">
        <textarea type="text" placeholder="What do you have to say?" onChange={this.updateTitle} value={this.state.title} />
        <button onClick={this.submitPost}>Post</button>
        <style jsx>{`
          .FormBox {
            padding: 1em;
            background: #E8F5FD;
          }
          textarea {
            resize: none;
            box-sizing: border-box;
            width: 100%;
            padding: 0.5em;
            border-radius: 3px;
            border: 1px solid rgba(100, 100, 100, .3);
            transition: all 0.15s linear;
            margin-right: .5em;
            height: 75px;
          }
          textarea:focus {
            border: 1px solid rgba(81, 203, 238, .6);
            box-shadow: 0 0px 10px rgba(81, 203, 238, 1);
          }
          button {
            padding: 1em 2em;
            text-transform: uppercase;
            background: #4FC3F7;
            border-radius: 5px;
            cursor: pointer;
            border: none;
            outline: none;
          }
          button:hover {
            background: #03A9F4;
          }
        `}</style>
      </div>
    );
  }
}

const CreatePost = gql`
  mutation createPost($title: String!) {
    createPost(
      post: {
        title: $title
      }
    ) {
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
`;

const PostsQuery = gql`
  query posts {
    posts {
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

export default graphql(CreatePost, {
  props: ({ ownProps, mutate }) => ({
    createPost: ({ title }) => mutate({
      variables: { title },
      optimisticResponse: {
        __typename: 'Mutation',
        createPost: {
          __typename: 'Post',
          _id: -1,
          title: title,
          createdAt: +new Date,
          author: {
            __typename: 'User',
            _id: -1,
            firstname: '',
            lastname: ''
          },
        },
      },
      update: (proxy, { data: { createPost } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: PostsQuery });
        // Add our comment from the mutation to the end.
        data.posts.unshift(createPost);
        // Write our data back to the cache.
        proxy.writeQuery({ query: PostsQuery, data });
      },
    }),
  }),
})(PostForm);
