# AGENT.md — Codebase Guide for AI Coding Assistants

This document describes the architecture, design philosophy, and coding conventions of this codebase. Read it before making any changes so you follow established patterns.

---

## 🗺️ Project Overview

This is a **Next.js 16 Pages Router** application that serves as a personal portfolio and technical blog. It is statically generated — all data is fetched at build time via `getStaticProps`.

**Live site:** https://anmolkansal.in

---

## 🧱 Architecture

### Data Flow

```
src/server/data/user.ts      ←  Single source of truth for all portfolio content
src/server/data/_posts/*.md  ←  Blog posts as Markdown files
         │
         ▼
src/server/index.ts          ←  Server helpers: getAllBlogs(), getPostBySlug(), getUserData()
         │
         ▼
pages/*.tsx (getStaticProps)  ←  Fetch data at build time, pass as props
         │
         ▼
src/client/components/       ←  Pure UI components that receive typed props
```

### Key Invariant

> **All data lives in `src/server/`.** No page or component should hardcode any portfolio content (name, bio, links, etc.). Every such value must come from the `USER` object or a `Post`.

---

## 📁 Directory Conventions

| Path | Purpose |
|---|---|
| `src/server/data/user.ts` | The single `USER` object — edit this to customize the portfolio |
| `src/server/data/_posts/` | Markdown blog posts with YAML frontmatter |
| `src/server/index.ts` | Exports `getAllBlogs`, `getPostBySlug`, `getUserData` |
| `src/client/components/` | Reusable UI components — **no data fetching here** |
| `src/client/constants/` | Client-side constants (command definitions, social icon map) |
| `src/shared/types/` | TypeScript types shared across server and client |
| `src/shared/constants.ts` | Constants needed on both sides (e.g. `HOST_NAME`) |
| `pages/` | Next.js pages — each fetches its data in `getStaticProps` |

### The `src/server` vs `src/client` split

- Code in `src/server/` runs **only at build time** (Node.js context). It can use `fs`, read files, etc.
- Code in `src/client/` runs **only in the browser**. It must never import from `src/server/`.
- Code in `src/shared/` is safe to import from both sides.

---

## 🎨 Design Philosophy

### Visual Identity

- **Dark-mode first** — all pages use a dark background by default.
- **Premium feel** — glassmorphism cards, subtle gradients, smooth micro-animations.
- **Intentional whitespace** — layouts breathe; avoid cramped UIs.
- **Consistent max-width** — the main content area uses `max-w-6xl` via the `<Container>` component.

### Component Philosophy

- Components are **presentational** — they receive typed props and render UI. No data fetching.
- Keep components **focused and composable**. Prefer many small components over one large one.
- Use named exports (not default) for components, e.g. `export const BlogCard = ...`.
- File and component names are PascalCase.

### Styling

- **Tailwind CSS v4** is the primary styling tool.
- Use utility classes directly — no inline `style={{}}` unless absolutely necessary for dynamic values.
- Avoid one-off magic numbers. Use Tailwind scale values or define CSS custom properties.
- The `<Container>` component (`src/client/components/Container.tsx`) is the standard page-width wrapper. Always use it instead of ad-hoc `max-w-*` classes on pages.
- The terminal page intentionally uses `dark` class and is opted out of any light-mode styling.

---

## 🔑 Key Patterns

### 1. PageMetadata Component

Every page **must** use `<PageMetadata>` from `src/client/components/PageMetadata.tsx` to handle `<head>` tags. It derives sensible defaults from the `user` prop.

```tsx
<PageMetadata
  user={user}
  title="Page Title"                 // optional — defaults to user.name | user.role
  description="Custom description"   // optional — defaults to user shortIntro
  urlPath="/page-slug"               // optional — used to build canonical URL
  ogType="website"                   // optional — 'website' | 'profile' | 'article'
  noIndex={false}                    // optional — set true for non-indexable pages
/>
```

### 2. Page Data Fetching Pattern

