import React from "react";
import { toast } from "react-toastify";

function About() {
  const nofitfy = () => {
    toast.info("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <button onClick={nofitfy} className="mt-20">
      About
    </button>
  );
}

export default About;
