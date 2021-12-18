import { atom } from "recoil";

export const currentTrackIdState = atom<null | string>({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
