# Audit technique — us-erp

**Date :** 2026-03-08
**Branche :** `claude/app-audit-tzGM7`
**Auditeur :** Claude Code
**Stack :** React 19 · TypeScript 5.8 · Vite 6 · MUI v7 · React Router v7 · TanStack Query v5 · Axios

---

## 1. Résumé exécutif

L'application est au stade de **bootstrap initial** (2 commits, aucun composant métier). La fondation technique choisie est solide, mais plusieurs décisions de configuration posent déjà des problèmes de sécurité, de fiabilité et de maintenabilité. Sans correction avant l'ajout de fonctionnalités, ces défauts se propageront à l'ensemble de la codebase.

| Priorité | Nombre de findings |
|----------|--------------------|
| 🔴 Critique | 3 |
| 🟠 Élevé | 4 |
| 🟡 Moyen | 5 |
| 🟢 Faible | 4 |
| **Total** | **16** |

---

## 2. État actuel du projet

```
src/
├── App.tsx          ← routing + layout (tout mélangé)
├── App.css          ← vide
├── main.tsx         ← entry point + providers
├── index.css        ← styles globaux
├── queryClient.ts   ← QueryClient sans config
├── vite-env.d.ts
└── api/
    └── client.ts    ← axios instance (URL hardcodée, timeout 2s)
```

Aucune couche `pages/`, `components/`, `hooks/`, `types/`, `services/` n'existe encore.
Zéro test. Zéro variable d'environnement. Zéro gestion d'erreur.

---

## 3. Findings

### 🔴 Critique

#### C1 — URL API hardcodée (`src/api/client.ts:3`)

```ts
// ❌ Actuel
const BASE_URL = "https://intranet.urgencesante.fr/api";
```

L'URL de production est exposée dans le code source versionné. Impossible de pointer vers un environnement de dev/staging sans modifier le code.

**Correction :**
```ts
// ✅ Cible
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!BASE_URL) throw new Error("VITE_API_BASE_URL is not defined");
```
Créer `.env.local` (non versionné) et `.env.example` (versionné).

---

#### C2 — Aucune authentification dans le client HTTP (`src/api/client.ts`)

Le client axios n'a aucun intercepteur. Toutes les requêtes partent sans token. Quand l'authentification sera implémentée, elle devra être ajoutée partout manuellement — risque d'oubli.

**Correction :** Ajouter un intercepteur `request` dès maintenant :
```ts
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```
Ajouter un intercepteur `response` pour gérer les 401 (redirection vers login) et normaliser les erreurs.

---

#### C3 — Dépendance `router` parasite (`package.json:23`)

```json
"router": "^2.2.0"
```

Le package npm `router` (v2.2.0) est un micro-routeur Express, sans rapport avec `react-router`. Il a été installé par erreur et gonfle le bundle inutilement.

**Correction :** `npm uninstall router`

---

### 🟠 Élevé

#### H1 — Timeout API trop bas : 2000ms (`src/api/client.ts:7`)

```ts
timeout: 2000, // ❌
```

Un ERP effectue des requêtes complexes (listes paginées, rapports, mutations). 2 secondes provoquera des erreurs réseau légitimes en production.

**Correction :** `timeout: 10_000` — ajuster par endpoint si nécessaire.

---

#### H2 — QueryClient sans configuration (`src/queryClient.ts:3`)

```ts
export const queryClient = new QueryClient(); // ❌ valeurs par défaut dangereuses
```

Valeurs par défaut de React Query :
- `staleTime: 0` → refetch à chaque montage de composant
- `retry: 3` → 3 tentatives sur chaque erreur API (dont les 401/403)
- `refetchOnWindowFocus: true` → refetch à chaque alt-tab

**Correction :**
```ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

---

#### H3 — Assertion non-null sans guard (`src/main.tsx:12`)

```ts
createRoot(document.getElementById("root")!).render(...) // ❌
```

Si l'élément `#root` est absent (erreur HTML, template modifié), l'app crash silencieusement avec `Cannot read properties of null`.

**Correction :**
```ts
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found in DOM");
createRoot(rootElement).render(...);
```

---

#### H4 — Zéro couverture de tests

Ni Vitest, ni React Testing Library, ni aucun test configuré. Impossible de valider des régressions sur les composants et la logique métier.

**Actions minimales :**
1. `npm install -D vitest @vitest/ui @testing-library/react @testing-library/user-event jsdom`
2. Configurer `vitest` dans `vite.config.ts`
3. Ajouter le script `"test": "vitest"` dans `package.json`
4. Écrire au moins un test par hook et par service

---

### 🟡 Moyen

#### M1 — Nom du package incohérent (`package.json:2`)

```json
"name": "us-mecanic" // ❌ — le repo s'appelle us-erp
```

Crée de la confusion dans les logs npm, les outils CI et les dashboards de monitoring.

**Correction :** `"name": "us-erp"`

---

#### M2 — Routes inline sans composants (`src/App.tsx:21-22`)

```tsx
<Route path="/" element={<div>Home</div>} />      // ❌
<Route path="/users" element={<div>Users</div>} /> // ❌
```

