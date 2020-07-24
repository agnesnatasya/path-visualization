
export function djikstra(startGrid, endGrid, allGrids) {
  var visitedNodesInOrder = [];
  var allNodes = getAllNodes(allGrids);
  startGrid.distance = 0;
  startGrid.visited = true;
  visitedNodesInOrder.push(startGrid);
  while (allNodes.length !== 0) {
    console.log("A")
    sortGridsByDistance(allNodes);
    var currentGrid = allNodes.shift();
    if (currentGrid.distance === Infinity) {
      visitedNodesInOrder.push(endGrid);
      return visitedNodesInOrder.filter((node) => node !== null);
    } else if (currentGrid === endGrid) {
      return visitedNodesInOrder.filter((node) => node !== null);
    }
    var updatedNeighbors = relaxDistance(currentGrid, allGrids);
    visitedNodesInOrder.push(...updatedNeighbors);
  }
  return visitedNodesInOrder.filter((node) => node !== null);
}

function getAllNodes(allGrids) {
  const grids = [];
  for (const row of allGrids) {
    for (const grid of row) {
      if (!grid.visited) {
        grids.push(grid);
      }
    }
  }
  return grids;
}

function sortGridsByDistance(allNodes) {
  allNodes.sort((A, B) => A.distance - B.distance);
}

function relaxDistance(currentGrid, allGrids) {
  var neighbors = getNeighborsOfGrid(currentGrid, allGrids);
  updateNeighborsProperties(neighbors, currentGrid);
  return neighbors;
}

function getNeighborsOfGrid(grid, allGrids) {
  var neighborTop = grid.row > 0 ? allGrids[grid.row - 1][grid.col] : null;
  var neighborRight = grid.row < allGrids.length - 1 ? allGrids[grid.row + 1][grid.col]: null;
  var neighborDown = grid.col < allGrids[0].length - 1 ? allGrids[grid.row][grid.col + 1]: null;
  var neighborLeft = grid.col > 0 ? allGrids[grid.row][grid.col - 1]: null;
  return [neighborTop, neighborRight, neighborDown, neighborLeft].filter((neighbor) =>
    neighbor !== null && (!neighbor.isVisited && !neighbor.isWallGrid)
  );
}

function updateNeighborsProperties(neighbors, currentGrid) {
  neighbors.map((neighbor) => {
    if (neighbor !== null) {
      neighbor.distance = currentGrid.distance + 1;
      neighbor.visited = true;
      neighbor.previousGrid = currentGrid;
    }
  })
}