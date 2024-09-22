# Couch Gag Website

---

## Tech Stack

This project uses  

**Dependencies**

- React v18
- React-DOM v18
- React-Markdown v8
- pino v8
- npm-run-all v4
- classnames v2
- @vercel/analytics v1
- axios
- lodash.isequal

**Dev Dependencies**

- webpack v5
- typescript v5
- jest v29
- prettier
- eslint (init config)
- @babel/core v7.^
- dotenv
- handlebars
- frontmatter  

We take a minimalist stance on dependencies. Unless it is an absolute chore to produce the logic a package provides in a minimalist fashion, please take extreme caution when adding packages. The bundle size remaining small is a high priority in this package. We aim to keep output js bundles at around/under 300kiB, which keeps TTI, FCP, LCP super low.  

## Styling

Components are styled using **CSS Classnames**. To assist in creating some of these classnames dynamically and on the fly within components based on states, we leverage the package `classnames`.

Here is an example of styling a component with this pattern.

**Folder Structure**

- src
  - components
    - Sample
      - Sample.tsx
      - classnames.ts
      - index.ts
  - styles
    - sample.css

**classnames.ts**

```ts
export const SampleClassnames = {
    Wrapper: 'sample-component__wrapper'
    Main: 'sample-component__main-section',
    Title: 'sample-component__title'
} as const;
```

**Sample.tsx**

```tsx
import React from 'react'
import { SampleClassnames } from './classnames';

function SampleComponent() {
    return (
        <div className={SampleClassnames.Wrapper}>
            <div className={SampleClassnames.Main}>
                <h1 className={SampleClassnames.Title}>A Sample Component</h1>
            </div>
        </div>
    );
}
```

**sample.css**

```css

.sample-component__wrapper {
    /* ... */
}

.sample-component__main-section {
    /* ... */
}

.sample-component__title {
    /* ... */
}

```

## State Management

This app has minimal state management concerns. Currently, the app does not leverage any 3p solutions. We make use of Provider/Subscriber patterns that are easily craftable/derivable via the `React Context API`. All of our state (contexts), can be found inside of `src/contexts`. A given context file exports a `Provider`, which is a react component that wraps its child nodes in the ContextProvider and makes the context available to them downtree, and it also exports a hook that **child react components** can leverage to fetch data from higher in the tree. All of our context providers are wrapped/chained inside the **RootComponent** `src/components/root` which wraps the entire page/react-tree in a series of top level providers. 

See **Higher Order Component Wrappers** OR **RootComponent** for a more in depth description.

## Component Development

Components are created in the `src/components` subdirectory.

Components follow a standard file structure / folder structure

- src
  - components
    - Example
      - **Example.tsx** (Component file)
      - Example.test.tsx (if there are tests) (Not mandatory)
      - Example.stories.tsx (if there are stories) (Not mandatory)
      - animations.ts (if there are animations) (Not mandatory)
      - **classnames.ts** (Class Names file)
      - **index.ts** (Exports file)

## Pages (Client and Server)

Pages are the top level components that are rendered for a given route. They build from components provided out of `src/components`.

All pages can be located in the `src/pages` directory.

Pages are used in both a client and server context.

## Higher Order Component Wrappers

## Root Component

## Rendering Strategy

This package leverages static site generation. It doesn't use any fancy frameworks like next.js or gatsby. Intentionally, we do not want to keep up with those packages structural updates over the years. SSG means that we have a multiple phase build process to create the final static output.

## Building Strategy

## API

## Hosting, Deployment, CI/CD

This project is hosted on Vercel. When we push to a remote branch, Vercel creates a preview deployment for us. Each stage, Dev, Beta, Gamma, Prod, has its own set of environment variables. When we merge into our main branch, Vercel kicks off a production release for us at our primary domain. This project is served entirely from the Vercel CDN/Host network. Its build process produces all files it needs to function correctly. 

### Git Branching Strategy

New work gets its own branch following the pattern `workstreams/{{ name of your workstream }}`  
When work is ready for a PR, it is raised to be merged into the branch `dev`  
If bake time goes great on dev, we raise a PR from `dev` to `gamma`  
Finally, after extensive testing in gamma we, we can merge `gamma` to `main`

## Using Corepack For Package Management

Please read the [Node JS Corepack Docs](https://nodejs.org/api/corepack.html) which will provide an overview of enabling and working with corepack. This project uses pnpm, which is available by default through corepack. Corepack is an experimental feature that ships with versions of node greater than 16.9.x

