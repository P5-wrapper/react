import diff from "microdiff";
import p5 from "p5";
import React, { createRef, memo, useState } from "react";
import { useIsomorphicEffect } from "rooks";

type Wrapper = HTMLDivElement;
type WithChildren<T = unknown> = T & { children?: React.ReactNode };
type InputProps<Props extends SketchProps = SketchProps> = Props & {
  sketch: Sketch<Props>;
};
export type Sketch<Props extends SketchProps = SketchProps> = (
  instance: P5Instance<Props>
) => void;
export type SketchProps = { [key: string]: unknown };
export type P5WrapperProps<Props extends SketchProps = SketchProps> =
  WithChildren<InputProps<Props>>;
export type P5Instance<Props extends SketchProps = SketchProps> = p5 & {
  updateWithProps?: (props: Props) => void;
};

function createCanvas<Props extends SketchProps = SketchProps>(
  sketch: Sketch<Props>,
  wrapper: Wrapper
): P5Instance<Props> {
  return new p5(sketch, wrapper);
}

function ReactP5WrapperComponent<Props extends SketchProps = SketchProps>({
  sketch,
  children,
  ...props
}: P5WrapperProps<Props>) {
  const wrapperRef = createRef<Wrapper>();
  const [instance, setInstance] = useState<P5Instance<Props>>();

  useIsomorphicEffect(() => {
    if (wrapperRef.current === null) {
      return;
    }

    instance?.remove();
    const canvas = createCanvas<Props>(sketch, wrapperRef.current);
    setInstance(canvas);
  }, [sketch]);

  useIsomorphicEffect(
    /**
     * The `as any` cast is begrudgingly required due to a known limitation of the TypeScript compiler as demonstrated in issues:
     *
     * - https://github.com/microsoft/TypeScript/issues/35858
     * - https://github.com/microsoft/TypeScript/issues/37670
     *
     * Potentially this will be resolved by this PR once it is eventually merged:
     *
     * - https://github.com/microsoft/TypeScript/pull/42382
     *
     * Either way, until a resolution is merged into the TypeScript compiler that addresses this issue, we need to use this workaround.
     * We could also remove this if we manage find a reasonable, more fitting workaround of some sort to avoid casting in the first place.
     * If a workaround / change of implementation comes to mind, please raise an issue on the repository or feel free to open a PR!
     */
    () => instance?.updateWithProps?.(props as any),
    [props, instance]
  );

  useIsomorphicEffect(() => () => instance?.remove(), []);

  return <div ref={wrapperRef}>{children}</div>;
}

function propsAreEqual<Props extends SketchProps = SketchProps>(
  previous: P5WrapperProps<Props>,
  next: P5WrapperProps<Props>
) {
  const differences = diff(previous, next);

  return differences.length === 0;
}

export const ReactP5Wrapper = memo(ReactP5WrapperComponent, propsAreEqual);
