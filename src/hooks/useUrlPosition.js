import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line import/prefer-default-export
export function useUrlPosition() {
  const [searchParams] = useSearchParams();

  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  return [lat, lng];
}
