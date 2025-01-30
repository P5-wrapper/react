import * as React from "react";
import { ReactNode } from "react";
import { FallbackProps } from "react-error-boundary";

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

export default function ReactP5WrapperGuard<Props extends SketchProps>(
  props: P5WrapperProps<Props>
) {
  if (props.sketch === undefined) {
    console.error("[ReactP5Wrapper] The `sketch` prop is required.");

    return props.fallback?.() ?? null;
  }

  return (
    <ErrorBoundary
      fallbackRender={(info: FallbackProps): ReactNode => {
        return (
          props.error?.(info.error) ?? (
            <p data-testid="error">❌ - Something went wrong</p>
          )
        );
      }}
      onError={(error: unknown) => {
        logErrorBoundaryError(error);
      }}
    >
      <React.Suspense
        fallback={
          props.loading?.() ?? <p data-testid="loading">🚀 Loading...</p>
        }
      >
        <ReactP5WrapperWithSketch
          /** @see https://github.com/P5-wrapper/react/discussions/360 */
          {...(props as unknown as P5WrapperPropsWithSketch<Props>)}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
}
