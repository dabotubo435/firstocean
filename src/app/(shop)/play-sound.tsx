"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useState } from "react";
import useSound from "use-sound";

export function PlaySound() {
  const [play, { pause }] = useSound("/audio/ocean.mp3");
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (!playing) play();
    else pause();
    setPlaying(!playing);
  };

  return (
    <button
      onClick={handlePlay}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full p-4 border border-zinc-200/20 hover:border-zinc-200/40 bg-white/20 backdrop-blur-sm text-white/70 hover:text-white hover:scale-105 transition duration-300"
    >
      {playing ? (
        <PauseIcon className="size-5" />
      ) : (
        <PlayIcon className="size-5" />
      )}
    </button>
  );
}
