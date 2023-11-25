import { Link, useNavigate } from "react-router-dom";

import { GiWorld } from "react-icons/gi";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

import { useWorld } from "../context/WorldContext";

import Button from "../ui/Button";

function Home() {
  //context api
  const { show } = useWorld();
  
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-secondary_light dark:bg-secondary_dark">
      <h3 className="animate-moveInTop pt-20 text-center text-xl font-semibold uppercase tracking-widest text-primary_light md:text-3xl">
        Hello , stranger
      </h3>
      <h3 className="animate-moveInTop pt-5 text-center text-xl font-semibold uppercase tracking-widest text-primary_light/50 md:text-2xl">
        Welcome to worldcom app
      </h3>

      <div className="flex flex-col-reverse items-center justify-center px-5 text-primary_light md:flex-row md:justify-around">
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
              <Link to="https://github.com/azerrors">
                <FaGithub />
              </Link>
              <Link to="https://www.linkedin.com/in/azer-nagiyev-a1b85a247/">
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
        <div
          className={` md:mt-32 ${
            show ? "z-[-1000]" : ""
          } my-16 text-[10rem] md:text-[20rem] `}
        >
          <GiWorld className="animate-rotate" />
        </div>
      </div>
    </div>
  );
}

export default Home;
