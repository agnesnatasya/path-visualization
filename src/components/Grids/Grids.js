import React, { Component } from 'react';
import Grid from './Grid';

import './Grids.css';

const ROWS = 25;
const COLS = 50;
const START_ROW = 13;
const START_COL = 15;
const END_ROW = 13;
const END_COL = 35;

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
    grid = new Grid();
    grid.isWallGrid = false;
    grid.isStartGrid = (row === this.state.startRow) && (col === this.state.startCol);
    grid.isEndGrid = (row === this.state.endRow) && (col === this.state.endCol);
  }
}