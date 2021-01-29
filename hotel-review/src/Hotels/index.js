import React from 'react';
import HotelsName from './HotelsName';

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHotelName: '',
      reviewData: '',
    };
  }

  handleSearch = () => {
    const searchButton = document.querySelector('#hotels-search');
    const hotelsSelect = document.querySelector('#hotels-select');

    searchButton.addEventListener('click', () => {
      this.setState({
        selectedHotelName: hotelsSelect.value,
      });
      this.requireServer();
    });
  };

  requireServer = () => {
    const hotels = {
      name: this.state.selectedHotelName,
    };

    fetch('http://localhost:3001/text', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(hotels),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        const reviewDataAll = json.map((reviewData) => reviewData.review_data);

        this.setState({
          reviewData: reviewDataAll,
        });
      });
  };

  hotelNameOption() {
    const hotelNames = this.state.totalHotelName;
    console.log(hotelNames);
  }

  componentDidMount() {
    this.handleSearch();
    this.hotelNameOption();
  }

  render() {
    return (
      <div>
        <h1>호텔 검색</h1>
        <HotelsName />
        <h3>{this.state.reviewData}</h3>
      </div>
    );
  }
}
