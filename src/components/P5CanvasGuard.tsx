import * as React from "react";
import P5CanvasWithSketch from "@components/P5CanvasWithSketch";
import { type P5CanvasProps } from "@contracts/P5CanvasProps";
import { logErrorBoundaryError } from "@utils/logErrorBoundaryError";
import { ReactNode } from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorBoundary = React.lazy(() =>
  import("react-error-boundary").then(m => ({
    default: m.ErrorBoundary
  }))
);

const P5CanvasGuard = (props: P5CanvasProps) => {
  const {
    sketch,
    updater,
    fallback,
    loading,
    error,
    children,
    ...sketchProps
  } = props;

  if (sketch === undefined) {
    console.error("[P5Canvas] The `sketch` prop is required.");

    return fallback?.() ?? null;
  }

  return (
    <ErrorBoundary
      fallbackRender={(info: FallbackProps): ReactNode => {
        return (
          error?.(info.error) ?? (
            <p data-testid="error">❌ - Something went wrong</p>
          )
        );
      }}
      onError={(error: unknown) => {
        logErrorBoundaryError(error);
      }}
    >
      <React.Suspense
        fallback={loading?.() ?? <p data-testid="loading">🚀 Loading...</p>}
      >
        <P5CanvasWithSketch
          sketch={sketch}
          updater={updater}
          sketchProps={sketchProps}
        >
          {children}
        </P5CanvasWithSketch>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default P5CanvasGuard;
