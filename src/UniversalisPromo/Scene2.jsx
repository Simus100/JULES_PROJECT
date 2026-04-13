import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Monitor, Rocket, Search, PenTool } from "lucide-react";
import { Trail } from "@remotion/motion-blur";

const ServiceItem = ({ icon: Icon, title, desc, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14 },
  });

  const yOffset = interpolate(appear, [0, 1], [50, 0]);

  return (
    <div
      className="flex flex-col items-center p-8 bg-gray-900 rounded-3xl border border-gray-800"
      style={{
        opacity: appear,
        transform: `translateY(${yOffset}px) scale(${appear})`,
      }}
    >
      <div className="w-24 h-24 rounded-full bg-blue-900/30 flex items-center justify-center mb-6 text-blue-400">
        <Icon size={48} />
      </div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-xl text-gray-400 text-center">{desc}</p>
    </div>
  );
};

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill className="bg-black p-24 flex flex-col justify-center">
      <h2
        className="text-6xl font-bold text-center mb-24"
        style={{ opacity: titleOpacity }}
      >
        I Nostri Servizi
      </h2>

      <Trail layers={5} lagInFrames={1} trailOpacity={0.6}>
        <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
          <ServiceItem
            icon={Monitor}
            title="Web Design"
            desc="Siti web moderni e performanti"
            delay={30}
          />
          <ServiceItem
            icon={Rocket}
            title="Digital Marketing"
            desc="Strategie per far crescere il tuo business"
            delay={60}
          />
          <ServiceItem
            icon={Search}
            title="SEO Optimization"
            desc="Raggiungi le prime posizioni su Google"
            delay={90}
          />
          <ServiceItem
            icon={PenTool}
            title="Brand Identity"
            desc="Design che lascia il segno"
            delay={120}
          />
        </div>
      </Trail>
    </AbsoluteFill>
  );
};
