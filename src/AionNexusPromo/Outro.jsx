import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";
import { DynamicBackground } from "./DynamicBackground";

const { fontFamily } = loadFont();

export const Outro = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isVertical = width < 1200;

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const urlScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, mass: 1.5 },
  });

  // Continuous pulse
  const pulse = 1 + Math.sin(frame / 5) * 0.05;

  const style = useMemo(() => {
    return {
      fontFamily,
      opacity: fadeIn,
    };
  }, [fontFamily, fadeIn]);

  return (
    <AbsoluteFill style={style}>
      <DynamicBackground />

      {/* Intense light ray effect from bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-blue-600/30 to-transparent mix-blend-screen pointer-events-none" />

      <AbsoluteFill className="items-center justify-center text-white flex-col z-10 px-8">
        <h2 className={`${isVertical ? 'text-6xl' : 'text-8xl'} font-black mb-12 text-center text-white tracking-tighter drop-shadow-2xl`}>
          Scopri il futuro <br/> <span className="text-zinc-400">dell'informazione.</span>
        </h2>

        <div
          style={{ transform: `scale(${urlScale * pulse})` }}
          className="mt-8 bg-white px-12 py-8 rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.4)]"
        >
          <span className={`${isVertical ? 'text-4xl' : 'text-6xl'} font-black text-black tracking-tight`}>
            nexus.universalis.it
          </span>
        </div>

        <div className="absolute bottom-16 text-zinc-400 font-bold tracking-[0.5em] uppercase text-sm md:text-xl">
          Powered by Universalis Produzioni
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
