import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg app-header">
        <div className="container-fluid px-4">
          <NavLink className="navbar-brand brand-mark" to="/users">
            <span className="brand-orbit" aria-hidden="true">O</span>
            <span>OctoFit <em>Tracker</em></span>
          </NavLink>
          <nav className="nav nav-pills gap-1" aria-label="Primary navigation">
            {[
              ['users', 'Users'],
              ['activities', 'Activities'],
              ['teams', 'Teams'],
              ['leaderboard', 'Leaderboard'],
              ['workouts', 'Workouts'],
            ].map(([path, label]) => (
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                key={path}
                to={`/${path}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container-fluid px-4 py-4">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
