export function sketch(p5) {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(300, 300, p5.WEBGL);

  p5.updateWithProps = props => {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();

    p5.push();
    p5.rotateZ(rotation);
    p5.rotateX(rotation);
    p5.rotateY(rotation);
    p5.plane(100);
    p5.pop();
  };
}
