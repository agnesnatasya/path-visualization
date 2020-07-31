export function greedyBestFirst(startGrid, endGrid, allGrids) {
  var visitedGridsInOrder = []
  initializeProps(allGrids)
  var openList = [];
  var closedList = [];
  openList.push(startGrid);

  while (openList.length > 0) {
    let lowestH = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].hValue < openList[lowestH].hValue) {
        lowestH = i;
      }
    }
    let currentGrid = openList[lowestH];
    visitedGridsInOrder.push(currentGrid);
    if (currentGrid.row === endGrid.row && currentGrid.col === endGrid.col) {
      return [closedList, getShortestPath(endGrid)]
    }

    const indexCurrentGrid = openList.indexOf(currentGrid);
    if (indexCurrentGrid > -1) {
      openList.splice(indexCurrentGrid, 1);
    }
    closedList.push(currentGrid);

    let neighbors = getNeighborsOfGrid(currentGrid, allGrids, closedList);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      neighbor.hValue = (Math.abs(neighbor.row - endGrid.row) + Math.abs(neighbor.col - endGrid.col))
      openList.push(neighbor);
      neighbor.previousGrid = currentGrid;
    }
  }
  return [[], []];
}

function initializeProps(allGrids) {
  for (let row = 0; row < allGrids.length; row++) {
    for (let col = 0; col < allGrids[0].length; col++) {
      allGrids[row][col].hValue = 0;
    }
  }
}

function getShortestPath(endGrid) {
  var shortestPath = [];
  var currentGrid = endGrid;
  while (currentGrid.previousGrid) {
    console.log(currentGrid);
    console.log(currentGrid.previousGrid)
    shortestPath.unshift(currentGrid);
    currentGrid = currentGrid.previousGrid;
  }
  return shortestPath;
};

function getNeighborsOfGrid(grid, allGrids, closedList) {
  var neighborDown = grid.row < allGrids.length - 1 ? allGrids[grid.row + 1][grid.col] : null;
  var neighborRight = grid.col < allGrids[0].length - 1 ? allGrids[grid.row][grid.col + 1] : null;
  var neighborLeft = grid.col > 0 ? allGrids[grid.row][grid.col - 1] : null;
  var neighborTop = grid.row > 0 ? allGrids[grid.row - 1][grid.col] : null;
  return [neighborRight, neighborDown, neighborLeft, neighborTop].filter((neighbor) =>
    neighbor !== null && (!neighbor.isWallGrid && !isPartOfArray(neighbor, closedList))
  );
}

function isPartOfArray(grid, gridsList) {
  return gridsList.some((item) => (item.row === grid.row && item.col === grid.col));
}