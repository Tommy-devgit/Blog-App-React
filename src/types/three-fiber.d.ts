// src/types/three-extensions.d.ts
declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { Loader, LoadingManager, Group } from "three";

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: { scene: Group }) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: { object: any; [key: string]: any };
      ambientLight: { [key: string]: any };
      directionalLight: { [key: string]: any };
      color: { attach: string; args: any[] };
      group: { [key: string]: any };
      mesh: { [key: string]: any };
      [key: string]: any;
    }
  }
}
