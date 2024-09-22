# Arc Migration

> What do we really want to accomplish here?

Couch Gag is a statically generated website currently.  

When we run the build process, we do the following:

- Clean (del) the `/build` directory
- Bundle our static site generation script with Webpack (for node)
  - These files are output to `/.build-process/`
- Bundle our client side hydration scripts with Webpack (for browser)
  - These files are output to `/build`
- Run the static site generation script
  - `node .build-process/build-app.js`
    - 1. Load the template html file at `html/index.html` with fs
    - 2. Get a list of pages by calling `getPages()`
      - getPages() does a few things
      - Creates a list of static page configs (Component + Metadata)
      - Builds a list of semi-dynamic page configs
        - Loads MD + Frontmatter from local files in `/writ` directory
        - Parses into a PROPS object
        - Builds page config using props config object
      - Spreads static page configs & semi dynamic page configs together
      - returns all page configs
    - Iterate through each page config
    - Render the component to string
    - Inject metadata in html (replacing comment tags)
    - Write html out to `/build`
- Remove (del) `.build-process`
- Copy static asset files
  - fonts
  - css
  - images
  - media
  - icons
- Copy Web Worker JS
- Done

## Things to do before moving to react-sleepy for building

1. Layout Component
   1. We currently do a lot of HOC wrapping to create page roots
   2. Lets pivot to a Document/Layout component pattern like dotafts/www
      1. ~~Document~~
         1. ~~Head~~
         2. ~~Body~~
         3. ~~RouteGuard~~
      2. ~~Browse~~
      3. ~~Error~~
      4. ~~Landing~~
      5. ~~Story (Post)~~
      6. Subscribe

