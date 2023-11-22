import { Link } from "react-router-dom";
import Theme from "./Theme";
import { useWorld } from "../context/WorldContext";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";

function Navbar() {
  const { dispatch, temp } = useWorld();
  const linkStyle =
    "hover:bg-secondary_light hover:dark:bg-secondary_dark bg:hover:text-primary_dark hover:skew-x-3  hover:text-primary_light p-2 transition-all  hover:active:translate-y-2 hover:-translate-y-1 hover:scale-[1.01] rounded-md duration-400";
  return (
    <div className="flex  justify-between items-center dark:bg-primary_dark dark:text-primary_light text-secondary_light bg-primary_light p-5">
      <Link to="/">
        <img src="icon.png" className="h-16 pt-2 scale-[3] " alt="" />
      </Link>
      <div className="flex items-center gap-5 justify-center">
        <ul className="hidden md:flex gap-4 items-center uppercase tracking-widest font-semibold">
          <span onClick={() => dispatch({ type: "temp" })} className={`${linkStyle} md:text-3xl cursor-pointer`}>
            {temp ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />}
          </span>

          <Link to="/map" className={linkStyle}>
            Map
          </Link>
          <Link to="/weather" className={linkStyle}>
            Weather
          </Link>
          <Link to="/about" className={linkStyle}>
            About
          </Link>
        </ul>
        <div className="-mt-6">
          <Theme />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
