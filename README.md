# React Focus Trap (`react-use-focus-trap`)

[![ci](https://github.com/activenode/react-use-focus-trap/actions/workflows/ci.yml/badge.svg)](https://github.com/activenode/react-use-focus-trap/actions/workflows/ci.yml)

An extremely helpful React Hook to trap the focusable elements. 

(The underlying Guideline: https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html)

_Improvement or feedback of any kind is **always** appreciated!_

## The Issue with Modals

When implementing Modals, people tend to forget that pro-users and users that are permanently or temporarily restricted will use other inputs than the mouse - e.g., a keyboard.

![Sad Face](https://media.giphy.com/media/3otWpthJPjNfD1xuh2/giphy.gif)

Now tabbing through a modal most often leads to the focus going z- or y-wise below the Modal. Good luck finding your way back then! It's a **horror show**.
That's the point where this library comes into play. Add this hook, and lock ("trap") the focus into the modal.

![Happy Face](https://media.giphy.com/media/HTLHGEXpZ3zhuqME3q/giphy.gif)

## Installation

```shell
npm install react-use-focus-trap
```

## Usage

```jsx
import React from "react";
import { useFocusTrap } from "react-use-focus-trap";

export function NiceModal() {
  const [trapRef] = useFocusTrap();

  return (
    <div class="my-weird-modal" ref={trapRef}>
      Foobar
    </div>
  );
}
```

## Developing

There is a demo application for easy debugging included. To start developing, simply execute these commands:

```shell
npm install
npm run build
npm link
cd demo
npm install
npm start
```

This opens up a dev-server with a silly modal to test your code in.
