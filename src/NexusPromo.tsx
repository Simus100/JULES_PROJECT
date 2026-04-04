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

  // Violent continuous shake and pumping
  const isPumping = frame % 15 < 3;
  const shakeX = isPumping ? random(`shakeX-${frame}`) * 20 - 10 : (frame % 2 === 0 ? random(`shakeX2-${frame}`) * 4 - 2 : 0);
  const shakeY = isPumping ? random(`shakeY-${frame}`) * 20 - 10 : (frame % 2 === 0 ? random(`shakeY2-${frame}`) * 4 - 2 : 0);
  const pumpScale = isPumping ? 1.05 : 1;
  const scale = (1.1 + frame * 0.0005) * pumpScale;

  // Flash red occasionally
  const isRedFlash = frame % 60 > 55;

  return (
    <AbsoluteFill className="bg-black overflow-hidden" style={{ transform: `scale(${scale}) translate(${shakeX}px, ${shakeY}px)` }}>
      <div
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-50"
        style={{
          background: `radial-gradient(circle at ${50 + Math.sin(frame / 80) * 30}% ${50 + Math.cos(frame / 80) * 30}%, ${isRedFlash ? 'rgba(220, 38, 38, 0.8)' : 'rgba(20, 184, 166, 0.5)'} 0%, transparent 40%), radial-gradient(circle at ${50 - Math.sin(frame / 90) * 30}% ${50 - Math.cos(frame / 90) * 30}%, rgba(8, 145, 178, 0.4) 0%, transparent 40%)`,
        }}
      />

      {/* Particles layer */}
      <Particles />
    </AbsoluteFill>
  );
};

