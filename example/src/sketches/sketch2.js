export default function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(600, 400, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = (props.rotation/4+10) * Math.PI / 180;
    }
  };

  p.draw = function () {
    p.background(100);
    p.normalMaterial();
    p.noStroke();

    p.push();
    p.translate(-150, 100);
    p.rotateY(rotation);
    p.rotateX(-0.9);
    p.torus(70, 20);
    p.pop();

    p.noFill();
    p.stroke(255);
    p.push();
    p.translate(300, p.height*0.35, -300);
    p.cone(70, 70);
    p.pop();
  };
};
