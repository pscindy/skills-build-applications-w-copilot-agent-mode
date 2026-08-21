const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function toCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items', 'records']) {
    const items = toCollection(payload[key])
    if (items.length || Array.isArray(payload[key])) return items
  }

  return []
}

export async function fetchCollection(resource, endpoint = `${API_BASE_URL}/api/${resource}/`) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  const payload = await response.json()
  return toCollection(payload)
}