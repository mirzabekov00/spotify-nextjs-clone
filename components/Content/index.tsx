import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import shuffle from "lodash.shuffle";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../../atoms/playlist";
import { useSpotify } from "../../hooks/useSpotify";
import Songs from "../Songs";

interface ContentProps {}

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Content: React.FC<ContentProps> = ({}) => {
  const [color, setColor] = useState<string | null>(null);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const playlistId = useRecoilValue(playlistIdState);

  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const imageSrc = session?.user.image || "https://i.imgur.com/WcGB2ev.jpg";
  const username = session?.user.name || "default alt";

  useEffect(() => {
    const initialColor = shuffle(colors).pop() || null;
    setColor(initialColor);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body);
    });
  }, [session, spotifyApi, playlistId]);

  const playlistImage = playlist?.images[0].url;

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      {session?.user && (
        <header className="absolute top-5 right-8">
          <div
            className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
            onClick={() => signOut()}
          >
            <img
              src={imageSrc}
              alt={username}
              className="rounded-full w-10 h-10"
            />
            <h2>{username}</h2>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </header>
      )}

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {playlistImage && (
          <img src={playlistImage} className="h-44 w-44 shadow-2xl " />
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Content;
