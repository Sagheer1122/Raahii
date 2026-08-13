"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Radio } from "lucide-react";
import { PLAYLIST_ID } from "@/data/playlist";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export const MusicPlayer: React.FC = () => {
  const [player, setPlayer] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [trackTitle, setTrackTitle] = useState<string>("Mountain Sunset Radio");
  const [artistName, setArtistName] = useState<string>("Chill Acoustic Stream");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(85);
  const [isMuted, setIsMuted] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize YouTube IFrame API with Playlist PLQYsTyb791DyCeqmDEdiN_Dgs-ptnev35
  useEffect(() => {
    const loadYoutubeApi = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      const existingScript = document.getElementById("yt-iframe-api");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    };

    const initPlayer = () => {
      try {
        new window.YT.Player("yt-player", {
          height: "1",
          width: "1",
          playerVars: {
            listType: "playlist",
            list: PLAYLIST_ID,
            autoplay: 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            origin: typeof window !== "undefined" ? window.location.origin : "",
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
              setIsReady(true);
              event.target.setVolume(85);
              updateTrackInfo(event.target);
            },
            onStateChange: (event: any) => {
              if (event.data === 1) {
                setIsPlaying(true);
                setHasStarted(true);
                updateTrackInfo(event.target);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                event.target.nextVideo();
              }
            },
            onError: (event: any) => {
              console.warn("YouTube player error, skipping track:", event.data);
              if (event.target && typeof event.target.nextVideo === "function") {
                event.target.nextVideo();
              }
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize YT Player:", err);
      }
    };

    loadYoutubeApi();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Dynamically fetch exact video title & author from YouTube
  const updateTrackInfo = (ytPlayer: any) => {
    try {
      if (ytPlayer && typeof ytPlayer.getVideoData === "function") {
        const videoData = ytPlayer.getVideoData();
        if (videoData) {
          if (videoData.title) {
            setTrackTitle(videoData.title);
          }
          if (videoData.author) {
            setArtistName(videoData.author);
          }
        }
      }
    } catch (e) {
      // ignore
    }
  };

  // Poll progress and live track details every 400ms
  useEffect(() => {
    if (isPlaying && player) {
      intervalRef.current = setInterval(() => {
        try {
          if (typeof player.getCurrentTime === "function") {
            setCurrentTime(player.getCurrentTime() || 0);
          }
          if (typeof player.getDuration === "function") {
            setDuration(player.getDuration() || 0);
          }
          updateTrackInfo(player);
        } catch (e) {
          // ignore
        }
      }, 400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, player]);

  // Controls
  const togglePlay = useCallback(() => {
    if (!player || !isReady) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
      setHasStarted(true);
    }
  }, [player, isReady, isPlaying]);

  const handleNext = useCallback(() => {
    if (player && typeof player.nextVideo === "function") {
      player.nextVideo();
      setHasStarted(true);
    }
  }, [player]);

  const handlePrev = useCallback(() => {
    if (player && typeof player.previousVideo === "function") {
      player.previousVideo();
      setHasStarted(true);
    }
  }, [player]);

  const toggleMute = useCallback(() => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  }, [player, isMuted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolumeState(val);
    if (player && typeof player.setVolume === "function") {
      player.setVolume(val);
      if (val === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        player.unMute();
        setIsMuted(false);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !player || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const seekTime = percentage * duration;
    setCurrentTime(seekTime);
    if (typeof player.seekTo === "function") {
      player.seekTo(seekTime, true);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight" || e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft" || e.key.toLowerCase() === "p") {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, handleNext, handlePrev, toggleMute]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <>
      {/* Hidden YouTube IFrame API Element */}
      <div id="yt-player" className="absolute w-px h-px opacity-0 pointer-events-none left-0 top-0" />

      {/* Floating Bottom Deluxe Glass Player */}
      <div className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-auto flex justify-center">
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl rounded-full bg-[#21130D]/85 backdrop-blur-2xl border border-[#B98558]/45 p-2 sm:p-2.5 shadow-[0_12px_60px_rgba(0,0,0,0.75),0_0_35px_rgba(185,133,88,0.25)] flex flex-col gap-1.5 relative overflow-hidden group"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#B98558]/20 blur-2xl rounded-full pointer-events-none" />

          {/* Main Controls Row */}
          <div className="flex items-center justify-between gap-3 px-2">
            {/* Spinning Vinyl Record & Track Title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Vinyl Record */}
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full bg-gradient-to-tr from-[#150B07] via-[#2D1B13] to-[#150B07] border-2 border-[#B98558]/50 flex items-center justify-center shadow-lg relative overflow-hidden"
                >
                  <div className="absolute inset-1 rounded-full border border-[#B98558]/20" />
                  <div className="absolute inset-2.5 rounded-full border border-[#B98558]/15" />
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#B98558] border border-[#F5EBDD] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#21130D]" />
                  </div>
                </motion.div>
              </div>

              {/* Title & Artist */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#B98558] tracking-widest uppercase font-semibold flex items-center gap-1">
                    <Radio className="w-3 h-3 text-[#B98558] animate-pulse" />
                    <span>NOW PLAYING</span>
                  </span>

                  {/* Audio Equalizer Waveform Bars when playing */}
                  {isPlaying && (
                    <div className="flex items-end gap-0.5 h-3">
                      <motion.div
                        animate={{ height: ["20%", "100%", "40%"] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="w-0.5 bg-[#B98558] rounded-full"
                      />
                      <motion.div
                        animate={{ height: ["80%", "30%", "90%"] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.1 }}
                        className="w-0.5 bg-[#F5EBDD] rounded-full"
                      />
                      <motion.div
                        animate={{ height: ["40%", "90%", "20%"] }}
                        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                        className="w-0.5 bg-[#B98558] rounded-full"
                      />
                    </div>
                  )}
                </div>

                <p className="font-serif italic text-xs sm:text-sm text-[#F5EBDD] truncate leading-tight font-light pt-0.5">
                  {trackTitle}
                </p>
                <p className="font-sans text-[10px] sm:text-[11px] text-[#D6BFA5]/80 truncate leading-none font-medium">
                  {artistName}
                </p>
              </div>
            </div>

            {/* Center Controls (Prev, Play/Pause, Next) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous track"
                className="p-1.5 sm:p-2 rounded-full text-[#D6BFA5] hover:text-[#FFF7EC] hover:bg-[#3B2418]/60 transition-colors cursor-pointer"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                className="relative group/btn p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-[#B98558] to-[#9A6F4F] text-[#FFF7EC] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#B98558]/30 cursor-pointer"
              >
                {!hasStarted && (
                  <span className="absolute inset-0 rounded-full bg-[#B98558] animate-ping opacity-30" />
                )}
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current relative z-10" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5 relative z-10" />
                )}
              </button>

              <button
                onClick={handleNext}
                aria-label="Next track"
                className="p-1.5 sm:p-2 rounded-full text-[#D6BFA5] hover:text-[#FFF7EC] hover:bg-[#3B2418]/60 transition-colors cursor-pointer"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>
            </div>

            {/* Volume Control (Desktop) */}
            <div className="hidden md:flex items-center gap-2 w-28 flex-shrink-0 pl-1">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute music" : "Mute music"}
                className="text-[#D6BFA5] hover:text-[#FFF7EC] transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#3B2418] accent-[#B98558] rounded-lg cursor-pointer"
                aria-label="Volume slider"
              />
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="flex items-center gap-2.5 px-3">
            <span className="font-mono text-[9px] text-[#D6BFA5]/80 w-7 text-right select-none">
              {formatTime(currentTime)}
            </span>
            <div
              ref={progressBarRef}
              onClick={handleSeek}
              className="flex-1 h-1 rounded-full bg-[#3B2418]/80 hover:h-1.5 transition-all cursor-pointer relative overflow-hidden group"
            >
              <div
                className="h-full bg-gradient-to-r from-[#9A6F4F] via-[#B98558] to-[#F5EBDD] rounded-full transition-all duration-150 shadow-[0_0_8px_rgba(185,133,88,0.8)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-[#D6BFA5]/80 w-7 text-left select-none">
              {formatTime(duration)}
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
};
