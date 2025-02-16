---
slug: "/developers/blog/opinion/react/framework/bun-and-turborepo"
visible: true
title: "Modern React without Frameworks: React, Bun, and Turborepo"
description: "React is a wonderful thing. Here's how you can keep it wonderful for you and your team."
media:
  - source: "/assets/doodles-shapes.jpg"
    alt: "Doodles basic shapes, smiling in a crude and cute fashion"
    aspectRatio: "16 / 16"
releaseDate: "02/15/2025"
estimatedReadingTime: "45 minutes"
author:
  - first_name: "Nick"
    last_name: "Galante"
    email: "rustycloud42@protonmail.com"
    github: "nicholasgalante1997"
    avatar: "/assets/headshot.jpg"
    nickname: "Cthu"
    id: '001'
category: Web Development
archCategory: SOFTWARE ENGINEERING
searchTerms:
  - Web Development
  - Javascript
  - React
  - Bun
  - Turborepo
genres:
    - Turborepo
    - Bun
    - React
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Frameworks are commitments, and React has gone the way of the framework](#frameworks-are-commitments-and-react-has-gone-the-way-of-the-framework)
- [React Framework Hate Fest 2025](#react-framework-hate-fest-2025)
  - [1. Create-React-App brought about a culture of client side rendering](#1-create-react-app-brought-about-a-culture-of-client-side-rendering)
  - [2. Developers could have ate their peas](#2-developers-could-have-ate-their-peas)

## Frameworks are commitments, and React has gone the way of the framework

I'm not the biggest fan of react frameworks. In the beginning, way back, React was the _library_ for building user interfaces. It was unopinionated, and it was flexible. It did not seek to be a framework. As of yesterday, [React has gone ahead and deprecated create-react-app](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), and this is objectively a great thing. There's no need for it anymore. But within the sunsetting blog post, I read the following,

> We recommend creating new React apps with a framework.

And this is a step in the wrong direction, from where we all needed React to go.

If you were someone who was excited about React Server Components or React Compiler after React Conf 2024 last year, odds are there is a bitter taste in your mouth right now. Where is the generalized support? It seems like if you want to use React Server Components, or the React Compiler, in non sandbox environments, you're forked if you're not willing to move your app over to a framework like next.js or remix/react-router [which seems intent to oscillate back and forth between each name annually like an Artist formerly known as Prince].  

I've posted some guides about how to get React Server Components up and running without using a framework, or how to leverage the experimental React Compiler in your build tooling using webpack and a custom babel loader, also not using a framework. But these solutions both suck. Both of these options are subpar and not primed for production; React wants you to use a framework. They want you on next.js or remix or whatever. They even said so in their [Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) blog post.

I want you to rebel against this as hard as you can. I will help you. If your manager comes to and starts talking your ear off about this hot new React framework, send him my way. I'm foaming at the mouth for this opportunity.  

## React Framework Hate Fest 2025

_Why do you hate React frameworks, Nick? What did they do to you to deserve such an aversion?_

There's a number of reasons.  

### 1. Create-React-App brought about a culture of client side rendering

Create-React-App was a horrendous framework that survived for many years by preaching that it was itself in fact not a framework. By all proverbs, it resented it's own existence to the very end. Here's the positives; It spawned a wave of thousands, if not millions of React applications, a testament to the developers' natural ability to circumvent, and it reduced a lot of the boilerplate around react project scaffolding (this was it's largest purpose so it's unsurprising it retains this positive). Now, here's the ugly;

The pattern for configuring the development server and the SPA bundler was less than ideal. It felt wrong to need to bring in craco to customize the build process to your liking in a way that felt malleable. Not to mention, at reasonable scale, your entrypoints, even when optimized and split into chunks, or asynchronously loaded, were still massive and this felt like a never ending up-hill battle. Tweak the configuration, reduce the bundle size, add another feature or library, and rinse and repeat the whole thing. It was less than ideal.

It also felt like a miss that the bundler was largely Webpack for a vast majority of CRA's life.

> I have a lot of love for Webpack and what it is, what it has done for the growth of the web over the years. I have a lot of love for the maintainers, and there are various paradigms that have emerged out of Webpack, such as Module Federation, that have fundamentally advanced web development as we know it. But. The year is 2025. Javascript based compilers are a relic, and it's strictly due to performance. A lot of modern bundlers are moving over to languages like rust and go, for the performance improvement.

Client Side Rendering probably should never have been the default. The simplicity of the React-DOM Server API's surrounding static site generation and server side rendering are largely my basis for this claim. But I'll defend it in other ways; We had to get clever to produce SEO friendly pages with tools like React Helmet/etc, whereas with a SSG/SSR-first mentality, we likely can solve this SEO issue without the inclusion of external libraries (God, I hate next/head). We needed to invent mechanisms to client side route our applications, either leveraging react-router-dom, which promises to break its implementation API via a breaking change at least once every two years, or get clever and create custom implementations, whether stateful in approach, or using the History API, or using routing events, or whatever you get the point. You know how much thought goes into routing in an SSG situation? Like probably none. Same with SSR. It's an extension of the exercise of routing the server, which you already have a strategy for, Im sure.  

Let's go further. Performance. There really does become a point where performance becomes a real fucking pain in a client side rendered React environment. I've seen this at scale a number of times, but two where it became an actual issue. One was Amazon's Prime Gaming storefront, which was, at the time of my employment, a rather large client side rendered react app that was intensely media-heavy, and a number of these assets had to be fetched dynamically after initial entrypoint network calls, adding to the load time of the application. The second was a smaller, but still of moderate size, web3 application for a Blockchain Protocol company that is likely still trying to figure out what it actually does.

### 2. Developers could have ate their peas

An entire generation of frontend developers felt they did not need to learn about the implementation specifics of React Server Side Rendering because Next.js and Gatsby did this for them, and it's so stupidly easy to have implemented on our own, that not learning it first hand has done us no favors. The React Server APIs and their corresponding informationa are literally fucking amazing. If all documentation was like React's, we'd live in a culture of software literacy that grossly surpassed english language or cultural literacy (I challenge you America to disprove this statement, you dumb giant cow).
