import { DateTime } from "luxon";

export const formatToLocalTime = (
  sec,
  zone,
  format = "cccc, dd LL yyyy' | Local Time : 'hh:mm a"
) => DateTime.fromSeconds(sec).setZone(zone).toFormat(format);
