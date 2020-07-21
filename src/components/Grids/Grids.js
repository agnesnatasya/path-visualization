import React, { Component } from 'react';
import Grid from './Grid';

import './Grids.css';

export default class Grids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSize: 25,
      colSize: 50,
      startRow: 12,
      startCol: 15,
      endRow: 12,
      endCol: 35,
      grids: [],
      mousePressed: false,
      buttonDragged: null,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
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

  isStartGrid(row, col) {
    return (row === this.state.startRow) && (col === this.state.startCol);
  }

  isEndGrid(row, col) {
    return (row === this.state.endRow) && (col === this.state.endCol)
  }

  initialGrid(row, col) {
    return {
      isWallGrid: false,
      isStartGrid: this.isStartGrid(row, col),
      isEndGrid: this.isEndGrid(row, col),
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
    if (this.isStartGrid(row,col)) {
      this.setState({buttonDragged: 'start', mousePressed: true });
    } else if (this.isEndGrid(row, col)) {
      this.setState({ buttonDragged: 'end', mousePressed: true });
    } else {
      this.toggleWallGrid(row, col);
    }
  }

  handleMouseEnter(row, col) {
    if (this.state.buttonDragged) {
      this.toggleStartEndPosition(row, col);
    } else if (this.state.mousePressed) {
      if (this.isStartGrid(row, col) || this.isEndGrid(row, col)) {
        return;
      }
      this.toggleWallGrid(row, col);
    }
  }

  handleMouseLeave(row, col) {
    if (this.state.buttonDragged) {
      /*this.setState(prevState => {
        const newGrids = prevState.grids.slice();
        const oldGrid = newGrids[row][col];
        if (this.state.buttonDragged === 'start') {
          const newGrid = Object.assign({}, oldGrid, { isStartGrid: false });
          newGrids[row][col] = newGrid;
          return ({ grids: newGrids });
        } else {
          const newGrid = Object.assign({}, oldGrid, { isEndGrid: false });
          newGrids[row][col] = newGrid;
          return ({ grids: newGrids });
        }
      });*/
      this.toggleStartEndPosition(row, col);
    }
  }

  handleMouseUp(row, col) {
    this.setState({ mousePressed: false, buttonDragged: null })
  }

  render() {
    return (
      <table>
        {
          this.state.grids.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => {
                    var { isWallGrid, isStartGrid, isEndGrid } = col;
                      return (
                        <Grid
                          key={colIndex}
                          row={rowIndex}
                          col={colIndex}
                          onMouseDown={this.handleMouseDown}
                          onMouseUp={this.handleMouseUp}
                          onMouseEnter={this.handleMouseEnter}
                          onMouseLeave={this.handleMouseLeave}
                          isWallGrid={isWallGrid}
                          isStartGrid={isStartGrid}
                          isEndGrid={isEndGrid}
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
    )
  }
}