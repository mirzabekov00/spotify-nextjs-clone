import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songs";
import { useSpotify } from "../../hooks/useSpotify";
import { useSong } from "../../hooks/useSong";

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
      setCurrentTrackId(currentPlayingTrack.body.item?.id || null);

      const currentPlaybackState = await spotifyApi.getMyCurrentPlaybackState();
      setIsPlaying(currentPlaybackState.body.is_playing);
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, session, spotifyApi]);

  return (
    <div className="text-white">
      {/* left */}
      <div>
        <img
          src={songInfo?.album.images[0].url}
          className="hidden md:inline h-10 w-10"
        />
      </div>
    </div>
  );
};

export default Player;
