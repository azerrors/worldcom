import React from "react";
import { GiWorld } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { useWorld } from "../context/WorldContext";

function Home() {
  const navigate = useNavigate();
  const {show} = useWorld()
  return (
    <div className="min-h-screen bg-secondary_light dark:bg-secondary_dark">
      <h3 className="animate-moveInTop pt-20 text-center text-xl md:text-3xl font-semibold uppercase tracking-widest text-primary_light">
        Hello , stranger
      </h3>
      <h3 className="animate-moveInTop pt-5 text-center text-xl md:text-2xl font-semibold uppercase tracking-widest text-primary_light/50">
        Welcome to worldcom app
      </h3>

      <div className="flex flex-col-reverse md:flex-row justify-center items-center md:justify-around px-5 text-primary_light">
        <div className="mt-30">
          <h4 className=" animate-moveInLeft text-xl capitalize">
            First check the{" "}
            <Link to="/about" className="font-semibold underline">
              about
            </Link>{" "}
            section to get information about the app
          </h4>
          <div className="mt-20 flex animate-moveInBottom justify-end">
            <div className="mr-5 flex items-center justify-center gap-5 text-3xl">
              <Link>
                <FaGithub />
              </Link>
              <Link>
                <FaLinkedin />
              </Link>
            </div>
            <div className="">
              <Button type="weather" onClick={() => navigate("/map")}>
                Let`s get started
              </Button>
            </div>
          </div>
        </div>
        <div className={` md:mt-32 ${show ? "z-[-1000]" : ""} my-16 text-[10rem] md:text-[20rem] `}>
          <GiWorld  className="animate-rotate"/>
        </div>
      </div>
    </div>
  );
}

export default Home;
