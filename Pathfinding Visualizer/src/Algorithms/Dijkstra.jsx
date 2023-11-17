const dijkstra = (grid, startPosition, setPathfindingAnimation, setShortestPathAnimation) => {
  const startCell = grid[startPosition[0]][startPosition[1]];
  const allCellsInOrder = getAllCellsDijkstra(grid, startCell);
  const shortestPath = getShortestPath(allCellsInOrder[allCellsInOrder.length - 1]);
  animateDijkstra(allCellsInOrder, shortestPath, setPathfindingAnimation, setShortestPathAnimation);
};

const getAllCellsDijkstra = (grid, startCell) => {
  const cellsInOrder = [];
  const unvisitedCells = getAllCells(grid);
  startCell.distance = 0;
  while (unvisitedCells.length) {
    unvisitedCells.sort((cell1, cell2) => cell1.distance - cell2.distance);
    const nearestCell = unvisitedCells.shift();
    if (nearestCell.wall) continue;
    if (nearestCell.distance === Infinity) return cellsInOrder;
    cellsInOrder.push(nearestCell);
    if (nearestCell.end) return cellsInOrder;
    nearestCell.visited = true;
    updateDistanceOfNeighbors(grid, nearestCell);
  }
};

const getAllCells = (grid) => {
  const allCells = [];
  for (const row of grid) {
    for (const cell of row) {
      allCells.push(cell);
    }
  }
  return allCells;
};

const updateDistanceOfNeighbors = (grid, cell) => {
  const neighbors = getNeighbors(grid, cell);
  neighbors.forEach((neighbor) => {
    neighbor.distance = cell.distance + 1;
    neighbor.prevCell = cell;
  });
};

const getNeighbors = (grid, cell) => {
  const neighbors = [];
  const { row, col } = cell;
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  return neighbors.filter((neighbor) => !neighbor.visited);
};

const getShortestPath = (endCell) => {
  const shortestPath = [];
  let currCell = endCell;
  while (currCell) {
    shortestPath.unshift(currCell);
    currCell = currCell.prevCell;
  }
  return shortestPath;
};

const animateDijkstra = (allCellsInOrder, shortestPath, setPathfindingAnimation, setShortestPathAnimation) => {
  allCellsInOrder.forEach((cell, index) => {
    setTimeout(() => {
        setPathfindingAnimation(new Set(pathfindingAnimation).add(cell))
    }, index * 25); //change animation speed here for pathfinding
  });
};

export default dijkstra;