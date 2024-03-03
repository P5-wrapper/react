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

export function logErrorBoundaryError(error: Error) {
  const message = constructErrorLogText(error.message);

  console.error(message);
}
