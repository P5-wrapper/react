import diff from "microdiff";
import p5 from "p5";
import React, { createRef, FC, memo, useState } from "react";
import { useIsomorphicEffect } from "rooks";

type Wrapper = HTMLDivElement;

export interface SketchProps {
  [key: string]: any;
}

export interface Sketch {
  (instance: P5Instance): void;
}

export interface P5WrapperProps extends SketchProps {
  sketch: Sketch;
}

export interface P5Instance extends p5 {
  updateWithProps?: (props: SketchProps) => void;
}

function createCanvas(sketch: Sketch, wrapper: Wrapper): P5Instance {
  return new p5(sketch, wrapper);
}

const ReactP5WrapperComponent: FC<P5WrapperProps> = ({
  sketch,
  children,
  ...props
}) => {
  const wrapperRef = createRef<Wrapper>();
  const [instance, setInstance] = useState<P5Instance>();

  useIsomorphicEffect(() => {
    if (wrapperRef.current === null) {
      return;
    }

    instance?.remove();
    const canvas = createCanvas(sketch, wrapperRef.current);
    setInstance(canvas);
  }, [sketch]);

  useIsomorphicEffect(() => {
    instance?.updateWithProps?.(props);
  }, [props, instance]);

  useIsomorphicEffect(() => () => instance?.remove(), []);

  return <div ref={wrapperRef}>{children}</div>;
};

function propsAreEqual(previous: P5WrapperProps, next: P5WrapperProps) {
  const differences = diff(previous, next);

  return differences.length === 0;
}

export const ReactP5Wrapper = memo(ReactP5WrapperComponent, propsAreEqual);
