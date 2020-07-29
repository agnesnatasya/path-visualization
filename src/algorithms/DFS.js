//const delay = ms => new Promise(res => setTimeout(res, ms));
var visitedNodesInOrder = [];

export function dfs(currentGrid, endGrid, allGrids) {
  visitedNodesInOrder.push(currentGrid);
  currentGrid.isVisited = true;
  document.getElementById(`grid-${currentGrid.row}-${currentGrid.col}`).className =
    'grid grid-visited';
  updateNeighborsAndQueue(currentGrid, endGrid, allGrids);
  if (currentGrid === endGrid) {
    return [visitedNodesInOrder, getShortestPath(endGrid)];
  }
  return [visitedNodesInOrder, getShortestPath(endGrid)];
}

function getShortestPath(endGrid) {
  var shortestPath = [];
  var currentGrid = endGrid;
  while (currentGrid) {
    shortestPath.unshift(currentGrid);
    currentGrid = currentGrid.previousGrid;
  }
  return shortestPath;
}

function updateNeighborsAndQueue(currentGrid, endGrid, allGrids) {
  var neighbors = getNeighborsOfGrid(currentGrid, allGrids);
  updateNeighborsProperties(neighbors, currentGrid, endGrid, allGrids);
  return neighbors;
}

function getNeighborsOfGrid(grid, allGrids) {
  var neighborDown = grid.row < allGrids.length - 1 ? allGrids[grid.row + 1][grid.col] : null;
  var neighborRight = grid.col < allGrids[0].length - 1 ? allGrids[grid.row][grid.col + 1] : null;
  var neighborLeft = grid.col > 0 ? allGrids[grid.row][grid.col - 1] : null;
  var neighborTop = grid.row > 0 ? allGrids[grid.row - 1][grid.col] : null;
  return [neighborRight, neighborDown, neighborLeft, neighborTop].filter((neighbor) =>
    neighbor !== null && (!neighbor.isVisited && !neighbor.isWallGrid)
  );
}

function updateNeighborsProperties(neighbors, currentGrid, endGrid, allGrids) {
  neighbors.map((neighbor) => {
    if (neighbor !== null) {
      neighbor.isVisited = true;
      neighbor.previousGrid = currentGrid;
      console.log(neighbor);
      dfs(neighbor, endGrid, allGrids);
    }
  })
}