La logique de page doit vivre dans des composants dédiés avec lazy loading.

**Correction :**
```tsx
const HomePage = lazy(() => import("./pages/HomePage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));

<Suspense fallback={<CircularProgress />}>
  <Route path="/" element={<HomePage />} />
  <Route path="/users" element={<UsersPage />} />
</Suspense>
```

---

#### M3 — Pas de gestion d'erreur globale HTTP

Aucun intercepteur `response` sur le client axios. Les erreurs 4xx/5xx remontent brutes dans React Query sans normalisation ni log centralisé.

**Correction :** Intercepteur response avec :
- Log des erreurs en dev (`console.error` ou Sentry)
- Redirection automatique sur 401 (token expiré)
- Toast/notification sur 5xx

---

#### M4 — Pas d'Error Boundary React

Un crash dans un composant enfant (ex : accès à `.data` avant chargement) fera crasher toute l'application sans message utilisateur.

**Correction :** Envelopper `<App />` dans un `<ErrorBoundary>` avec un fallback UI (page d'erreur générique).

---

#### M5 — README générique (template Vite)

Le README ne contient aucune information sur le projet, comment lancer le backend, les variables d'environnement requises, ou l'architecture.

---

### 🟢 Faible

#### L1 — `src/App.css` vide

Fichier importé mais vide. À supprimer ou à utiliser.

#### L2 — Pas de lazy loading

Les routes futures ne bénéficieront pas du code splitting automatique si elles sont importées statiquement. Planifier dès maintenant avec `React.lazy`.

#### L3 — Pas de `.env.example`

Les développeurs rejoignant le projet n'ont aucun moyen de savoir quelles variables d'environnement sont requises.

#### L4 — Pas de script `test` dans `package.json`

`npm test` échoue. Bloquerait une pipeline CI basique.

---

## 4. Architecture cible recommandée

L'objectif est une structure modulaire, scalable et prévisible, adaptée à un ERP multi-modules.

### Structure de dossiers

```
src/
├── api/
│   ├── client.ts          ← axios instance + intercepteurs auth/erreur
│   └── endpoints/
│       ├── users.ts        ← fonctions d'appel API par domaine
│       └── ...
│
├── components/
│   ├── ui/                 ← composants génériques réutilisables (Button, Modal, Table...)
│   └── layout/             ← AppBar, Sidebar, Layout wrapper
│
├── pages/
│   ├── HomePage.tsx
│   ├── UsersPage.tsx
│   └── ...
│
├── hooks/
│   ├── useUsers.ts         ← hooks React Query par domaine
│   └── ...
│
├── types/
│   ├── api.ts              ← types des réponses API
│   ├── user.ts
│   └── ...
│
├── contexts/
│   └── AuthContext.tsx     ← authentification / session
│
├── utils/
│   └── format.ts           ← helpers purs (dates, monnaie, etc.)
│
├── App.tsx                 ← routing uniquement
├── main.tsx                ← providers uniquement
├── queryClient.ts          ← config React Query
└── router.tsx              ← définition centralisée des routes
```

### Conventions à adopter

| Sujet | Convention |
|-------|-----------|
| Fichiers composants | `PascalCase.tsx` |
| Fichiers hooks | `useCamelCase.ts` |
| Fichiers utilitaires | `camelCase.ts` |
| Types API | Interface préfixée : `ApiUser`, `ApiResponse<T>` |
| Queries React Query | `queryKeys` centralisés par domaine |
| Variables d'env | Préfixe `VITE_` + validation au démarrage |
| Commits | Conventional Commits (`feat:`, `fix:`, `chore:`) |

### Pattern recommandé : hook + service

```ts
// src/api/endpoints/users.ts
export const getUsers = () => client.get<ApiUser[]>("/users").then(r => r.data);

// src/hooks/useUsers.ts
export const useUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: getUsers });

// src/pages/UsersPage.tsx
export default function UsersPage() {
  const { data, isLoading, error } = useUsers();
  // ...
}
```

Ce pattern garantit : séparation claire des responsabilités, testabilité, réutilisabilité.

---

## 5. Checklist de correction prioritaire

```
[ ] C1 — Migrer BASE_URL vers VITE_API_BASE_URL + créer .env.example
[ ] C2 — Ajouter intercepteurs auth (request) et erreur (response) dans client.ts
[ ] C3 — Désinstaller le package "router" parasite
[ ] H1 — Passer le timeout à 10000ms
[ ] H2 — Configurer QueryClient (staleTime, retry, refetchOnWindowFocus)
[ ] H3 — Ajouter guard sur getElementById("root")
[ ] H4 — Installer et configurer Vitest
[ ] M1 — Renommer le package "us-mecanic" → "us-erp"
[ ] M2 — Créer les pages et activer le lazy loading
[ ] M3 — Intercepteur response (401, 5xx, logs)
[ ] M4 — Ajouter un ErrorBoundary global
[ ] M5 — Rédiger le README projet
[ ] L1 — Supprimer App.css ou le remplir
[ ] L3 — Créer .env.example
```
