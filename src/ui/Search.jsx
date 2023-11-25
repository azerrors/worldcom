import React from "react";

function Search({ input, setInput }) {
  return (
    <div className="flex justify-center pt-20">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="rounded-lg px-3 py-1 focus:outline-none"
      />
    </div>
  );
}

export default Search;
