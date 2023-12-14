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
import "./navBar.scss";
import { createBlankGrid, clearPath } from "../Grid/gridFunctions.jsx";
import { getShortestPath, animateAlgo } from "../Algorithms/algoFunctions.jsx";
import { algos, algoDescription, mazes } from "../utils.jsx";

const NavBar = () => {
  const {
    grid,
    setGrid,
    algo,
    setAlgo,
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

  const algoDropDown = DropDown(); // seperate drop-downs for algos and mazes
  const mazeDropDown = DropDown();

  const resetGrid = () => {
    const defaultStart = [6, 13];
    const defaultEnd = [58, 13];
    setStartPosition(defaultStart);
    setEndPosition(defaultEnd);
    setGrid(createBlankGrid(defaultStart, defaultEnd));
    setPathfindingAnimation(new Set());
    setShortestPathAnimation(new Set());
    setPathfindingLength(0);
    setShortestPathLength(0);
    setAlgo("Select an Algorithm to Visualize");
  };
  const resetGridMaze = () => {
    setGrid(createBlankGrid(startPosition, endPosition));
    setPathfindingAnimation(new Set());
    setShortestPathAnimation(new Set());
    setPathfindingLength(0);
    setShortestPathLength(0);
    setAlgo("Select an Algorithm to Visualize");
  };

  const runAlgo = (algo) => {
    setIsAnimating(true); //set to true to begin animation
    console.log(grid[startPosition[0]][startPosition[1]]);
    console.log(grid[endPosition[0]][endPosition[1]])
    clearPath(
      grid,
      setGrid,
      setAlgo,
      setPathfindingAnimation,
      setShortestPathAnimation,
      setPathfindingLength,
      setShortestPathLength
    );

    const startCell = grid[startPosition[0]][startPosition[1]];
    const endCell = grid[endPosition[0]][endPosition[1]];
    const allCellsInOrder = algos[algo](grid, startCell, endCell);
    const shortestPath = getShortestPath(
      allCellsInOrder[allCellsInOrder.length - 1]
    );
    //Set distance traveled for path
    setPathfindingLength(allCellsInOrder.length - 1);
    setShortestPathLength(shortestPath.length - 1);
    setAlgo(algo);

    animateAlgo(
      allCellsInOrder,
      shortestPath,
      setPathfindingAnimation,
      setShortestPathAnimation,
      setIsAnimating
    );
  };

  const runMaze = (maze) => {
    setIsAnimating(true);
    resetGridMaze();
    const start = grid[startPosition[0]][startPosition[1]];
    const end = grid[endPosition[0]][endPosition[1]];
    const steps = mazes[maze](grid, start, end);
    animateMaze(steps, maze);
    setIsAnimating(false);
  };

  const animateMaze = (walls, maze) => {
    walls.forEach((wall, index) => {
      setTimeout(() => {
        setGrid((currGrid) => {
          const newGrid = [...currGrid];
          newGrid[wall.row][wall.col].wall = true;
          return newGrid;
        });
      }, index * 5);
    });
    if(maze === "Prim's Algorithm") {
      setTimeout(() => {
        setGrid((currGrid) => {
          const newGrid = currGrid.map(row => {
            return row.map(cell => {
              if(!cell.start && !cell.end) return {...cell, wall: !cell.wall}
              return cell;
            })
          })
          return newGrid;
        })
      },walls.length * 5 + 10)
    }
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
                <MenuItem key={name} onClick={() => runAlgo(name)}>
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
                <MenuItem key={name} onClick={() => runMaze(name)}>
                  {name}
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
                  setAlgo,
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
        <h1>{algo}</h1>...<h3>{algoDescription[algo]}</h3>
      </div>
    </div>
  );
};

export default NavBar;
