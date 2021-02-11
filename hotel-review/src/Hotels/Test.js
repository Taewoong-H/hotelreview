import React from 'react';
import Store from '../store';
import HotelsResult from './HotelsResult';

export default class Test extends React.Component {
  render() {
    return (
      <div>
        <h1>Store Test</h1>
        <Store.Consumer>
            {store => {
                console.log(store);
                return <HotelsResult result={store.reviewData} />
            }}
        </Store.Consumer>
      </div>
    );
  }
}