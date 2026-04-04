import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grand reveal
  const scale = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 60,
  });

  const letterSpacing = interpolate(frame, [0, 60], [20, 2], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const lineY = interpolate(frame, [100, 130], [50, 0], { extrapolateRight: 'clamp'});
  const lineOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill className="items-center justify-center bg-transparent">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-screen" />

        <div className="flex flex-col items-center z-10">
            <h1
                style={{
                    opacity,
                    transform: `scale(${interpolate(scale, [0, 1], [1.5, 1])})`,
                    letterSpacing: `${letterSpacing}px`
                }}
                className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)] uppercase"
            >
                Aion Nexus
            </h1>

            <h2
                style={{ opacity: subOpacity }}
                className="text-4xl text-blue-200 mt-4 tracking-[0.2em] uppercase font-light"
            >
                Automation Intelligence
            </h2>

            <div
                style={{
                    opacity: lineOpacity,
                    transform: `translateY(${lineY}px)`
                }}
                className="mt-24 text-5xl text-white font-medium italic"
            >
                Segnali ad alta priorità. <span className="text-blue-400 font-bold">Zero rumore.</span>
            </div>
        </div>
    </AbsoluteFill>
  );
};
