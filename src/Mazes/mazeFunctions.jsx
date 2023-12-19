export const animateMaze = (
  walls,
  maze,
  setGrid,
  setIsAnimating,
  animationSpeed = 5
) => {
  console.log(walls.length);
  if (maze === "Prim's Algorithm" || maze === "Random Maze") {
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
    },500);
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
