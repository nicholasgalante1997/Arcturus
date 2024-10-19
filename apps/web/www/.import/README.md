# ES6 Imports with Import Maps

We (Web Developers) no longer need to be burdened by build processes. We do not need to transpile es6 code into es5 for browser support. Most modern browsers, read that as all modern browsers, support ES6 syntax, and with the adoption of import maps, we do not need to bundle our dependencies into monstrous entrypoint files, or indecipherable chunk files that have been minified and made illegible. We are at a point, where we can send our modern code to the browser, as is, with it's dependencies clearly dictated, and loaded in parallel, and we can write modern scalable apps in vanilla es6 with no frameworks, no bundlers, no bullshit. Just clean modern web development.

When we take a dependency, we do the following:

1. Create an import file in .import
   1. It is named after the dependency, and the ext. is .toml.
   2. The dependency name, version, and cdn links are required fields
   3. At this point in time, these are largely clerical. But they can be used in the future to autogenerate import maps with very little setup/loe.
2. Optionally, you may add it as a dev depenndency with pnpm.
3. Add it to the html import map
4. Set up a preload link to preload the js import.
