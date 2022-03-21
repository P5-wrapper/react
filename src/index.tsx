import diff from "microdiff";
import p5 from "p5";
import React, { createRef, FC, memo, MutableRefObject, useRef } from "react";
import { useIsomorphicEffect } from "rooks";

type Wrapper = HTMLDivElement;
export type Sketch = (instance: P5CanvasInstance) => void;
export type SketchProps = {
  [key: string]: any;
};
export type P5WrapperProps = SketchProps & {
  sketch: Sketch;
};
export type P5CanvasInstance = p5 & {
  updateWithProps?: (props: SketchProps) => void;
};

// @TODO: remove in next major version, keep for compatibility reasons for now.
export type P5Instance = P5CanvasInstance;

function createCanvasInstance(
  sketch: Sketch,
  wrapper: Wrapper
): P5CanvasInstance {
  return new p5(sketch, wrapper);
}

function removeCanvasInstance(
  canvasInstanceRef: MutableRefObject<P5CanvasInstance | undefined>
) {
  canvasInstanceRef.current?.remove();
  canvasInstanceRef.current = undefined;
}

const ReactP5WrapperComponent: FC<P5WrapperProps> = ({
  sketch,
  children,
  ...props
}) => {
  const wrapperRef = createRef<Wrapper>();
  const instanceRef = useRef<P5CanvasInstance>();

  useIsomorphicEffect(() => {
    if (wrapperRef.current === null) {
      return;
    }

    removeCanvasInstance(instanceRef);
    instanceRef.current = createCanvasInstance(sketch, wrapperRef.current);
  }, [sketch]);

  useIsomorphicEffect(
    () => instanceRef.current?.updateWithProps?.(props),
    [props]
  );

  useIsomorphicEffect(() => () => removeCanvasInstance(instanceRef), []);

  return <div ref={wrapperRef}>{children}</div>;
};

function propsAreEqual(previous: P5WrapperProps, next: P5WrapperProps) {
  const differences = diff(previous, next);

  return differences.length === 0;
}

export const ReactP5Wrapper = memo(ReactP5WrapperComponent, propsAreEqual);
