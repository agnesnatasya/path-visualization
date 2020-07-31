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
    row: row,
    col: col,
    isVisited: isVisited,
    isWallGrid: isWallGrid,
    previousGrid: previousGrid,
  };
}

export function bfs(allGrids) {
  return bfsImplementation(...initializeGrids(allGrids));
}

function bfsImplementation(startGrid, endGrid, allGrids) {
  var visitedGridsInOrder = [];
  var queue = [startGrid];
  startGrid.distance = 0;
  while (queue.length !== 0) {
    var currentGrid = queue.shift();
    if (currentGrid.isWallGrid) continue;
    visitedGridsInOrder.push(currentGrid);
    currentGrid.isVisited = true;
    updateNeighborsAndQueue(currentGrid, allGrids, queue);
    if (currentGrid === endGrid) {
      return [visitedGridsInOrder, getShortestPath(endGrid)];
    }
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

function updateNeighborsAndQueue(currentGrid, allGrids, queue) {
  var neighbors = getNeighborsOfGrid(currentGrid, allGrids);
  updateNeighborsProperties(neighbors, currentGrid, queue);
  return neighbors;
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

function updateNeighborsProperties(neighbors, currentGrid, queue) {
  neighbors.map((neighbor) => {
    if (neighbor !== null) {
      neighbor.isVisited = true;
      neighbor.previousGrid = currentGrid;
      queue.push(neighbor);
    }
  })
}