import React, { useEffect, useRef } from "react";

import { P5WrapperClassName } from "../constants/P5WrapperClassName";
import { type P5CanvasInstance } from "../contracts/P5CanvasInstance";
import { type P5WrapperPropsWithSketch } from "../contracts/P5WrapperPropsWithSketch";
import { type SketchProps } from "../contracts/SketchProps";
import { type Wrapper } from "../contracts/Wrapper";
import { createCanvasInstance } from "../utils/createCanvasInstance";
import { removeCanvasInstance } from "../utils/removeCanvasInstance";

export function ReactP5WrapperWithSketch<
  Props extends SketchProps = SketchProps
>(props: P5WrapperPropsWithSketch<Props>) {
  const { sketch, children, ...rest } = props;
  const wrapperRef = useRef<Wrapper | null>(null);
  const canvasInstanceRef = useRef<P5CanvasInstance<Props> | null>(null);

  useEffect(() => {
    if (wrapperRef.current === null) {
      return;
    }

    removeCanvasInstance(canvasInstanceRef);
    canvasInstanceRef.current = createCanvasInstance(
      sketch,
      wrapperRef.current
    );
  }, [sketch]);

  useEffect(() => {
    /** @see https://github.com/P5-wrapper/react/issues/207 */
    canvasInstanceRef.current?.updateWithProps?.(rest as unknown as Props);
  }, [rest, wrapperRef]);

  useEffect(() => () => removeCanvasInstance(canvasInstanceRef), []);

  return (
    <div ref={wrapperRef} className={P5WrapperClassName}>
      {children}
    </div>
  );
}
