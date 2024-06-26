import { Script } from "playcanvas";

class GlbLoader extends Script {
  /**
   * @attribute
   */
  modelUrl: string = "/avatars/model.vrm";

  initialize(): void {
    this.app.assets.loadFromUrl(this.modelUrl, "container", (err, asset) => {
      const entity = asset?.resource.instantiateRenderEntity();
      this.entity.addChild(entity);
    });
  }
}

export { GlbLoader };
