import React, { Component } from 'react';
import Grid from './Grid';
import { astar } from '../../algorithms/AStar.js'
import { greedyBestFirst } from '../../algorithms/GreedyBestFirstSearch.js'
import { djikstra } from '../../algorithms/Djikstra.js'
import { bfs } from '../../algorithms/BFS.js'
import { dfs } from '../../algorithms/DFS.js'
import { Navbar, Nav, NavDropdown, Button, Form } from 'react-bootstrap'

import './Grids.css';

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
      chosenAlgo: "bfs",
      buttonsEnabled: true,
      pureGrid: true,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.visualizeAlgo = this.visualizeAlgo.bind(this);
    this.updateVisitedGrid = this.updateVisitedGrid.bind(this);
    this.toggleButtonsEnabled = this.toggleButtonsEnabled.bind(this);
    this.toggleStartEndPosition = this.toggleStartEndPosition.bind(this);
    this.toggleWallGrid = this.toggleWallGrid.bind(this);
    this.checkIfStartOrEnd = this.checkIfStartOrEnd.bind(this);
    this.visualizeShortestPath = this.visualizeShortestPath.bind(this);
  }

  componentDidMount() {
    this.setState({ grids: this.setInitialGrids() });
  }

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

  headerBar = () => {
    return (
      <Navbar className='header-bar' expand="lg">
        <Navbar.Brand href="#home">Path Visualization</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Algorithm" id="basic-nav-dropdown">
              <NavDropdown.Item>Djikstra</NavDropdown.Item>
              <NavDropdown.Item>BFS</NavDropdown.Item>
              <NavDropdown.Item>DFS</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Form inline>
          <Button
            variant="outline-primary"
            onClick={this.visualizeAlgo}
            disabled={!this.state.buttonsEnabled}
          >Visualize</Button>
        </Form>
      </Navbar >
    )
  }

  isStartGrid(row, col) {
    return (row === this.state.startRow) && (col === this.state.startCol);
  }

  isEndGrid(row, col) {
    return (row === this.state.endRow) && (col === this.state.endCol)
  }

  initialGrid(row, col) {
    return {
      row: row,
      col: col,
      distance: Infinity,
      isVisited: false,
      isWallGrid: false,
      isStartGrid: this.isStartGrid(row, col),
      isEndGrid: this.isEndGrid(row, col),
      previousGrid: null,
    };
  }

  toggleWallGrid(row, col) {
    this.setState(prevState => {
      const newGrids = prevState.grids.slice();
      const oldGrid = newGrids[row][col];
      const newGrid = Object.assign({}, oldGrid, { isWallGrid: !oldGrid.isWallGrid });
      newGrids[row][col] = newGrid;
      return ({ grids: newGrids, mousePressed: true });
    })
  }

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

  handleMouseLeave(row, col) {
    if (this.state.buttonsEnabled) {
      if (this.state.buttonDragged) {
        this.toggleStartEndPosition(row, col);
      }
    }
  }

  handleMouseUp(row, col) {
    if (this.state.buttonsEnabled) {
      this.setState({ mousePressed: false, buttonDragged: null });
    }
  }

  updateVisitedGrid(newGrid) {
    this.setState(prevState => {
      const newGrids = prevState.grids.slice();
      newGrids[newGrid.row][newGrid.col] = newGrid;
      return {
        grids: newGrids
      }
    })
  }

  toggleButtonsEnabled() {
    if (this.state.buttonsEnabled) {
      this.setState({ buttonsEnabled: false });
    } else {
      this.setState({ buttonsEnabled: true });
    }
  }

  resetColor() {
    for (let row = 0; row < this.state.rowSize; row++) {
      for (let col = 0; col < this.state.colSize; col++) {
        if ((row === this.state.startRow && col === this.state.startCol) || (row === this.state.endRow && col === this.state.endCol)) continue;
        const item = this.state.grids[row][col];
        document.getElementById(`grid-${item.row}-${item.col}`).className = "grid";
      }
    }
  }

  visualizeAlgo() {
    if (!this.state.pureGrid) {
      this.resetColor();
    }
    this.setState({pureGrid: false})
    this.toggleButtonsEnabled();

    const gridsInfo = {
      rowSize: this.state.rowSize,
      colSize: this.state.colSize,
      startRow: this.state.startRow,
      startCol: this.state.startCol,
      endRow: this.state.endRow,
      endCol: this.state.endCol,
    };
    const algoArguments = [
      this.state.grids[this.state.startRow][this.state.startCol],
      this.state.grids[this.state.endRow][this.state.endCol],
      gridsInfo,
    ];

    let [visitedGridsInOrder, shortestPathGrids] = [null, null];
    switch (this.state.chosenAlgo) {
      case "djikstra":
        [visitedGridsInOrder, shortestPathGrids] = djikstra(...algoArguments);
        break;
      case "bfs":
        [visitedGridsInOrder, shortestPathGrids] = bfs(...algoArguments);
        break;
      case "astar":
        [visitedGridsInOrder, shortestPathGrids] = astar(...algoArguments);
        break;
      case "greedyBestFirst":
        [visitedGridsInOrder, shortestPathGrids] = greedyBestFirst(...algoArguments);
        break;
    }

    visitedGridsInOrder.map((item, index) => {
      if (index === visitedGridsInOrder.length -1 ) {
        setTimeout(() => {
          this.visualizeShortestPath(shortestPathGrids);
        }, 20 * visitedGridsInOrder.length);
      }
      setTimeout(() => {
        document.getElementById(`grid-${item.row}-${item.col}`).className =
          "grid grid-visited";
        this.checkIfStartOrEnd(item);
      }, 20 * index);
    });

    setTimeout(() => {
      this.toggleButtonsEnabled();
    }, 20 * visitedGridsInOrder.length + 20 * shortestPathGrids.length + 50);
  }

  checkIfStartOrEnd(item) {
    if (this.isStartGrid(item.row, item.col)) {
      document.getElementById(`grid-${item.row}-${item.col}`).className =
        "grid grid-start";
    } else if (this.isEndGrid(item.row, item.col)) {
      document.getElementById(`grid-${item.row}-${item.col}`).className =
        "grid grid-end";
    }
  }
  
  visualizeShortestPath(shortestPathGrids) {
    shortestPathGrids.map((item, index) => {
      setTimeout(() => {
        document.getElementById(`grid-${item.row}-${item.col}`).className =
          "grid grid-shortest-path";
        this.checkIfStartOrEnd(item);
      }, 20 * index);
    });
  }


  render() {
    return (
      <div>
        {this.headerBar()}
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