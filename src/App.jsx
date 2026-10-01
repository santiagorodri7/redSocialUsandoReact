import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import PostsPage from './pages/PostsPage'
import CommentsPage from './pages/CommentsPage'
import FriendRequestsPage from './pages/FriendRequestsPage'

const POSTS_STORAGE_KEY = 'red-social-posts'
const INTERACTIONS_STORAGE_KEY = 'red-social-interactions'

function getSavedPosts() {
  try {
    const savedPosts = JSON.parse(localStorage.getItem(POSTS_STORAGE_KEY) || '[]')
    return Array.isArray(savedPosts) ? savedPosts : []
  } catch {
    return []
  }
}

function getSavedInteractions() {
  try {
    const savedInteractions = JSON.parse(localStorage.getItem(INTERACTIONS_STORAGE_KEY) || '{}')
    return savedInteractions && typeof savedInteractions === 'object' && !Array.isArray(savedInteractions)
      ? savedInteractions
      : {}
  } catch {
    return {}
  }
}

function App() {
  const [userPosts, setUserPosts] = useState(getSavedPosts)
  const [postInteractions, setPostInteractions] = useState(getSavedInteractions)

  useEffect(() => {
    try {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(userPosts))
    } catch {
      // Storage may be unavailable or full; the current session still works.
    }
  }, [userPosts])

  useEffect(() => {
    try {
      localStorage.setItem(INTERACTIONS_STORAGE_KEY, JSON.stringify(postInteractions))
    } catch {
      // Keep interactions available for the current session if storage fails.
    }
  }, [postInteractions])

  function publishPost(content) {
    const post = {
      id: `${Date.now()}-${Math.random()}`,
      avatar: 'https://www.w3schools.com/w3images/avatar3.png',
      name: 'You',
      time: 'Just now',
      blocks: [{ type: 'text', content }],
    }

    setUserPosts((currentPosts) => [post, ...currentPosts])
  }

  function toggleLike(postId) {
    setPostInteractions((currentInteractions) => {
      const interaction = currentInteractions[postId] ?? { liked: false, comments: [] }
      return {
        ...currentInteractions,
        [postId]: { ...interaction, liked: !interaction.liked },
      }
    })
  }

  function addComment(postId, content) {
    setPostInteractions((currentInteractions) => {
      const interaction = currentInteractions[postId] ?? { liked: false, comments: [] }
      const comments = Array.isArray(interaction.comments) ? interaction.comments : []

      return {
        ...currentInteractions,
        [postId]: {
          ...interaction,
          comments: [...comments, {
            id: `${Date.now()}-${Math.random()}`,
            name: 'You',
            content,
          }],
        },
      }
    })
  }

  function deletePost(postId) {
    setUserPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId))
    setPostInteractions((currentInteractions) => {
      const nextInteractions = { ...currentInteractions }
      delete nextInteractions[postId]
      return nextInteractions
    })
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage
              userPosts={userPosts}
              postInteractions={postInteractions}
              onPublishPost={publishPost}
              onToggleLike={toggleLike}
              onAddComment={addComment}
              onDeletePost={deletePost}
            />
          )}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/posts"
          element={(
            <PostsPage
              userPosts={userPosts}
              postInteractions={postInteractions}
              onToggleLike={toggleLike}
              onAddComment={addComment}
              onDeletePost={deletePost}
            />
          )}
        />
        <Route path="/comments" element={<CommentsPage postInteractions={postInteractions} />} />
        <Route path="/friend-requests" element={<FriendRequestsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App