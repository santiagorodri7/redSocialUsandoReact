import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="w3-top" id="top">
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
          
          {/* Se corrigió la etiqueta de apertura del botón de menú */}
          <button
            type="button"
            className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa fa-bars"></i>
          </button>

          <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4" aria-label="Inicio">
            <i className="fa fa-home w3-margin-right"></i>Logo
          </Link>
          <Link to="/posts" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Posts" aria-label="Ir a publicaciones">
            <i className="fa fa-globe"></i>
          </Link>
          <Link to="/profile" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="My Profile" aria-label="Ir a mi perfil">
            <i className="fa fa-user"></i>
          </Link>
          <Link to="/comments" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Comments" aria-label="Ir a comentarios">
            <i className="fa fa-envelope"></i>
          </Link>
          <Link to="/search" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Buscar personas y grupos" aria-label="Buscar personas y grupos">
            <i className="fa fa-search"></i>
          </Link>
          <div className="w3-dropdown-hover w3-hide-small">
            <Link to="/comments" className="w3-button w3-padding-large" title="Notifications" aria-label="Ir a actividad y comentarios">
              <i className="fa fa-bell"></i>
              <span className="w3-badge w3-right w3-small w3-green">3</span>
            </Link>
            <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{ width: '300px' }}>
              <Link to="/friend-requests" className="w3-bar-item w3-button">One new friend request</Link>
              <Link to="/posts" className="w3-bar-item w3-button">John Doe posted on your wall</Link>
              <Link to="/posts" className="w3-bar-item w3-button">Jane likes your post</Link>
            </div>
          </div>
          <Link to="/profile" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Mi perfil">
            {user.nombre}
          </Link>
          <button
            type="button"
            className="w3-bar-item w3-button w3-right w3-padding-large w3-hover-white"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div id="navDemo" className={`w3-bar-block w3-theme-d2 w3-hide-large w3-hide-medium w3-large ${menuOpen ? 'w3-show' : 'w3-hide'}`}>
        <Link to="/posts" onClick={() => setMenuOpen(false)} className="w3-bar-item w3-button w3-padding-large">Posts</Link>
        <Link to="/profile" onClick={() => setMenuOpen(false)} className="w3-bar-item w3-button w3-padding-large">My Profile</Link>
        <Link to="/comments" onClick={() => setMenuOpen(false)} className="w3-bar-item w3-button w3-padding-large">Comments</Link>
        <Link to="/search" onClick={() => setMenuOpen(false)} className="w3-bar-item w3-button w3-padding-large">Buscar personas y grupos</Link>
        <Link to="/friend-requests" onClick={() => setMenuOpen(false)} className="w3-bar-item w3-button w3-padding-large">Friend Requests</Link>
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false)
            onLogout()
          }}
          className="w3-bar-item w3-button w3-padding-large"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  )
}