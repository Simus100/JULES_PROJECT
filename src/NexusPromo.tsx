import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Audio,
  staticFile,
  random,
} from 'remotion';

const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle continuous shake for intensity
  const shakeX = frame % 3 === 0 ? random(`shakeX-${frame}`) * 6 - 3 : 0;
  const shakeY = frame % 3 === 0 ? random(`shakeY-${frame}`) * 6 - 3 : 0;
  const scale = 1.05 + frame * 0.0002;

  return (
    <AbsoluteFill className="bg-black overflow-hidden" style={{ transform: `scale(${scale}) translate(${shakeX}px, ${shakeY}px)` }}>
      <div
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-40"
        style={{
          background: `radial-gradient(circle at ${50 + Math.sin(frame / 80) * 30}% ${50 + Math.cos(frame / 80) * 30}%, rgba(20, 184, 166, 0.5) 0%, transparent 40%), radial-gradient(circle at ${50 - Math.sin(frame / 90) * 30}% ${50 - Math.cos(frame / 90) * 30}%, rgba(8, 145, 178, 0.4) 0%, transparent 40%)`,
        }}
      />

      {/* Particles layer */}
      <Particles />
    </AbsoluteFill>
  );
};

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: 60 }).map((_, i) => {
        const startX = (i * 137) % 100;
        const startY = (i * 251) % 100;

        // Faster movement for more aggression
        const moveY = interpolate(frame, [0, 720], [0, -200 * (i % 4 + 1)]);
        const moveX = interpolate(frame, [0, 720], [0, 50 * Math.sin(i + frame / 20)]);

        return (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-300"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              width: `${(i % 2) === 0 ? 1 : 4}px`,
              height: `${(i % 4) + 1}px`,
              transform: `translate(${moveX}px, ${moveY}px)`,
              opacity: (0.2 + (i % 5) * 0.15) * (frame % 4 === 0 ? 0.3 : 1), // flicker effect
              boxShadow: '0 0 10px rgba(103, 232, 249, 0.8)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const GlitchText: React.FC<{ text: string, className?: string, style?: React.CSSProperties }> = ({ text, className, style }) => {
  const frame = useCurrentFrame();
  const isGlitching = frame % 15 < 3;
  const xOffset = isGlitching ? random(`glitchX-${frame}`) * 10 - 5 : 0;
  const skew = isGlitching ? random(`glitchSkew-${frame}`) * 20 - 10 : 0;

  return (
    <div className={className} style={{ ...style, transform: `${style?.transform || ''} translate(${xOffset}px, 0) skewX(${skew}deg)` }}>
      {text}
    </div>
  );
};

const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 5], [1, 0], { extrapolateRight: 'clamp' });
  return <AbsoluteFill className="bg-white" style={{ opacity, zIndex: 100 }} />;
};

const LogoAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 10,  // Lower damping = more aggressive bounce
      stiffness: 150, // Higher stiffness = faster snap
      mass: 0.5,
    },
  });

  const opacityOut = interpolate(frame, [160, 180], [1, 0], {
    extrapolateRight: 'clamp',
  });

  const scaleOut = interpolate(frame, [160, 180], [1, 1.5], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="justify-center items-center" style={{ opacity: opacityOut, transform: `scale(${scaleOut})` }}>
      <Flash />
      <div
        className="text-white text-9xl font-black tracking-tighter text-center"
        style={{
          transform: `scale(${progress})`,
          opacity: interpolate(progress, [0, 1], [0, 1]),
          textShadow: '0 0 80px rgba(34, 211, 238, 0.8)',
        }}
      >
        <span className="text-cyan-400">NEXUS</span><br/>UNIVERSALIS
      </div>
      <GlitchText
        text="AUTOMATION INTELLIGENCE"
        className="text-cyan-200 text-3xl tracking-[0.5em] mt-8 font-bold"
        style={{
          opacity: interpolate(frame, [15, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        }}
      />
    </AbsoluteFill>
  );
};

const Message: React.FC<{ text: string, subText?: string }> = ({ text, subText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Aggressive snap in
  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
  });

  const opacityOut = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const scaleOut = interpolate(frame, [160, 180], [1, 2], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill className="justify-center items-center px-20">
      <Flash />
      <div
        className="flex flex-col items-center gap-6 w-full"
        style={{
          opacity: opacityOut,
          transform: `scale(${scale * scaleOut})`,
        }}
      >
        <h1 className="text-white text-8xl font-black text-center leading-none uppercase tracking-tight">
          {text}
        </h1>
        {subText && (
          <GlitchText
            text={subText}
            className="text-cyan-400 text-5xl font-bold text-center mt-4"
          />
        )}
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleText = spring({ frame, fps, config: { damping: 10, stiffness: 150 } });
  const scaleBox = spring({ frame: frame - 10, fps, config: { damping: 8, stiffness: 200 } });

  return (
    <AbsoluteFill className="justify-center items-center">
      <Flash />
      <div className="flex flex-col items-center gap-20">
        <div
          className="text-white text-6xl font-black tracking-widest uppercase"
          style={{ transform: `scale(${scaleText})` }}
        >
          L'informazione che conta
        </div>

        <div
          className="bg-black border-4 border-cyan-400 px-20 py-10 shadow-[0_0_100px_rgba(34,211,238,0.6)]"
          style={{ transform: `scale(${scaleBox})` }}
        >
          <GlitchText
            text="NEXUS.UNIVERSALIS.IT"
            className="text-cyan-400 text-7xl font-black tracking-tighter"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const NexusPromo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-slate-950 font-sans">
      <Background />

      <Sequence durationInFrames={180}>
        <LogoAnimation />
      </Sequence>

      <Sequence from={180} durationInFrames={180}>
        <Message text="L'ecosistema dell'innovazione" subText="AI, Tecnologia e Geopolitica in un unico flusso." />
      </Sequence>

      <Sequence from={360} durationInFrames={180}>
        <Message text="Segnali prioritari" subText="AI FULLY BACKED" />
      </Sequence>

      <Sequence from={540} durationInFrames={180}>
        <CTA />
      </Sequence>

      <Audio src={staticFile("epic-background.mp3")} volume={0.8} />

    </AbsoluteFill>
  );
};
