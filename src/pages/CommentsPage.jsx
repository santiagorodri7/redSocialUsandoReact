import Commenters from '../components/Commenters'

export default function CommentsPage({ postInteractions }) {
  return (
    <main className="w3-container w3-content" style={{ maxWidth: '900px', marginTop: '100px' }}>
      <Commenters postInteractions={postInteractions} />
    </main>
  )
}
