# HELLER-2-LITE

> DISCLAIMER: This package is still in active development. That means that features and conventions within this package are subject to change with **minor** patch updates (i.e. 0.0.1 => 0.1.0).  

This package leans on the concept of design tokens. This definition of design tokens is borrowed from the W3C Community Group Design Tokens Format Module Draft Version 2:  

> Design tokens are a methodology for expressing design decisions in a platform-agnostic way so that they can be shared across different disciplines, tools, and technologies. They help establish a common vocabulary across organisations.

In short, similarly to how JSON, GraphQL, and Protocol Buffers offer language agnostic protocols for data transfer, design tokens are a platform agnostic approach to design system architecture that support an enhanced transparency and understanding of the design decisions an organization makes.

## Design Tokens

For a more in-depth understanding of design tokens, their methodology, community support, progress, etc., review the following resources:  

- [W3 Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- [W3 Design Tokens Format Module Draft 2](https://second-editors-draft.tr.designtokens.org/format/)
- [Medium - Design Tokens for Dummies](https://uxdesign.cc/design-tokens-for-dummies-8acebf010d71)
- [Medium - Design Tokens, What they are and how they will help you](https://lukasoppermann.medium.com/design-tokens-what-are-they-how-will-they-help-you-b73f80f602ab)

### Example of a Design Token

```json
{
    "color": {
        "base": {
            "primary": {
                "blue-100": {
                    "value": "#c6e0ff"
                }
            }
        }
    }
}
```
