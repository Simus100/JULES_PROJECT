import { AbsoluteFill } from "remotion";
import { NoiseBackground } from "./components/NoiseBackground";
import { AnimatedTitle } from "./components/AnimatedTitle";
import { LowerThird } from "./components/LowerThird";
import { ProgressBar } from "./components/ProgressBar";

export const Showcase = () => {
  return (
    <AbsoluteFill>
      <NoiseBackground />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedTitle titleText="Remotion Supercharged!" />
      </div>
      <LowerThird name="Jules" title="AI Video Editor" />
      <ProgressBar />
    </AbsoluteFill>
  );
};
