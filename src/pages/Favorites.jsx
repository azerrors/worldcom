import { useWorld } from "../context/WorldContext";
import { PiEyeClosed } from "react-icons/pi";

import FavElement from "../ui/FavElement";

function Favorites() {
  const { favorites, dispatch } = useWorld();
  return (
    <div className="overflow-auto scrollclass bg-secondary_light text-primary_light  dark:bg-secondary_dark mb-10  md:h-[60rem] min-h-[23rem] md:w-[50%]">
      <div className="flex justify-end">
        <PiEyeClosed
          className="text-3xl cursor-pointer"
          onClick={() => dispatch({ type: "showFav" })}
        />
      </div>
      <h1 className="mt-10 animate-moveInTop text-center text-3xl font-semibold uppercase tracking-widest">
        Favorites
      </h1>
      <div className="mx-2 animate-moveInBottom mt-5 flex flex-wrap justify-center gap-3">
        {favorites?.map((fav) => {
          return <FavElement key={fav.latitude} data={fav} />;
        })}
      </div>
    </div>
  );
}

export default Favorites;
