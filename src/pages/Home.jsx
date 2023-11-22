import React from "react";
import Map from "./Map";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Link
      to="/map"
      className="border p-2 flex justify-center items-center mt-20 "
    >
      <div className="my-0 mx-auto">Start</div>
    </Link>
  );
}

export default Home;
