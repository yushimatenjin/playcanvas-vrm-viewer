import { Script, Vec3 } from "playcanvas";

class Rotator extends Script {
  /**
   * @attribute
   */
  speed = new Vec3(0, 1, 0);

  update(dt: number) {
    this.entity.rotate(this.speed);
  }
}

export { Rotator };
