import React, { useState } from 'react';
import HotelsResult from './HotelsResult';
import axios from 'axios';

function HotelsSearch() {
  const [positiveReviews, setPositiveReviews] = useState([]);
  const [negativeReviews, setNegativeReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clickSearch = () => {
    const selectedHotelName = document.querySelector('#hotels-select').value;
    
    fetchReviewAPI(selectedHotelName);
  };

  const fetchReviewAPI = async(value) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post('http://localhost:3001/api/hotel_review', { name: value });
      const positiveReview = getPositiveReview(response.data);
      const negativeReview = getNegativeReview(response.data);
      
      const positiveReviewWords = getBasicWord(positiveReview).split(',');
      const negativeReviewWords = getBasicWord(negativeReview).split(',');

      setPositiveReviews(positiveReviewWords);
      setNegativeReviews(negativeReviewWords);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const getPositiveReview = (datas) => {
    return datas.filter((data) => data.grade > 7);
  }

  const getNegativeReview = (datas) => {
    return datas.filter((data) => data.grade <= 7);
  }

  const getBasicWord = (data) => {
    let reviewDataAll = '';

    data.forEach((reviewData) => {
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

  if (loading) return <div>로딩중..</div>
  if (error) return <div>에러가 발생했습니다.</div>
  return (
    <div>
      <button id="hotels-search" onClick={clickSearch}>검색</button>
      <HotelsResult positiveWords={positiveReviews} negativeWords={negativeReviews} />
    </div>
  );
}

export default HotelsSearch;