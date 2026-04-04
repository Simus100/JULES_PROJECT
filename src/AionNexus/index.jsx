import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import React from 'react';
import { AnimatedBackground } from "./Background";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";
import { Scene5 } from "./Scene5";

export const AionNexus = () => {
  return (
    <AbsoluteFill className="bg-black">
      {/* Background Music */}
      <Audio src={staticFile("background.mp3")} volume={0.8} />

      <AnimatedBackground />

      {/* Scene 1: Hook (0-10s = 0-300 frames) */}
      <Sequence durationInFrames={300}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: The Problem (10-25s = 300-750 frames) */}
      <Sequence from={300} durationInFrames={450}>
        <Scene2 />
      </Sequence>

      {/* Scene 3: The Solution (25-40s = 750-1200 frames) */}
      <Sequence from={750} durationInFrames={450}>
        <Scene3 />
      </Sequence>

      {/* Scene 4: Features (40-50s = 1200-1500 frames) */}
      <Sequence from={1200} durationInFrames={300}>
        <Scene4 />
      </Sequence>

      {/* Scene 5: Call to Action (50-60s = 1500-1800 frames) */}
      <Sequence from={1500} durationInFrames={300}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
