import React from 'react';

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hotelName: '', reviewData: '' };
  }

  handleSearch = () => {
    const searchButton = document.querySelector('#hotels-search');
    const hotelsSelect = document.querySelector('#hotels-select');

    searchButton.addEventListener('click', () => {
      this.setState({
        hotelName: hotelsSelect.value,
      });
      this.requireServer();
    });
  };

  requireServer = () => {
    const hotels = {
      name: this.state.hotelName,
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
        console.log(json);
        this.setState({
          reviewData: json.review_data,
        });
      });
  };

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    return (
      <div>
        <h1>호텔 검색</h1>
        <select id="hotels-select" defaultValue="default">
          <option value="default" disabled>
            Choose a Hotel ...
          </option>
          <option value="호텔1">호텔1</option>
          <option value="호텔2">호텔2</option>
          <option value="호텔3">호텔3</option>
        </select>
        <button id="hotels-search">검색</button>
        <h3>{this.state.reviewData}</h3>
      </div>
    );
  }
}
