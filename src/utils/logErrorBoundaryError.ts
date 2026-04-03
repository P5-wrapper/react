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

  if (typeof error === "symbol") {
    return error.toString();
  }

  if (typeof error === "string") {
    return `String("${error}")`;
  }

  if (typeof error === "number") {
    return `Number(${error})`;
  }

  if (typeof error === "bigint") {
    return `BigInt(${error})`;
  }

  if (error instanceof Array) {
    return `Array(${JSON.stringify([...error])})`;
  }

  if (error instanceof Set) {
    return `Set(${JSON.stringify([...error])})`;
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
