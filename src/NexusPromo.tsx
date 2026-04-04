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
} from 'remotion';

const Background: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-slate-950 overflow-hidden">
      <div
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + Math.sin(frame / 100) * 20}% ${50 + Math.cos(frame / 100) * 20}%, rgba(56, 189, 248, 0.4) 0%, transparent 50%), radial-gradient(circle at ${50 - Math.sin(frame / 120) * 20}% ${50 - Math.cos(frame / 120) * 20}%, rgba(129, 140, 248, 0.3) 0%, transparent 50%)`,
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
      {Array.from({ length: 40 }).map((_, i) => {
        const startX = (i * 137) % 100;
        const startY = (i * 251) % 100;

        const moveY = interpolate(frame, [0, 900], [0, -50 * (i % 3 + 1)]);
        const moveX = interpolate(frame, [0, 900], [0, 20 * Math.sin(i)]);

        return (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              transform: `translate(${moveX}px, ${moveY}px)`,
              opacity: 0.1 + (i % 5) * 0.1,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const LogoAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 70,
    },
  });

  const opacity = interpolate(frame, [150, 180], [1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="justify-center items-center" style={{ opacity }}>
      <div
        className="text-white text-8xl font-bold tracking-widest text-center"
        style={{
          transform: `scale(${progress})`,
          opacity: progress,
          textShadow: '0 0 40px rgba(56, 189, 248, 0.4)',
        }}
      >
        <span className="text-cyan-400">NEXUS</span> UNIVERSALIS
      </div>
      <div
        className="text-slate-400 text-3xl tracking-widest mt-8 font-light"
        style={{
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        }}
      >
        AUTOMATION INTELLIGENCE
      </div>
    </AbsoluteFill>
  );
};

const Message: React.FC<{ text: string, subText?: string }> = ({ text, subText }) => {
  const frame = useCurrentFrame();

  const opacityIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const opacityOut = interpolate(frame, [150, 180], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const translateY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateYOut = interpolate(frame, [150, 180], [0, -50], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  const opacity = frame < 90 ? opacityIn : opacityOut;
  const transformY = frame < 90 ? translateY : translateYOut;

  return (
    <AbsoluteFill className="justify-center items-center px-40">
      <div
        className="flex flex-col items-center gap-8"
        style={{
          opacity,
          transform: `translateY(${transformY}px)`,
        }}
      >
        <h1 className="text-white text-7xl font-light text-center leading-tight">
          {text}
        </h1>
        {subText && (
          <h2 className="text-cyan-400 text-4xl font-light text-center opacity-80">
            {subText}
          </h2>
        )}
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 },
  });

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        className="flex flex-col items-center gap-16"
        style={{ opacity }}
      >
        <div className="text-white text-5xl font-light tracking-wide">
          L'informazione che conta.
        </div>
        <div
          className="bg-cyan-950/50 border border-cyan-400/50 px-16 py-8 rounded-2xl shadow-[0_0_60px_rgba(34,211,238,0.2)] backdrop-blur-sm"
          style={{ transform: `scale(${scale})` }}
        >
          <span className="text-cyan-400 text-6xl font-bold tracking-wider">
            nexus.universalis.it
          </span>
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
        <Message text="Segnali ad alta priorità" subText="Completamente gestiti da Intelligenza Artificiale." />
      </Sequence>

      <Sequence from={540} durationInFrames={180}>
        <CTA />
      </Sequence>

      <Audio src={staticFile("background.mp3")} volume={0.5} />

    </AbsoluteFill>
  );
};
