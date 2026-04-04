import { useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Box = () => {
  const boxRef = useRef(null);
  const frame = useCurrentFrame();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x = frame * 0.05;
      boxRef.current.rotation.y = frame * 0.05;
    }
  });

  return (
    <mesh ref={boxRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
};

export const ThreeAnimation = () => {
  const { width, height } = useVideoConfig();

  return (
    <div className="absolute inset-0 bg-gray-900">
      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </ThreeCanvas>
    </div>
  );
};
