import p5 from 'p5';
import React, { FC, memo, useEffect, useReducer, useRef, useState } from 'react';

export interface IP5WrapperProps {
  sketch: (p: p5) => void;
}

export interface IState {
  canvas: p5;
}

export interface IAction {
  type: string;
  canvas: p5;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "SET_CANVAS":
      return { ...state, canvas: action.canvas };
    default:
      return state;
  }
}

const P5Wrapper: FC<IP5WrapperProps> = ({ sketch, children }) => {
  const wrapper = useRef(null);
  const [state, dispatch] = useReducer(reducer, {
    canvas: null
  });

  useEffect(() => {
    if (state.canvas !== null) state.canvas.remove();
    const canvas = new p5(sketch, wrapper.current);
    dispatch({ type: "SET_CANVAS", canvas });
  }, [sketch]);

  return <div ref={wrapper}>{children}</div>;
}

function shouldRerender(prevProps: IP5WrapperProps, nextProps: IP5WrapperProps) {
  return prevProps.sketch === nextProps.sketch;
}

export default memo(P5Wrapper, shouldRerender);