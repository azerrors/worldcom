import React from "react";
import { useWorld } from "../context/WorldContext";

function Search({ input, setInput }) {
  const { searchInput, dispatch } = useWorld();
  return (
    <div className="flex justify-center pt-20">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="px-3 py-1 focus:outline-none rounded-lg"
      />
    </div>
  );
}

export default Search;
