# TaskBoard

Jednoduchá demo aplikace pro správu úkolů – ukázka frontend stacku React + TypeScript + Material UI s napojením na REST API generované z OpenAPI specifikace.

## Tech stack

- React 18 + TypeScript
- Material UI (MUI)
- Vite
- Axios + API klient generovaný z OpenAPI (openapi-generator-cli)

## Spuštění

Vyžaduje běžící backend na `http://localhost:3000` (viz [taskboard-api](../taskboard-api)).

\`\`\`bash
npm install
npm run dev
\`\`\`

Aplikace běží na `http://localhost:5173`.

## Struktura projektu

- `src/services/taskApi.ts` – obálka nad vygenerovaným API klientem
- `src/hooks/useTasks.ts` – custom hook pro práci s úkoly (stav, CRUD, filtrování)
- `src/components/` – `TaskCard`, `TaskList`, `TaskFormDialog`
- `src/pages/BoardPage.tsx` – hlavní stránka
- `src/generated/` – API klient a typy vygenerované z `openapi.yaml`

## Generování API klienta

API klient se generuje z OpenAPI specifikace backendu:

\`\`\`bash
npm run generate:api
\`\`\`