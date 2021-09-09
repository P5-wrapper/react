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

function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}

export default App;
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
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

function sketch(p5) {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = props => {
    if (props.rotation) rotation = (props.rotation * Math.PI) / 180;
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

function App() {
  return <ReactP5Wrapper sketch={sketch} rotation={rotation} />;
}

export default App;
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
