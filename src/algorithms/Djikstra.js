function initializeGrids(allGrids) {
  let initialGrids = [];
  let startGrid = null;
  let endGrid = null;
  for (let row = 0; row < allGrids.length; row++) {
    let currentRow = [];
    for (let col = 0; col < allGrids[0].length; col++) {
      const originalGrid = allGrids[row][col];
      const modifiedGrid = initialGrid(originalGrid);
      currentRow.push(modifiedGrid);
      if (originalGrid.isStartGrid) startGrid = modifiedGrid;
      if (originalGrid.isEndGrid) endGrid = modifiedGrid;
    }
    initialGrids.push(currentRow);
  }
  return [startGrid, endGrid, initialGrids];
}

function initialGrid(originalGrid) {
  var { row, col, isVisited, isWallGrid, previousGrid } = originalGrid;
  return {
    row,
    col,
    distance: Infinity,
    isVisited: isVisited,
    isWallGrid: isWallGrid,
    previousGrid: previousGrid,
  };
}

export function djikstra(allGrids) {
  return djikstraImplementation(...initializeGrids(allGrids));
}


function djikstraImplementation(startGrid, endGrid, allGrids) {
  var totalGrids = allGrids.length * allGrids[0].length;
  var visitedGridsInOrder = [];
  var allNodes = getAllGrids(allGrids);
  startGrid.distance = 0;
  while (visitedGridsInOrder.length !== totalGrids) {
    sortGridsByDistance(allNodes);
    var currentGrid = allNodes.shift();
    if (currentGrid.isWallGrid) continue;
    if (currentGrid.distance === Infinity) {
      var shortestPath = [];
      return [visitedGridsInOrder, shortestPath];
    }
    visitedGridsInOrder.push(currentGrid);
    currentGrid.isVisited = true;
    
    relaxDistance(currentGrid, allGrids);
    if (currentGrid === endGrid) {
      var shortestPath = getShortestPath(endGrid);
      return [visitedGridsInOrder, shortestPath];
    }
  }
  var shortestPath = [];
  return [visitedGridsInOrder, shortestPath];
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

function getShortestPath(endGrid) {
  var shortestPath = [];
  var currentGrid = endGrid;
  while (currentGrid) {
    shortestPath.unshift(currentGrid);
    currentGrid = currentGrid.previousGrid;
  }
  return shortestPath;
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
  return [neighborTop, neighborRight, neighborDown, neighborLeft].filter((neighbor) =>
    neighbor !== null && (!neighbor.isVisited && !neighbor.isWallGrid)
  );
}

function updateNeighborsProperties(neighbors, currentGrid) {
  neighbors.map((neighbor) => {
    if (neighbor !== null) {
      neighbor.distance =
        (neighbor.distance > currentGrid.distance + 1) ?
          currentGrid.distance + 1
          :
          neighbor.distance;
      neighbor.isVisited = true;
      neighbor.previousGrid = currentGrid;
    }
  })
}