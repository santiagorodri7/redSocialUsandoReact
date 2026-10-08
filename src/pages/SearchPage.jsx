import { useState } from 'react'
import { searchGroups, searchPeople } from '../services/search'
import './SearchPage.css'

const initialSearch = { term: '', results: [], error: '', searched: false, loading: false }

function SearchPanel({ type, title, description, placeholder, icon, search }) {
  const [state, setState] = useState(initialSearch)
  const isPeople = type === 'people'

  async function handleSubmit(event) {
    event.preventDefault()
    const term = state.term.trim()
    if (term.length < 2) {
      setState((current) => ({ ...current, error: 'Escribe al menos 2 caracteres.', searched: false }))
      return
    }

    setState((current) => ({ ...current, error: '', results: [], searched: false, loading: true }))
    try {
      const results = await search(term)
      if (!Array.isArray(results)) {
        throw new Error('La API devolvió una respuesta de búsqueda no válida.')
      }
      setState((current) => ({ ...current, results, searched: true, loading: false }))
    } catch (error) {
      setState((current) => ({
        ...current,
        error: error.message || 'No se pudo completar la búsqueda.',
        searched: false,
        loading: false,
      }))
    }
  }

  return (
    <section className="search-panel" aria-labelledby={`${type}-search-title`}>
      <div className="search-panel-heading">
        <span className="search-panel-icon" aria-hidden="true"><i className={`fa ${icon}`} /></span>
        <div>
          <h2 id={`${type}-search-title`}>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor={`${type}-search-input`}>{placeholder}</label>
        <input
          id={`${type}-search-input`}
          type="search"
          value={state.term}
          onChange={(event) => setState((current) => ({ ...current, term: event.target.value, error: '' }))}
          placeholder={placeholder}
          maxLength={80}
        />
        <button type="submit" disabled={state.loading}>
          <i className="fa fa-search" aria-hidden="true" />
          {state.loading ? 'Buscando…' : 'Buscar'}
        </button>
      </form>

      {state.error && <p className="search-message search-error" role="alert">{state.error}</p>}
      {state.loading && <p className="search-message" role="status">Buscando en RedSocial…</p>}
      {state.searched && state.results.length === 0 && (
        <p className="search-message">No encontramos {isPeople ? 'personas' : 'grupos'} que coincidan con “{state.term.trim()}”.</p>
      )}

      {state.results.length > 0 && (
        <ul className="search-results">
          {state.results.map((result) => (
            <li className="search-result" key={result.id}>
              {isPeople ? (
                <>
                  <img
                    className="search-avatar"
                    src={result.avatar || 'https://www.w3schools.com/w3images/avatar2.png'}
                    alt=""
                  />
                  <div className="search-result-copy">
                    <h3>{result.nombre}</h3>
                    {result.ciudad && <p><i className="fa fa-map-marker" aria-hidden="true" /> {result.ciudad}</p>}
                    {result.biografia && <p className="search-result-description">{result.biografia}</p>}
                  </div>
                </>
              ) : (
                <>
                  <span className="search-avatar search-group-avatar" aria-hidden="true">
                    <i className="fa fa-users" />
                  </span>
                  <div className="search-result-copy">
                    <h3>{result.nombre}</h3>
                    {result.descripcion && <p className="search-result-description">{result.descripcion}</p>}
                    <p><i className="fa fa-user" aria-hidden="true" /> {result.total_miembros} miembros</p>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function SearchPage() {
  return (
    <main className="search-page">
      <header className="search-page-header">
        <p className="search-eyebrow">COMUNIDAD REDSOCIAL</p>
        <h1>Encuentra tu comunidad</h1>
        <p>Busca personas y grupos registrados en RedSocial.</p>
      </header>

      <div className="search-panels">
        <SearchPanel
          type="people"
          title="Buscar personas"
          description="Encuentra personas por nombre, ciudad o biografía."
          placeholder="Nombre, ciudad o biografía"
          icon="fa-user"
          search={searchPeople}
        />
        <SearchPanel
          type="groups"
          title="Buscar grupos"
          description="Encuentra grupos por nombre o descripción."
          placeholder="Nombre o descripción del grupo"
          icon="fa-users"
          search={searchGroups}
        />
      </div>
    </main>
  )
}
