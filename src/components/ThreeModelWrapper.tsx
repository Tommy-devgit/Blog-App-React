import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group } from "three";

function Model({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url) as { scene: Group };
  // @ts-ignore
  return <primitive object={gltf.scene} />;
}

export default function ThreeDModel() {
  return (
    <Canvas>
      {/* @ts-ignore */}
      <color  args={["#1a1a1a"]} />
      {/* @ts-ignore */}
      <ambientLight intensity={0.5} />
      {/* @ts-ignore */}
      <directionalLight position={[5, 10, 7]} intensity={1} />
      <Suspense fallback={null}>
        <Stage>
          <Model url="/models/old_retro-futuristic_spaceship_computer.glb" />
        </Stage>
      </Suspense>
      <OrbitControls enableZoom />
    </Canvas>
  );
}
