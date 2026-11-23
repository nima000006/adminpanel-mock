import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, KeyboardEvent } from "react";

import {
  Controls,
  FullscreenButton,
  MuteButton,
  PlayButton,
  Poster,
  Time,
  TimeSlider,
  VolumeSlider,
  createPlayer,
} from "@videojs/react";
import { Video, videoFeatures } from "@videojs/react/video";

import "./_videoPlayer.scss";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FiMaximize,
  FiMinimize,
  FiPause,
  FiPlay,
  FiRotateCcw,
  FiRotateCw,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import {
  MdClosedCaption,
  MdClosedCaptionDisabled,
  MdPictureInPicture,
} from "react-icons/md";

type VideoPlayerSource = {
  src: string;
  type?: string;
};

type VideoPlayerTrack = {
  src: string;
  kind?: "subtitles" | "captions" | "chapters" | "metadata";
  label?: string;
  srcLang?: string;
  default?: boolean;
};

type ButtonRenderProps = ComponentPropsWithoutRef<"button">;

type PlayButtonState = {
  ended: boolean;
  paused: boolean;
};

type MuteButtonState = {
  muted: boolean;
};

type FullscreenButtonState = {
  fullscreen: boolean;
};

type VideoPlayerProps = {
  src?: string;
  sources?: VideoPlayerSource[];
  tracks?: VideoPlayerTrack[];
  poster?: string;
  posterAlt?: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  aspectRatio?: string;
  className?: string;
  hotkeys?: boolean;
  hotkeySeekStep?: number;
  hotkeyVolumeStep?: number;
  skipStep?: number;
};

const Player = createPlayer({ features: videoFeatures });

