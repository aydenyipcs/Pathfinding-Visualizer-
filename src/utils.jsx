import dijkstra from "./Algorithms/Dijkstra";
import aStar from "./Algorithms/AStar.jsx";
import greedy from "./Algorithms/Greedy.jsx";
import bfs from "./Algorithms/bfs.jsx";
import dfs from "./Algorithms/DFS.jsx";
import recursiveDivision  from "./Mazes/RecursiveDivision";
import prim from "./Mazes/Prims";

export const algos = {
  "Dijkstra's Algorithm": dijkstra,
  "A* Search": aStar,
  "Greedy Best-First Search": greedy,
  "Breath-first Search": bfs,
  "Depth-first Search": dfs,
};

export const algoDescription = {
  "Dijkstra's Algorithm": "is weighted and guarantees the shortest path!",
  "A* Search": "is weighted and guarantees the shortest path!",
  "Greedy Best-First Search":
    "is weighted and does not guarantee the shortest path!",
  "Breath-first Search": "is unweighted and guarantees the shortest path!",
  "Depth-first Search":
    "is unweighted and does not guarantee the shortest path!",
};

export const mazes = {
    "Recursive Division": recursiveDivision,
    "Prim's Algorithm" : prim
}
