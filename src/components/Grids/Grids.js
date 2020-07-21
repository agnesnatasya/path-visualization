import React, { Component } from 'react';
import Grid from './Grid';

import './Grids.css';

export default class Grids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSize: 25,
      colSize: 50,
      startRow: 13,
      startCol: 15,
      endRow: 13,
      endCol: 35,
      grids: [],
    }
  }

  componentDidMount() {
    this.setState(prevState => {
      return { grids: this.setInitialGrids() };
    });
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

  initialGrid(row, col) {
    if ((row === this.state.endRow) && (col === this.state.endCol)) {
      console.log(true)
    }
    return {
      isWallGrid: false,
      isStartGrid: (row === this.state.startRow) && (col === this.state.startCol),
      isEndGrid: (row === this.state.endRow) && (col === this.state.endCol),
    };
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
                    if (isEndGrid) {
                      console.log("THIS IS END")
                    }
                      return (
                        <Grid
                          key={colIndex}
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