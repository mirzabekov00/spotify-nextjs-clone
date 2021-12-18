import React from "react";
import { useSpotify } from "../../hooks/useSpotify";

interface SongProps {
  track: SpotifyApi.TrackObjectFull;
  order: number;
}

const Song: React.FC<SongProps> = ({ track, order }) => {
  const spotifyApi = useSpotify();

  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p>{order}</p>
        <img src={track.album.images[0].url} className="h-10 w-10" />
        <div>
          <p>{track.name}</p>
          <p>{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.album.name}</p>
        <p>duration</p>
      </div>
    </div>
  );
};

export default Song;
