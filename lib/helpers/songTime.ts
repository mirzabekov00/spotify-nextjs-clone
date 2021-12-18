import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export const songTime = (ms: number): string => {
  dayjs.extend(duration);

  return dayjs.duration(ms, "ms").format("mm:ss");
};
