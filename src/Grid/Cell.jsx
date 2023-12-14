import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { cellInfoPropTypes, cellEventPropTypes } from "../propTypes";
import "./Cell.scss";
import { GridContext } from "../App";

const Cell = (props) => {
  const { pathfindingAnimation, shortestPathAnimation, mazeAnimation } =
    useContext(GridContext);
  const { cellInfo, eventHandlers } = props;
  const { row, col, start, end, wall } = cellInfo;
  const { onMouseDown, onMouseOver, onMouseUp } = eventHandlers;
  const inPathfinding = pathfindingAnimation.has(`cell-${row}-${col}`); //true/false, if in pathfinding animation
  const inShortestPath = shortestPathAnimation.has(`cell-${row}-${col}`); // if in shortest path animation
  // const inMazeAnimation = mazeAnimation.has(`cell-${row}-${col}`); //if in maze animation 
  const cellType = start ? "start" : end ? "end" : wall ? "wall" : "";
  const cellClass = `cell ${cellType} ${inPathfinding ? "pathfinding" : ""} ${ inShortestPath ? "shortestPath" : "" }`;
  const content = start ? "🛸" : end ? "🪐" : ""

  return (
    <div
      id={`cell-${row}-${col}`}
      className={cellClass} //will include cell, cellType and if in pathfinding/shortestPath animation
      onMouseDown={() => onMouseDown(row, col)}
      onMouseOver={() => onMouseOver(row, col)}
      onMouseUp={onMouseUp}
    >{content}</div>
  );
};

Cell.propTypes = {
  cellInfo: cellInfoPropTypes,
  eventHandlers: cellEventPropTypes,
};

export default Cell;
