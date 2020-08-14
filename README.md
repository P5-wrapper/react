# p5-wrapper

This Component lets you integrate p5 Sketches into your React App.

Original Code was from [Ivan Malyugin](https://discuss.reactjs.org/users/IMalyugin) from a [Discussion in the React Forum](https://discuss.reactjs.org/t/using-react-with-p5-js/5565)


## Demo & Examples

Live demo: [and-who.github.io/react-p5-wrapper](http://and-who.github.io/react-p5-wrapper/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:3001`](localhost:3001) in a browser.


## Installation

The easiest way to use react-p5-wrapper is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```
npm install react-p5-wrapper --save
```


## Usage

```
var P5Wrapper = require('react-p5-wrapper');
or
import P5Wrapper from 'react-p5-wrapper';

<P5Wrapper sketch={sketch} />
```

An Sketch could look like this:

```
export default function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(600, 400, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation !== null){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function () {
    p.background(100);
    p.normalMaterial();
    p.noStroke();
    p.push();
    p.rotateY(rotation);
    p.box(100);
    p.pop();
  };
};
```

In the Example above you see the `myCustomRedrawAccordingToNewPropsHandler` function.
This function is called if Properties of the wrapper component are changing.
In this case the Wrapper Component would be integrated like this: `<P5Wrapper sketch={sketch} rotation={rotation}/>`.

### Properties

* sketch: This is the Sketch Script which should be executed in the P5 Canvas
* You can add as many custom Properties as you want

### Children
* To Render a component on top of the sketch, simply add it as a child of the P5Wrapper component


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`.

To build, watch and serve the examples (which will also watch the component source), run `npm start`.

## License

The MIT License (MIT)

Copyright (c) 2016 Andreas Wolf.
