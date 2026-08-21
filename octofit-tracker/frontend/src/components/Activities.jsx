import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'

function Activities() {
  const { data, loading, error } = useResource('activities')
  const activities = Array.isArray(data) ? data : []

  return (
    <ResourceState title="Activity feed" loading={loading} error={error}>
      <div className="table-responsive resource-card p-0">
        <table className="table align-middle mb-0">
          <thead><tr><th>Activity</th><th>Duration</th><th>Date</th><th>Intensity</th></tr></thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity._id || activity.id || index}>
                <td><strong>{activity.type || activity.name || 'Workout'}</strong></td>
                <td>{activity.duration ? `${activity.duration} min` : '—'}</td>
                <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
                <td>{activity.details?.intensity || activity.intensity || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!activities.length && <p className="muted mt-3">No activities found.</p>}
    </ResourceState>
  )
}

export default Activities