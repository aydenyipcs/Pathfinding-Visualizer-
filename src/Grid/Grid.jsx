import { useState, useEffect, useContext } from "react";
import { GridContext } from "../App.jsx";
import Cell from "./Cell.jsx";
import "./Grid.scss";
import { clearPath } from "../Grid/gridFunctions.jsx";
import { algos } from "../utils.jsx";
import { getShortestPath } from "../Algorithms/algoFunctions.jsx";

const Grid = () => {
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
    setPathfindingLength,
    setShortestPathLength,
    setPathfindingAnimation,
    setShortestPathAnimation,
  } = useContext(GridContext);

  const [mousePressed, setMousePressed] = useState(false);
  const [dragCell, setDragCell] = useState({
    type: null,
    row: null,
    col: null,
  });

  useEffect(() => {
    const handleMouseUpWindow = () => {
      if (mousePressed) {
        setMousePressed(false);
      }
    };
    window.addEventListener("mouseup", handleMouseUpWindow);

    return () => {
      window.removeEventListener("mouseup", handleMouseUpWindow);
    };
  }, [mousePressed]);

  useEffect(() => {
    if (algo !== "Select an Algorithm to Visualize") {
      updatePathfinding();
    }
  }, [dragCell]);

  const handleMouseDown = (row, col) => {
    if (isAnimating) return; //if animation in-prog, dont do anything
    setMousePressed(true);
    const cell = grid[row][col];
    const cellType = cell.start ? "start" : cell.end ? "end" : "wall";
    setDragCell({ type: cellType, row, col });
    if (cellType === "wall") updateCell(row, col, cellType);
  };

  const handleMouseOver = (row, col) => {
    if (isAnimating) return;
    if (
      !mousePressed ||
      !dragCell.type ||
      (dragCell.row === row && dragCell.col === col)
    )
      return;
    if((dragCell.type === "start" || dragCell.type === "end") && (grid[row][col].start || grid[row][col].end)) return;
    updateCell(row, col, dragCell.type);
    setDragCell({ ...dragCell, row, col });
    if (dragCell.type === "start") setStartPosition([row, col]);
    if (dragCell.type === "end") setEndPosition([row, col]);
  };

  const handleMouseUp = () => {
    if (isAnimating) return;
    setMousePressed(false);
    setDragCell({ type: null, row: null, col: null });
  };

  const eventHandlers = {
    onMouseDown: handleMouseDown,
    onMouseOver: handleMouseOver,
    onMouseUp: handleMouseUp,
  };

  const updateCell = (cellRow, cellCol, cellType) => {
    setGrid((currGrid) => {
      const newGrid = currGrid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          //make prev start/end cell false
          if (
            cell[cellType] === true &&
            (cellType === "start" || cellType === "end")
          )
            return { ...cell, [cellType]: false };
          //update correct cell to be opposite of what it originally was
          if (rowIndex === cellRow && colIndex === cellCol) {
            if((cellType === "start" || cellType === "end") && (currGrid[cellRow][cellCol].wall)) return { ...cell, [cellType]: !cell[cellType], wall: false };
            return { ...cell, [cellType]: !cell[cellType] };
          }
          //return cell if neither condition is true
          return cell;
        });
      });
      return newGrid;
    });
  };

  const updatePathfinding = () => {
    const algoToRun = algo;
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
    const allCellsInOrder = algos[algoToRun](grid, startCell, endCell);
    const shortestPath = getShortestPath(
      allCellsInOrder[allCellsInOrder.length - 1]
    );
    //Set distance traveled for path
    setPathfindingLength(allCellsInOrder.length - 1);
    setShortestPathLength(shortestPath.length - 1);
    setAlgo(algoToRun);
   
    //Update the animation state
    const updatedPathfinding = new Set();
    const updatedShortest = new Set();
    allCellsInOrder.forEach((cell) => {
      updatedPathfinding.add(`cell-${cell.row}-${cell.col}`);
    });
    shortestPath.forEach((cell) => {
      updatedShortest.add(`cell-${cell.row}-${cell.col}`);
    });
    setPathfindingAnimation(updatedPathfinding);
    setShortestPathAnimation(updatedShortest);
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => {
        return (
          <div key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => {
              return (
                <Cell
                  key={`cell-${rowIndex}-${cellIndex}`}
                  cellInfo={cell}
                  eventHandlers={eventHandlers}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
