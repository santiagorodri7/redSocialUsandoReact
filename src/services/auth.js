import { apiRequest } from './api'

async function postAuthRequest(endpoint, data) {
  return apiRequest(`/api/auth/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function registerUser(data) {
  return postAuthRequest('register', data)
}

export function loginUser(data) {
  return postAuthRequest('login', data)
}
