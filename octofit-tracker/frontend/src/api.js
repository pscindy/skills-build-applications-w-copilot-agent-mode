const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function collectionItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items', 'records']) {
    const items = collectionItems(payload[key])
    if (items.length || Array.isArray(payload[key])) return items
  }

  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/`)

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  const payload = await response.json()
  return collectionItems(payload)
}