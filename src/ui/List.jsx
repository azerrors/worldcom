import React from "react";
import ListElement from "./ListElement";

function List({ type, data }) {
  if (type === "placeinfo" && data) {
	console.log(data)
    
    return (
      <div>
       
      </div>
    );
  }
}

export default List;
