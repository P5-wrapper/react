import p5 from 'p5';
import React, { FC, PureComponent, useEffect, useRef, useReducer } from 'react';

export interface IP5WrapperProps {
  sketch: (p: p5) => void;
}

let canvas: p5 = null;

const P5Wrapper: FC<IP5WrapperProps> = ({ sketch, children }) => {
  const wrapper = useRef(null);

  useEffect(() => {
    canvas = new p5(sketch, wrapper.current);
    return () => canvas && canvas.remove();
  }, [sketch]);

  return <div ref={wrapper}>{children}</div>;
}

export default P5Wrapper;