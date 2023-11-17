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
import "./configForm.scss";

const NavBar = () => {
  const { grid, startPosition, setPathfindingAnimation, setShortestPathAnimation} = useContext(GridContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" id="navbar">
      <Toolbar>
        <Button
          id="algo-dropdown"
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon aria-haspopup="true" />}
        >
          Visualize
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => dijkstra(grid, startPosition, setPathfindingAnimation, setShortestPathAnimation)}>
            Dijkstra
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
