import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'
import { toCollection } from '../api.js'

function Workouts() {
  const { data, loading, error } = useResource('workouts')
  const workouts = toCollection(data)

  return (
    <ResourceState title="Workout ideas" loading={loading} error={error}>
      <div className="row g-3">
        {workouts.map((workout, index) => (
          <div className="col-12 col-md-6 col-xl-4" key={workout._id || workout.id || index}>
            <article className="resource-card h-100">
              <p className="eyebrow">Suggestion {String(index + 1).padStart(2, '0')}</p>
              <h2>{workout.name || workout.title || 'Custom workout'}</h2>
              <p className="muted">{workout.description || workout.type || 'A fresh way to build momentum.'}</p>
              <span className="tag">{workout.duration ? `${workout.duration} min` : 'Flexible pace'}</span>
            </article>
          </div>
        ))}
      </div>
      {!workouts.length && <p className="muted">No workout suggestions found.</p>}
    </ResourceState>
  )
}

export default Workouts