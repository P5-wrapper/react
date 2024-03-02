import { type FallbackProps } from "react-error-boundary";

function constructErrorLogText(message: string) {
  return `
      [ReactP5Wrapper] The error boundary was triggered. The error message was:
      
      ${message}
    `
    .trim()
    .split("\n")
    .map(line => line.trimStart())
    .join("\n");
}

export function logErrorBoundaryError(error: FallbackProps["error"]) {
  if (error instanceof Error) {
    console.error(constructErrorLogText(error.message));
  } else if (typeof error === "string") {
    console.error(constructErrorLogText(error));
  }
}
