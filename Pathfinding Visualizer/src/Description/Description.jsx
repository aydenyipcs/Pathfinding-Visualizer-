import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../App.jsx";

const Description = () => {
  const {} = useContext(GridContext);

  return (
    <div>
      <h1>{}</h1>
    </div>
  );
};
