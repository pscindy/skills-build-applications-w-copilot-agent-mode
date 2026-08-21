export function ResourceState({ title, loading, error, children }) {
  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1 className="page-title">{title}</h1>
        </div>
        <span className="status-chip">Live API</span>
      </div>
      {loading && <div className="alert alert-light border">Loading {title.toLowerCase()}...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && children}
    </section>
  )
}