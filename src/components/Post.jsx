import { useState } from 'react'

export default function Post({ data, interaction = {}, onToggleLike, onAddComment, isOwnPost = false, onDeletePost }) {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [commentText, setCommentText] = useState('')
  const liked = Boolean(interaction.liked)
  const comments = Array.isArray(interaction.comments) ? interaction.comments : []

  function handleCommentSubmit(event) {
    event.preventDefault()
    const content = commentText.trim()
    if (!content) return

    onAddComment(data.id, content)
    setCommentText('')
  }

  return (
    <div id={`post-${data.id}`} className="w3-container w3-card w3-white w3-round w3-margin" style={{ scrollMarginTop: '80px' }}>
      <br />
      <img src={data.avatar} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: '60px' }} />
      <span className="w3-right w3-opacity">{data.time}</span>
      <h4>{data.name}</h4>
      <br />
      <hr className="w3-clear" />

      {data.blocks.map((block, i) => {
        if (block.type === 'text') return <p key={i}>{block.content}</p>
        if (block.type === 'images') {
          return block.content.length === 1 ? (
            <img key={i} src={block.content[0]} style={{ width: '100%' }} className="w3-margin-bottom" alt="" />
          ) : (
            <div key={i} className="w3-row-padding" style={{ margin: '0 -16px' }}>
              {block.content.map((img, j) => (
                <div className="w3-half" key={j}>
                  <img src={img} style={{ width: '100%' }} className="w3-margin-bottom" alt="" />
                </div>
              ))}
            </div>
          )
        }
        return null
      })}

      <button
        type="button"
        className={`w3-button ${liked ? 'w3-blue' : 'w3-theme-d1'} w3-margin-bottom`}
        aria-pressed={liked}
        onClick={() => onToggleLike(data.id)}
      >
        <i className="fa fa-thumbs-up"></i> Like {liked ? '1' : '0'}
      </button>
      <button
        type="button"
        className="w3-button w3-theme-d2 w3-margin-bottom"
        aria-expanded={commentsOpen}
        onClick={() => setCommentsOpen((open) => !open)}
      >
        <i className="fa fa-comment"></i> Comment ({comments.length})
      </button>
      {isOwnPost && (
        <button
          type="button"
          className="w3-button w3-red w3-margin-bottom"
          aria-label={`Delete post by ${data.name}`}
          onClick={() => onDeletePost(data.id)}
        >
          <i className="fa fa-trash"></i> Delete
        </button>
      )}

      {commentsOpen && (
        <div className="w3-container w3-padding-small">
          {comments.map((comment) => (
            <p className="w3-border-bottom w3-padding-small" key={comment.id}>
              <strong>{comment.name}:</strong> {comment.content}
            </p>
          ))}
          <form className="w3-row w3-margin-top" onSubmit={handleCommentSubmit}>
            <label className="w3-small" htmlFor={`comment-${data.id}`}>Write a comment</label>
            <input
              id={`comment-${data.id}`}
              className="w3-input w3-border"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit" className="w3-button w3-theme w3-margin-top">Send</button>
          </form>
        </div>
      )}
    </div>
  )
}