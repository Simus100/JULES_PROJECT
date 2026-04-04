import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Sequence, spring, useVideoConfig } from 'remotion';

const FeatureCard = ({ title, subtitle, icon, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entryFrame = index * 15;
    const progress = spring({
        fps,
        frame: frame - entryFrame,
        config: { damping: 12 }
    });

    const translateY = interpolate(progress, [0, 1], [100, 0]);
    const opacity = interpolate(progress, [0, 1], [0, 1]);

    return (
        <div
            style={{
                transform: `translateY(${translateY}px)`,
                opacity
            }}
            className="flex flex-col items-center justify-center p-8 m-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md w-[400px] h-[300px] shadow-[0_0_30px_rgba(59,130,246,0.1)]"
        >
            <div className="text-6xl mb-6">{icon}</div>
            <h3 className="text-4xl font-bold text-white mb-2">{title}</h3>
            <p className="text-xl text-blue-200 text-center">{subtitle}</p>
        </div>
    );
};

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ fps, frame, config: { damping: 14 }});

  return (
    <AbsoluteFill className="items-center justify-center bg-transparent pt-20">
      <h2
        style={{
            opacity: titleProgress,
            transform: `translateY(${interpolate(titleProgress, [0, 1], [-50, 0])}px)`
        }}
        className="text-7xl font-bold text-white mb-16"
      >
        Tutto ciò che serve, <span className="text-blue-400">in un solo posto</span>
      </h2>

      <div className="flex flex-wrap justify-center max-w-[1400px]">
        <FeatureCard index={0} title="Live Feed" subtitle="Notizie in tempo reale gestite da AI" icon="⚡" />
        <FeatureCard index={1} title="Aion Brief" subtitle="La sintesi perfetta del giorno" icon="📑" />
        <FeatureCard index={2} title="Focus & Radar" subtitle="Approfondimenti verticali" icon="🎯" />
        <FeatureCard index={3} title="Metriche" subtitle="Analisi in tempo reale" icon="📊" />
      </div>
    </AbsoluteFill>
  );
};
