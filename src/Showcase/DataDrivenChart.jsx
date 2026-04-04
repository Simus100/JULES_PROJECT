import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { scaleLinear } from "d3";

export const DataDrivenChart = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Mock data that could come from an API
  const data = [10, 30, 20, 50, 40, 80, 60];

  // Animate the height of the bars
  const progress = interpolate(frame, [0, fps * 2], [0, 1], {
    extrapolateRight: "clamp",
  });

  const maxVal = Math.max(...data);
  const yScale = scaleLinear().domain([0, maxVal]).range([0, 800]);

  return (
    <div className="flex w-full h-full bg-white items-end justify-center gap-10 pb-40">
      {data.map((val, i) => {
        const h = yScale(val) * progress;
        return (
          <div
            key={i}
            className="w-20 bg-blue-500 rounded-t-xl flex flex-col justify-end items-center pb-4"
            style={{ height: h }}
          >
            <span className="text-white font-bold text-2xl">{Math.round(val * progress)}</span>
          </div>
        );
      })}
    </div>
  );
};
