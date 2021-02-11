import React from 'react';
import ResultContainer from './ResultContainer';
import Store from '../store';

export default class HotelsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: [],
    };
  }

  handleSearch() {
    const searchButton = document.querySelector('#hotels-search');
    const hotelsSelect = document.querySelector('#hotels-select');

    searchButton.addEventListener('click', () => {
      const selectedHotelName = hotelsSelect.value;
  
      this.getHotelReviewAPI(selectedHotelName);
    });
  };

  getHotelReviewAPI(selectedHotelName) {
    const hotels = {
      name: selectedHotelName,
    };

    fetch('http://localhost:3001/api/hotel_review', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(hotels),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        const reviewDataAll = this.getBasicWord(json).split(',');
        
        this.setState({
          reviewData: [...reviewDataAll],
        });
      });
  };

  getBasicWord(json) {
    let reviewDataAll = [];

    json.forEach((reviewData) => {
      let words = reviewData.review_data2;
      words = words.split("'");
      const deleteSpecialCharacter = ["[", ", ", "]", "[]"];

      deleteSpecialCharacter.forEach((character) => {
        while(words.indexOf(character) !== -1) {
          words.splice(words.indexOf(character), 1);
        }
      });
      reviewDataAll += words;
    });

    return reviewDataAll;
  }

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    return (
      <div>
        <Store.Provider value={this.state}>
          <button id="hotels-search">검색</button>
          <ResultContainer />
        </Store.Provider>
      </div>
    );
  }
}
