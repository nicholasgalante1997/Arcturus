---
slug: "/developers/blog/lms/just-like-make-a-design-system-while-you-sleep"
visible: true
title: "Case Study: Ollama, Style-Dictionary, Storybook, Bun; Can a locally running LM build you a minimally viable design system?"
description: "Case Study: Ollama, Style-Dictionary, Storybook, Bun; Can a locally running LM build you a minimally viable design system?"
media:
  - source: "/assets/doodles-adventurer.jpg"
    alt: "Me, as a Doodle, about to embark on an adventure through a valley, with several mountains in the background."
    aspectRatio: "16 / 16"
releaseDate: "02/15/2025"
estimatedReadingTime: "45 minutes (Maybe More!)"
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
  - Design Systems
  - Design Tokens
  - Large Language Models
  - Ollama
  - Storybook
  - Style Dictionary
  - Bun
  - Turborepo
genres:
  - Design Systems
  - Design Tokens
  - Large Language Models
  - Ollama
  - Storybook
  - Style Dictionary
  - Bun
  - Turborepo
---

## No Nonsense Experiment

Okay, usually I start these articles with like an hour or two of rambling about how Vercel wants to eat your wallet and kids, but today none of that. No nonsense case study. We're gonna get somewhere or we're not. Let's do it.

## Problem Statement

I have worked on design systems for ~5 years now in an enterprise setting, and I've learned a lot, and I continue to learn a lot every day. I love design systems, and they are starting to resent me less. It's a beautiful thing. Today, we're going to attempt to use Ollama, Storybook, Style Dictionary, and Bun to build and publish a minimally viable design system, with component library implementations. I would say in this case, minimally viable would mean its easily maintainable, CICD integrated, deployed, consumable, and visually not ugly. After, we might go crazy and build a Figma Plugin that syncs all of this to Figma even.

## Project Setup

### Environment Setup

Okay so we'll be using [ollama](https://ollama.com/) to locally run a language model, that we're going to use to do the bulk of the heavy lifting for us. If you want to pay for tokens and hit a paid model, all the power to you. You probably also pay at free museums. This guide is still for you, since you'll just need to very slightly tweak where you're making your post call to, and perhaps some of the prompting. You can check if you have ollama installed and running with the following command:

> MacOS, Linux

```zsh
ollama -v
```

If you have an active version, you can run:

```zsh
curl -f http://localhost:11434/
```

and you should see the following output:

> Ollama is running

If you do not have ollama installed, you can [follow the instructions here](https://github.com/ollama/ollama) for whatever machine you are using:

Great, so now you have ollama installed. We're gonna try out a few models, I don't know if any of them are gonna be good. Deepseek tanked my NVDA holdings for a sec there, so lets try that one. We'll also try llama, gemma, and qwen. When it's all set and done, here are the models and specs we'll be working with:

#### deepseek-coder-v2 (16b) ~9gb

#### llama-3.3 (70b) ~43gb

#### codegemma (7b) ~5gb

#### qwen2.5-coder (32b) ~20gb

> Yikes, that's a lot! Here are some things you can do to make this exercise, if you are doing this at home, more approachable.
>
> 1. Stagger Downloads
> Try out one model. Like it? Great. Want to try the next? Clean up these resources   from your machine and then move on with the guide if you are pressed for resources.  
>
> 2. Download Speed
> Try a wired connection, or attempt some of the models that are smaller in parameter size as they are also the smaller download sized one. Feel free to skip the larger models if you do not have access to that type of unallocated space.

Okay so now you have `ollama` setup. Great. We will also be using the [**Bun**](https://bun.sh/docs/installation) runtime in this demo so if you do not have bun installed then go ahead and follow that link above and go through the installation steps.

### Local Package Setup

#### If you're cloning from Github

```bash
git clone https://github.com/nicholasgalante/lmdsgen.git

cd lmdsgen

bun install
```

That's probably enough for now. Let's break into setting up some of the code.

### Setting Up the Code

#### /core/tokens

Okay this is going to be where we start setting up our tokens library. What is a tokens library? In Design System terms there is a concept of a [Design Token](https://tr.designtokens.org/format/) which essentially is representative of a design choice or decision that exists within a framework of guidelines and usages. For our purposes, we're going to set up this `tokens` library using style-dictionary and sass, and parse it to various output formats that we can use across a number of platforms.  

From a terminal with this workspace open, run:

```bash
cd core/tokens
```

Let's walk through how this package is setup. You have some very standard typescript ecosystem files; package.json, tsconfig.json, bun.lockb, a bundler file etc. Our source code is organized into the `./lib` directory. Inside of `./lib` we have a `tokens` directory, which should be empty, and it will by the end of this demo be populated with the tokens that each of these language models is able to create for us. We have folders for custom transforms and formats that we want to use to extend style dictionary with. We have a `config.ts` file that contains our style dictionary configuration, and we have a `build-tokens.ts` file that actually generates our output. Ideally what we'd like to do is create a seamless flow, in which we can run a command line process, and it will request design token generation from a model we specify, then writes (after verifying integrity) the tokens to the `core/tokens/lib/tokens` directory, where we can trigger a build of our design system token values into their various output formats. Ideally we then want to trigger a deploy, perhaps offer a dry-run capability, and we know we also want to leverage the LMs to generate simple predictable React component code in `core/react-components` and maybe even some Web Components or simple class name based vanilla js components as well. Not sure how that all fits together yet at time of writing but we'll get there. 

