import { useState, useContext } from "react";
import { GridContext } from "../App.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem } from "@mui/material";
import "./navBar.scss";
import {
  createBlankGrid,
  clearPath,
  start,
  end,
} from "../Grid/gridFunctions.jsx";
import { getShortestPath, animateAlgo } from "../Algorithms/algoFunctions.jsx";
import { algos, descriptions, mazes, speeds } from "../utils.jsx";
import { animateMaze } from "../Mazes/mazeFunctions.jsx";

const NavBar = () => {
  const {
    grid,
    setGrid,
    description,
    setDescription,
    isAnimating,
    setIsAnimating,
    startPosition,
    setStartPosition,
    endPosition,
    setEndPosition,
    setPathfindingAnimation,
    setShortestPathAnimation,
    setPathfindingLength,
    setShortestPathLength,
  } = useContext(GridContext);

  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [speedLabel, setSpeedLabel] = useState("Average");

  const algoDropDown = DropDown(); //drop-downs for algos and mazes and speeds
  const mazeDropDown = DropDown();
  const speedDropDown = DropDown();

  const resetGrid = () => {
    setStartPosition(start());
    setEndPosition(end());
    setGrid(createBlankGrid(start(), end()));
    setPathfindingAnimation(new Set());
    setShortestPathAnimation(new Set());
    setPathfindingLength(0);
    setShortestPathLength(0);
    setDescription("Select an Algorithm to Visualize");
  };

  const resetGridMaze = () => {
    setGrid(createBlankGrid(startPosition, endPosition));
    setPathfindingAnimation(new Set());
    setShortestPathAnimation(new Set());
    setPathfindingLength(0);
    setShortestPathLength(0);
  };

  const runAlgo = (algo) => {
    setIsAnimating(true); //set to true to begin animation
    clearPath(
      grid,
      setGrid,
      setDescription,
      setPathfindingAnimation,
      setShortestPathAnimation,
      setPathfindingLength,
      setShortestPathLength
    );
    const startCell = grid[startPosition[0]][startPosition[1]];
    const endCell = grid[endPosition[0]][endPosition[1]];
    const allCellsInOrder = algos[algo](grid, startCell, endCell);
    if (algo === "Bidirectional Search") {
      const { path, finalPath } = allCellsInOrder;
      setPathfindingLength(path.length - 1);
      setShortestPathLength(finalPath.length - 1);
      setDescription(algo);
      animateAlgo(
        path,
        finalPath,
        setPathfindingAnimation,
        setShortestPathAnimation,
        setIsAnimating,
        animationSpeed
      );
      return;
    }
    const shortestPath = getShortestPath(
      allCellsInOrder[allCellsInOrder.length - 1]
    );
    //Set distance traveled for path
    setPathfindingLength(allCellsInOrder.length - 1);
    setShortestPathLength(shortestPath.length - 1);
    setDescription(algo);

    animateAlgo(
      allCellsInOrder,
      shortestPath,
      setPathfindingAnimation,
      setShortestPathAnimation,
      setIsAnimating,
      animationSpeed
    );
  };

  const runMaze = (maze) => {
    setIsAnimating(true);
    const startCell = grid[startPosition[0]][startPosition[1]];
    const endCell = grid[endPosition[0]][endPosition[1]];
    const tempGrid = createBlankGrid(startCell, endCell);
    const steps = mazes[maze](tempGrid, startCell, endCell);
    setDescription(maze);
    resetGridMaze();
    animateMaze(steps, maze, setGrid, setIsAnimating, animationSpeed);
  };

  return (
    <div>
      <AppBar position="static" id="navbar">
        <Toolbar className="toolbar">
          <div className="title">
            <h1>VOYAGER</h1>
            <h3>- Navigate the world of pathfinding algorithms</h3>
          </div>
          <div className="menu">
            <Button
              className="button"
              disabled={isAnimating} //disabled property is so that user cannot interact during the animation
              id="algo-dropdown"
              onClick={algoDropDown.handleClick}
              endIcon={<KeyboardArrowDownIcon aria-haspopup="true" />}
            >
              Visualize
            </Button>
            <Menu
              anchorEl={algoDropDown.anchorEl}
              open={algoDropDown.open}
              onClose={algoDropDown.handleClose}
            >
              {Object.entries(algos).map(([name]) => (
                <MenuItem
                  key={name}
                  onClick={() => {
                    runAlgo(name);
                    algoDropDown.handleClose();
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </Menu>
            <Button
              disabled={isAnimating}
              id="maze-dropdown"
              onClick={mazeDropDown.handleClick}
              endIcon={<KeyboardArrowDownIcon aria-haspopup="true" />}
            >
              Mazes & Patterns
            </Button>
            <Menu
              anchorEl={mazeDropDown.anchorEl}
              open={mazeDropDown.open}
              onClose={mazeDropDown.handleClose}
            >
              {Object.entries(mazes).map(([name]) => (
                <MenuItem
                  key={name}
                  onClick={() => {
                    runMaze(name);
                    mazeDropDown.handleClose();
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </Menu>
            <Button
              disabled={isAnimating}
              id="speed-dropdown"
              onClick={speedDropDown.handleClick}
              endIcon={<KeyboardArrowDownIcon aria-haspopup="true" />}
            >
              Speed: {speedLabel}
            </Button>
            <Menu
              anchorEl={speedDropDown.anchorEl}
              open={speedDropDown.open}
              onClose={speedDropDown.handleClose}
            >
              {Object.entries(speeds).map(([speed]) => (
                <MenuItem
                  key={speed}
                  onClick={() => {
                    setAnimationSpeed(speeds[speed]);
                    setSpeedLabel(speed);
                    speedDropDown.handleClose();
                  }}
                >
                  {speed}
                </MenuItem>
              ))}
            </Menu>
            <Button
              id="clearPathButton"
              disabled={isAnimating}
              onClick={() =>
                clearPath(
                  grid,
                  setGrid,
                  setDescription,
                  setPathfindingAnimation,
                  setShortestPathAnimation,
                  setPathfindingLength,
                  setShortestPathLength
                )
              }
            >
              Clear Path
            </Button>
            <Button id="resetButton" disabled={isAnimating} onClick={resetGrid}>
              Reset
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="algoDescription">
        <h1>{description}</h1>
        <h3>...{descriptions[description]}</h3>
      </div>
    </div>
  );
};

export default NavBar;
const DropDown = () => {
  //Menu drop-down component w/ functions
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return { anchorEl, open, handleClick, handleClose };
};
