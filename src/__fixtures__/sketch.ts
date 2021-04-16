import p5 from "p5";

const sketch = (p5: p5) => {
  p5.setup = () => p5.createCanvas(720, 400);

  p5.draw = () => {
    p5.background(127);
    p5.noStroke();

    for (let i = 0; i < p5.height; i += 20) {
      p5.fill(129, 206, 15);
      p5.rect(0, i, p5.width, 10);
      p5.fill(255);
      p5.rect(i, 0, 10, p5.height);
    }
  };
};

export default sketch;
