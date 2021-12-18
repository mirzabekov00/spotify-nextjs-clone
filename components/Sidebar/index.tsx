import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  RssIcon,
  HeartIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import SidebarButton from "./SidebarButton";
import { signOut, useSession } from "next-auth/react";
import { useSpotify } from "../../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlist";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [playlistId, setPlaylistId] = useRecoilState<string>(playlistIdState);

  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user.accessToken) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items));
    }
  }, [session, spotifyApi]);

  return (
    <aside className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg: max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <SidebarButton icon={<HomeIcon className="w-5 h-5" />} label="Home" />
        <SidebarButton
          icon={<SearchIcon className="w-5 h-5" />}
          label="Search"
        />
        <SidebarButton
          icon={<LibraryIcon className="w-5 h-5" />}
          label="Your Library"
        />
        <hr className="border-t-[0.1px] border-gray-900" />
        <SidebarButton
          icon={<PlusCircleIcon className="w-5 h-5" />}
          label="Create Playlist"
        />
        <SidebarButton
          icon={<HeartIcon className="w-5 h-5" />}
          label="Liked Songs"
        />
        <SidebarButton
          icon={<RssIcon className="w-5 h-5" />}
          label="Your episodes"
        />
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map(({ id, name }) => (
          <p
            onClick={() => setPlaylistId(id)}
            key={id}
            className="cursor-pointer hover:text-white"
          >
            {name}
          </p>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
