import { Component } from 'react';
import p5 = require('p5');
import React = require('react');

export interface P5WrapperProps {
  sketch: (p: p5) => void;
}

export default class P5Wrapper extends Component <P5WrapperProps, {}> {

  canvas: p5;
  wrapper: HTMLElement;

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }

  componentWillReceiveProps(newprops: { sketch: (...args: any[]) => any; }) {
    if(this.props.sketch !== newprops.sketch){
      this.wrapper.removeChild(this.wrapper.childNodes[0]);
      this.canvas.remove();
      this.canvas = new p5(newprops.sketch, this.wrapper);
    }
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  componentWillUnmount() {
		this.canvas.remove();
	}

  render() {
    return <div ref={wrapper => this.wrapper = wrapper}></div>;
  }
}
