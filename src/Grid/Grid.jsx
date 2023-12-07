import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../App.jsx";
import Cell from "./Cell.jsx";
import PropTypes from "prop-types";
import "./Grid.scss";
import { cellInfoPropTypes } from "../propTypes.jsx";

const Grid = () => {
  const {
    grid,
    setGrid,
    setStartPosition,
    setEndPosition,
    pathfindingAnimation,
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

  const handleMouseDown = (row, col) => {
    setMousePressed(true);
    const cell = grid[row][col];
    if (cell.start) {
      setDragCell({ type: "start", row, col });
    } else if (cell.end) {
      setDragCell({ type: "end", row, col });
    } else {
      setGrid(addWallsToGrid(row, col))
    }
  };

  const handleMouseOver = (row, col) => {
    if (!mousePressed) return;
    if (dragCell.type && (dragCell.row !== row || dragCell.col !== col)) {
      setGrid((prevGrid) => {
        const updatedGrid = [...prevGrid];
        updatedGrid[dragCell.row][dragCell.col][dragCell.type] = false;
        updatedGrid[row][col][dragCell.type] = true;
        return updatedGrid;
      });
      setDragCell({ ...dragCell, row, col });
    } else {
      if (!grid[row][col].wall) setGrid(addWallsToGrid(row, col));
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
    if (dragCell.type === "start")
      setStartPosition([dragCell.row, dragCell.col]);
    if (dragCell.type === "end") setEndPosition([dragCell.row, dragCell.col]);
    setDragCell({ type: null, row: null, col: null });
  };

  const eventHandlers = {
    onMouseDown: handleMouseDown,
    onMouseOver: handleMouseOver,
    onMouseUp: handleMouseUp,
  };

  const addWallsToGrid = (row, col) => {
      const updatedGrid = [...grid];
      updatedGrid[row][col].wall = !updatedGrid[row][col].wall; //reverse the state - wall or cell
      return updatedGrid;
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
