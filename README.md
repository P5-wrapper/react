![@P5-wrapper/react](https://socialify.git.ci/p5-wrapper/react/image?description=1&font=Rokkitt&forks=1&issues=1&language=1&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fc6%2FP5.js_icon.svg%2F1920px-P5.js_icon.svg.png%3F20210812123459&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Auto)

# @P5-wrapper/react

A component to integrate [P5.js](https://p5js.org/) sketches into
[React](https://reactjs.org/) apps.

## NextJS

If you plan to use this component within a NextJS application, you should
instead use
[our NextJS dynamic implementation](https://github.com/P5-wrapper/next) instead.
To do get started, you can run:

```shell
[npm|yarn|pnpm] [install|add] @p5-wrapper/next @p5-wrapper/react
```

Please continue reading these docs and also look at
[the NextJS dynamic implementation docs](https://github.com/P5-wrapper/next) for
further supporting information.

## Demo & Examples

### Live demo

A live demo can be viewed at
[P5-wrapper.github.io/react](https://P5-wrapper.github.io/react/).

### Examples

The repository contains further
[examples](https://github.com/P5-wrapper/react/tree/master/example/sketches).

To try them out for yourself fork the repository, be sure you have
[PNPM](https://pnpm.io/) installed and then run the following:

```sh
git clone git@github.com:<your username>/react.git
cd react
pnpm install
pnpm preview
```

Then just open `http://localhost:3001` in a browser.

## Installation

To install, use the following command in the format appropriate to your chosen
package manager:

```shell
[npm|yarn|pnpm] [install|add] @p5-wrapper/react
```

## Usage

### Javascript

```jsx
import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
}

export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
```

### TypeScript

TypeScript sketches can be declared in two different ways, below you will find
two ways to declare a sketch, both examples do the exact same thing.

In short though, the `ReactP5Wrapper` component requires you to pass a `sketch`
prop. The `sketch` prop is simply a function which takes a `p5` instance as it's
first and only argument.

#### Option 1: Declaring a sketch using the `P5CanvasInstance` type

```tsx
import * as React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5: P5CanvasInstance) {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
}

export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
```

#### Option 2: Declaring a sketch using the `Sketch` type

Using the `Sketch` type has one nice benefit over using `P5CanvasInstance` and
that is that the `p5` argument passed to the sketch function is auto-typed as a
`P5CanvasInstance` for you.

> Side note:
>
> In general, it comes down to personal preference as to how you declare your
> sketches and there is nothing wrong with using the `P5CanvasInstance` manually
> in a regular `function` declaration.

```tsx
import * as React from "react";
import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";

const sketch: Sketch = p5 => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
```

#### TypeScript Generics

We also support the use of Generics to add type definitions for your props. If
used, the props will be properly typed when the props are passed to the
`updateWithProps` method.

To utilise generics you can use one of two methods. In both of the examples
below, we create a custom internal type called `MySketchProps` which is a union
type of `SketchProps` and a custom type which has a `rotation` key applied to
it.

> Side note:
>
> We could also write the `MySketchProps` type as an interface to do exactly the
> same thing if that is to your personal preference:
>
> ```ts
> interface MySketchProps extends SketchProps {
>   rotation: number;
> }
> ```

This means, in these examples, that when the `rotation` prop that is provided as
part of the `props` passed to the `updateWithProps` function, it will be
correctly typed as a `number`.

##### Usage with the `P5CanvasInstance` type

```tsx
import {
  P5CanvasInstance,
  ReactP5Wrapper,
  SketchProps
} from "@p5-wrapper/react";
import React, { useEffect, useState } from "react";

type MySketchProps = SketchProps & {
  rotation: number;
};

function sketch(p5: P5CanvasInstance<MySketchProps>) {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = props => {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();
    p5.noStroke();
    p5.push();
    p5.rotateY(rotation);
    p5.box(100);
    p5.pop();
  };
}

export function App() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setRotation(rotation => rotation + 100),
      100
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <ReactP5Wrapper sketch={sketch} rotation={rotation} />;
}
```

##### Usage with the `Sketch` type

```tsx
import { ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import React, { useEffect, useState } from "react";

type MySketchProps = SketchProps & {
  rotation: number;
};

const sketch: Sketch<MySketchProps> = p5 => {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = props => {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();
    p5.noStroke();
    p5.push();
    p5.rotateY(rotation);
    p5.box(100);
    p5.pop();
  };
};

export function App() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setRotation(rotation => rotation + 100),
      100
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <ReactP5Wrapper sketch={sketch} rotation={rotation} />;
}
```

### Using abstracted setup and draw functions

```jsx
import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function setup(p5) {
  return () => {
    p5.createCanvas(600, 400, p5.WEBGL);
  };
}

function draw(p5) {
  return () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
}

function sketch(p5) {
  p5.setup = setup(p5);
  p5.draw = draw(p5);
}

export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
```

### Props

The only required property of the `ReactP5Wrapper` component is the `sketch`
prop. The `sketch` prop is a function that will be passed a p5 instance to use
for rendering your sketches as shown in [the usage section](#usage) above.

You can pass as many custom props as you want to the `ReactP5Wrapper` component
and these will all be passed into the `updateWithProps` method if you have
defined it within your sketch.

#### Reacting to props

In the below example you see the `updateWithProps` method being used. This is
called when the component initially renders and when the props passed to the
wrapper are changed, if it is set within your sketch. This way we can render our
`ReactP5Wrapper` component and react to component prop changes directly within
our sketches!

```jsx
import { ReactP5Wrapper } from "@p5-wrapper/react";
import React, { useEffect, useState } from "react";

function sketch(p5) {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = props => {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();
    p5.noStroke();
    p5.push();
    p5.rotateY(rotation);
    p5.box(100);
    p5.pop();
  };
}

export function App() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setRotation(rotation => rotation + 100),
      100
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <ReactP5Wrapper sketch={sketch} rotation={rotation} />;
}
```

### Children

To render a component on top of the sketch, you can add it as a child of the
`ReactP5Wrapper` component and then use the exported `P5WrapperClassName`
constant in your css-in-js library of choice to style one element above the
other via css.

For instance, using [styled components](https://styled-components.com), we could
center some text on top of our sketch like so:

```jsx
import { P5WrapperClassName, ReactP5Wrapper } from "@p5-wrapper/react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalWrapperStyles = createGlobalStyle`
  .${P5WrapperClassName} {
    position: relative;
  }
`;

const StyledCentredText = styled.span`
  .${P5WrapperClassName} & {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }
`;

export function App() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setRotation(rotation => rotation + 100),
      100
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Fragment>
      <GlobalWrapperStyles />
      <ReactP5Wrapper sketch={sketch} rotation={rotation}>
        <StyledCentredText>Hello world!</StyledCentredText>
      </ReactP5Wrapper>
    </Fragment>
  );
}
```

Of course, you can also use any other css-in-js library or by just using simple
css to achieve almost anything you can imagine just by using the wrapper class
as your root selector.

## Fallback UIs

Lets say you want to have a fallback UI in case the `sketch` ever falls out of
sync or is undefined for some reason. If this is a use case for you then you
call use the `fallback` prop to provide the necessary UI to show in the case
that the `sketch` becomes undefined. An example could be as follows:

```jsx
import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketchOne(p5) {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
}

function sketchTwo(p5) {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(500);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
}

export function App() {
  const [sketch, setSketch] = React.useState(undefined);
  const chooseNothing = () => setSketch(undefined);
  const chooseSketchOne = () => setSketch(sketchOne);
  const chooseSketchTwo = () => setSketch(sketchTwo);

  return (
    <>
      <ul>
        <li>
          <button onClick={chooseNothing}>Choose nothing</button>
        </li>
        <li>
          <button onClick={chooseSketchOne}>Choose sketch 1</button>
        </li>
        <li>
          <button onClick={chooseSketchTwo}>Choose sketch 2</button>
        </li>
      </ul>
      <ReactP5Wrapper
        fallback={<h1>No sketch selected yet.</h1>}
        sketch={sketch}
      />
    </>
  );
}
```

In this case, by default the fallback UI containing
`<h1>No sketch selected yet.</h1>` will be rendered, then if you select a
sketch, it will be rendered until you choose to once again "show nothing" which
falls back to the fallback UI.

## P5 plugins and constructors

As discussed in multiple issues such as
[#11](https://github.com/P5-wrapper/react/issues/11),
[#23](https://github.com/P5-wrapper/react/issues/23),
[#61](https://github.com/P5-wrapper/react/issues/61) and
[#62](https://github.com/P5-wrapper/react/issues/62), there seems to be
confusion as to how we can use P5 plugins and constructors out of the box. This
section aims to clarify these!

### Plugins

Since P5 is being used in
[P5 instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)
as part of this project, P5 will not automatically load global plugins like it
usually might in global mode.

Let's say we want to use the
[P5 sound plugin](https://p5js.org/reference/#/libraries/p5.sound) in our
component, we could do the following:

```tsx
import * as p5 from "p5";
import { ReactP5Wrapper, Sketch } from "@p5-wrapper/react";
import React, { useEffect, useState } from "react";

(window as any).p5 = p5;

await import("p5/lib/addons/p5.sound");

const sketch: Sketch = p5 => {
  let song: p5.SoundFile;
  let button: p5.Element;

  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    p5.background(255, 0, 0);
    button = p5.createButton("Toggle audio");

    button.mousePressed(() => {
      if (!song) {
        const songPath = "/piano.mp3";
        song = p5.loadSound(
          songPath,
          () => {
            song.play();
          },
          () => {
            console.error(
              `Could not load the requested sound file ${songPath}`
            );
          }
        );
        return;
      }

      if (!song.isPlaying()) {
        song.play();
        return;
      }

      song.pause();
    });
  };

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

export default function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
```

In this Typescript + React example, we can see a few key things.

- Firstly we need to set `p5` on the `window` object manually. This is because
  `p5.sound` requires that it be executed client side only AND that `p5` be
  available BEFORE it is imported into the global (`window`) scope.
- Secondly, we ensure that audio is played after a user action, in our case this
  happens on a button click. This is because in some browsers, without waiting
  for a user interaction before playing audio, the audio will be blocked by the
  browser from playing at all.
- Thirdly and relevant especially to Safari users, Safari blocks audio from all
  tabs by default, you will need to manually change this setting in your Safari
  settings. This could affect other browsers but sadly this is a browser
  decision and until [P5 Sound](https://github.com/processing/p5.js-sound) is
  updated to support newer audio APIs and browser requirements. This could
  happen at anytime in other places and is a
  [P5 Sound](https://github.com/processing/p5.js-sound) issue most generally
  because it does not ask for permissions by default, even though browsers have
  been requiring it for some time.

> **Note:** The above example requires support for
> [top level await](https://caniuse.com/mdn-javascript_operators_await_top_level),
> [dynamic import statements](https://caniuse.com/es6-module-dynamic-import) and
> [the stream API](https://caniuse.com/stream) to be supported in your browser.
> Furthermore, [the stream API](https://caniuse.com/stream) built into the
> browser requires that HTTPS is used to ensure secure data transmission.

### Constructors

To access P5 constructors such as `p5.Vector` or `p5.Envelope`, you need to use
the instance mode syntax instead. For example:

| Constructor | Global mode accessor | Instance mode accessor  |
| ----------- | -------------------- | ----------------------- |
| Vector      | p5.Vector            | p5.constructor.Vector   |
| Envelope    | p5.Envelope          | p5.constructor.Envelope |

So now that we know this, let's imagine we want a random 2D Vector instance. In
our `sketch` function we would simply call `p5.constructor.Vector.random2D()`
instead of `p5.Vector.random2D()`. This is because of how the
[P5 instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)
was implemented by the P5 team. While I am not sure why they decided to change
the API for instance mode specifically, it is still quite simple to use the
constructs we are used to without much extra work involved.

## Development

**NOTE:** The source code for the component is in the `src` directory.

To build, watch and serve the examples which will also watch the component
source, run:

```sh
  pnpm preview
```
