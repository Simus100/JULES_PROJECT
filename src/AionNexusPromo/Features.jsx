import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";

const { fontFamily } = loadFont();

const FeatureCard = ({ title, desc, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14 },
  });

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const xOffset = interpolate(progress, [0, 1], [100, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${xOffset}px)`,
      }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-6 shadow-2xl w-full max-w-4xl"
    >
      <h3 className="text-4xl font-bold text-white mb-2">{title}</h3>
      <p className="text-xl text-zinc-400">{desc}</p>

      {/* Mock content lines */}
      <div className="mt-6 space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-zinc-800 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-zinc-800 rounded w-5/6 animate-pulse"></div>
      </div>
    </div>
  );
};

export const Features = () => {
  const frame = useCurrentFrame();

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
    <AbsoluteFill className="bg-zinc-950 items-center justify-center p-12 flex-col" style={style}>
      <FeatureCard
        title="Top Stories"
        desc="Le storie più forti, selezionate istantaneamente."
        delay={10}
      />
      <FeatureCard
        title="Live Feed"
        desc="Flusso continuo in tempo reale sulle novità globali."
        delay={60}
      />
      <FeatureCard
        title="Aion Brief"
        desc="La sintesi del giorno generata dall'AI."
        delay={110}
      />
    </AbsoluteFill>
  );
};
