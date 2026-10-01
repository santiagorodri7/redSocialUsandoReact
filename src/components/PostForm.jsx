import { useState } from 'react'

export default function PostForm({ onPublish }) {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const content = status.trim()
    if (!content) return

    onPublish(content)
    setStatus('')
  }

  return (
    <div className="w3-row-padding">
      <div className="w3-col m12">
        <div className="w3-card w3-round w3-white">
          <form className="w3-container w3-padding" onSubmit={handleSubmit}>
            <h6 className="w3-opacity">Social Media template by w3.css</h6>
            <textarea
              className="w3-border w3-padding"
              style={{ width: '100%' }}
              value={status}
              placeholder="What's on your mind?"
              onChange={(e) => setStatus(e.target.value)}
            />
            <button type="submit" className="w3-button w3-theme"><i className="fa fa-pencil"></i> Post</button>
          </form>
        </div>
      </div>
    </div>
  )
}