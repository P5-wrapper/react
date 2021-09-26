# react-p5-wrapper

A component to integrate [p5.js](https://p5js.org/) sketches into
[React](https://reactjs.org/) apps.

## Demo & Examples

### Live demo

A live demo can be viewed at
[jamesrweb.github.io/react-p5-wrapper](http://jamesrweb.github.io/react-p5-wrapper/).

### Examples

The repository contains further
[examples](https://github.com/jamesrweb/react-p5-wrapper/tree/master/example/src).

To try them out for yourself, run the following:

```sh
git clone git@github.com:jamesrweb/react-p5-wrapper.git
cd react-p5-wrapper
npm install
npm start
```

Then just open `http://localhost:3001` in a browser.

## Installation

### NPM

```sh
  npm install react-p5-wrapper
```

### Yarn

```sh
  yarn add react-p5-wrapper
```

## Usage

### Javascript

```js
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

export default function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
```

### Typescript

Typescript sketches can be declared in two different ways, below you will find
two ways to declare a sketch, both examples do the exact same thing.

In short though, the `ReactP5Wrapper` component requires you to pass a `sketch`
prop. The `sketch` prop is typed as a `(instance: P5Instance): void;`. As long
as the function declaration of your sketch is set to take in a single argument
of type `P5Instance`, you are good to go!

#### Option 1: Declaring a sketch using the `P5Instance` type

```ts
import React, { useState, useEffect } from "react";
import { ReactP5Wrapper, P5Instance } from "react-p5-wrapper";

function sketch(p5: P5Instance) {
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

export default function App() {
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

#### Option 2: Declaring a sketch using the `Sketch` type

Using the `Sketch` type has one nice benefit over using `P5Instance` and that is
that the `p5` argument passed to the sketch function is auto-typed as a
`P5Instance` for you.

> Sidenote:
>
> In general it comes down to personal preference as to how you declare your
> sketches and there is nothing wrong with using the `P5Instance` manually in a
> regular `function` declaration.

```ts
import React, { useState, useEffect } from "react";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";

const sketch: Sketch = p5 => {
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

export default function App() {
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

```js
import React, { useState, useEffect } from "react";
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

export default function App() {
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

To render a component on top of the sketch, simply add it as a child of the
`ReactP5Wrapper` component.

## Development

**NOTE:** The source code for the component is in the `src` directory.

To build, watch and serve the examples which will also watch the component
source, run:

```sh
  npm start
```
