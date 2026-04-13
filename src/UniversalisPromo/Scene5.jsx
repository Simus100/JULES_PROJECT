import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Globe, Mail, Phone } from "lucide-react";
import { noise2D } from "@remotion/noise";
import React from "react";

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, mass: 1.5 },
  });

  const contentOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center p-24 overflow-hidden">
      {/* Exploding particle background */}
      <AbsoluteFill>
        {new Array(30).fill(0).map((_, i) => {
          const moveProgress = spring({
            frame: frame - i,
            fps,
            config: { damping: 200 }
          });
          const x = interpolate(moveProgress, [0, 1], [width / 2, width / 2 + noise2D("seed1", i, 0) * 1000]);
          const y = interpolate(moveProgress, [0, 1], [height / 2, height / 2 + noise2D("seed2", i, 0) * 1000]);
          const opacity = interpolate(moveProgress, [0, 0.8, 1], [0, 0.5, 0]);
          return (
            <div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full blur-[2px]"
              style={{
                left: x,
                top: y,
                opacity,
                transform: `scale(${interpolate(moveProgress, [0, 1], [0, 3])})`
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Dynamic ambient glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black"
        style={{
          opacity: interpolate(frame, [0, 60], [0, 1]),
          transform: `scale(${1 + Math.sin(frame * 0.05) * 0.1})`
        }}
      />

      <div className="z-10 flex flex-col items-center max-w-5xl w-full">
        <h2
          className="text-9xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500"
          style={{
            transform: `scale(${titleScale}) rotateZ(${interpolate(titleScale, [0, 1], [-10, 0])}deg)`,
            opacity: titleScale,
            filter: `drop-shadow(0 0 ${interpolate(titleScale, [0, 1], [0, 30])}px rgba(255,255,255,0.4))`
          }}
        >
          Pronto a crescere?
        </h2>

        <p
          className="text-4xl text-gray-400 mb-20 text-center font-light tracking-wide"
          style={{ opacity: contentOpacity }}
        >
          Contattaci oggi per trasformare la tua visione in realtà.
        </p>

        <div
          className="flex flex-col gap-10 w-full max-w-3xl bg-white/5 p-16 rounded-[3rem] backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)]"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${interpolate(frame, [45, 75], [100, 0], { extrapolateRight: "clamp" })}px)`
          }}
        >
          <div className="flex items-center justify-center gap-8 text-4xl">
            <Globe className="text-blue-400" size={56} />
            <span className="font-semibold text-gray-200">www.universalis.it</span>
          </div>
          <div className="flex items-center justify-center gap-8 text-4xl mt-4">
            <Mail className="text-purple-400" size={56} />
            <span className="font-semibold text-gray-200">admin@universalis.it</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
