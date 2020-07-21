import React, { Component } from 'react';

import './Grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);   
  }

  getAdditionalGridProps() {
    var additionalGridProperties = '';
    additionalGridProperties += this.props.isStartGrid ? 'grid-start' : '';
    additionalGridProperties += this.props.isEndGrid ? 'grid-end' : '';
    additionalGridProperties += this.props.isWallGrid ? 'grid-wall' : '';
    return additionalGridProperties
  }

  render() {
    return (
      <div className={`grid ${this.getAdditionalGridProps()}`}>
        a
      </div>
    );
  }
}