All pages follow this `getStaticProps` pattern:

```tsx
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const user = getUserData();          // always fetch user
  const posts = await getAllBlogs();   // fetch posts if needed

  return {
    props: { user, posts },
    revalidate: 60,
  };
};
```

### 3. Social Icon Mapping

Social platform icons are centralized in `src/client/constants/social.ts`. When adding a new social platform, add the icon mapping there — never inline it.

```ts
// src/client/constants/social.ts
export const SOCIAL_ICONS: Record<string, any> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  // add new platforms here
};
```

### 4. Blog Posts (Markdown)

Each `.md` file in `src/server/data/_posts/` must have this frontmatter:

```yaml
---
title: "Post Title"
excerpt: "Short summary for cards and SEO."
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
coverImage: "/assets/blog/post-name/cover.png"
---
```

The filename becomes the URL slug (`my-post.md` → `/blog/my-post`).

### 5. TypeScript Types

Core types live in `src/shared/types/`:

- **`User`** — the full portfolio person object
- **`Post`** — a parsed blog post (frontmatter + content)
- **`UserSocial`**, **`UserExperience`**, **`UserProject`** — nested User sub-types

Always import types with the `type` keyword:

```ts
import type { User, Post } from '@/src/shared/types';
```

### 6. Path Aliases

Use the `@/` alias for all internal imports:

```ts
import { getUserData } from '@/src/server';
import type { User } from '@/src/shared/types';
import { Container } from '@/src/client/components/Container';
```

---

## ⚙️ Tooling

| Tool | Config file | Notes |
|---|---|---|
| ESLint | `eslint.config.js` | ESLint v10 flat config (ESM). Plugins: `@typescript-eslint`, `react`, `react-hooks`, `prettier` |
| Prettier | `prettier.config.js` | Runs via `pnpm format`. Plugins: organize-imports, tailwindcss, packagejson |
| TypeScript | `tsconfig.json` | Strict mode. `moduleResolution: bundler`. `ignoreDeprecations: "6.0"` |
| Tailwind | `tailwind.config.js` | v4 with custom animation tokens |
| Package manager | pnpm 9 | Use `pnpm` — never `npm` or `yarn` |

### Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm typecheck    # tsc --noEmit
pnpm format       # Prettier
```

---

## 🚫 Anti-Patterns to Avoid

| ❌ Don't | ✅ Do instead |
|---|---|
| Hardcode name, bio, links in a page | Read from `user` prop derived from `USER` |
| Import `src/server/` code in a component | Pass data as props from `getStaticProps` |
| Spread `eslint-config-prettier` as an array | Add it as a single object (it's not an array) |
| Use `...eslint-config-next` with ESLint 10 flat config | Use direct plugin imports instead |
| Use `h-[calc(100vh-Xrem)]` on Terminal page | Use `h-screen overflow-hidden` on the outer wrapper |
| Fetch data inside a component (`useEffect`) | Fetch statically in `getStaticProps` |
| Create a new `<head>` block per page | Use `<PageMetadata>` component |

---

## 🔀 CI Pipeline

GitHub Actions (`.github/workflows/ci.yml`) runs on every push/PR to `main`:

```
Install (pnpm --frozen-lockfile)
  → Lint (pnpm lint)
    → Typecheck (pnpm typecheck)
      → Build (pnpm build)
```

All steps must pass before merging.

---

## 🧠 Agent Tips

- When adding a new page, **always** include `<PageMetadata user={user} ... />` and follow the `getStaticProps` pattern.
- When adding a new social platform, **only** edit `src/client/constants/social.ts` and `src/server/data/user.ts`.
- When adding a new command to the terminal, define it in `src/client/constants/commands/` and register it in `pages/terminal.tsx`.
- The `<Container>` component already applies `max-w-6xl` — don't add that class again on child elements.
- The `useTypingEffect` hook uses refs (`indexRef`, `intervalRef`) to avoid race conditions — be careful not to regress this.
