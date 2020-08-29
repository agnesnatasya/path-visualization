import React, { Component } from 'react';
import Grid from './Grid';
import { astar } from '../../algorithms/AStar.js'
import { greedyBestFirst } from '../../algorithms/GreedyBestFirst.js'
import { djikstra } from '../../algorithms/Djikstra.js'
import { bfs } from '../../algorithms/BFS.js'
import { Row, Button, Container } from 'react-bootstrap'
import { InfoBar } from "../InfoBar";

import './Grids.css';

const algoChoices = [
  "A* Search",
  "BFS",
  "Djikstra's Algorithm",
  "Greedy Best First Search",
]

export default class Grids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSize: 25,
      colSize: 25,
      startRow: 12,
      startCol: 5,
      endRow: 12,
      endCol: 19,
      grids: [],
      mousePressed: false,
      buttonDragged: null,
      algo: "A* Search",
      buttonsEnabled: true,
      pureGrid: true,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.visualizeAlgo = this.visualizeAlgo.bind(this);
  }

  componentDidMount() {
    this.setState({ grids: this.setInitialGrids() });
  }

  /**
   * Header element to choose algorithm and render 'visualize' button
   */
  header = () => {
    return (
      <Container>
          <label htmlFor="module-credit">Algorithm</label>
          <select
            className="form-control"
            value={this.state.algo}
            onChange={(e) => this.setState({ algo: e.target.value })}
          >
            {algoChoices.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Button
            onClick={this.visualizeAlgo}
            disabled={!this.state.buttonsEnabled}
          >
            Visualize!
          </Button>
      </Container>
    );
  }

  /**
   * Return object of the grid at this row and column number
   * @param {*} row The row number of the grid
   * @param {*} col The col number of the grid
   */
  initialGrid(row, col) {
    return {
      row: row,
      col: col,
      isVisited: false,
      isWallGrid: false,
      isStartGrid: this.isStartGrid(row, col),
      isEndGrid: this.isEndGrid(row, col),
      previousGrid: null,
    };
  }

  /**
   * Set up initial grids state
   */
  setInitialGrids() {
    let initialGrids = [];
    for (let row = 0; row < this.state.rowSize; row++) {
      let currentRow = [];
      for (let col = 0; col < this.state.colSize; col++) {
        currentRow.push(this.initialGrid(row, col));
      }
      initialGrids.push(currentRow);
    }
    return initialGrids;
  }

  /**
   * Determine whether the grid at this row and col is a start grid
   * @param {*} row The row number of the grid
   * @param {*} col The col number of the grid
   */
  isStartGrid(row, col) {
    return (row === this.state.startRow) && (col === this.state.startCol);
  }

  /**
   * Determine whether the grid at this row and col is an end grid
   * @param {*} row The row number of the grid
   * @param {*} col The col number of the grid
   */
  isEndGrid(row, col) {
    return (row === this.state.endRow) && (col === this.state.endCol)
  }

  /**
   * Toggle a grid between a wall and non-wall grid
   * @param {*} row The row number of the grid
   * @param {*} col The col number of the grid
   */
  toggleWallGrid(row, col) {
    this.setState(prevState => {
      const newGrids = prevState.grids.slice();
      const oldGrid = newGrids[row][col];
      const newGrid = Object.assign({}, oldGrid, { isWallGrid: !oldGrid.isWallGrid });
      newGrids[row][col] = newGrid;
      return ({ grids: newGrids, mousePressed: true });
    })
  }

  /**
   * Change position of start or end grid to the specified row and column
   * @param {*} row The row number of the grid
   * @param {*} col The col number of the grid
   */
  toggleStartEndPosition(row, col) {
    if (!this.state.pureGrid) {
      this.resetColor();
    }
    this.setState(prevState => {
      const newGrids = prevState.grids.slice();
      const oldGrid = newGrids[row][col];
      if (this.state.buttonDragged === 'start') {
        const newGrid = Object.assign({}, oldGrid, { isStartGrid: !oldGrid.isStartGrid, isWallGrid: false });
        newGrids[row][col] = newGrid;
        return ({ grids: newGrids, startRow: row, startCol: col });
      } else {
        const newGrid = Object.assign({}, oldGrid, { isEndGrid: !oldGrid.isEndGrid, isWallGrid: false });
        newGrids[row][col] = newGrid;
        return ({ grids: newGrids, endRow: row, endCol: col });
      }
    });
  }

  /**
   * Handle MouseDown event at that row and column
   * If it is a start or end grid, set mousePressed property to true, so it can be dragged later
   * If it is a normal or wall grid, toggle wall grids
   * @param {*} row The row number of the grid
   * @param {*} col The col number of the grid
   */
  handleMouseDown(row, col) {
    if (this.state.buttonsEnabled) {
      if (this.isStartGrid(row, col)) {
        this.setState({ buttonDragged: "start", mousePressed: true });
      } else if (this.isEndGrid(row, col)) {
        this.setState({ buttonDragged: "end", mousePressed: true });
      } else {
        this.toggleWallGrid(row, col);
      }
    }
  }

  /**
   * Handle MouseEnter event at that row and column
   * If currently the button is dragging a start or end grid,
   * set the start or end grid position to the current position
   * If it is pressing position on normal or wall grids, toggle wall grid property. 
   * @param {*} row The row number of the grid
   * @param {*} col The col number of the grid
   */
  handleMouseEnter(row, col) {
    if (this.state.buttonsEnabled) {
      if (this.state.buttonDragged) {
        this.toggleStartEndPosition(row, col);
      } else if (this.state.mousePressed) {
        if (this.isStartGrid(row, col) || this.isEndGrid(row, col)) {
          return;
        }
        this.toggleWallGrid(row, col);
      }
    }
  }

  /**
   * Handle MouseLeave event at this row and column
   * If it just leaves a start or end grid, set the previous one to normal grid
   * @param {*} row The row number of the grid
   * @param {*} col The col number of the grid
   */
  handleMouseLeave(row, col) {
    if (this.state.buttonsEnabled) {
      if (this.state.buttonDragged) {
        this.toggleStartEndPosition(row, col);
      }
    }
  }

  /**
   * Handle MouseUp event
   */
  handleMouseUp() {
    if (this.state.buttonsEnabled) {
      this.setState({ mousePressed: false, buttonDragged: null });
    }
  }

  /**
   * Toggle buttonsEnabled state
   */
  toggleButtonsEnabled() {
    if (this.state.buttonsEnabled) {
      this.setState({ buttonsEnabled: false });
    } else {
      this.setState({ buttonsEnabled: true });
    }
  }

  /**
   * Reset color of all grids to background color
   */
  resetColor() {
    for (let row = 0; row < this.state.rowSize; row++) {
      for (let col = 0; col < this.state.colSize; col++) {
        if ((row === this.state.startRow && col === this.state.startCol) || (row === this.state.endRow && col === this.state.endCol)) continue;
        const item = this.state.grids[row][col];
        if (item.isWallGrid) continue;
        document.getElementById(`grid-${item.row}-${item.col}`).className = "grid";
      }
    }
  }

  /**
   * Algo visualization trigger
   */
  visualizeAlgo() {
    if (!this.state.pureGrid) {
      this.resetColor();
    }
    this.setState({pureGrid: false})
    this.toggleButtonsEnabled();

    let [visitedGridsInOrder, shortestPathGrids] = [null, null];
    switch (this.state.algo) {
      case "Djikstra's Algorithm":
        [visitedGridsInOrder, shortestPathGrids] = djikstra(this.state.grids);
        break;
      case "BFS":
        [visitedGridsInOrder, shortestPathGrids] = bfs(this.state.grids);
        break;
      case "A* Search":
        [visitedGridsInOrder, shortestPathGrids] = astar(this.state.grids);
        break;
      case "Greedy Best First Search":
        [visitedGridsInOrder, shortestPathGrids] = greedyBestFirst(
          this.state.grids
        );
        break;
    }

    visitedGridsInOrder.map((item, index) => {
      if (index === visitedGridsInOrder.length -1 ) {
        setTimeout(() => { this.visualizePath(shortestPathGrids);
        }, 20 * visitedGridsInOrder.length);
      }
      setTimeout(() => {
        document.getElementById(`grid-${item.row}-${item.col}`).className =
          "grid grid-visited";
        this.setStartEndGridClassName(item);
      }, 20 * index);
    });

    setTimeout(() => {
      this.toggleButtonsEnabled();
    }, 20 * visitedGridsInOrder.length + 20 * shortestPathGrids.length + 50);
  }

  /**
   * Set class name to grid-start or grid-end if it is a start or end grid
   * @param {*} item The grid item
   */
  setStartEndGridClassName(item) {
    if (this.isStartGrid(item.row, item.col)) {
      document.getElementById(`grid-${item.row}-${item.col}`).className =
        "grid grid-start";
    } else if (this.isEndGrid(item.row, item.col)) {
      document.getElementById(`grid-${item.row}-${item.col}`).className =
        "grid grid-end";
    }
  }
  
  /**
   * Function to visualize the path
   * @param {*} shortestPathGrids The grid array that consttitutest the path
   */
  visualizePath(shortestPathGrids) {
    shortestPathGrids.map((item, index) => {
      setTimeout(() => {
        document.getElementById(`grid-${item.row}-${item.col}`).className =
          "grid grid-shortest-path";
        this.setStartEndGridClassName(item);
      }, 20 * index);
    });
  }

  render() {
    return (
      <div>
        {this.header()}
        <InfoBar />
      <table>
        {
          this.state.grids.map((gridsRow, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {gridsRow.map((gridsCol, colIndex) => {
                    var { row, col, distance, isVisited, isWallGrid, isStartGrid, isEndGrid, previousGrid} = gridsCol;
                      return (
                        <Grid
                          key={col}
                          row={row}
                          col={col}
                          distance={distance}
                          isVisited={isVisited}
                          isWallGrid={isWallGrid}
                          isStartGrid={isStartGrid}
                          isEndGrid={isEndGrid}
                          previousGrid={previousGrid}
                          onMouseDown={this.handleMouseDown}
                          onMouseUp={this.handleMouseUp}
                          onMouseEnter={this.handleMouseEnter}
                          onMouseLeave={this.handleMouseLeave}
                        />
                      );
                    }
                  )
                  }
                </tr>
              )
            }
          )
        }
        </table>
      </div>
    )
  }
}