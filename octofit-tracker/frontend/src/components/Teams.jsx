import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'

function Teams() {
  const { data, loading, error } = useResource('teams')
  const teams = Array.isArray(data) ? data : []

  return (
    <ResourceState title="Teams" loading={loading} error={error}>
      <div className="row g-3">
        {teams.map((team, index) => (
          <div className="col-12 col-md-6" key={team._id || team.id || index}>
            <article className="resource-card h-100">
              <p className="eyebrow">Team {String(index + 1).padStart(2, '0')}</p>
              <h2>{team.name || 'Unnamed team'}</h2>
              <p className="muted">{Array.isArray(team.members) ? `${team.members.length} members` : 'Members being assembled'}</p>
            </article>
          </div>
        ))}
      </div>
      {!teams.length && <p className="muted">No teams found.</p>}
    </ResourceState>
  )
}

export default Teams