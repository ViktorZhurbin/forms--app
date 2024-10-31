## Goals
- Explore what it takes to build a SaaS product from scratch.
- Investigate new technologies that could help build things faster.

## Means
Build an online form builder, eg. [Typeform](https://www.typeform.com/), [Fillout](https://www.fillout.com), [Tally](https://tally.so).

## Project structure
This is a monorepo with applications located in `apps/` directory, and shared code in `libs/`.

There's two main apps: Editor and Forms:

```
apps/
|-- editor/
|-- forms/
libs/
|-- shared/
```

### Editor
An admin tool to create, share and manage forms.

**Features**: drag & drop, optimistic updates, google auth, form preview, and table of responses.

### Forms
A user facing app, actual forms to fill in.

**Features**: mobile-friendly, works offline, swipe gestures support with Typeform-style slide animations.

## Running locally
Tested with Node v18 and v20.

From the project root:
- `pnpm i` to install dependencies
- `npm run dev:shared` would start dev servers for all the apps
  - `npm run dev:editor` to run only the Editor app (or `cd apps/editor && npm run dev`)

## Functionality
Create a form at https://forms-editor.pages.dev/create. Click _Preview_ button to see the result as you go.

Note that you need to click _Publish_ button to make the latest changes visible to the world.

You'd need to log in with a Google account for the full functionality. After logging in, you can copy the form's link to share it and collect responses.


## Tech Stack

### Framework
It's plain React and Typescript, with a [tiny router](https://github.com/molefrog/wouter).

### UI Library
[Mantine](https://github.com/mantinedev/mantine), a fully featured components library. If I were to compare it to Material UI, it's more lightweight and provides better DX.

### Database
[InstantDb](https://github.com/instantdb/instant), a real-time database that handles all the data fetching, permission checking, offline caching, and optimistic updates


### Tooling & setup

##### Bundler
[Rsbuild](https://github.com/web-infra-dev/rsbuild), a fast build tool that claims to be faster than everyone else. It's built on top of [Rspack](https://github.com/web-infra-dev/rspack), greatly simplifying configuration. Unlike Vite it bundles in dev mode as well.

Its [source build plugin](https://github.com/rspack-contrib/rsbuild-plugin-source-build) allowed to easily share code between apps in a simple pnpm monorepo.

##### Lint & format
[Biome](https://github.com/biomejs/biome), an all-in-one linter and formatter. Compared to Eslint+Prettier it is much faster, needs a minimal config, and it's just one single dependency in the `package.json`.

#### Deploy
Cloudflare Pages with Github integration.
