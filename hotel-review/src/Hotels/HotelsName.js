import React from 'react';

export default class HotelsName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalHotels: [],
      selected: {
        country: '',
        location: '',
        hotelName: '',
      }
    };
  }

  getHotelNameAPI() {
    fetch('http://localhost:3001/api/hotel_name')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          totalHotels: json,
        });
      });
  };

  handleCountrySelect() {
    const countrySelect = document.querySelector('#country-select');
    const locationSelect = document.querySelector('#location-select');
    const hotelsSelect = document.querySelector('#hotels-select');

    countrySelect.addEventListener('change', (event) => {
      this.setState({
        selected: {
          country: event.target.value,
        }
      });
      // 호텔, 지역 선택값 초기화
      locationSelect.options[0].selected = true;
      hotelsSelect.options[0].selected = true;
    });
  }

  handleLocationSelect() {
    const locationSelect = document.querySelector('#location-select');
    const hotelsSelect = document.querySelector('#hotels-select');

    locationSelect.addEventListener('change', (event) => {
      this.setState({
        selected: {
          ...this.state.selected, // setState를 그냥 하면 country가 초기화됨.. 그래서 그대로 가져가는걸 ...(전개연산자)로 덮어씌우고 설정한다.
          location: event.target.value,
        }
      });
      // 호텔 선택값 초기화
      hotelsSelect.options[0].selected = true;
    });
  }

  componentDidMount() {
    this.getHotelNameAPI();
    this.handleCountrySelect();
    this.handleLocationSelect();
  }

  render() {
    const { selected, totalHotels } = this.state; // 그대로 가져오면 안됨. {}으로 객체 자체를 가져와서 배열로 할당.

    // country
    const selectCountries = totalHotels.map((obj) => obj.country);
    const uniqueSelectCountries = [...new Set(selectCountries)];
    const mappingSelectCountries = uniqueSelectCountries.map((obj, key) => {
      return <option value={obj} key={key}>{obj}</option>;
    });

    // location
    const locationsEqualToCountry = totalHotels.filter((obj) => {
      if (selected.country === obj.country) {
        return obj.location
      }
    });
    const selectLocations = locationsEqualToCountry.map((obj) => obj.location);
    const uniqueSelectLocations = [...new Set(selectLocations)];
    const mappingSelectLocations = uniqueSelectLocations.map((obj, key) => {
      return <option value={obj} key={key}>{obj}</option>;
    })

    // hotel_name
    const hotelNameEqualToLocation = totalHotels.filter((obj) => {
      if (selected.location === obj.location) {
        return obj.hotel_name
      }
    });
    const selectHotelNames = hotelNameEqualToLocation.map((obj) => obj.hotel_name);
    const mappingSelectHotelNames = selectHotelNames.map((name, key) => {
      return <option value={name} key={key}>{name}</option>;
    });

    return (
      <div>
        <label>나라: </label>
        <select id="country-select" defaultValue="default">
          <option value="default" disabled>
            Choose a Country ...
          </option>
          {mappingSelectCountries}
        </select>
        <br></br>

        <label>지역: </label>
        <select id="location-select" defaultValue="default">
          <option value="default" disabled>
            Choose a Location ...
          </option>
          {mappingSelectLocations}
        </select>
        <br></br>
        
        <label>호텔 이름: </label>
        <select id="hotels-select" defaultValue="default">
          <option value="default" disabled>
            Choose a Hotel ...
          </option>
          {mappingSelectHotelNames}
        </select>
      </div>
    );
  }
}
