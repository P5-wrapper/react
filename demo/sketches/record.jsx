export function sketch(p5) {
  let recording;

  p5.setup = async () => {
    const canvas = p5.createCanvas(400, 400);
    const record = await import("p5.record.js");

    p5.background(200);

    recording = new record.Recorder({
      frameRate: 60,
      source: canvas.elt
    });

    const startBtn = p5.select("#start-recording");
    startBtn.mouseClicked(() => recording.start());

    const stopBtn = p5.select("#stop-recording");
    stopBtn.mouseClicked(() => recording.stop());

    const pauseBtn = p5.select("#pause-recording");
    pauseBtn.mouseClicked(() => recording.pause());

    const resumeBtn = p5.select("#resume-recording");
    resumeBtn.mouseClicked(() => recording.resume());
  };

  p5.draw = () => {
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  };

  p5.keyPressed = () => {
    if (p5.key === "a") {
      recording.start();
    } else if (p5.key === "s") {
      recording.stop();
    } else if (p5.key === "d") {
      recording.pause();
    } else if (p5.key === "f") {
      recording.resume();
    }
  };
}
