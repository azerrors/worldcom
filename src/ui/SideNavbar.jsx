import React from "react";
import { useWorld } from "../context/WorldContext";
import { Link } from "react-router-dom";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function SideNavbar() {
  const { show, temp, dispatch } = useWorld();
  const handleClick = () => {
    dispatch({ type: "show" });
  };
  const handleClickAndDispatch = () => {
    dispatch({ type: "temp" });
    dispatch({ type: "show" });
  };

  const linkStyle =
    "hover:bg-secondary_light hover:dark:bg-secondary_dark text-xl bg:hover:text-primary_dark hover:skew-x-3  hover:text-primary_light p-2 transition-all  hover:active:translate-y-2 hover:-translate-y-1 hover:scale-[1.01] rounded-md duration-400";
  return (
    <div
      className={`absolute border bg-secondary_light h-full dark:bg-secondary_dark transform ${
        !show ? "-translate-x-full opacity-0 hidden" : "translate-x-0"
      } transition-transform duration-700 h-screen w-56`}
    >
      <div className="text-primary_light ">
        <IoClose className="text-3xl ml-48" onClick={handleClick} />
        <ul className="flex flex-col divide-y-2 items-center mt-28 uppercase tracking-widest font-semibold">
          <Link to="/" onClick={handleClick} className={linkStyle}>
            Home
          </Link>
          <Link to="/weather" onClick={handleClick} className={linkStyle}>
            Weather
          </Link>
          <Link to="/map" onClick={handleClick} className={linkStyle}>
            Map
          </Link>
          <Link to="/about" onClick={handleClick} className={linkStyle}>
            About
          </Link>

          <span
            onClick={handleClickAndDispatch}
            className={`hover:bg-secondary_light hover:dark:bg-secondary_dark bg:hover:text-primary_dark hover:skew-x-3  hover:text-primary_light p-2 transition-all  hover:active:translate-y-2 hover:-translate-y-1 hover:scale-[1.01] rounded-md duration-400 mt-10 text-3xl cursor-pointer`}
          >
            {temp ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />}
          </span>
        </ul>
        <div className="flex mt-20 text-3xl gap-5 justify-center items-center">
          <Link>
            <FaGithub />
          </Link>
          <Link>
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
