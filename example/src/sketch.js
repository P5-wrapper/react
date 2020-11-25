const sketch = props => p5 => {
  let rotation = parseInt(props.rotation) * Math.PI / 180;

  p5.setup = () => p5.createCanvas(300, 300, p5.WEBGL);

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();
    p5.noStroke();

    p5.push();
    p5.translate(-40, 50);
    p5.rotateY(rotation);
    p5.rotateX(-0.9);
    p5.box(100);
    p5.pop();

    p5.noFill();
    p5.stroke(255);
    p5.push();
    p5.translate(400, p5.height * 0.35, -200);
    p5.sphere(300);
    p5.pop();
  };
};

export default sketch;