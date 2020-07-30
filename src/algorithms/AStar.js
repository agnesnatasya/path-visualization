export function astar(startGrid, endGrid, allGrids) {

  initializeProps(allGrids)
  var openList = [];
  var closedList = [];
  openList.push(start);

  while (openList.length > 0) {
    let lowestF = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowestF].f) { lowestF = i; }
    }
    let currentGrid = openList[lowestF];


    if (currentGrid.row === endGrid.row && currentGrid.col === endGrid.col) {
      return [openList, getShortestPath(endGrid)]
    }

    const indexCurrentGrid = openList.indexOf(currentGrid);
    if (index > -1) {
      openList.splice(indexCurrentGrid, 1);
    }
    closedList.push(currentNode);
    let neighbors = getNeighborsOfGrid(currentGrid, allGrids, closedList);

    for (var i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      
      let currentG = currentGrid.gValue + 1;
      let isBestG = false;

      if (!openList.includes(neighbor)) {
        neighbor.hValue = Math.abs(currentGrid.row - endGrid.row) + Math.abs(currentGrid.col - endGrid.col);
        isBestG = true;
        openList.push(neighbor);
      } else if (currentG < neighbor.gValue) {
        isBestG = true;
      }

      if (isBestG) {
        neighbor.gValue = currentG;
        neighbor.fValue = neighbor.gValue + neighbor.hValue;
        neighbor.previousGrid = currentGrid;
      }
    }
  }
  return [[], []];
}

function initializeProps(allGrids) {
  for (let row = 0; row < allGrids.length; row++) {
    for (let col = 0; col < allGrids[0].length; col++) {
      allGrids[row][col].fValue = 0;
      allGrids[row][col].gValue = 0;
      allGrids[row][col].hValue = 0;
    }
  }
}

function getShortestPath(endGrid) {
  var shortestPath = [];
  var currentGrid = endGrid;
  while (currentGrid.previousGrid) {
    shortestPath.unshift(currentGrid);
    curr = curr.previousGrid;
  }
  return shortestPath;
};

function getNeighborsOfGrid(grid, allGrids, closedList) {
  var neighborDown = grid.row < allGrids.length - 1 ? allGrids[grid.row + 1][grid.col] : null;
  var neighborRight = grid.col < allGrids[0].length - 1 ? allGrids[grid.row][grid.col + 1] : null;
  var neighborLeft = grid.col > 0 ? allGrids[grid.row][grid.col - 1] : null;
  var neighborTop = grid.row > 0 ? allGrids[grid.row - 1][grid.col] : null;
  return [neighborTop, neighborRight, neighborDown, neighborLeft].filter((neighbor) =>
    neighbor !== null && (!neighbor.isWallGrid && !closedList.includes(neighbor))
  );
}


