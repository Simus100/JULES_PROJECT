import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { noise3D } from "@remotion/noise";
import React from "react";

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 1.5 },
  });

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const subY = interpolate(frame, [30, 60], [40, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center">
      {/* Dynamic Noise Background */}
      <AbsoluteFill>
        {new Array(10).fill(0).map((_, i) => {
          const x = noise3D("seed1", i, frame * 0.005, 0) * width;
          const y = noise3D("seed2", i, frame * 0.005, 0) * height;
          const size = interpolate(noise3D("seed3", i, frame * 0.01, 0), [-1, 1], [300, 800]);
          return (
            <div
              key={i}
              className="absolute rounded-full mix-blend-screen blur-[120px]"
              style={{
                left: x + width / 2,
                top: y + height / 2,
                width: size,
                height: size,
                backgroundColor: i % 2 === 0 ? "rgba(147, 51, 234, 0.4)" : "rgba(59, 130, 246, 0.4)",
                transform: `translate(-50%, -50%)`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      <div className="z-10 flex flex-col items-center">
        <h1
          className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-purple-500 to-pink-600 drop-shadow-2xl"
          style={{
            transform: `scale(${titleScale}) rotateX(${interpolate(titleScale, [0, 1], [90, 0])}deg)`,
            opacity: titleOpacity,
            perspective: 1000,
          }}
        >
          UNIVERSALIS PRODUZIONI
        </h1>
        <p
          className="text-4xl text-gray-200 mt-12 font-light tracking-[0.3em] uppercase drop-shadow-lg"
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Costruiamo il futuro digitale
        </p>
      </div>
    </AbsoluteFill>
  );
};
