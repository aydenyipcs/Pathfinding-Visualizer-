//Function to create a blank grid
const NUM_ROW = 55;
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
    prevCell: null
  };
};
