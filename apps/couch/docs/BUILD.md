# COUCH GAG BUILD PROCESS

PRODUCTION BUILD SCRIPT: `pnpm build`

THIS IS AN AGGREGATION OF SEVERAL SMALLER BUILD STEPS/SCRIPTS, CHRONOLOGICALLY AS FOLLOWS - 

1. `clean:build`
   1. Purpose: removes the "./build/" directory if one exists, purging old build artifacts
2. `pkg:ts-script`
   1. Purpose: Bundles (with Webpack) two typescript files into executable JS files that are used at a later step in the build compilation process.
   2. Entry Files:
      1. `/src/static-site-gen/build-app.tsx` => `/.build-process/build-app.js`
      2. `/src/static-site-gen/build-dynamic-entrypoints.ts` => `/.build-process/build-entry-points.js`
   3. Webpack Configuration: `/webpack/webpack.node.js`
3. `pkg:entry`
   1. Purpose:
      1. Executes `.build-process/build-entry-points.js`
      2. That script attempts to iterate through the **StoryFiles** present in the `/writ/`* directory and subdirectories and convert the contents of that **StoryFile** (Both the **Frontmatter** and the **Body**) into a "auto-generated" typescript file, with 
