import React from "react";
import { useWorld } from "../context/WorldContext";
import Message from "../ui/Message";

function Favorite() {
  const {favorites} = useWorld()
  console.log(favorites)



  return (
    <div className="bg-secondary_light min-h-screen dark:bg-secondary_dark">
      <Message type="secondary">Your Favourite Places</Message>
    </div>
  );
}

export default Favorite;
