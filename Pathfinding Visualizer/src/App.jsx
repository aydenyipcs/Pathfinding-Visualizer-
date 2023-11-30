import React, { createContext, useState, useEffect } from "react";
import Grid from "./Grid/Grid";
import NavBar from "./NavBar/NavBar";
import { createBlankGrid } from "./Grid/gridFunctions.jsx";
import "./app.scss";

export const GridContext = createContext();

const App = () => {
  const [startPosition, setStartPosition] = useState([5, 12]); //Default start position
  const [endPosition, setEndPosition] = useState([49, 12]); //Default end position
  const [grid, setGrid] = useState(() => createBlankGrid(startPosition, endPosition)); // Initialize Grid 
  const [pathfindingAnimation, setPathfindingAnimation] = useState(new Set()); //list of cells for animation 1
  const [shortestPathAnimation, setShortestPathAnimation] = useState(new Set());//list of cells for animation 2

  return (
    <GridContext.Provider
      value={{
        grid,
        setGrid,
        startPosition,
        setStartPosition,
        endPosition,
        setEndPosition,
        pathfindingAnimation,
        setPathfindingAnimation,
        shortestPathAnimation,
        setShortestPathAnimation,
      }}
    >
      <div className="mainContainer">
        <NavBar />
        <Grid />
      </div>
    </GridContext.Provider>
  );
};

export default App;
