import React from 'react';

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hotelName: '' };
  }

  handleSearch = () => {
    const searchButton = document.querySelector('#hotels-search');
    const hotelsSelect = document.querySelector('#hotels-select');

    searchButton.addEventListener('click', () => {
      console.log(hotelsSelect.value);
      this.setState({
        hotelName: hotelsSelect.value,
      });
      this.requestServer();
    });
  };

  requestServer = () => {
    const hotels = {
      name: this.state.hotelName,
    };

    fetch('http://localhost:3001/text', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(hotels),
    });
  };

  componentDidMount = () => {
    this.handleSearch();
  };

  render() {
    return (
      <div>
        <h1>호텔 검색</h1>
        <select id="hotels-select">
          <option value="호텔1" selected>
            호텔1
          </option>
          <option value="호텔2">호텔2</option>
          <option value="호텔3">호텔3</option>
        </select>
        <button id="hotels-search">검색</button>
      </div>
    );
  }
}
