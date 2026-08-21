import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'
import { API_BASE_URL, toCollection } from '../api.js'

function Leaderboard() {
  const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : `${API_BASE_URL}/api/leaderboard/`
  const { data, loading, error } = useResource('leaderboard', leaderboardEndpoint)
  const entries = toCollection(data)

  return (
    <ResourceState title="Leaderboard" loading={loading} error={error}>
      <div className="resource-card p-0 overflow-hidden">
        {entries.map((entry, index) => (
          <div className="leader-row" key={entry._id || entry.id || index}>
            <span className="rank">{String(index + 1).padStart(2, '0')}</span>
            <strong>{entry.username || entry.user?.username || entry.name || 'Athlete'}</strong>
            <span className="points">{entry.points ?? entry.score ?? 0} pts</span>
          </div>
        ))}
      </div>
      {!entries.length && <p className="muted mt-3">No leaderboard entries found.</p>}
    </ResourceState>
  )
}

export default Leaderboard