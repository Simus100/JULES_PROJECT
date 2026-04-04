import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation values
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    fps,
    frame,
    config: { damping: 100, mass: 0.5 },
  });

  const blur = interpolate(frame, [0, 20], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const exitOpacity = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="items-center justify-center bg-transparent">
      <div
        style={{
          opacity: opacity * exitOpacity,
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
        }}
        className="text-white text-8xl font-black tracking-tighter text-center uppercase leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
      >
        Il mondo<br/>
        si muove<br/>
        <span className="text-blue-400">in fretta</span>
      </div>
    </AbsoluteFill>
  );
};
