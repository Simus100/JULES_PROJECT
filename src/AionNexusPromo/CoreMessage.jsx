import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";
import { DynamicBackground } from "./DynamicBackground";
import { TickerTape } from "./TickerTape";

const { fontFamily } = loadFont();

export const CoreMessage = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isVertical = width < 1200;

  const titleScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12 },
  });

  const words = ["AI", "Tecnologia", "Geopolitica", "Finanza", "Mercati", "Startup", "Scienza"];

  const fadeOutOpacity = interpolate(frame, [200, 240], [1, 0], {
    extrapolateRight: "clamp",
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
      <TickerTape />

      <AbsoluteFill className="items-center justify-center text-white z-10 px-8">
        <div
          style={{ transform: `scale(${titleScale})` }}
          className={`${isVertical ? 'text-5xl' : 'text-8xl'} font-black mb-12 text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] uppercase tracking-tight`}
        >
          Le notizie che <span className="text-cyan-400">contano.</span>
        </div>

        <div className={`flex flex-wrap justify-center ${isVertical ? 'gap-3' : 'gap-6'} max-w-5xl`}>
          {words.map((word, i) => {
            // Faster stagger
            const delay = 15 + i * 5;
            const wordSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, mass: 0.6 },
            });
            const wordY = interpolate(wordSpring, [0, 1], [100, 0]);

            return (
              <div
                key={word}
                style={{
                  transform: `translateY(${wordY}px) scale(${wordSpring})`,
                  opacity: wordSpring,
                }}
                className={`bg-zinc-900/80 backdrop-blur-md px-6 py-4 rounded-2xl ${isVertical ? 'text-2xl' : 'text-4xl'} font-bold border border-zinc-700/50 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
              >
                {word}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
