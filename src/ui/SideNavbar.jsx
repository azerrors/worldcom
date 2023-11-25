import React from "react";
import { useWorld } from "../context/WorldContext";
import { Link } from "react-router-dom";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

function SideNavbar() {
  //context api
  const { show, temp, dispatch } = useWorld();

  //to state show state show to !show
  const handleClick = () => {
    dispatch({ type: "show" });
  };

  //notifcation state show to !show and temp to !temp
  const handleClickAndDispatch = () => {
    toast.info(
      `${
        !temp
          ? "Temperature Changed to Fahranheit"
          : "Temperature Changed to Celcius"
      }`,
      {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      },
    );
    dispatch({ type: "temp" });
    dispatch({ type: "show" });
  };

  //styles
  const linkStyle =
    "hover:bg-secondary_light hover:dark:bg-secondary_dark text-xl bg:hover:text-primary_dark hover:skew-x-3  hover:text-primary_light p-2 transition-all  hover:active:translate-y-2 hover:-translate-y-1 hover:scale-[1.01] rounded-md duration-400";
    
  return (
    <div
      className={`absolute h-full transform border bg-secondary_light dark:bg-secondary_dark ${
        !show ? "hidden -translate-x-full opacity-0" : "translate-x-0"
      } h-screen w-56 transition-transform duration-700`}
    >
      <div className="text-primary_light ">
        <IoClose className="ml-48 text-3xl" onClick={handleClick} />
        <ul className="mt-28 flex flex-col items-center divide-y-2 font-semibold uppercase tracking-widest">
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
            className={`bg:hover:text-primary_dark duration-400 mt-10 cursor-pointer  rounded-md p-2 text-3xl  transition-all hover:-translate-y-1 hover:skew-x-3 hover:scale-[1.01] hover:bg-secondary_light hover:text-primary_light hover:active:translate-y-2 hover:dark:bg-secondary_dark`}
          >
            {temp ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />}
          </span>
        </ul>
        <div className="mt-20 flex items-center justify-center gap-5 text-3xl">
          <Link to="https://github.com/azerrors">
            <FaGithub />
          </Link>
          <Link to="https://www.linkedin.com/in/azer-nagiyev-a1b85a247/">
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
