const errorIntroduction =
  "[P5Canvas] The error boundary was triggered. The error message was:";

function tidyErrorLogText(text: string): string {
  return text
    .trim()
    .split("\n")
    .map(line => line.trim())
    .join("\n");
}

function formatErrorLogText(text: string): string {
  return tidyErrorLogText(`
      ${errorIntroduction}
      
      ${text}
    `);
}

function createErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}("${error.message}")`;
  }

  if (typeof error === "symbol" || error instanceof Symbol) {
    return error.toString();
  }

  if (typeof error === "string" || error instanceof String) {
    return `String("${error.toString()}")`;
  }

  if (typeof error === "number" || error instanceof Number) {
    return `Number(${error.toString()})`;
  }

  if (typeof error === "bigint" || error instanceof BigInt) {
    return `BigInt(${error.toString()})`;
  }

  if (error instanceof Array) {
    return `Array(${JSON.stringify(error.values().toArray())})`;
  }

  if (error instanceof Set) {
    return `Set(${JSON.stringify(error.values().toArray())})`;
  }

  if (Object.getPrototypeOf(error) === Object.prototype) {
    return `Object(${JSON.stringify(error)})`;
  }

  return `Unknown(${typeof error})`;
}

export function logErrorBoundaryError(error: unknown) {
  const message = createErrorMessage(error);
  const formattedMessage = formatErrorLogText(message);

  console.error(formattedMessage);
}
