import { Link } from 'react-router-dom'

export default function Commenters({ postInteractions }) {
  const comments = Object.entries(postInteractions).flatMap(([postId, interaction]) => {
    if (!Array.isArray(interaction.comments)) return []
    return interaction.comments.map((comment) => ({ ...comment, postId }))
  }).reverse()

  return (
    <section className="w3-container w3-white w3-round w3-margin w3-padding">
      <h4>People who commented</h4>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : comments.map((comment) => (
        <div className="w3-border-bottom w3-padding-16" key={comment.id}>
          <strong>{comment.name}</strong>
          <p>{comment.content}</p>
          <Link to={`/posts#post-${comment.postId}`}>View post</Link>
        </div>
      ))}
    </section>
  )
}
