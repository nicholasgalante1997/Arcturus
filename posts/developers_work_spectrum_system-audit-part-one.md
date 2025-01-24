---
slug: "/developers/work/spectrum/system-audit-part-one"

title: "Auditing an internal microfrontend system at moderate scale - Part 1"
description: "The pursuit of perfect software is the pursuit of perfect processes; and a bunch of other things you can say to indicate progress is usually a snake eating its own tail."

author:
  - first_name: "Washington"
    last_name: "Irving"
    email: "rustycloud42@protonmail.com"
    github: "nicholasgalante1997"
    avatar: "/assets/headshot.jpg"
    nickname: "Cthu"
    id: '001'

category: "CASE STUDY"
archCategory: "SOFTWARE ENGINEERING"

searchTerms:
  - Springfield
  - System Audit
  - Microfrontends

releaseDate: "12/28/2024"
estimatedReadingTime: "20 minutes"

media:
  - source: "/assets/doodles.jpg"
    alt: "An image from the 'Doodles' NFT collection"
    aspectRatio: "16 / 9"

genres:
  - "System Audit"
  - "Software Engineering"
  - "Microfrontends"
---

*Foreground*

You can read this if you'd like to gather a better understanding of the system that was audited, or you could also not.

> The system that we'll be discussing today is a microfrontend system that is aggregated to compose an internal sales dashboard at company X. This system does not leverage modern microfrontend composition tooling, such as `bit`, `module federation`, or `native federation`. It's existence predates these toolings, but it itself is still in existence and in use. Instead of the aforementioned tooling, Company X leverages a custom tooling/abstraction that helps achieve the end goal of microfrontend composition. Company X services tens of millions of customers within the United States.
>
> First, we'll discuss architecture and intent, and then move into composition/implementation. As far as intent and architecture, this tooling wears a lot of hats. It's intended to first and foremost act as a dependency management tool for mfes (microfrontends) within the system to ingest other mfes. That makes sense from a microfrontend perspective, as within the mfe architecture, microfrontends need a way to expose, ingest, and releverage other microfrontends. To this extent, 

# Abstract

I would love to say that by the time a software system reaches a level of maturity, that there's a level of simplicity and cohesion that has emerged that fosters more rapid and autonomous development. That's likely the way things *should* be. But we don't live in an ideal world, and it is the case often enough in *enterprise software* that when a system reaches a state of advanced maturity, development can actually degrade and slow, becoming more cumbersome to navigate for even talented developers.  

There are a number of reasons why this happens. Lack of clear patterns and documentation, that's a big one. Custom internal tooling (we'll dive more into the specifics of this one later), while necessary at a certain point for most large enough companies, when not properly documented, upgraded, or maintained can also become a huge bottleneck; The first two issues lead to a greater degree of more nuanced localized issues for teams working within the system. The largest likely is duplicated efforts, which really degrades the benefits of a plug and play mfe architecture anyway. 