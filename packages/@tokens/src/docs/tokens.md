# Heller 2 Lite - Tokens README

A single `token` represents a single design decision that we have chosen to document in a strategic and semantic manner, in an effort to encourage intentioned and proper usage of our collective design choices.

## Tokens Architecture

### Base Tokens and Applied Tokens

In Heller-2 we have 2 types of tokens:

**Base Tokens** and **Applied Tokens** which may also be called **Semantic Tokens**.

**Base Tokens** are, at it's simplest definition, a key-value pair. The value in this pair is a primitive value, signifying a single design property, often in a single state or size.

**Applied** or **Semantic Tokens** are also key-value pairs, where the value is _either_ a reference to a **base token** or a value (primitive value).

Below, we display an example of the distinction between the two using color tokens.

Here is an example of two base color tokens:

```json
{
  "color": {
    "base": {
      "black": {
        "alpha": { "value": "#0C0C0C" },
        "beta": { "value": "#0B1215" }
      }
    }
  }
}
```

The key is an aggregate of the keys that subnest the object structure, in this case it is `color-base-black-alpha`, and that token's value is `#0C0C0C`.

Here is an example of several applied tokens:

```json
{
  "color": {
    "font": {
      "dark": {
        "contrast": {
          "high": { "value": "rgba(255, 255, 255, 0.87)" },
          "medium": { "value": "rgba(255, 255, 255, 0.60)" },
          "low": { "value": "rgba(255, 255, 255, 0.38)" }
        }
      },
      "light": {
        "contrast": {
          "high": { "value": "{color.base.black.alpha}" },
          "medium": { "value": "{color.base.black.alpha}" },
          "low": { "value": "{color.base.black.alpha}" }
        }
      }
    }
  }
}
```

As you can see here, the value of token `color-font-light-contrast-high` is a reference to a base token, whereas the value of the token `color-font-dark-contrast-high` is a primitive value.

### Token Naming Conventions Are Intentional

Where do developers fail the most dramatically? When patterns are ill-defined or when guard rails are ambiguous.

Naming conventions here are extremely intentional, and will vary as we expand our token library to accomodate more design decisions that we feel represent our product.

#### Color

##### Base Tokens

The convention is as follows:

For shades of black and white

```txt
color-base-{shade}-{greek-char}
```

For colors (not black and white)

```txt
color-base-{?subcollection}-{color-name}-{variant}
```

Where variant can be `"primary" | "secondary" | "tertiary" | "quadratic"`.

Examples of these are as follows:

- `color-base-black-alpha: #0c0c0c`
- `color-base-white-alpha: #ffffff`
- `color-base-blue-primary: #3f37c9`
- `color-base-synthwave-blue-secondary: #4361ee`

##### Applied Tokens

The convention is as follows:

```txt
color-{application}-{theme}-{property}-{variant}-{?states}-{?substate}
```

Where application is the use-case or the component where the token is being applied, where theme is the current theme that the components exist under (heller2 supports `"light" | "dark"` themes out of the box), where property is the intended css property to receive the token value (such as background-color or border), where variant is `"primary" | "secondary" | "tertiary" | "quadratic"`, where state is a potential element state the element could be in (hover, focus, active, etc), and where substate is the specific current state.

Examples of these are as follows:

- `color-button-light-background-primary: #3f37c9`
- `color-font-dark-contrast-high: rgba(255, 255, 255, 0.87)`
