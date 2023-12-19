import dijkstra from "./Algorithms/Dijkstra";
import aStar from "./Algorithms/AStar.jsx";
import greedy from "./Algorithms/Greedy.jsx";
import bfs from "./Algorithms/bfs.jsx";
import dfs from "./Algorithms/DFS.jsx";
import recursiveDivision from "./Mazes/RecursiveDivision";
import prim from "./Mazes/Prims";
import random from "./Mazes/random";

export const algos = {
  "Dijkstra's Algorithm": dijkstra,
  "A* Search": aStar,
  "Greedy Best-First Search": greedy,
  "Breath-first Search": bfs,
  "Depth-first Search": dfs,
};

export const descriptions = {
  "Dijkstra's Algorithm": "is weighted and guarantees the shortest path!",
  "A* Search": "is weighted and guarantees the shortest path!",
  "Greedy Best-First Search":
    "is weighted and does not guarantee the shortest path!",
  "Breath-first Search": "is unweighted and guarantees the shortest path!",
  "Depth-first Search":
    "is unweighted and does not guarantee the shortest path!",
  "Random Maze": "was custom made for fun :)",
  "Recursive Division": "divides a space recursively until a condition is met",
  "Prim's Algorithm": "creates a minimum spanning tree",
};

export const mazes = {
  "Random Maze": random,
  "Recursive Division": recursiveDivision,
  "Prim's Algorithm": prim,
};

export const speeds = {
  Slow: 10,
  Average: 5,
  Fast: 2.5,
  Instant: 0,
};
