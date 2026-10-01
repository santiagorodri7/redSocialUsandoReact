import Profile from '../components/Profile'
import GroupsAccordion from '../components/GroupsAccordion'
import Interests from '../components/Interests'
import AlertBox from '../components/AlertBox'
import PostForm from '../components/PostForm'
import Posts from '../components/Posts'
import Commenters from '../components/Commenters'
import UpcomingEvent from '../components/UpcomingEvent'
import FriendRequest from '../components/FriendRequest'

export default function HomePage({
  userPosts,
  postInteractions,
  onPublishPost,
  onToggleLike,
  onAddComment,
  onDeletePost,
}) {
  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: '80px' }}>
      <div className="w3-row">
        <div className="w3-col m3">
          <Profile /><br />
          <GroupsAccordion /><br />
          <Interests /><br />
          <AlertBox />
        </div>

        <div className="w3-col m7">
          <PostForm onPublish={onPublishPost} />
          <Posts
            userPosts={userPosts}
            postInteractions={postInteractions}
            onToggleLike={onToggleLike}
            onAddComment={onAddComment}
            onDeletePost={onDeletePost}
          />
          <Commenters postInteractions={postInteractions} />
        </div>

        <div className="w3-col m2">
          <UpcomingEvent /><br />
          <FriendRequest /><br />
          <div className="w3-card w3-round w3-white w3-padding-16 w3-center"><p>ADS</p></div><br />
          <div className="w3-card w3-round w3-white w3-padding-32 w3-center"><p><i className="fa fa-bug w3-xxlarge"></i></p></div>
        </div>
      </div>
    </div>
  )
}
