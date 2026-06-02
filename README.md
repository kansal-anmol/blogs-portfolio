# anmolkansal.in — Personal Portfolio & Blog

> A blazing-fast personal portfolio and technical blog built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and a CRT-style interactive terminal. All portfolio data lives in a single server-side file — making it trivial to fork and customize.

---

## ✨ Features

- 📝 **Markdown-powered blog** — write posts as plain `.md` files
- 💻 **CRT Terminal** — interactive CLI to explore the portfolio with commands like `whoami`, `experience`, `blogs`, `open`
- 🌙 **Dark-mode first** with glassmorphism and subtle micro-animations
- 🔍 **Full-text blog search** with live filtering
- 📱 **Fully responsive** across all device sizes
- ⚡ **Static-site generation** (Next.js `getStaticProps`) for near-zero TTFB
- 🤖 **GitHub Actions CI** — lint, typecheck, and build on every push / PR

---

## 🗂️ Folder Structure

```
blogs-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions: lint → typecheck → build
├── pages/                      # Next.js Pages Router
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx               # Home / landing page
│   ├── about.tsx               # About page
│   ├── blogs.tsx               # Blog listing page
│   ├── terminal.tsx            # Interactive CRT terminal page
│   └── blog/
│       └── [blogId].tsx        # Individual blog post
├── public/
│   └── assets/                 # Static images (profile, company logos, project screenshots)
├── src/
│   ├── server/                 # Server-side data & logic (never shipped to the browser)
│   │   ├── data/
│   │   │   ├── _posts/         # ✏️  Blog posts as Markdown (.md) files
│   │   │   └── user.ts         # ✏️  All portfolio data (bio, skills, experience, projects…)
│   │   └── index.ts            # Server helpers (getAllBlogs, getPostBySlug, getUserData)
│   ├── client/                 # UI-only code
│   │   ├── components/         # Reusable React components
│   │   └── constants/          # Client-side constants (commands, social icon map…)
│   └── shared/                 # Types & constants shared between server and client
│       ├── types/
│       └── constants.ts
├── styles/                     # Global CSS & Tailwind entry points
├── eslint.config.js            # ESLint v10 flat config
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 23 (project targets 24)
- **pnpm** 9

### Clone & Install

```bash
git clone https://github.com/kansal-anmol/blogs-portfolio.git
cd blogs-portfolio
pnpm install
pnpm dev        # http://localhost:3000
```

---

## 🛠️ Customizing for Your Own Portfolio

All portfolio content lives in **two places inside `src/server/data/`** — nothing else needs to change.

### 1. Edit your profile — `src/server/data/user.ts`

This single TypeScript file is the **source of truth** for every page. Update the exported `USER` object:

```ts
export const USER: User = {
  name: 'Your Name',
  role: 'Your Role',
  company: 'Your Company',
  shortIntro: 'One-line elevator pitch shown on the homepage.',
  bio: 'Longer bio shown on the About page.',
  profilePicture: '/assets/profile.png',   // put your photo in public/assets/

  // --- Skills / Capabilities ---
  capabilities: [
    { id: 'frontend', label: 'Frontend', values: ['React', 'TypeScript', ...] },
    { id: 'backend',  label: 'Backend',  values: ['Node.js', ...] },
  ],

  // --- Work Experience ---
  experiences: [
    {
      id: '0',
      role: 'Senior Engineer',
      time: 'Jan 2023 - Present',
      company: 'Acme Corp',
      location: 'Remote',
      logo: '/assets/acme_logo.png',   // put logo in public/assets/
      responsibilities: ['Led migration to micro-frontends', ...],
    },
  ],

  // --- Side Projects ---
  projects: [
    {
      title: 'My App',
      description: 'Short description.',
      coverImage: '/assets/projects/myapp/cover.png',
      stack: ['React', 'Node.js'],
      demoUrl: 'https://myapp.vercel.app',
      sourceUrl: 'https://github.com/you/myapp',
    },
  ],

  // --- Social Links ---
  socials: [
    { name: 'GitHub',   url: 'https://github.com/you',            username: 'you' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/you',       username: 'you' },
    { name: 'Hashnode', url: 'https://hashnode.com/@you',         username: 'you' },
    { name: 'Twitter',  url: 'https://twitter.com/you',           username: 'you' },
  ],

  // --- Education, Achievements, Skill Groups ---
  // ... (see full type definition in src/shared/types/user.ts)
};
```

> All pages — Home, About, Blogs, Terminal — automatically derive their content and metadata from this object. No other file needs touching.

---

### 2. Add blog posts — `src/server/data/_posts/`

Create a new `.md` file in `src/server/data/_posts/`. Each file needs a frontmatter block at the top:

```markdown
---
title: "My First Blog Post"
excerpt: "A short summary shown in the blog listing."
date: "2024-06-01"
tags: ["react", "typescript"]
coverImage: "/assets/blog/my-first-post/cover.png"
---

Your Markdown content goes here...
```

| Field | Required | Description |
|---|---|---|
| `title` | ✅ | Post title |
| `excerpt` | ✅ | Summary for cards and SEO |
| `date` | ✅ | ISO date string (`YYYY-MM-DD`) |
| `tags` | optional | Array of tag strings |
| `coverImage` | optional | Path to cover image in `public/` |

The filename becomes the URL slug. Example: `my-first-post.md` → `/blog/my-first-post`

---

### 3. Replace static assets

Place your images inside `public/assets/`:

| File | Used for |
|---|---|
| `public/assets/profile.png` | Profile picture |
| `public/assets/<company>_logo.jpeg` | Experience section logos |
| `public/assets/projects/<name>/home_page.png` | Project cover images |

---

## 📜 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm typecheck    # Run TypeScript compiler check
pnpm format       # Format all files with Prettier
```

---

## 🤖 CI/CD

GitHub Actions runs on every push and pull request to `main`:

```
Install → Lint → Typecheck → Build
```

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (Pages Router) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 |
| Blog parsing | gray-matter + remark |
| Icons | react-icons |
| Linting | ESLint 10 (flat config) |
| Formatting | Prettier |
| Package manager | pnpm 9 |
| Deployment | Vercel |

---

## 📄 License

[MIT](license.md) — feel free to fork and make it your own!

---

Built with ❤️ by [Anmol Kansal](https://github.com/kansal-anmol)
