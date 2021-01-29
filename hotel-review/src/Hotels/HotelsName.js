import React from 'react';

export default class HotelsName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalHotelId: '',
      totalHotelName: '',
    };

    
  }

  getTotalHotelName = () => {
    fetch('http://localhost:3001/api/hotel_name')
      .then((res) => res.json())
      .then((json) => {
        const hotelNames = json.map((hotelData) => hotelData.hotel_name);
        const hotelId = json.map((hotelData) => hotelData.id);

        console.log(json);
        this.setState({
          totalHotelId: hotelId,
          totalHotelName: hotelNames,
        });
      });
  };

  componentDidMount() {
    this.getTotalHotelName();
  }

  render() {
    // state.totalHotelName이 배열이 아닌 객체로 저장되어있음... 왜그런지??
    const totalHotelName = Object.values(this.state.totalHotelName); // 그래서 객체 > 배열로 바꿈
    const repeatHotelNameOption = totalHotelName.map((name, key) => {
      return <option value={key} key={key}>{name}</option>;
    });

    return (
      <div>
        <select id="hotels-select" defaultValue="default">
          <option value="default" disabled>
            Choose a Hotel ...
          </option>
          {repeatHotelNameOption}
        </select>
        <button id="hotels-search">검색</button>
      </div>
    );
  }
}
