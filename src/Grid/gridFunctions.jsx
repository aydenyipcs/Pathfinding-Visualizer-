const NUM_ROW = 65;
const NUM_COL = 28;

export const createBlankGrid = (startPosition, endPosition) => {
  const blankGrid = [];
  for (let row = 0; row < NUM_ROW; row++) {
    const currRow = [];
    for (let col = 0; col < NUM_COL; col++) {
      currRow.push(createCellData(row, col, startPosition, endPosition));
    }
    blankGrid.push(currRow);
  }
  return blankGrid;
};

//Function to create a grid of cell data w/ default start & end

const createCellData = (row, col, startPosition, endPosition) => {
  return {
    row,
    col,
    start: row === startPosition[0] && col === startPosition[1],
    end: row === endPosition[0] && col === endPosition[1],
    distance: Infinity,
    visited: false,
    wall: false,
    prevCell: null,
  };
};

export const clearPath = (
  grid,
  setGrid,
  setAlgo,
  setPathfindingAnimation,
  setShortestPathAnimation,
  setPathfindingLength,
  setShortestPathLength
) => {
  //keep grid w walls and reset all other properties, empty sets with animation information
  setPathfindingAnimation(new Set());
  setShortestPathAnimation(new Set());
  let newGrid = [...grid];
  newGrid.forEach((row) => {
    row.forEach((cell) => {
      cell.visited = false;
      cell.inList = false;
      cell.prevCell = null;
    });
  });
  setGrid(newGrid);
  setPathfindingLength(0);
  setShortestPathLength(0);
  setAlgo("Select an Algorithm to Visualize");
};
