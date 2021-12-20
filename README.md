# react-use-focus-trap

## Everytime when people implement Modals...

...People forget that pro users as well as users that are permanently or temporarily restricted will use other inputs than the mouse - e.g. a keyboard.

![Sad Face](https://media.giphy.com/media/3otWpthJPjNfD1xuh2/giphy.gif)

Now tabbing through a modal most often leads to the fact that the focus goes below the Modal and then good luck finding your way back. **A horror show.**

That is why you can simply add this hook and you should be good of with the most basic thing you can do: Locking into the modal while it is open.

![Happy Face](https://media.giphy.com/media/HTLHGEXpZ3zhuqME3q/giphy.gif)

## Installation

```shell
npm i react-use-focus-trap
```

# Usage

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

There is a demo application for easy debugging included. To start developing do this:

```shell
npm install
npm run build
npm link
cd demo
npm install
npm start
```

This opens up a dev-server with a silly modal.

An extremely helpful React Hook to trap the focusable elements / Hello Modals! Hello a11y!
Any improvement / feedback is ALWAYS appreciated!
