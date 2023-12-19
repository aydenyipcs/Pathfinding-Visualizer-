
export const getNeighbors = (grid, cell) => {
  const neighbors = [];
  const { row, col } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  return neighbors.filter(neighbor => !neighbor.visited);
};

export const chooseRandomCell = (grid) => {
  const randomRow = Math.floor(Math.random() * grid.length);
  const randomCol = Math.floor(Math.random() * grid[0].length);
  if (!grid[randomRow][randomCol].start && !grid[randomRow][randomCol].end) {
    return grid[randomRow][randomCol];
  } else {
    return chooseRandomCell(grid);
  }
};

export const animateMaze = (
  walls,
  maze,
  setGrid,
  setIsAnimating,
  animationSpeed = 5
) => {
  console.log(walls.length);
  if (maze === "Prim's Algorithm" || maze === "Random Maze" || maze === "Recursive Backtracking") {
    setGrid((currGrid) => {
      const newGrid = currGrid.map((row) => {
        return row.map((cell) => {
          if (!cell.start && !cell.end) return { ...cell, wall: true };
          return cell;
        });
      });
      return newGrid;
    });
    setTimeout(() => {
      walls.forEach((wall, index) => {
        setTimeout(() => {
          setGrid((currGrid) => {
            const newGrid = [...currGrid];
            newGrid[wall.row][wall.col].wall = false;
            return newGrid;
          });
        }, index * animationSpeed);
      });
    },200);
  } else {
    walls.forEach((wall, index) => {
      setTimeout(() => {
        setGrid((currGrid) => {
          const newGrid = [...currGrid];
          newGrid[wall.row][wall.col].wall = true;
          return newGrid;
        });
      }, index * animationSpeed);
    });
  }
  setTimeout(() => setIsAnimating(false), walls.length * animationSpeed);
};
