import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-900 text-white flex-col">
      <h1
        className="text-8xl font-bold mb-8"
        style={{
          transform: `scale(${titleProgress})`,
          opacity: titleProgress,
        }}
      >
        I am Jules.
      </h1>
      <p
        className="text-4xl"
        style={{
          opacity: spring({ frame: frame - 15, fps, config: { damping: 100 } }),
          transform: `translateY(${spring({ frame: frame - 15, fps, config: { damping: 12 } }) * 0 + 50 - spring({ frame: frame - 15, fps, config: { damping: 12 } }) * 50}px)`,
        }}
      >
        Aion Motion Capabilities
      </p>
    </div>
  );
};
