import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";
import { DynamicBackground } from "./DynamicBackground";

const { fontFamily } = loadFont();

const FeatureCard = ({ title, desc, delay, isVertical, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, mass: 0.8 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  // 3D pop-in effect
  const yOffset = interpolate(progress, [0, 1], [150, 0]);
  const rotateX = interpolate(progress, [0, 1], [45, 0]);

  // Simulated live data bars
  const bars = [1, 2, 3, 4, 5].map(i => {
    const height = 20 + Math.sin(frame/10 + i + index) * 80;
    return <div key={i} className="w-2 bg-blue-500 rounded-t-sm" style={{ height: `${height}%` }} />
  });

  return (
    <div
      style={{
        opacity,
        transform: `perspective(1000px) translateY(${yOffset}px) rotateX(${rotateX}deg)`,
      }}
      className={`bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl"></div>

      <div className="flex justify-between items-start mb-4">
        <h3 className={`${isVertical ? 'text-3xl' : 'text-5xl'} font-black text-white uppercase tracking-tight`}>{title}</h3>
        <div className="flex gap-1 h-8 items-end opacity-50">
          {bars}
        </div>
      </div>
      <p className={`${isVertical ? 'text-lg' : 'text-2xl'} text-zinc-400 font-medium`}>{desc}</p>

      {/* Fake UI code scanning effect */}
      <div className="mt-6 h-1 w-full bg-zinc-800 overflow-hidden rounded-full">
         <div
           className="h-full bg-cyan-400"
           style={{ transform: `translateX(${-100 + (frame * 5) % 200}%)` }}
         />
      </div>
    </div>
  );
};

export const Features = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const isVertical = width < 1200;

  const fadeOutOpacity = interpolate(frame, [250, 280], [1, 0], {
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

      <AbsoluteFill className="items-center justify-center p-8 z-10">
        <div className={`w-full max-w-6xl grid ${isVertical ? 'grid-cols-1 gap-6' : 'grid-cols-3 gap-8'}`}>
          <FeatureCard
            index={1}
            isVertical={isVertical}
            title="Top Stories"
            desc="Selezione istantanea dei segnali prioritari."
            delay={10}
          />
          <FeatureCard
            index={2}
            isVertical={isVertical}
            title="Live Feed"
            desc="Flusso continuo in tempo reale sulle novità globali."
            delay={25}
          />
          <FeatureCard
            index={3}
            isVertical={isVertical}
            title="Aion Brief"
            desc="La sintesi del giorno generata dall'AI."
            delay={40}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
