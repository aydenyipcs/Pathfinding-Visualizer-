export const animateMaze = (walls, maze, setGrid) => {
    if(maze === "Prim's Algorithm" || maze === "Random Maze") {
        setGrid((currGrid) => {
            const newGrid = currGrid.map((row) => {
              return row.map((cell) => {
                if (!cell.start && !cell.end) return { ...cell, wall: true };
                return cell; 
              });
            });
            return newGrid;
          });
      
          walls.forEach((wall, index) => {
            setTimeout(() => {
              setGrid((currGrid) => {
                const newGrid = [...currGrid];
                newGrid[wall.row][wall.col].wall = false; 
                return newGrid;
              });
            }, index * 5);
          });
    }else {
        walls.forEach((wall, index) => {
            setTimeout(() => {
              setGrid((currGrid) => {
                const newGrid = [...currGrid];
                newGrid[wall.row][wall.col].wall = true; 
                return newGrid;
              });
            }, index * 5);
          });
    }
  };