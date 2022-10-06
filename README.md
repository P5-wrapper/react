# @P5-wrapper/react

A component to integrate [P5.js](https://p5js.org/) sketches into
[React](https://reactjs.org/) apps.

## Demo & Examples

### Live demo

A live demo can be viewed at
[P5-wrapper.github.io/react](https://P5-wrapper.github.io/react/).

### Examples

The repository contains further
[examples](https://github.com/P5-wrapper/react/tree/master/example/sketches).

To try them out for yourself, run the following:

```sh
git clone git@github.com:P5-wrapper/react.git
cd react
pnpm install
pnpm start
```

Then just open `http://localhost:3001` in a browser.

## Installation

### NPM

```sh
  npm install react-p5-wrapper
```

### PNPM

```sh
  pnpm add react-p5-wrapper
```

### Yarn

```sh
  yarn add react-p5-wrapper
```

## Usage

### Javascript

```javascript
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

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

```typescript
import React from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";

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

> Sidenote:
>
> In general it comes down to personal preference as to how you declare your
> sketches and there is nothing wrong with using the `P5CanvasInstance` manually
> in a regular `function` declaration.

```typescript
import React from "react";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";

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

> Sidenote:
>
> We could also write the `MySketchProps` type as an interface to do exactly the
> same thing if that is to your personal preference:
>
> ```typescript
> interface MySketchProps extends SketchProps {
>   rotation: number;
> }
> ```

This means, in these examples, that when the `rotation` prop that is provided as
part of the `props` passed to the `updateWithProps` function, it will be
correctly typed as a `number`.

##### Usage with the `P5CanvasInstance` type

```typescript
import React, { useEffect, useState } from "react";
import {
  P5CanvasInstance,
  ReactP5Wrapper,
  SketchProps
} from "react-p5-wrapper";

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

```typescript
import React, { useEffect, useState } from "react";
import { ReactP5Wrapper, Sketch, SketchProps } from "react-p5-wrapper";

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

```javascript
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

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

```javascript
import React, { useEffect, useState } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

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
constant in your to style one element above the other via css.

For instance, using [styled components](https://styled-components.com), we could
center some text on top of our sketch like so:

```jsx
import { P5WrapperClassName, ReactP5Wrapper } from "react-p5-wrapper";
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

Of course you can also use any other css-in-js library or by just using simple
css to achieve almost anything you can imagine just by using the wrapper class
as your root selector.

## Development

**NOTE:** The source code for the component is in the `src` directory.

To build, watch and serve the examples which will also watch the component
source, run:

```sh
  pnpm start
```
