import "p5.capture";

export function sketch(p5) {
  p5.setup = () => {
    p5.createCanvas(300, 300);
    p5.capture.initialize(p5);
  };

  p5.draw = () => {
    if (p5.frameCount === 1) {
      const capture = p5.capture.getInstance();
      capture.start({
        format: "gif",
        duration: 100
      });
    }
  };

  p5.keyPressed = () => {
    if (key === "c") {
      const capture = p5.capture.getInstance();

      if (capture.state === "idle") {
        capture.start();
      } else {
        capture.stop();
      }
    }
  };
}
