import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";

const { fontFamily } = loadFont();

export const CoreMessage = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [50, 0], {
    extrapolateRight: "clamp",
  });

  const words = ["AI", "Tecnologia", "Geopolitica", "Finanza", "Mercati", "Startup", "Scienza"];

  const fadeOutOpacity = interpolate(frame, [420, 450], [1, 0], {
    extrapolateRight: "clamp",
  });

  const style = useMemo(() => {
    return {
      fontFamily,
      opacity: fadeOutOpacity,
    };
  }, [fontFamily, fadeOutOpacity]);

  return (
    <AbsoluteFill className="bg-zinc-950 items-center justify-center text-white" style={style}>
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
        className="text-7xl font-bold mb-16 text-center text-zinc-100"
      >
        Le notizie che contano.
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-3xl">
        {words.map((word, i) => {
          const delay = 30 + i * 15;
          const wordScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, mass: 0.5 },
          });
          const wordOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={word}
              style={{
                transform: `scale(${wordScale})`,
                opacity: wordOpacity,
              }}
              className="bg-zinc-800 px-6 py-3 rounded-xl text-3xl font-semibold border border-zinc-700 shadow-xl"
            >
              {word}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
