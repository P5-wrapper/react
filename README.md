# react-p5-wrapper

A component to integrate [p5.js](https://p5js.org/) sketches into
[React](https://reactjs.org/) apps.

## Demo & Examples

Live demo:
[jamesrweb.github.io/react-p5-wrapper](http://jamesrweb.github.io/react-p5-wrapper/)

The repository contains
[examples](https://github.com/jamesrweb/react-p5-wrapper/tree/master/example/src).
To try them out, run the following:

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
import P5Wrapper from "react-p5-wrapper";

function App() {
  const sketch = p5 => {
    p5.setup = () => {};
    p5.draw = () => {};
  };

  return <P5Wrapper sketch={sketch} />;
}

export default App;
```

### Properties

- `sketch`: This is the sketch script which should be executed in the p5 canvas.
- You can also add as many custom properties as you want.

In the below example you see the `myCustomRedrawAccordingToNewPropsHandler`
function, which is called when the properties of a wrapper component are
changed.

```js
import React from "react";
import P5Wrapper from "react-p5-wrapper";

function App() {
  const sketch = p5 => {
    let rotation = 0;

    p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

    p5.myCustomRedrawAccordingToNewPropsHandler = props => {
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
  };

  return <P5Wrapper sketch={sketch} rotation={rotation} />;
}

export default App;
```

### Children

To render a component on top of the sketch, simply add it as a child of the
`P5Wrapper` component.

## Development

**NOTE:** The source code for the component is in the `src` directory.

To build, watch and serve the examples which will also watch the component
source, run:

```sh
  npm start
```
