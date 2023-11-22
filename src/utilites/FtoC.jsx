import React from "react";

function FtoC({ fahrenheit }) {
  const newNumber = Math.floor(fahrenheit);
  console.log(newNumber);
  return <div>
	{Math.floor(((newNumber - 32) * 5) / 9)}
	<span>C</span>
  </div>;
}

export default FtoC;
