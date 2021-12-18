import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../../atoms/playlist";
import Song from "./Song";

interface SongsProps {}

const Songs: React.FC<SongsProps> = ({}) => {
  const playlists = useRecoilValue(playlistState);

  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {playlists?.tracks.items.map(({ track }, index) => (
        <Song key={track.id} track={track} order={index + 1} />
      ))}
    </div>
  );
};

export default Songs;
