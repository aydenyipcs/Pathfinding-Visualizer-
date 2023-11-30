import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../App.jsx";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem, MenuList } from "@mui/material";
import dijkstra from "../Algorithms/Dijkstra";
import aStar from "../Algorithms/AStar.jsx";
import greedy from "../Algorithms/Greedy.jsx";
import bfs from "../Algorithms/bfs.jsx";
import dfs from "../Algorithms/DFS.jsx";
import "./navBar.scss";
import { createBlankGrid } from "../Grid/gridFunctions.jsx";
import { getShortestPath, animateAlgo } from "../Algorithms/algoFunctions.jsx";

const NavBar = () => {
  const {
    grid,
    setGrid,
    startPosition,
    endPosition,
    setPathfindingAnimation,
    setShortestPathAnimation,
  } = useContext(GridContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const clearGrid = () => {
    setGrid(createBlankGrid(startPosition, endPosition));
    setPathfindingAnimation(new Set());
    setShortestPathAnimation(new Set());
  };

  const algos = {
    "Dijkstra's Algorithm": dijkstra,
    "A* Search": aStar,
    "Greedy Best-First Search": greedy,
    "Breath-first Search": bfs,
    "Depth-first Search": dfs
  };
  const runAlgo = (algo) => {
    const startCell = grid[startPosition[0]][startPosition[1]];
    const endCell = grid[endPosition[0]][endPosition[1]];
    const allCellsInOrder = algos[algo](grid, startCell, endCell);
    const shortestPath = getShortestPath(
      allCellsInOrder[allCellsInOrder.length - 1]
    );
    animateAlgo(
      allCellsInOrder,
      shortestPath,
      setPathfindingAnimation,
      setShortestPathAnimation
    );
  };

  return (
    <AppBar position="static" id="navbar">
      <Toolbar>
        <h1>Pathfinding Visualizer</h1>
        <h3></h3>
        <Button
          id="algo-dropdown"
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon aria-haspopup="true" />}
        >
          Visualize
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {Object.entries(algos).map(([name]) => (
            <MenuItem key={name} onClick={() => runAlgo(name)}>
              {name}
            </MenuItem>
          ))}
        </Menu>
        <Button onClick={clearGrid}>Clear Grid</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
