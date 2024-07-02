// @ts-nocheck
import { Script, Entity, MeshInstance, StandardMaterial, Color } from "playcanvas";
import { parseGlb, parseGltf, createResources, loadBuffers, createBufferViews, createImages, createTextures } from "../loader/glb-parser";

class CustomGlbLoader extends Script {
  /**
   * @attribute
   */
  modelUrl: string = "/avatars/model.vrm";

  async initialize(): Promise<void> {
    this.parentEntity = new Entity();
    this.app.root.addChild(this.parentEntity);

    try {
      const glbDataArrayBuffer = await this.fetchGlbData(this.modelUrl);
      const { gltfChunk, binaryChunk } = await this.parseGlbData(glbDataArrayBuffer);
      const gltf = await this.parseGltfData(gltfChunk);
      const resources = await this.createResources(gltf, binaryChunk);

      this.createEntitiesFromResources(resources);
    } catch (err) {
      console.error("Error initializing GLB:", err);
    }
  }

  async fetchGlbData(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    return response.arrayBuffer();
  }

  parseGlbData(glbDataArrayBuffer: ArrayBuffer): Promise<any> {
    return new Promise((resolve, reject) => {
      parseGlb(glbDataArrayBuffer, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  parseGltfData(gltfChunk: any): Promise<any> {
    return new Promise((resolve, reject) => {
      parseGltf(gltfChunk, (err, gltf) => {
        if (err) {
          reject(err);
        } else {
          resolve(gltf);
        }
      });
    });
  }

  async createResources(gltf: any, binaryChunk: any): Promise<any> {
    const buffers = loadBuffers(gltf, binaryChunk, this.modelUrl);
    const bufferViews = createBufferViews(gltf, buffers);
    const images = createImages(gltf, bufferViews, this.modelUrl, {}, {});
    const textures = createTextures(gltf, images, {});

    return createResources(this.app.graphicsDevice, gltf, bufferViews, textures, {
      skipMeshes: false,
    });
  }

  createEntitiesFromResources(resources: any): void {
    resources.renders.forEach((render, index) => {
      const entity = new Entity();
      const material = this.createMaterial(index);

      const meshInstances = render.meshes.map((mesh) => new MeshInstance(mesh, material));
      entity.addComponent("render", {
        meshInstances: [...meshInstances],
        lightmapped: false,
      });

      this.parentEntity.addChild(entity);
    });
  }

  createMaterial(index: number): StandardMaterial {
    const material = new StandardMaterial();
    const color = new Color(index / 1.5, index / 1.5, index / 1.5);

    material.diffuse = color;
    material.emissive = color;

    return material;
  }

  update(dt: number): void {
    this.parentEntity.rotate(0, dt * 30, 0);
  }
}

export { CustomGlbLoader };

