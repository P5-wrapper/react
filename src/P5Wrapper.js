import React from 'react';
import p5 from 'p5';

export default class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.refs.wrapper)
  }

  componentWillReceiveProps(newprops) {
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  render() {
    return <div ref="wrapper"></div>;
  }
}
