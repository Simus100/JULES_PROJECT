import { spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

export const FinalScene = () => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const scale = spring({
    fps: videoConfig.fps,
    frame,
    config: {
      damping: 14,
      stiffness: 80,
    },
  });

  return (
    <AbsoluteFill className="justify-center items-center bg-[#0a192f]">
      <h2
        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest text-white text-center"
        style={{
          transform: `scale(${scale})`,
          textShadow: "0 0 30px rgba(0, 150, 255, 1)",
        }}
      >
        nexus.universalis.it
      </h2>
    </AbsoluteFill>
  );
};
