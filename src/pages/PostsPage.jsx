import Posts from '../components/Posts'

export default function PostsPage({ userPosts, postInteractions, onToggleLike, onAddComment, onDeletePost }) {
  return (
    <main className="w3-container w3-content" style={{ maxWidth: '900px', marginTop: '100px' }}>
      <h2>Posts</h2>
      <Posts
        userPosts={userPosts}
        postInteractions={postInteractions}
        onToggleLike={onToggleLike}
        onAddComment={onAddComment}
        onDeletePost={onDeletePost}
      />
    </main>
  )
}
