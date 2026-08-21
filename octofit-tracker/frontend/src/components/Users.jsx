import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'
import { API_BASE_URL, toCollection } from '../api.js'

function Users() {
  const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : `${API_BASE_URL}/api/users/`
  const { data, loading, error } = useResource('users', usersEndpoint)
  const users = toCollection(data)

  return (
    <ResourceState title="Athletes" loading={loading} error={error}>
      <div className="row g-3">
        {users.map((user, index) => (
          <div className="col-12 col-md-6 col-xl-4" key={user._id || user.id || user.username || index}>
            <article className="resource-card h-100">
              <div className="avatar">{(user.profile?.displayName || user.username || '?')[0]}</div>
              <h2>{user.profile?.displayName || user.username || 'Unnamed athlete'}</h2>
              <p className="muted">{user.email || 'No email provided'}</p>
              <span className="tag">{user.profile?.goal || 'Keep moving'}</span>
            </article>
          </div>
        ))}
      </div>
      {!users.length && <p className="muted">No athletes found.</p>}
    </ResourceState>
  )
}

export default Users