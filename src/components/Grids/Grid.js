import React, { Component } from 'react';

import './Grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);   
  }

  getAdditionalGridProps() {
    var { isWallGrid, isStartGrid, isEndGrid } = this.props;
    console.log(isStartGrid);
    console.log(isEndGrid);
    return isWallGrid ? 'grid-wall' : isStartGrid ? 'grid-start' : isEndGrid? 'grid-end': 'white'
  }

  render() {
    return (
      <td className={`grid ${this.getAdditionalGridProps()}`}>
        
      </td>
    );
  }
}