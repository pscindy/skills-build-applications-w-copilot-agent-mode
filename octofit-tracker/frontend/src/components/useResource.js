import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function useResource(resource, endpoint = null) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchCollection(resource, endpoint)
      .then((data) => active && setState({ data, loading: false, error: '' }))
      .catch((error) => active && setState({ data: [], loading: false, error: error.message }))
    return () => { active = false }
  }, [resource, endpoint])

  return state
}