const Scanlines: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
        backgroundSize: '100% 4px, 3px 100%',
        zIndex: 50,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
};

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: 60 }).map((_, i) => {
        const startX = (i * 137) % 100;
        const startY = (i * 251) % 100;

        // Extreme movement
        const speedMultiplier = frame % 30 < 5 ? 4 : 1; // sudden bursts of speed
        const moveY = interpolate(frame, [0, 720], [0, -400 * (i % 4 + 1)]) * speedMultiplier;
        const moveX = interpolate(frame, [0, 720], [0, 150 * Math.sin(i + frame / 10)]);

        const isRed = i % 10 === 0;

        return (
          <div
            key={i}
            className={`absolute rounded-full ${isRed ? 'bg-red-500' : 'bg-cyan-300'}`}
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              width: `${(i % 2) === 0 ? 2 : 6}px`,
              height: `${(i % 4) + 2}px`,
              transform: `translate(${moveX}px, ${moveY}px)`,
              opacity: (0.3 + (i % 5) * 0.2) * (frame % 3 === 0 ? 0.1 : 1), // heavy flicker effect
              boxShadow: `0 0 15px ${isRed ? 'rgba(239, 68, 68, 0.9)' : 'rgba(103, 232, 249, 0.9)'}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const GlitchText: React.FC<{ text: string, className?: string, style?: React.CSSProperties, rgbSplit?: boolean }> = ({ text, className, style, rgbSplit = true }) => {
  const frame = useCurrentFrame();
  const isGlitching = frame % 12 < 4; // More frequent glitching
  const xOffset = isGlitching ? random(`glitchX-${frame}`) * 30 - 15 : 0;
  const yOffset = isGlitching ? random(`glitchY-${frame}`) * 10 - 5 : 0;
  const skew = isGlitching ? random(`glitchSkew-${frame}`) * 40 - 20 : 0;
  const scaleY = isGlitching ? random(`glitchScaleY-${frame}`) * 0.5 + 0.8 : 1;

  const baseStyle = {
    ...style,
    transform: `${style?.transform || ''} translate(${xOffset}px, ${yOffset}px) skewX(${skew}deg) scaleY(${scaleY})`
  };

  if (!rgbSplit) {
    return <div className={className} style={baseStyle}>{text}</div>;
  }

  const redOffset = isGlitching ? random(`red-${frame}`) * 15 + 5 : 2;
  const blueOffset = isGlitching ? random(`blue-${frame}`) * -15 - 5 : -2;

  return (
    <div className="relative">
      {/* Red Channel */}
      <div className={`absolute top-0 left-0 text-red-500 mix-blend-screen opacity-80 ${className}`} style={{ ...baseStyle, transform: `${baseStyle.transform} translateX(${redOffset}px)` }}>
        {text}
      </div>
      {/* Blue/Cyan Channel */}
      <div className={`absolute top-0 left-0 text-cyan-400 mix-blend-screen opacity-80 ${className}`} style={{ ...baseStyle, transform: `${baseStyle.transform} translateX(${blueOffset}px)` }}>
        {text}
      </div>
      {/* Base Text */}
      <div className={`relative ${className}`} style={baseStyle}>
        {text}
      </div>
    </div>
  );
};

const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  // Extreme flash: white then a quick red burn
  const whiteOpacity = interpolate(frame, [0, 3], [1, 0], { extrapolateRight: 'clamp' });
  const redOpacity = interpolate(frame, [3, 8], [0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <>
      <AbsoluteFill className="bg-white" style={{ opacity: whiteOpacity, zIndex: 101 }} />
      <AbsoluteFill className="bg-red-600 mix-blend-overlay" style={{ opacity: redOpacity, zIndex: 100 }} />
    </>
  );
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

  const rotateX = interpolate(progress, [0, 1], [80, 0]);
  const rotateZ = interpolate(progress, [0, 1], [-20, 0]);

  return (
    <AbsoluteFill className="justify-center items-center" style={{ opacity: opacityOut, transform: `scale(${scaleOut}) perspective(1000px)` }}>
      <Flash />
      <div
        className="text-white text-9xl font-black tracking-tighter text-center leading-none"
        style={{
          transform: `scale(${progress}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
          opacity: interpolate(progress, [0, 1], [0, 1]),
          textShadow: '0 0 100px rgba(34, 211, 238, 1)',
        }}
      >
        <GlitchText text="NEXUS" className="text-cyan-400 text-[12rem] mb-[-2rem]" />
        <GlitchText text="UNIVERSALIS" className="text-white" />
      </div>
      <GlitchText
        text="AUTOMATION INTELLIGENCE"
        className="text-red-500 text-4xl tracking-[0.5em] mt-12 font-black mix-blend-screen"
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

  // Extreme violent 3D smash
  const progress = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.8 },
  });

  const scale = interpolate(progress, [0, 1], [3, 1]);
  const rotateY = interpolate(progress, [0, 1], [-90, 0]);

  const opacityOut = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const scaleOut = interpolate(frame, [160, 180], [1, 3], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill className="justify-center items-center px-10" style={{ perspective: '1200px' }}>
      <Flash />
      <div
        className="flex flex-col items-center gap-8 w-full"
        style={{
          opacity: opacityOut,
          transform: `scale(${scale * scaleOut}) rotateY(${rotateY}deg)`,
        }}
      >
        <GlitchText
          text={text}
          className="text-white text-9xl font-black text-center leading-[0.9] uppercase tracking-tighter"
        />
        {subText && (
          <div className="bg-red-600 px-8 py-2 transform -skew-x-12 shadow-[0_0_50px_rgba(220,38,38,0.8)] mt-8">
            <GlitchText
              text={subText}
              className="text-white text-6xl font-black text-center tracking-widest"
              rgbSplit={false}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress1 = spring({ frame, fps, config: { damping: 12, stiffness: 250 } });
  const progress2 = spring({ frame: frame - 15, fps, config: { damping: 8, stiffness: 300, mass: 1.5 } });

  const scaleText = interpolate(progress1, [0, 1], [0, 1]);
  const rotateText = interpolate(progress1, [0, 1], [15, 0]);

  const scaleBox = interpolate(progress2, [0, 1], [5, 1]);
  const blurBox = interpolate(progress2, [0, 1], [20, 0]);

  return (
    <AbsoluteFill className="justify-center items-center overflow-hidden">
      <Flash />
      <div className="flex flex-col items-center gap-24 w-full">
        <div
          className="text-white text-7xl font-black tracking-widest uppercase"
          style={{ transform: `scale(${scaleText}) skewX(${rotateText}deg)` }}
        >
          L'informazione che conta
        </div>

        <div
          className="bg-black border-[12px] border-cyan-400 px-24 py-12 shadow-[0_0_150px_rgba(34,211,238,1)]"
          style={{
            transform: `scale(${scaleBox})`,
            filter: `blur(${blurBox}px)`
          }}
        >
          <GlitchText
            text="NEXUS.UNIVERSALIS.IT"
            className="text-cyan-400 text-8xl font-black tracking-tighter"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const NexusPromo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-black font-sans">
      <Background />
      <Scanlines />

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
