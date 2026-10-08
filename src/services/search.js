import { apiRequest } from './api'

export function searchPeople(term) {
  return apiRequest(`/api/usuarios/buscar?termino=${encodeURIComponent(term)}`)
}

export function searchGroups(term) {
  return apiRequest(`/api/grupos?buscar=${encodeURIComponent(term)}`)
}
