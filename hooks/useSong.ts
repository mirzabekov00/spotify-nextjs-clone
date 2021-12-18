import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songs";
import { useSpotify } from "./useSpotify";

export const useSong = () => {
  const spotifyApi = useSpotify();
  const [songInfo, setSongInfo] =
    useState<null | SpotifyApi.SingleTrackResponse>(null);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const { body } = await spotifyApi.getTrack(currentTrackId);
        setSongInfo(body);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};
