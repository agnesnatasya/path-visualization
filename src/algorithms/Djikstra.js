

const delay = ms => new Promise(res => setTimeout(res, ms));

export async function djikstra(startGrid, endGrid, allGrids, updateVisitedGrid) {
  var visitedNodesInOrder = [];
  var allNodes = getAllGrids(allGrids);
  startGrid.distance = 0;
  visitedNodesInOrder.push(startGrid);
  while (allNodes.length !== 0) {
    sortGridsByDistance(allNodes);
    var currentGrid = allNodes.shift();
    if (currentGrid.isWallGrid) continue;
    if (currentGrid.distance === Infinity) {
      return visitedNodesInOrder;
    }
    visitedNodesInOrder.push(currentGrid);
    currentGrid.isVisited = true;
    await delay(1);
    updateVisitedGrid(currentGrid);
    /*document.getElementById(`grid-${currentGrid.row}-${currentGrid.col}`).className =
      'grid grid-visited';
    document.getElementById(`grid-${currentGrid.row}-${currentGrid.col}`).setInnerHTML =
      'grid grid-visited';*/
    relaxDistance(currentGrid, allGrids);
    if (currentGrid === endGrid) {
      return visitedNodesInOrder;
    }
  }
  return visitedNodesInOrder;
}

function getAllGrids(allGrids) {
  const grids = [];
  for (const row of allGrids) {
    for (const grid of row) {
      if (!grid.isVisited) {
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
  var neighborDown = grid.row < allGrids.length - 1 ? allGrids[grid.row + 1][grid.col]: null;
  var neighborRight = grid.col < allGrids[0].length - 1 ? allGrids[grid.row][grid.col + 1]: null;
  var neighborLeft = grid.col > 0 ? allGrids[grid.row][grid.col - 1] : null;
  var neighborTop = grid.row > 0 ? allGrids[grid.row - 1][grid.col] : null;
  return [neighborRight, neighborDown, neighborLeft, neighborTop].filter((neighbor) =>
    neighbor !== null && (!neighbor.isVisited && !neighbor.isWallGrid)
  );
}

function updateNeighborsProperties(neighbors, currentGrid) {
  neighbors.map((neighbor) => {
    if (neighbor !== null) {
      neighbor.distance = currentGrid.distance + 1;
      neighbor.isVisited = true;
      neighbor.previousGrid = currentGrid;
    }
  })
}