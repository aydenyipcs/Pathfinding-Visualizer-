
let NUM_ROW = Math.floor(window.innerWidth / 30);
let NUM_COL = Math.floor(window.innerHeight * 0.78 / 30)
NUM_ROW =  NUM_ROW > 80 ? NUM_ROW * 0.6 : NUM_ROW
NUM_COL =  NUM_COL > 35 ? NUM_COL * 0.6 : NUM_COL

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
