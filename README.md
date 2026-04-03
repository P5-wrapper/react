![@P5-wrapper/react](https://socialify.git.ci/p5-wrapper/react/image?description=1&font=Rokkitt&forks=1&issues=1&language=1&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fc6%2FP5.js_icon.svg%2F1920px-P5.js_icon.svg.png%3F20210812123459&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Auto)

# @P5-wrapper/react

A component to integrate [P5.js](https://p5js.org/) sketches into
[React](https://react.dev/) apps.

<details><summary>Migrating from version 4?</summary>
<p>

Breaking changes in v5:

1. Component rename
   - `ReactP5Wrapper` → `P5Canvas`

2. Types
   - `P5WrapperProps` → `P5CanvasProps`
   - `P5WrapperClassName` → `CanvasContainerClassName`

3. Peer dependencies
   - `p5` >= 2.0.0
   - `react` >= 19.0.0
   - `react-dom` >= 19.0.0

If you are still using version 4, you can find the documentation
[here](https://github.com/P5-wrapper/react/tree/v4.4.1#readme).

</p>
</details>

## Installation

```shell
[npm|yarn|pnpm] [install|add] p5 @p5-wrapper/react
```

`p5`, `react` and `react-dom` are peer dependencies and must be installed in
your project.

<details><summary>TypeScript setup</summary>

Install the p5 type definitions as a dev dependency:

```shell
[npm|yarn|pnpm] [install|add] -D @types/p5
```

</details>

<details><summary>Next.js setup</summary>

For Next.js applications, use
[our Next.js dynamic implementation](https://github.com/P5-wrapper/next):

```shell
[npm|yarn|pnpm] [install|add] p5 @p5-wrapper/next @p5-wrapper/react
```

See
[the Next.js dynamic implementation docs](https://github.com/P5-wrapper/next)
for further details.

</details>

## Demo & Examples

A live demo can be viewed at
[P5-wrapper.github.io/react](https://P5-wrapper.github.io/react/). The
repository also contains
[example sketches](https://github.com/P5-wrapper/react/tree/main/demo/sketches).

To run the examples locally:

```sh
git clone git@github.com:<your username>/react.git
cd react
pnpm install
pnpm preview
```

Then open `http://localhost:3001` in a browser.

## Usage

### JavaScript

```jsx
import * as React from "react";
import { P5Canvas } from "@p5-wrapper/react";

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
  return <P5Canvas sketch={sketch} />;
}
```

### TypeScript

The `sketch` prop is a function that receives a p5 instance. You can type it
using either the `Sketch` type or the `P5CanvasInstance` type:

```tsx
import * as React from "react";
import { P5Canvas, Sketch } from "@p5-wrapper/react";

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
  return <P5Canvas sketch={sketch} />;
}
```

> `Sketch` auto-types the `p5` argument for you. If you prefer a regular
> `function` declaration, you can use `P5CanvasInstance` directly:
>
> ```ts
> import { P5CanvasInstance } from "@p5-wrapper/react";
>
> function sketch(p5: P5CanvasInstance) {
>   /* ... */
> }
> ```

### Using abstracted setup and draw functions

If you prefer to split your sketch logic into separate functions:

```jsx
import * as React from "react";
import { P5Canvas } from "@p5-wrapper/react";

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
  return <P5Canvas sketch={sketch} />;
}
```

### Props

You can pass any custom props to `P5Canvas`. These are forwarded to the
`updateWithProps` method if you define it in your sketch.

#### Reacting to props

`updateWithProps` is called on initial render and whenever the props change:

```jsx
import { P5Canvas } from "@p5-wrapper/react";
import React, { useEffect, useState } from "react";

function sketch(p5) {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = props => {
    rotation = (props.rotation * Math.PI) / 180;
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

  return <P5Canvas sketch={sketch} rotation={rotation} />;
}
```

#### Typed props with generics

Use generics so that props passed to `updateWithProps` are properly typed:

```tsx
import { P5Canvas, Sketch, SketchProps } from "@p5-wrapper/react";
import React, { useEffect, useState } from "react";

type MySketchProps = SketchProps & {
  rotation: number;
};

const sketch: Sketch<MySketchProps> = p5 => {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = props => {
    rotation = (props.rotation * Math.PI) / 180;
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

  return <P5Canvas sketch={sketch} rotation={rotation} />;
}
```

> You can also write `MySketchProps` as an interface:
>
> ```ts
> interface MySketchProps extends SketchProps {
>   rotation: number;
> }
> ```
>
> And if you prefer `P5CanvasInstance` over `Sketch`, generics work the same
> way:
>
> ```ts
> function sketch(p5: P5CanvasInstance<MySketchProps>) {
>   /* ... */
> }
> ```

### Custom updaters

If you need to bridge React state updates from within the p5 lifecycle — for
example, reading `frameCount` or other instance properties to drive React state
— you can use the `updater` prop. It receives a callback that runs alongside
`updateWithProps` on every props change, but lives in the React layer:

```tsx
import { P5Canvas, Sketch, SketchProps, Updater } from "@p5-wrapper/react";
import React, { useCallback, useState } from "react";

type MySketchProps = SketchProps & { rotation: number };

const sketch: Sketch<MySketchProps> = p5 => {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = props => {
    rotation = (props.rotation * Math.PI) / 180;
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
  const [frameCount, setFrameCount] = useState(0);

  const updater = useCallback<Updater<MySketchProps>>((instance, props) => {
    setFrameCount(instance.frameCount);
  }, []);

  return <P5Canvas sketch={sketch} updater={updater} rotation={rotation} />;
}
```

The `updater` callback receives the p5 instance and the current sketch props. It
is not passed to `updateWithProps`, so it does not leak React concerns into your
sketch logic.

### Children

To render a component on top of the sketch, add it as a child of `P5Canvas` and
use the exported `CanvasContainerClassName` constant to style the overlay via
CSS.

<details><summary>Example with styled-components</summary>

```jsx
import { CanvasContainerClassName, P5Canvas } from "@p5-wrapper/react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalWrapperStyles = createGlobalStyle`
  .${CanvasContainerClassName} {
    position: relative;
  }
`;

const StyledCentredText = styled.span`
  .${CanvasContainerClassName} & {
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
      <P5Canvas sketch={sketch} rotation={rotation}>
        <StyledCentredText>Hello world!</StyledCentredText>
      </P5Canvas>
    </Fragment>
  );
}
```

</details>

You can use any CSS-in-JS library or plain CSS — just target the wrapper class
as your root selector.

### Fallback UIs

If the `sketch` prop is undefined, you can provide a fallback UI:

```jsx
import * as React from "react";
import { P5Canvas } from "@p5-wrapper/react";

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
      <P5Canvas fallback={<h1>No sketch selected yet.</h1>} sketch={sketch} />
    </>
  );
}
```

When no sketch is selected, the fallback UI is shown. Selecting a sketch
replaces it with the canvas.

### Error and Loading UIs

You can pass `error` and `loading` props to customise what is shown when
something goes wrong or while the component is loading.

#### Error UIs

Pass a function to the `error` prop to handle errors thrown within the sketch or
its children:

```tsx
import * as React from "react";
import { P5Canvas, P5CanvasInstance } from "@p5-wrapper/react";

function ErrorChild() {
  throw new Error("oops");
}

function ErrorUI(error: unknown) {
  if (error instanceof Error) {
    return <p>An error occured: {error.message}</p>;
  }

  return <p>An unknown error occured: {String(error)}</p>;
}

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
  return (
    <P5Canvas sketch={sketch} error={ErrorUI}>
      <ErrorChild />
    </P5Canvas>
  );
}
```

> JS/TS allow you to `throw` any value, not just `Error` instances. Always check
> `error instanceof Error` before accessing `.message`.

#### Loading UIs

Pass a function to the `loading` prop to show a custom UI while the component is
being lazy loaded:

```tsx
import * as React from "react";
import { P5Canvas, P5CanvasInstance } from "@p5-wrapper/react";

function LoadingUI() {
  return <p>The sketch is being loaded.</p>;
}

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
  return <P5Canvas sketch={sketch} loading={LoadingUI} />;
}
```

## P5 plugins and constructors

<details><summary>Using plugins (e.g. p5.sound)</summary>

Since P5 is used in
[instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode),
plugins are not loaded automatically. You need to set `p5` on the `window`
object before importing the plugin:

```tsx
import * as p5 from "p5";
import { P5Canvas, Sketch } from "@p5-wrapper/react";
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
  return <P5Canvas sketch={sketch} />;
}
```

Key points:

- `p5` must be set on `window` before importing the plugin.
- Audio must be triggered by a user action (e.g. a button click) — browsers
  block autoplay.
- Safari blocks audio from all tabs by default; users may need to change this in
  their browser settings.

> **Note:** This example requires
> [top level await](https://caniuse.com/mdn-javascript_operators_await_top_level),
> [dynamic imports](https://caniuse.com/es6-module-dynamic-import) and
> [the stream API](https://caniuse.com/stream) (HTTPS only).

</details>

<details><summary>Using constructors (e.g. p5.Vector)</summary>

In instance mode, constructors are accessed via `p5.constructor` instead of the
global `p5` namespace:

| Constructor | Global mode | Instance mode           |
| ----------- | ----------- | ----------------------- |
| Vector      | p5.Vector   | p5.constructor.Vector   |
| Envelope    | p5.Envelope | p5.constructor.Envelope |

For example, to get a random 2D vector, call `p5.constructor.Vector.random2D()`
instead of `p5.Vector.random2D()`.

</details>

## Development

The source code for the component is in the `src` directory.

To build, watch and serve the examples (which also watches the component
source):

```sh
pnpm preview
```
