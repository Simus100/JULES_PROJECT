import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";

const { fontFamily } = loadFont();

export const AiFocus = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reveal effect for text (typewriter simulation via mask)
  const revealProgress = interpolate(frame, [15, 60], [0, 100], {
    extrapolateRight: "clamp",
  });

  const fadeOutOpacity = interpolate(frame, [270, 300], [1, 0], {
    extrapolateRight: "clamp",
  });

  // Rotation for the abstract "AI core" shape
  const rotation = frame * 2;

  const style = useMemo(() => {
    return {
      fontFamily,
      opacity: fadeOutOpacity,
    };
  }, [fontFamily, fadeOutOpacity]);

  return (
    <AbsoluteFill className="bg-zinc-950 items-center justify-center text-white" style={style}>

      {/* Abstract AI Core Graphic */}
      <div className="relative flex items-center justify-center mb-16">
        <div
          className="absolute w-64 h-64 border-4 border-blue-500 rounded-full opacity-30"
          style={{ transform: `rotate(${rotation}deg) scale(1.1)` }}
        />
        <div
          className="absolute w-48 h-48 border-4 border-cyan-400 rounded-full border-dashed opacity-50"
          style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
        />
        <div className="w-32 h-32 bg-gradient-to-tr from-blue-600 to-cyan-300 rounded-full blur-xl opacity-80 animate-pulse" />
      </div>

      <div className="text-5xl md:text-6xl font-bold text-center leading-tight max-w-4xl relative overflow-hidden px-4">
        <div
          style={{
            clipPath: `inset(0 ${100 - revealProgress}% 0 0)`
          }}
        >
          <span className="text-cyan-400">AI FULLY BACKED</span>
          <br />
          Un flusso editoriale completamente gestito da Intelligenza Artificiale.
        </div>

        {/* Blinking cursor */}
        <div
          className="absolute h-16 w-1 bg-white top-0"
          style={{
            left: `${revealProgress}%`,
            opacity: frame % 15 < 7 ? 1 : 0,
            display: revealProgress === 100 ? "none" : "block"
          }}
        />
      </div>

    </AbsoluteFill>
  );
};
