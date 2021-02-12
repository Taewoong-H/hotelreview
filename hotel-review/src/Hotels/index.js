import React from 'react';
import HotelsName from './HotelsName';
import HotelsSearch from './HotelsSearch';

function Hotels() {
  console.log("rendered");
  
  return (
    <div>
      <h1>호텔 검색</h1>
      <HotelsName />
      <HotelsSearch />
    </div>
  );
}
export default Hotels;
