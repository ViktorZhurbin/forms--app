## Objectives
- Explore what it takes to build a SaaS product from scratch both from the product and engineering perspective.
- Learn more about product design, marketing.
- Investigate new technologies that could help build things faster.
  - Speed of development was a self-imposed constraint: only use a new tech if it helps to move faster.

## Means
- Build an online form builder, inspired by tools like [Typeform](https://www.typeform.com/), [Fillout](https://www.fillout.com), [Tally](https://tally.so).
- Conduct basic market research, define MVP.
- Use [Linear](https://linear.app/) for project management and task prioritization.

## Results
- A fully-functional MVP. [Details below](#functionality)
- Learnt a lot about startups, bootstrapped businesses, and the greater importance of marketing and distribution.
- Discovered some great tools that I'll consider using again in future. [Details below](#tech-stack)
  - Tried many other tools that I would probably not like to use again 😄

## Code overview
### Project structure
This is a monorepo with applications located in `apps/` directory, and shared code in `libs/`.

There's two main apps: **Editor** and **Forms**:

```
apps/
|-- editor/
|-- forms/
|-- ...
libs/
|-- shared/
...
```

### Running locally
Tested with Node v18 and v20.

From the project root:
- `pnpm i` to install dependencies
- `npm run dev:shared` would start dev servers for all the apps
  - `npm run dev:editor` to run only the Editor app (or `cd apps/editor && npm run dev`)

## Functionality
Create a form at https://forms-editor.pages.dev/create. Click _Preview_ button to see the result as you go.

Note that you need to click _Publish_ button to make the latest changes visible to the world.

You'd need to log in with a Google account for the full functionality. After logging in, you can copy the form's link to share it and collect responses.

### Editor
An admin tool to create, manage and share online forms, view responses.

**Features**: drag & drop, optimistic updates, google auth, form preview, and table of responses.

### Forms
Actual forms app that works nicely on desktop and mobile, and work even on bad internet (without any spinners)

**Features**: mobile-friendly, works offline, swipe gestures support with Typeform-style slide animations.


## Tech Stack

### UI
It's plain React and Typescript, with a [tiny router](https://github.com/molefrog/wouter) and [Mantine](https://github.com/mantinedev/mantine) for UI components library.

Using a new framework and UI lib would inevitably cost me more time, with little to no benefits (at least at this scale).

### Data layer
[Instant](https://github.com/instantdb/instant), a real-time database that handles all the data fetching, permission checking, offline caching, and optimistic updates.

With it I didn't need any state management **AND** backend. It's like React Query that talks directly to the DB with live updates.


### Tooling & setup

#### Bundler
[Rsbuild](https://github.com/web-infra-dev/rsbuild), a fast build tool that claims to be faster than everyone else. It's built on top of [Rspack](https://github.com/web-infra-dev/rspack), greatly simplifying its configuration. Unlike Vite, it bundles both in prod and dev mod, providing consistent experience.

#### Monorepo
Rsbuild's [source build plugin](https://github.com/rspack-contrib/rsbuild-plugin-source-build) allowed to easily share code between apps, with a monorepo setup that is simple to maintain and reason about (compared to Nx, at least).

#### Lint & format
[Biome](https://github.com/biomejs/biome), an all-in-one linter and formatter. Compared to Eslint+Prettier it is much faster, needs a minimal config, and it's just one single dependency in the `package.json`.

### Misc
- Deployed to Cloudflare Pages with Github integration.
- Discovered [Codeium](https://codeium.com), an in-IDE AI coding assistant. Even its free plan worked consistently better than Guthub Copilot.
- Tried [Astro](https://astro.build/) to build a lightweight landing page (unfinished, see `apps/landing-astro (archived)`)
