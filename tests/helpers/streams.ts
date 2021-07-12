export function unwrapReadableStream(stream: NodeJS.ReadableStream) {
  return new Promise(resolve => {
    let data = "";

    stream.on("data", chunk => (data += chunk));
    stream.on("end", () => resolve(data));
  });
}
