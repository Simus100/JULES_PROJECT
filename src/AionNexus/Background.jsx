import React from 'react';
import { AbsoluteFill } from 'remotion';

export const AnimatedBackground = () => {
  return (
    <AbsoluteFill className="bg-black">
      {/* A dark, subtle tech grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Subtle glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-900 rounded-full blur-[150px] opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-900 rounded-full blur-[150px] opacity-20 animate-pulse" />
    </AbsoluteFill>
  );
};
