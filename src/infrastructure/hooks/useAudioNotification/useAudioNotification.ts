import { useCallback, useRef } from "react";

type AudioType = "success" | "error";

interface AudioConfig {
  volume?: number;
  preload?: boolean;
}

/**
 * Hook to play audio notifications for success/error states
 * Audio files should be placed in /public/audio/
 *
 * @example
 * const { playSuccess, playError } = useAudioNotification();
 * playSuccess();
 * playError();
 */
export const useAudioNotification = (config: AudioConfig = {}) => {
  const { volume = 0.5, preload = true } = config;

  const audioRefsRef = useRef<Record<AudioType, HTMLAudioElement | null>>({
    success: null,
    error: null,
  });

  // Initialize audio elements on first use
  const initializeAudio = useCallback(
    (type: AudioType) => {
      if (audioRefsRef.current[type]) return;

      const audio = new Audio(`/audio/${type}.mp3`);
      audio.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0-1
      audio.preload = preload ? "auto" : "none";

      audioRefsRef.current[type] = audio;
    },
    [volume, preload]
  );

  const playAudio = useCallback(
    (type: AudioType) => {
      try {
        initializeAudio(type);
        const audio = audioRefsRef.current[type];

        if (audio) {
          // Reset to beginning
          audio.currentTime = 0;
          // Play with error handling
          const playPromise = audio.play();
          playPromise?.catch((error) => {
            console.warn(`Failed to play ${type} audio:`, error);
          });
        }
      } catch (error) {
        console.warn(`Error playing ${type} audio:`, error);
      }
    },
    [initializeAudio]
  );

  const playSuccess = useCallback(() => playAudio("success"), [playAudio]);
  const playError = useCallback(() => playAudio("error"), [playAudio]);

  return { playSuccess, playError };
};
