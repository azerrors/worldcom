import React from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";

function About() {
  return (
    <div className="min-h-screen bg-secondary_light dark:bg-secondary_dark">
      <h3 className="pt-10 text-center text-3xl font-semibold uppercase tracking-widest text-primary_light">
        WorldCom
      </h3>
      <div>
        <div className="mt-20 flex px-2 flex-col justify-center gap-10 text-xl md:flex-row ">
          <p className="bg-sky-800  text-sky-300 flex flex-col items-center rounded-md  p-1 md:flex-row">
            <TbTemperatureCelsius className="text-3xl font-semibold" />
            changes temperature fahrengeit to celcius
          </p>
          <p className="bg-sky-800 text-sky-300 flex flex-col items-center rounded-md   p-1 md:flex-row">
            <TbTemperatureFahrenheit className="text-3xl font-semibold" />
            changes temperature celcius to fahrengeit
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row">
          <p className="bg-rose-800 text-rose-300 w-72 rounded-md p-5 text-center">
            If temperature results are not shown, this is probably because low
            internet connection
          </p>
          <p className="bg-emerald-800 text-emerald-300 w-72 rounded-md p-5 text-center">
            If you have trouble scrolling up on the map page, use the edge of
            the map to scroll up
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
