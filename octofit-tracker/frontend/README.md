# OctoFit Tracker frontend

## API configuration

The frontend reads `VITE_CODESPACE_NAME` through Vite's `import.meta.env` values.
`VITE_CODESPACE_NAME` must be defined in `.env.local` when running the presentation
tier in Codespaces. Copy `.env.example` to `.env.local` and set the Codespace name:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The API base URL becomes
`https://your-codespace-name-8000.app.github.dev`. When the variable is unset,
the frontend safely falls back to `http://localhost:8000`.

Run the presentation tier with `npm run dev -- --host 0.0.0.0` from this directory.

The app uses `react-router-dom` for navigation and requests each resource from
`/api/[component]/` on the backend tier. Collection endpoints may return either
an array or a paginated envelope such as `{ "results": [] }`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
