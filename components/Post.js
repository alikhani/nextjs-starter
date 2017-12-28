import Link from 'next/link'
import { FaUser } from 'react-icons/lib/fa'
import moment from 'moment'

export default ({ post }) => (
  <div className="PostCard">
    <div>
      <Link href={`/profile?id=${post.author._id}`} as={`/profile/${post.author._id}`}>
        <a>
          <div className="PostHeader">
            <div className="UserAvatar">
              <FaUser />
            </div>
            <div className="Info">
              <div className="User">
                {post.author.firstname} {post.author.lastname}
              </div>
              <div className="PostDate">
                {moment(new Date(post.createdAt)).fromNow()}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
    <div className="PostBody">
      <Link href={`/post?id=${post._id}`} as={`/post/${post._id}`}>
        <a>
        {post.title}
        </a>
      </Link>
    </div>
    <style jsx>{`
      .PostCard {
        margin: 1em 0;
        padding: .5em;
        box-shadow: 0 2px 5px rgba(150, 150, 150, .6);
      }
      .PostHeader {
        display: flex;
      }
      .UserAvatar {
        font-size: 22px;
        padding: .3em;
        border-radius: 30px;
      }
      .Info {
        margin: .5em;
      }
      .PostDate {
        font-size: 10px;
        color: rgb(100, 100, 100);
      }
    `}</style>
  </div>
)
