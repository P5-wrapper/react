export default function sketch(p5) {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(300, 300, p5.WEBGL);

  p5.updateWithProps = props => {
    if (props.rotation) {
      rotation = ((props.rotation / 4 + 10) * Math.PI) / 180;
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();
    p5.noStroke();

    p5.push();
    p5.translate(-30, 0);
    p5.rotateY(rotation);
    p5.rotateX(-0.9);
    p5.torus(70, 20);
    p5.pop();

    p5.noFill();
    p5.stroke(255);
    p5.push();
    p5.translate(300, p5.height * 0.5, -500);
    p5.cone(100, 100);
    p5.pop();
  };
}
