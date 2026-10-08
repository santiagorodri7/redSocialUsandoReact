import Profile from '../components/Profile'

export default function ProfilePage({ user }) {
  return (
    <main className="w3-container w3-content" style={{ maxWidth: '700px', marginTop: '100px' }}>
      <Profile user={user} />
    </main>
  )
}
