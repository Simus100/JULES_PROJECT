import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: { damping: 100 },
  });

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="items-center justify-center bg-black">
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
        className="flex flex-col items-center"
      >
        <div className="text-[100px] font-black text-white tracking-widest mb-4">
          AION NEXUS
        </div>
        <div className="text-4xl text-blue-400 font-bold mb-12">
          Le notizie che contano.
        </div>
        <div className="px-12 py-6 bg-white text-black text-5xl font-bold rounded-full shadow-[0_0_50px_rgba(255,255,255,0.5)]">
          nexus.universalis.it
        </div>
      </div>
    </AbsoluteFill>
  );
};
