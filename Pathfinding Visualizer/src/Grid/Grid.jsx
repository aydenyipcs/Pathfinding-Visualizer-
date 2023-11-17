import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../App.jsx";
import Cell from "./Cell.jsx";
import PropTypes from "prop-types";
import "./Grid.scss";
import { cellInfoPropTypes } from "../propTypes.jsx";

const Grid = () => {
  const { grid, setGrid, startPosition, endPosition, pathfindingAnimation } = useContext(GridContext);

  const [mousePressed, setMousePressed] = useState(false);
  const [dragItem, setDragItem] = useState({
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

  const handleMouseDown = (row, col) => {
    setMousePressed(true);
    const cell = grid[row][col];
    if (cell.start) {
      setDragItem({ type: "start", row, col });
    } else if (cell.end) {
      setDragItem({ type: "end", row, col });
    } else {
      setGrid(addWallsToGrid(row, col));
    }
  };

  const handleMouseOver = (row, col) => {
    if (!mousePressed) return;
    if (dragItem.type) {
      if (dragItem.row !== row || dragItem.col !== col) {
        setGrid((prevGrid) => {
          const newGrid = JSON.parse(JSON.stringify(prevGrid));

          newGrid[dragItem.row][dragItem.col][dragItem.type] = false;
          newGrid[row][col][dragItem.type] = true;

          return newGrid;
        });
        setDragItem({ ...dragItem, row, col });
      }
    } else {
      setGrid(addWallsToGrid(row, col));
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
    setDragItem({ type: null, row: null, col: null });
  };

  const eventHandlers = {
    onMouseDown: handleMouseDown,
    onMouseOver: handleMouseOver,
    onMouseUp: handleMouseUp,
  };

  const addWallsToGrid = (row, col) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    const newCell = { ...newGrid[row][col], wall: !newGrid[row][col].wall };
    newGrid[row][col] = newCell;
    return newGrid;
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
