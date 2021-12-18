import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songs";
import { useSpotify } from "../../hooks/useSpotify";
import { useSong } from "../../hooks/useSong";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import get from "lodash.get";
import debounce from "lodash.debounce";

interface PlayerProps {}

const Player: React.FC<PlayerProps> = ({}) => {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [volume, setVolume] = useState(50);

  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const songInfo = useSong();

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      const currentPlayingTrack = await spotifyApi.getMyCurrentPlayingTrack();
      const currentPlayingTrackId = get(
        currentPlayingTrack,
        "body.item.id",
        null
      );
      setCurrentTrackId(currentPlayingTrackId);

      const currentPlaybackState = await spotifyApi.getMyCurrentPlaybackState();
      const isPlayingPlaybackState = get(
        currentPlaybackState,
        "body.is_playing",
        false
      );
      setIsPlaying(isPlayingPlaybackState);
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, session, spotifyApi]);

  const handlePlayPause = async () => {
    const currentPlaybackState = await spotifyApi.getMyCurrentPlaybackState();
    if (currentPlaybackState.body?.is_playing) {
      spotifyApi.pause();
      setIsPlaying(false);
    } else {
      spotifyApi.play();
      setIsPlaying(true);
    }
  };

  const updateVolume = useCallback(
    debounce((volume: number) => {
      spotifyApi.setVolume(volume);
    }, 300),
    []
  );

  useEffect(() => {
    updateVolume(volume);
  }, [volume]);

  const handleUpVolume = () => {
    const nextVolume = volume + 10;
    if (nextVolume < 100) {
      setVolume(nextVolume);
    } else {
      setVolume(100);
    }
  };

  const handleDownVolume = () => {
    const nextVolume = volume - 10;
    if (nextVolume > 0) {
      setVolume(nextVolume);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-gray-500 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img src={songInfo?.album.images[0].url} className="h-10 w-10" />
        <div>
          <h3 className="text-white">{songInfo?.name}</h3>
          <p>{songInfo?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <VolumeDownIcon onClick={handleDownVolume} className="button" />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
          className="w-20 md:w-28"
        />
        <VolumeUpIcon onClick={handleUpVolume} className="button" />
      </div>
    </div>
  );
};

export default Player;
