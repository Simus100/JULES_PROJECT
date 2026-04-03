import { interpolate, useCurrentFrame, AbsoluteFill } from "remotion";

export const Subtitle = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest text-blue-200 mt-40"
        style={{ opacity }}
      >
        L'ecosistema dell'innovazione
      </div>
    </AbsoluteFill>
  );
};
