import { Link } from "react-router-dom";
import Theme from "./Theme";
import { useWorld } from "../context/WorldContext";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { CgDetailsMore } from "react-icons/cg";
import { toast } from "react-toastify";

function Navbar() {
  const { dispatch, temp, show } = useWorld();
  const linkStyle =
    "hover:bg-secondary_light hover:dark:bg-secondary_dark bg:hover:text-primary_dark hover:skew-x-3  hover:text-primary_light p-2 transition-all  hover:active:translate-y-2 hover:-translate-y-1 hover:scale-[1.01] rounded-md duration-400";
  const handleClick = () => {
    dispatch({ type: "show" });
  };

  const handleToast = () => {
    dispatch({ type: "temp" });
    toast.info(
      `${
        !temp
          ? "Temperature Changed to Fahranheit"
          : "Temperature Changed to Celcius"
      }`,
      {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      },
    );
  };

  return (
    <div className="flex  items-center justify-between bg-primary_light p-5 text-secondary_light dark:bg-primary_dark dark:text-primary_light">
      <Link to="/">
        <img
          src="icon.png"
          className={`h-16 ${
            show ? "ml-16 " : ""
          } scale-[3] pt-2  transition-all duration-500 `}
          alt=""
        />
      </Link>
      <div className="flex items-center justify-center gap-5">
        <ul className="hidden items-center gap-4 font-semibold uppercase tracking-widest md:flex">
          <span
            onClick={handleToast}
            className={`${linkStyle} cursor-pointer md:text-3xl`}
          >
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
        <CgDetailsMore className="text-3xl md:hidden " onClick={handleClick} />
        <div className="-mt-6">
          <Theme />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
