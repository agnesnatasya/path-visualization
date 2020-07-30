

export function dfs(currentGrid, endGrid, allGrids, visitedGridsInOrder = []) {
  visitedGridsInOrder.push(currentGrid);
  currentGrid.isVisited = true;
  if (currentGrid.row === endGrid.row && currentGrid.col === endGrid.col) {
    return [visitedGridsInOrder, getShortestPath(endGrid)];
  }
  var neighbors = getNeighborsOfGrid(currentGrid, allGrids);

  for (var i = 0; i < neighbors.length; i++) {
    neighbors[i].previousGrid = currentGrid;
    if (neighbors[i].row === endGrid.row && neighbors[i].col === endGrid.col) {
      console.log("A");
      return [visitedGridsInOrder, getShortestPath(endGrid)];
    }
    console.log(currentGrid.row, currentGrid.col);
    console.log(neighbors[i].row, neighbors[i].col);

    dfs(neighbors[i], endGrid, allGrids, visitedGridsInOrder);
  }
  return [visitedGridsInOrder, getShortestPath(endGrid)];
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

function getNeighborsOfGrid(grid, allGrids) {
  var neighborDown = grid.row < allGrids.length - 1 ? allGrids[grid.row + 1][grid.col] : null;
  var neighborRight = grid.col < allGrids[0].length - 1 ? allGrids[grid.row][grid.col + 1] : null;
  var neighborLeft = grid.col > 0 ? allGrids[grid.row][grid.col - 1] : null;
  var neighborTop = grid.row > 0 ? allGrids[grid.row - 1][grid.col] : null;
  return [neighborTop, neighborRight, neighborDown, neighborLeft].filter((neighbor) =>
    neighbor !== null && (!neighbor.isVisited && !neighbor.isWallGrid)
  );
}