const VideoPlayerContent = ({
  src,
  sources,
  tracks,
  poster,
  posterAlt = "",
  title,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = true,
  preload = "metadata",
  aspectRatio = "16 / 9",
  className = "",
  hotkeys = true,
  hotkeySeekStep = 5,
  hotkeyVolumeStep = 0.05,
  skipStep = 10,
}: VideoPlayerProps) => {
  const resolvedSources = sources?.length ? sources : src ? [{ src }] : [];
  const useSources =
    resolvedSources.length > 1 || resolvedSources.some((source) => source.type);
  const primarySource = resolvedSources[0];
  const hasSource = Boolean(primarySource?.src);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = Player.useMedia() as HTMLVideoElement | null;

  // Subtitle / caption state
  const subtitleTracks =
    tracks?.filter((t) => t.kind === "subtitles" || t.kind === "captions") ?? [];
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(() => {
    const defaultIdx = subtitleTracks.findIndex((t) => t.default);
    return defaultIdx >= 0 ? defaultIdx : null;
  });
  const [showTrackMenu, setShowTrackMenu] = useState(false);
  const trackMenuRef = useRef<HTMLDivElement>(null);

  // Playback rate state
  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const [currentRate, setCurrentRate] = useState(1);
  const [showRateMenu, setShowRateMenu] = useState(false);
  const rateMenuRef = useRef<HTMLDivElement>(null);

  // Buffering state
  const [isBuffering, setIsBuffering] = useState(false);

  // Subtitle cue display
  const [activeCues, setActiveCues] = useState<string[]>([]);

  // Sync native TextTrack mode whenever activeTrackIndex changes
  useEffect(() => {
    const videoEl = media ?? videoRef.current;
    if (!videoEl) return;
    const nativeTracks = videoEl.textTracks;
    for (let i = 0; i < nativeTracks.length; i++) {
      const t = nativeTracks[i];
      if (t.kind === "subtitles" || t.kind === "captions") {
        t.mode = i === activeTrackIndex ? "showing" : "hidden";
      }
    }
  }, [activeTrackIndex, media]);

  // Buffering detection
  useEffect(() => {
    const videoEl = media ?? videoRef.current;
    if (!videoEl) return;
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => setIsBuffering(false);
    const onCanPlay = () => setIsBuffering(false);
    videoEl.addEventListener("waiting", onWaiting);
    videoEl.addEventListener("playing", onPlaying);
    videoEl.addEventListener("canplay", onCanPlay);
    return () => {
      videoEl.removeEventListener("waiting", onWaiting);
      videoEl.removeEventListener("playing", onPlaying);
      videoEl.removeEventListener("canplay", onCanPlay);
    };
  }, [media]);

  // Cue rendering
  useEffect(() => {
    const videoEl = media ?? videoRef.current;
    if (!videoEl || activeTrackIndex === null) {
      setActiveCues([]);
      return;
    }
    const nativeTracks = videoEl.textTracks;
    const track = nativeTracks[activeTrackIndex];
    if (!track) {
      setActiveCues([]);
      return;
    }
    const updateCues = () => {
      const cues = track.activeCues;
      if (!cues) {
        setActiveCues([]);
        return;
      }
      const texts: string[] = [];
      for (const cue of cues) {
        const vttCue = cue as VTTCue;
        texts.push(vttCue.text ?? "");
      }
      setActiveCues(texts);
    };
    track.addEventListener("cuechange", updateCues);
    updateCues();
    return () => track.removeEventListener("cuechange", updateCues);
  }, [activeTrackIndex, media]);

  // Close menus when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (trackMenuRef.current && !trackMenuRef.current.contains(e.target as Node)) {
        setShowTrackMenu(false);
      }
      if (rateMenuRef.current && !rateMenuRef.current.contains(e.target as Node)) {
        setShowRateMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSkipBackward = useCallback(() => {
    if (!media) return;
    media.currentTime = Math.max(0, media.currentTime - skipStep);
  }, [media, skipStep]);

  const handleSkipForward = useCallback(() => {
    if (!media) return;
    media.currentTime = Math.min(
      media.duration || Number.POSITIVE_INFINITY,
      media.currentTime + skipStep
    );
  }, [media, skipStep]);

  const handlePiP = useCallback(async () => {
    const videoEl = media ?? videoRef.current;
    if (!videoEl) return;
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (videoEl.requestPictureInPicture) {
      await videoEl.requestPictureInPicture();
    }
  }, [media]);

  const handleDoubleClick = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (containerRef.current?.requestFullscreen) {
      void containerRef.current.requestFullscreen();
    }
  }, []);

  const handleSetPlaybackRate = useCallback(
    (rate: number) => {
      if (media) {
        media.playbackRate = rate;
        setCurrentRate(rate);
        setShowRateMenu(false);
      }
    },
    [media]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!hotkeys || !media) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"
      )
        return;

      switch (event.key) {
        case " ":
        case "Enter":
        case "k":
        case "K": {
          event.preventDefault();
          if (media.paused) {
            void media.play();
          } else {
            media.pause();
          }
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          media.currentTime = Math.max(0, media.currentTime - hotkeySeekStep);
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          media.currentTime = Math.min(
            media.duration || Number.POSITIVE_INFINITY,
            media.currentTime + hotkeySeekStep
          );
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          media.muted = false;
          media.volume = Math.min(1, media.volume + hotkeyVolumeStep);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          media.muted = false;
          media.volume = Math.max(0, media.volume - hotkeyVolumeStep);
          break;
        }
        case "m":
        case "M": {
          event.preventDefault();
          media.muted = !media.muted;
          break;
        }
        case "f":
        case "F": {
          event.preventDefault();
          if (document.fullscreenElement) {
            void document.exitFullscreen();
          } else if (containerRef.current?.requestFullscreen) {
            void containerRef.current.requestFullscreen();
          }
          break;
        }
        case "c":
        case "C": {
          // Toggle captions: cycle through tracks or turn off
          event.preventDefault();
          if (subtitleTracks.length === 0) break;
          setActiveTrackIndex((prev) => {
            if (prev === null) return 0;
            if (prev >= subtitleTracks.length - 1) return null;
            return prev + 1;
          });
          break;
        }
        case "p":
        case "P": {
          event.preventDefault();
          void handlePiP();
          break;
        }
        default:
          break;
      }
    },
    [hotkeys, hotkeySeekStep, hotkeyVolumeStep, media, subtitleTracks.length, handlePiP]
  );

  const hasSubtitles = subtitleTracks.length > 0;

  return (
    <Player.Container
      className={`video-player ${className}`.trim()}
      style={{ aspectRatio }}
      ref={containerRef}
      tabIndex={0}
      aria-label="پخش کننده ویدیو"
      onKeyDown={handleKeyDown}
    >
      {hasSource ? (
        <Video
          ref={videoRef}
          className="video-player__media"
          onDoubleClick={handleDoubleClick}
          src={useSources ? undefined : primarySource?.src}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
        >
          {useSources
            ? resolvedSources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))
            : null}
          {tracks?.map((track) => (
            <track
              key={`${track.src}-${track.label ?? track.kind ?? "track"}`}
              src={track.src}
              kind={track.kind}
              label={track.label}
              srcLang={track.srcLang}
              default={track.default}
            />
          ))}
        </Video>
      ) : (
        <div className="video-player__placeholder" dir="rtl">
          هیچ منبع ویدیویی ارائه نشده است.
        </div>
      )}

      {poster && hasSource ? (
        <Poster className="video-player__poster" src={poster} alt={posterAlt} />
      ) : null}

      {title ? (
        <div className="video-player__title" dir="rtl">
          {title}
        </div>
      ) : null}

      {/* Buffering spinner */}
      {isBuffering && hasSource && (
        <div className="video-player__buffering">
          <AiOutlineLoading3Quarters className="video-player__spinner" />
        </div>
      )}

      {/* Subtitle cues overlay */}
      {activeCues.length > 0 && activeTrackIndex !== null && (
        <div className="video-player__subtitles" dir="auto">
          {activeCues.map((cue) => (
            <span key={cue} className="video-player__subtitle-cue">
              {cue}
            </span>
          ))}
        </div>
      )}

      {hasSource ? (
        <Controls.Root
          className="video-player__controls"
          dir="ltr"
          onDoubleClick={(e) => e.stopPropagation()}
        >
          <TimeSlider.Root className="video-player__seek" dir="ltr">
            <TimeSlider.Track className="video-player__seek-track">
              <TimeSlider.Buffer className="video-player__seek-buffer" />
              <TimeSlider.Fill className="video-player__seek-fill" />
            </TimeSlider.Track>
            <TimeSlider.Thumb className="video-player__seek-thumb" />
            <TimeSlider.Value type="pointer" className="video-player__seek-value" />
          </TimeSlider.Root>

          <Controls.Group
            className="video-player__controls-row"
            aria-label="Playback controls"
          >
            {/* Play/Pause */}
            <PlayButton
              className="video-player__button cursor-pointer"
              render={(props: ButtonRenderProps, state: PlayButtonState) => (
                <button
                  {...props}
                  title={state.ended ? "بازپخش" : state.paused ? "پخش" : "توقف"}
                >
                  {state.ended ? (
                    <FiRotateCcw />
                  ) : state.paused ? (
                    <FiPlay size="26" />
                  ) : (
                    <FiPause size="26" />
                  )}
                </button>
              )}
            />

            {/* Skip backward */}
            <button
              className="video-player__button video-player__button--icon"
              title={`${skipStep} ثانیه به عقب`}
              onClick={handleSkipBackward}
            >
              <FiRotateCcw size="12" />
              <span className="video-player__skip-label">{skipStep}</span>
            </button>

            {/* Skip forward */}
            <button
              className="video-player__button video-player__button--icon"
              title={`${skipStep} ثانیه به جلو`}
              onClick={handleSkipForward}
            >
              <span className="video-player__skip-label">{skipStep}</span>
              <FiRotateCw size="12" />
            </button>

            {/* Time */}
            <div className="video-player__time">
              <Time.Value type="current" className="video-player__time-value" />
              <span className="video-player__time-separator">/</span>
              <Time.Value type="duration" className="video-player__time-value" />
            </div>

            <div className="video-player__spacer" />

            {/* Mute */}
            <MuteButton
              className="video-player__button"
              render={(props: ButtonRenderProps, state: MuteButtonState) => (
                <button
                  {...props}
                  title={state.muted ? "صدا ندارد" : "صدا"}
                  className="cursor-pointer"
                >
                  {state.muted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
              )}
            />

            {/* Volume slider */}
            <VolumeSlider.Root className="video-player__volume" dir="ltr">
              <VolumeSlider.Track className="video-player__volume-track">
                <VolumeSlider.Fill className="video-player__volume-fill" />
              </VolumeSlider.Track>
              <VolumeSlider.Thumb className="video-player__volume-thumb" />
              <VolumeSlider.Value type="pointer" className="video-player__volume-value" />
            </VolumeSlider.Root>

            {/* Playback rate dropdown */}
            <div className="video-player__rate-wrapper" ref={rateMenuRef}>
              <button
                className="video-player__button video-player__button--icon"
                title="سرعت پخش"
                onClick={() => setShowRateMenu((v) => !v)}
                aria-expanded={showRateMenu}
                aria-haspopup="listbox"
              >
                {currentRate}&times;
              </button>
              {showRateMenu && (
                <div className="video-player__rate-menu" role="listbox" dir="rtl">
                  {playbackRates.map((rate) => (
                    <button
                      key={rate}
                      className={[
                        "video-player__rate-option",
                        currentRate === rate ? "video-player__rate-option--active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      role="option"
                      aria-selected={currentRate === rate}
                      onClick={() => handleSetPlaybackRate(rate)}
                    >
                      {rate}&times;
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subtitle selector */}
            {hasSubtitles && (
              <div className="video-player__subtitle-wrapper" ref={trackMenuRef}>
                <button
                  className="video-player__button video-player__button--icon"
                  title="زیرنویس"
                  onClick={() => setShowTrackMenu((v) => !v)}
                  aria-expanded={showTrackMenu}
                  aria-haspopup="listbox"
                >
                  {activeTrackIndex !== null ? (
                    <MdClosedCaption />
                  ) : (
                    <MdClosedCaptionDisabled />
                  )}
                </button>
                {showTrackMenu && (
                  <div className="video-player__track-menu" role="listbox" dir="rtl">
                    <button
                      className={[
                        "video-player__track-option",
                        activeTrackIndex === null
                          ? "video-player__track-option--active"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      role="option"
                      aria-selected={activeTrackIndex === null}
                      onClick={() => {
                        setActiveTrackIndex(null);
                        setShowTrackMenu(false);
                      }}
                    >
                      خاموش
                    </button>
                    {subtitleTracks.map((t, i) => (
                      <button
                        key={t.src}
                        className={[
                          "video-player__track-option",
                          activeTrackIndex === i
                            ? "video-player__track-option--active"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        role="option"
                        aria-selected={activeTrackIndex === i}
                        onClick={() => {
                          setActiveTrackIndex(i);
                          setShowTrackMenu(false);
                        }}
                      >
                        {t.label ?? t.srcLang ?? `Track ${i + 1}`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Picture-in-Picture */}
            {"pictureInPictureEnabled" in document && (
              <button
                className="video-player__button video-player__button--icon"
                title="تصویر در تصویر (P)"
                onClick={() => void handlePiP()}
              >
                <MdPictureInPicture />
              </button>
            )}

            {/* Fullscreen */}
            <FullscreenButton
              className="video-player__button cursor-pointer"
              render={(props: ButtonRenderProps, state: FullscreenButtonState) => (
                <button
                  {...props}
                  title={state.fullscreen ? "خروج تمام صفحه" : "تمام صفحه (F)"}
                >
                  {state.fullscreen ? <FiMinimize /> : <FiMaximize />}
                </button>
              )}
            />
          </Controls.Group>
        </Controls.Root>
      ) : null}
    </Player.Container>
  );
};

const VideoPlayer = (props: VideoPlayerProps) => {
  return (
    <Player.Provider>
      <VideoPlayerContent {...props} />
    </Player.Provider>
  );
};

export default VideoPlayer;
export type { VideoPlayerProps, VideoPlayerSource, VideoPlayerTrack };
