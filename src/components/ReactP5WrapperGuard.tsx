import * as React from "react";

import { type P5WrapperProps } from "../contracts/P5WrapperProps";
import { type P5WrapperPropsWithSketch } from "../contracts/P5WrapperPropsWithSketch";
import { type SketchProps } from "../contracts/SketchProps";
import { logErrorBoundaryError } from "../utils/logErrorBoundaryError";

const ReactP5WrapperWithSketch = React.lazy(
  () => import("./ReactP5WrapperWithSketch")
);
const ErrorBoundary = React.lazy(() =>
  import("react-error-boundary").then(m => ({
    default: m.ErrorBoundary
  }))
);

export default function ReactP5WrapperGuard<
  Props extends SketchProps = SketchProps
>(props: P5WrapperProps<Props>) {
  if (props.sketch === undefined) {
    console.error("[ReactP5Wrapper] The `sketch` prop is required.");

    return props.fallback ?? null;
  }

  return (
    <ErrorBoundary
      fallbackRender={info => {
        logErrorBoundaryError(info.error);

        if (props.error !== undefined) {
          return React.cloneElement(props.error, info);
        }

        return <p>❌ - Something went wrong</p>;
      }}
    >
      <React.Suspense fallback={props.loading ?? <p>🚀 Loading...</p>}>
        <ReactP5WrapperWithSketch
          /** @see https://github.com/P5-wrapper/react/issues/207 */
          {...(props as unknown as P5WrapperPropsWithSketch<Props>)}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
}
