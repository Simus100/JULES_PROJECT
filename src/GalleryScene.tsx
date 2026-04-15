import React from "react";
import { Img, useCurrentFrame, useVideoConfig, spring } from "remotion";

export const GalleryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const img1Scale = spring({ frame, fps, config: { damping: 12 } });
  const img2Scale = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const img3Scale = spring({ frame: frame - 30, fps, config: { damping: 12 } });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-stone-900">
      <h2 className="text-white text-5xl font-bold mb-12">
        Dynamic Media Handling
      </h2>
      <div className="flex gap-8">
        <Img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
          className="w-64 h-64 object-cover rounded-xl shadow-2xl"
          style={{ transform: `scale(${img1Scale})` }}
        />
        <Img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
          className="w-64 h-64 object-cover rounded-xl shadow-2xl"
          style={{ transform: `scale(${img2Scale})` }}
        />
        <Img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
          className="w-64 h-64 object-cover rounded-xl shadow-2xl"
          style={{ transform: `scale(${img3Scale})` }}
        />
      </div>
    </div>
  );
};
