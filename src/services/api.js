export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')

export async function apiRequest(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, options)
  } catch {
    throw new Error(`No fue posible conectar con la API en ${API_BASE_URL}. Verifica que el backend esté ejecutándose.`)
  }

  let result = {}
  try {
    result = await response.json()
  } catch {
    // An empty or non-JSON response is reported using the HTTP status below.
  }

  if (!response.ok) {
    throw new Error(result.msg || result.error || `La solicitud falló (HTTP ${response.status}).`)
  }

  return result
}
