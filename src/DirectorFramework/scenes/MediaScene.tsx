import React from 'react';
import { AbsoluteFill, Img, Video } from 'remotion';
import { MediaSceneData } from '../schema';
import { AnimatedText } from '../components/AnimatedText';

export const MediaScene: React.FC<{ data: MediaSceneData }> = ({ data }) => {
  const {
    mediaUrl,
    mediaType,
    overlayText,
    overlayAnimation = 'fade-up',
  } = data;

  return (
    <AbsoluteFill className="bg-black">
      {mediaType === 'image' ? (
        <Img src={mediaUrl} className="w-full h-full opacity-80" style={{ objectFit: 'cover' }} />
      ) : (
        <Video src={mediaUrl} className="w-full h-full opacity-80" style={{ objectFit: 'cover' }} loop muted />
      )}

      {overlayText && (
        <AbsoluteFill className="flex flex-col items-center justify-center p-8 bg-black/40">
          <AnimatedText
            text={overlayText}
            animationStyle={overlayAnimation}
            className="text-6xl font-bold text-white text-center drop-shadow-xl"
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
