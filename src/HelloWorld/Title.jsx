import { spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

export const Title = ({ titleText, titleColor }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const scale = spring({
    fps: videoConfig.fps,
    frame,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.5,
    },
  });

  return (
    <AbsoluteFill className="justify-center items-center">
      <h1
        className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-center uppercase"
        style={{
          color: titleColor,
          transform: `scale(${scale})`,
          textShadow: "0 0 20px rgba(0, 150, 255, 0.8)",
        }}
      >
        {titleText}
      </h1>
    </AbsoluteFill>
  );
};
