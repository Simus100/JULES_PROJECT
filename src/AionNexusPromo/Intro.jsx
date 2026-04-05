import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";
import { DynamicBackground } from "./DynamicBackground";
import { TickerTape } from "./TickerTape";

const { fontFamily } = loadFont();

export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const titleScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, mass: 0.8 },
  });

  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subY = interpolate(frame, [15, 25], [20, 0], {
    extrapolateRight: "clamp",
  });

  const outOpacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateRight: "clamp",
  });

  const isVertical = width < 1200;

  const style = useMemo(() => {
    return {
      fontFamily,
      opacity: outOpacity,
    };
  }, [fontFamily, outOpacity]);

  // Fast glitch effect
  const glitch = frame % 30 < 3 && frame > 10 ? `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)` : 'none';

  return (
    <AbsoluteFill style={style}>
      <DynamicBackground />
      <TickerTape />

      <AbsoluteFill className="items-center justify-center text-white z-10 px-8">
        <div
          style={{
            transform: `scale(${titleScale}) ${glitch}`,
            opacity: titleOpacity,
          }}
          className={`${isVertical ? 'text-7xl' : 'text-9xl'} font-black tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400`}
        >
          AION NEXUS
        </div>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
          className={`mt-6 ${isVertical ? 'text-xl' : 'text-3xl'} text-cyan-400 font-bold tracking-wide uppercase text-center border-t border-cyan-500/50 pt-4`}
        >
          Automation Intelligence
          <br/>
          <span className="text-zinc-500 text-sm md:text-xl font-medium">by Universalis Produzioni</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
