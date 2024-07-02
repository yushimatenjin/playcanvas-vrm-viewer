import * as pc from "playcanvas";

export const createScene = (canvas: HTMLCanvasElement) => {
  const app = new pc.Application(canvas);

  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  window.addEventListener("resize", () => app.resizeCanvas());
  const camera = new pc.Entity("camera");
  camera.addComponent("camera", {});
  app.root.addChild(camera);
  camera.setPosition(0, 1, 3);

  const light = new pc.Entity("light");
  light.addComponent("light");
  app.root.addChild(light);
  light.setEulerAngles(45, 0, 0);

  app.start();
  return { canvas, app, root: app.root };
};
