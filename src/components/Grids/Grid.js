import React, { Component } from 'react';

export default class Grid extends Component {
  constructor(props) {
    super(props);   
  }

  getAdditionalGridProperties() {
    var additionalGridProperties = '';
    this.props.isStartGrid ? additionalGridProperties += 'grid-start' : null;
    this.props.isEndGrid ? additionalGridProperties += 'grid-end' : null;
    this.props.isWallGrid? additionalGridProperties += 'grid-wall' : null;
  }
  render() {
    var additionalGridProperties = 
    return (
      <div className={`grid ${}`}>
      </div>
    );
  }
}