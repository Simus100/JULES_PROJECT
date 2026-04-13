import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Trail } from "@remotion/motion-blur";
import { CheckCircle2 } from "lucide-react";

const Step = ({ num, title, desc, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  return (
    <div className="flex items-start gap-8" style={{ opacity: progress, transform: `translateX(${interpolate(progress, [0, 1], [-50, 0])}px)` }}>
      <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-purple-600 flex items-center justify-center text-4xl font-bold">
        {num}
      </div>
      <div>
        <h3 className="text-4xl font-bold mb-2">{title}</h3>
        <p className="text-2xl text-gray-400">{desc}</p>
      </div>
    </div>
  );
};

export const Scene3 = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill className="bg-black p-24">
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col justify-center">
        <h2
          className="text-6xl font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          style={{ opacity: titleOpacity }}
        >
          Il Nostro Metodo
        </h2>

        <Trail layers={5} lagInFrames={1} trailOpacity={0.5}>
          <div className="flex flex-col gap-12">
            <Step num="1" title="Analisi" desc="Studiamo il tuo mercato e i competitor" delay={30} />
            <Step num="2" title="Strategia" desc="Pianifichiamo ogni singola mossa" delay={60} />
            <Step num="3" title="Sviluppo" desc="Creiamo la tua identità digitale" delay={90} />
            <Step num="4" title="Lancio" desc="Portiamo il tuo progetto al successo" delay={120} />
          </div>
        </Trail>
      </div>
    </AbsoluteFill>
  );
};
