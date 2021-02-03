import React from 'react';
import HotelsSearch from './HotelsSearch';

export default class Hotels extends React.Component {
  render() {
    console.log("rendered");
    return (
      <div>
        <h1>호텔 검색</h1>
        <HotelsSearch />
      </div>
    );
  }
}
