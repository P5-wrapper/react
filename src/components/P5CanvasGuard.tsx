import * as React from "react";
import { type P5CanvasProps } from "@contracts/P5CanvasProps";
import { type P5WrapperPropsWithSketch } from "@contracts/P5WrapperPropsWithSketch";
import { type SketchProps } from "@contracts/SketchProps";
import { logErrorBoundaryError } from "@utils/logErrorBoundaryError";
import { ReactNode } from "react";
import { FallbackProps } from "react-error-boundary";

const P5CanvasWithSketch = React.lazy(
  () => import("@components/P5CanvasWithSketch")
);

const ErrorBoundary = React.lazy(() =>
  import("react-error-boundary").then(m => ({
    default: m.ErrorBoundary
  }))
);

const P5CanvasGuard = <Props extends SketchProps>(
  props: P5CanvasProps<Props>
) => {
  if (props.sketch === undefined) {
    console.error("[P5Canvas] The `sketch` prop is required.");

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
        <P5CanvasWithSketch
          /** @see https://github.com/P5-wrapper/react/discussions/360 */
          {...(props as unknown as P5WrapperPropsWithSketch<Props>)}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default P5CanvasGuard;
