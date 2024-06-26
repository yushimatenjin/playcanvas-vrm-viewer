import * as pc from "playcanvas";

export const createScene = (canvas: HTMLCanvasElement) => {
  console.log(pc.version);
  const app = new pc.Application(canvas);

  // fill the available space at full resolution
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  // create box entity
  const box = new pc.Entity("cube");
  box.addComponent("render", {
    type: "box",
  });
  app.root.addChild(box);

  // create camera entity
  const camera = new pc.Entity("camera");
  camera.addComponent("camera", {
    clearColor: new pc.Color(0.1, 0.1, 0.1),
  });
  app.root.addChild(camera);
  camera.setPosition(0, 0, 3);

  // create directional light entity
  const light = new pc.Entity("light");
  light.addComponent("light");
  app.root.addChild(light);
  light.setEulerAngles(45, 0, 0);

  app.start();
};
