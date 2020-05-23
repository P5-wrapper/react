export default function sketch(p5) {
  let rotation = 0;
  let canvas;
  let image;

  p5.setup = () => {
    canvas = p5.createCanvas(300, 300, p5.WEBGL).canvas;
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {
    if (props.rotation) {
      rotation = (props.rotation / 4 + 10) * Math.PI / 180;
    }

    if (props.image) {
      image = new Image(200, 150);
      image.src = props.image;
      image.addEventListener("load", event => {
        image.setAttribute("style", `
        position: absolute;
        top: ${canvas.offsetTop}px;
        left: ${canvas.offsetLeft}px;
      `)
        document.body.appendChild(image);
      });
    } else if (image) {
      image.parentNode.removeChild(image);
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
};
