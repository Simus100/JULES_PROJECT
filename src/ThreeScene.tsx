import React, { useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RotatingCube = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const frame = useCurrentFrame();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = frame * 0.05;
      mesh.current.rotation.y = frame * 0.05;
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial color="#4ade80" wireframe={false} />
    </mesh>
  );
};

export const ThreeScene: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center">
      <h2 className="text-white text-5xl font-bold absolute top-12 z-10">
        3D Integration
      </h2>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingCube />
      </ThreeCanvas>
    </div>
  );
};
