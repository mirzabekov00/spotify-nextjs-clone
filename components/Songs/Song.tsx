import React from "react";
import { useSpotify } from "../../hooks/useSpotify";
import { songTime } from "../../lib/helpers/songTime";

interface SongProps {
  track: SpotifyApi.TrackObjectFull;
  order: number;
}

const Song: React.FC<SongProps> = ({ track, order }) => {
  const spotifyApi = useSpotify();

  return (
    <div className="grid grid-cols-2 text-gray-500 py-3 px-4 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4">
        <p>{order}</p>
        <img src={track.album.images[0].url} className="h-10 w-10" />
        <div>
          <p className="w-36 lg:w-64 truncate text-white ">{track.name}</p>
          <p className="w-40">{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40">{track.album.name}</p>
        <p>{songTime(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
