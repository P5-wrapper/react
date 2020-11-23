import p5 from 'p5';
import React, { PureComponent } from 'react';

export interface IProps {
  sketch: (p: p5) => void;
}

export interface IState {
  sketch: (p: p5) => void;
  canvas: p5;
  wrapper?: HTMLElement;
}

class P5Wrapper extends PureComponent<IProps, IState> {
  public state: IState;
  public wrapper: HTMLElement = null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      ...props,
      canvas: null,
      // TODO: find a workaround since refs in state are bad practice
      wrapper: this.wrapper
    }
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (state.sketch !== props.sketch) {
      const { sketch } = props;
      const canvas = new p5(sketch, state.wrapper);
      state.canvas.remove();
      return { ...state, sketch, canvas };
    }

    // @ts-ignore
    // @TODO: fix type definitions
    if (state.canvas && state.canvas.myCustomRedrawAccordingToNewPropsHandler) {
      // @ts-ignore
      // @TODO: fix type definitions
      state.canvas.myCustomRedrawAccordingToNewPropsHandler(props);
    }

    return state;
  }

  componentDidMount() {
    const canvas = new p5(this.state.sketch, this.wrapper);
    // @ts-ignore
    // @TODO: fix type definitions
    if (canvas.myCustomRedrawAccordingToNewPropsHandler) {
      // @ts-ignore
      // @TODO: fix type definitions
      canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
    this.setState({ ...this.state, canvas, wrapper: this.wrapper });
  }


  componentWillUnmount() {
    if (this.state.canvas !== null) {
      this.state.canvas.remove();
    }
  }

  render() {
    return <div ref={wrapper => this.wrapper = wrapper}>{this.props.children}</div>;
  }
}

export default P5Wrapper;