import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { evolvePath } from "@remotion/paths";

export const PathAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // A simple star or polygon path
  const path = "M 100 100 L 300 100 L 200 300 Z";

  const progress = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 60,
  });

  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, path);

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <svg width="400" height="400" viewBox="0 0 400 400">
        <path
          d={path}
          fill="none"
          stroke="cyan"
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute text-white text-4xl mt-60 font-bold">
        Path Animations
      </div>
    </div>
  );
};
