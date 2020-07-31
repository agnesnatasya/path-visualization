import React, { Component } from 'react';

import './Grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);   
  }

  /**
   * Determine additional properties of the grid that will affect its background color.
   */
  getAdditionalGridProps() {
    var { isWallGrid, isStartGrid, isEndGrid } = this.props;
    return isWallGrid ? 'grid-wall' : isStartGrid ? 'grid-start' : isEndGrid? 'grid-end': 'white'
  }

  render() {
    return (
      <td
        id={`grid-${this.props.row}-${ this.props.col}`}
        className={`grid ${this.getAdditionalGridProps()}`}
        onMouseDown={() => this.props.onMouseDown(this.props.row, this.props.col)}
        onMouseUp={() => this.props.onMouseUp(this.props.row, this.props.col)}
        onMouseEnter={() => this.props.onMouseEnter(this.props.row, this.props.col)}
        onMouseLeave={() => this.props.onMouseLeave(this.props.row, this.props.col)}
      >
      </td>
    );
  }
}