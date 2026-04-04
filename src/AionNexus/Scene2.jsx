import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Sequence } from 'remotion';

const WordFlash = ({ word, color = "text-white" }) => {
  const frame = useCurrentFrame();

  // Quick flash and slight scale up
  const scale = interpolate(frame, [0, 5], [0.8, 1.2], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 3, 20, 25], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="items-center justify-center bg-transparent">
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
        className={`text-9xl font-black uppercase tracking-widest ${color}`}
      >
        {word}
      </div>
    </AbsoluteFill>
  );
};

export const Scene2 = () => {
  // Kinetic typography rapid flashes
  // Total duration: 450 frames (15s)

  return (
    <AbsoluteFill className="bg-transparent">
      <Sequence durationInFrames={45}>
        <WordFlash word="AI" color="text-red-500" />
      </Sequence>
      <Sequence from={45} durationInFrames={45}>
        <WordFlash word="Geopolitica" color="text-yellow-500" />
      </Sequence>
      <Sequence from={90} durationInFrames={45}>
        <WordFlash word="Finanza" color="text-green-500" />
      </Sequence>
      <Sequence from={135} durationInFrames={45}>
        <WordFlash word="Rumore" color="text-gray-400" />
      </Sequence>
      <Sequence from={180} durationInFrames={120}>
        <AbsoluteFill className="items-center justify-center bg-transparent">
            {/* Quick montage of chaos */}
            <ChaosOverlay />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

const ChaosOverlay = () => {
    const frame = useCurrentFrame();
    const glitchX = interpolate(frame % 3, [0, 1, 2], [-20, 20, 0]);
    const glitchY = interpolate(frame % 4, [0, 1, 2, 3], [10, -10, 5, -5]);

    return (
        <div style={{ transform: `translate(${glitchX}px, ${glitchY}px)`}} className="text-white text-8xl font-bold mix-blend-difference">
            CAOS TOTALE
        </div>
    )
}
