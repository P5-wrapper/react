import diff from "microdiff";
import p5 from "p5";
import React from "react";

type Wrapper = HTMLDivElement;
type WithChildren<T = unknown> = T & { children?: React.ReactNode };
type InputProps<Props extends SketchProps = SketchProps> = Props & {
  sketch?: Sketch<Props>;
};
type P5WrapperPropsWithSketch<Props extends SketchProps = SketchProps> =
  P5WrapperProps<Props> & { sketch: Sketch<Props> };
export type Sketch<Props extends SketchProps = SketchProps> = (
  instance: P5CanvasInstance<Props>
) => void;
export type SketchProps = { [key: string]: unknown };
export type P5WrapperProps<Props extends SketchProps = SketchProps> =
  WithChildren<InputProps<Props>>;
export type P5CanvasInstance<Props extends SketchProps = SketchProps> = p5 & {
  updateWithProps?: (props: Props) => void;
};

export const P5WrapperClassName = "react-p5-wrapper";
export const ReactP5Wrapper = React.memo(
  ReactP5WrapperComponentGuard,
  propsAreEqual
);

function createCanvasInstance<Props extends SketchProps = SketchProps>(
  sketch: Sketch<Props>,
  wrapper: Wrapper
): P5CanvasInstance<Props> {
  return new p5(sketch, wrapper);
}

function removeCanvasInstance<Props extends SketchProps = SketchProps>(
  canvasInstanceRef: React.MutableRefObject<P5CanvasInstance<Props> | undefined>
) {
  canvasInstanceRef.current?.remove();
  canvasInstanceRef.current = undefined;
}

function ReactP5WrapperComponentGuard<Props extends SketchProps = SketchProps>({
  sketch,
  ...props
}: P5WrapperProps<Props>) {
  if (sketch === undefined) {
    console.error("[ReactP5Wrapper] The `sketch` prop is required.");

    return null;
  }

  return <ReactP5WrapperComponent sketch={sketch} {...props} />;
}

function ReactP5WrapperComponent<Props extends SketchProps = SketchProps>({
  sketch,
  children,
  ...props
}: P5WrapperPropsWithSketch) {
  const wrapperRef = React.createRef<Wrapper>();
  const canvasInstanceRef = React.useRef<P5CanvasInstance<Props>>();

  React.useEffect(() => {
    if (wrapperRef.current === null) {
      return;
    }

    removeCanvasInstance(canvasInstanceRef);
    canvasInstanceRef.current = createCanvasInstance(
      sketch,
      wrapperRef.current
    );
  }, [sketch]);

  React.useEffect(
    /**
     * The `as unknown as Props` cast is begrudgingly required due to a known limitation of the TypeScript compiler as demonstrated in issues:
     *
     * - https://github.com/microsoft/TypeScript/issues/35858
     * - https://github.com/microsoft/TypeScript/issues/37670
     *
     * As Ryan Cavanaugh points out:
     *
     * "TS isn't capable of the higher-order reasoning needed to understand that Exclude<T, k> & { [k]: T[k] } is equivalent to T."
     *
     * For reference, this is the same issue as we face here just with `Omit` instead of `Exclude`.
     *
     * Potentially this would have been resolved by this PR but the author closed it due to lack of time:
     *
     * - https://github.com/microsoft/TypeScript/pull/42382
     *
     * Perhaps someone interested in the topic and who has time to work on it would be willing to take a look into the issue.
     *
     * Either way, until a resolution is merged into the TypeScript compiler that addresses this issue, we need to use this workaround.
     * We could also remove this if we manage find a reasonable, more fitting workaround of some sort to avoid casting in the first place.
     * If a workaround / change of implementation comes to mind, please raise an issue on the repository or feel free to open a PR!
     */
    () => {
      canvasInstanceRef.current?.updateWithProps?.(props as unknown as Props);
    },
    [props]
  );

  React.useEffect(() => () => removeCanvasInstance(canvasInstanceRef), []);

  return (
    <div ref={wrapperRef} className={P5WrapperClassName}>
      {children}
    </div>
  );
}

function propsAreEqual<Props extends SketchProps = SketchProps>(
  previous: P5WrapperProps<Props>,
  next: P5WrapperProps<Props>
) {
  const differences = diff(previous, next);

  return differences.length === 0;
}
