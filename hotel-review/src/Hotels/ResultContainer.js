import React from 'react';
import Store from '../store';
import HotelsResult from './HotelsResult';

export default class ResultContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>리뷰 분석 결과</h1>
        <Store.Consumer>
            {store => {
                return <HotelsResult result={store.reviewData} />
            }}
        </Store.Consumer>
      </div>
    );
  }
}