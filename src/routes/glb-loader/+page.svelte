<script lang="ts">
  import { onMount } from "svelte";
  import { createScene } from "./scene";
  import { Rotator, GlbLoader } from "@/scripts"
  import { Entity } from "playcanvas";

  let el: HTMLCanvasElement;
  let modelUrl: string = "/avatars/model.vrm";

  onMount(() => {
    const { root } = createScene(el);

    const model = new Entity("model");
    model.addComponent("script");
    model?.script?.create(GlbLoader, {
      attributes: {
        modelUrl: modelUrl,
      },
    });
    model?.script?.create(Rotator);
    root.addChild(model);
  });
</script>

<svelte:head>
  <title>PlayCanvas</title>
</svelte:head>

<div class="container">
  <h1>{modelUrl}</h1>
</div>
<canvas bind:this={el} />

<style>
  /* position:absolute */
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    /* top */
    position: absolute;
    top: 0;
    left: 0;
    font-size: 2rem;
  }
</style>
