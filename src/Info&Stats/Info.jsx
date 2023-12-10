import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../App.jsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import "./info.scss";


const Info = () => {
  const { pathfindingLength, shortestPathLength } = useContext(GridContext);

  const legendItems = [
    { label: "Start", color: "green" },
    { label: "Target", color: "red" },
    { label: "Wall", color: "green" },
    { label: "Visited", color: "green" },
    { label: "Shortest-Path", color: "green" },
  ];

  return (
    <div className="info-container">
      <div className="legend">
        <List sx={{ display: "flex", flexDirection: "row" }}>
          {legendItems.map((item) => (
            <ListItem sx={{ width: "auto" }}>
              <ListItemIcon sx={{ marginRight: "-25px" }}>
                <Box
                  sx={{ width: 24, height: 24, backgroundColor: item.color }}
                />
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ fontFamily: '"Source Code Pro", monospace', fontWeight:300 }}/>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="stats">
        <h3>Visited Cells: {pathfindingLength}</h3>
        <h3>Path Length: {shortestPathLength}</h3>
      </div>
    </div>
  );
};

export default Info;
