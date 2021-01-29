import React from 'react';

export default class HotelsName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalHotelName: '',
    };
  }

  getTotalHotelName = () => {
    fetch('http://localhost:3001/api/hotel_name')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          totalHotelName: json,
        });
      });
  };

  getCountry = () => {
    const countryList = this.state.totalHotelName.map((obj) => obj.country);

    console.log(countryList);
  };

  componentDidMount() {
    this.getTotalHotelName();
  }

  render() {
    return (
      <div>
        <select id="hotels-select" defaultValue="default">
          <option value="default" disabled>
            Choose a Hotel ...
          </option>
          <option value={this.state.totalHotelName.id}>{this.state.totalHotelName.hotel_name}</option>
        </select>
        <button id="hotels-search">검색</button>
      </div>
    );
  }

  // this.state.totalHotelName.id 이부분 오류..
  // state에 안들어간건지 모르겠음. 해결 필요.
}
