import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";
import { DynamicBackground } from "./DynamicBackground";

const { fontFamily } = loadFont();

export const AiFocus = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isVertical = width < 1200;

  // Faster reveal
  const revealProgress = interpolate(frame, [10, 40], [0, 100], {
    extrapolateRight: "clamp",
  });

  const fadeOutOpacity = interpolate(frame, [250, 280], [1, 0], {
    extrapolateRight: "clamp",
  });

  // Fast, complex rotations for the core
  const rot1 = frame * 4;
  const rot2 = -frame * 6;
  const rot3 = frame * 8;

  const coreScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10 },
  });

  const style = useMemo(() => {
    return {
      fontFamily,
      opacity: fadeOutOpacity,
    };
  }, [fontFamily, fadeOutOpacity]);

  return (
    <AbsoluteFill style={style}>
      <DynamicBackground />

      <AbsoluteFill className={`items-center justify-center text-white z-10 ${isVertical ? 'flex-col' : 'flex-row gap-24'} px-12`}>

        {/* Abstract AI Core Graphic - Now much more complex */}
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{ transform: `scale(${coreScale})`, marginBottom: isVertical ? '60px' : '0' }}
        >
          {/* Rings */}
          <div className="absolute w-[400px] h-[400px] border-[1px] border-blue-500/20 rounded-full" />
          <div
            className="absolute w-[350px] h-[350px] border-8 border-t-blue-500 border-r-transparent border-b-cyan-400 border-l-transparent rounded-full opacity-80"
            style={{ transform: `rotate(${rot1}deg)` }}
          />
          <div
            className="absolute w-[280px] h-[280px] border-4 border-dashed border-cyan-300 rounded-full opacity-60"
            style={{ transform: `rotate(${rot2}deg)` }}
          />
          <div
            className="absolute w-[200px] h-[200px] border-[12px] border-t-white border-r-white/10 border-b-white/10 border-l-white/10 rounded-full mix-blend-screen"
            style={{ transform: `rotate(${rot3}deg)` }}
          />
          {/* Glowing Center */}
          <div className="w-[120px] h-[120px] bg-white rounded-full shadow-[0_0_100px_rgba(34,211,238,1)] animate-pulse" />

          {/* Floating Data particles around the core */}
          {Array.from({length: 8}).map((_, i) => {
            const angle = (i * 45) + frame;
            const radius = 250 + Math.sin(frame/10 + i)*20;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              />
            )
          })}
        </div>

        <div className={`${isVertical ? 'text-5xl text-center' : 'text-7xl text-left'} font-black leading-tight max-w-3xl relative overflow-hidden`}>
          <div
            style={{
              clipPath: `inset(0 ${100 - revealProgress}% 0 0)`
            }}
          >
            <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">AI FULLY BACKED</span>
            <br />
            <span className="text-white mt-4 block">
              Un flusso editoriale completamente gestito da Intelligenza Artificiale.
            </span>
          </div>

          {/* Hardware cursor */}
          <div
            className="absolute h-[1em] w-4 bg-cyan-400 top-0 mix-blend-screen"
            style={{
              left: `${revealProgress}%`,
              opacity: frame % 10 < 5 ? 1 : 0,
              display: revealProgress === 100 ? "none" : "block"
            }}
          />
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
