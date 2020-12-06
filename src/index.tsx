import p5 from 'p5';
import React, { createRef, FC, memo, RefObject, useEffect, useReducer } from 'react';

export interface IP5WrapperProps {
  sketch: (p: p5) => void;
  attributes: { [key: string]: string };
}

export interface IState {
  canvas?: p5;
}

export interface IAction {
  type: string;
  canvas?: p5;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "SET_CANVAS":
      return { ...state, canvas: action.canvas };
    default:
      return state;
  }
}

function shouldRerender(prevProps: IP5WrapperProps, nextProps: IP5WrapperProps) {
  return prevProps.sketch === nextProps.sketch;
}

const P5WrapperComponent: FC<IP5WrapperProps> = ({ sketch, children, attributes }) => {
  const wrapper: RefObject<HTMLDivElement> = createRef();
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    if (state.canvas && wrapper.current) {
      state.canvas.remove();
      const canvas = new p5(sketch, wrapper.current);
      dispatch({ type: "SET_CANVAS", canvas });
    }
  }, [sketch]);

  return <div {...attributes} ref={wrapper}>{children}</div>;
}

export const P5Wrapper = memo(P5WrapperComponent, shouldRerender);
