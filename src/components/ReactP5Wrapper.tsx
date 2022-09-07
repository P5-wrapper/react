import React, { createRef, useEffect, useRef } from "react";

import { P5WrapperClassName } from "../constants/P5WrapperClassName";
import type { P5CanvasInstance } from "../contracts/P5CanvasInstance";
import type { P5WrapperPropsWithSketch } from "../contracts/P5WrapperPropsWithSketch";
import type { SketchProps } from "../contracts/SketchProps";
import type { Wrapper } from "../contracts/Wrapper";
import { createCanvasInstance } from "../utils/createCanvasInstance";
import { removeCanvasInstance } from "../utils/removeCanvasInstance";

export function ReactP5Wrapper<Props extends SketchProps = SketchProps>(
  props: P5WrapperPropsWithSketch
) {
  const { sketch, children, ...rest } = props;
  const wrapperRef = createRef<Wrapper>();
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

  useEffect(
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
      canvasInstanceRef.current?.updateWithProps?.(rest as unknown as Props);
    },
    [rest, wrapperRef]
  );

  useEffect(() => () => removeCanvasInstance(canvasInstanceRef), []);

  return (
    <div ref={wrapperRef} className={P5WrapperClassName}>
      {children}
    </div>
  );
}
