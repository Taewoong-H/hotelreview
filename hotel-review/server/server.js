import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'hotel_review',
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// 호텔 이름 API
app.get('/api/hotel_name', (req, res) => {
  connection.query('SELECT * FROM hotel_name_list', (err, rows, fields) => {
    if (err) {
      console.log('데이터 가져오기 실패');
    } else {
      res.send(rows);
    }
  });
});

// 호텔 리뷰 API
app.post('/api/hotel_review', (req, res) => {
  // 데이터 받는 곳
  const requestHotelName = req.body.name;
  console.log(req);

  // query문
  connection.query('SELECT * FROM csv', function (err, rows, fields) {
    if (err) {
      console.log('데이터 가져오기 실패');
    } else {
      const sendAllReview = rows.filter((row) => {
        return row.hotel_name == requestHotelName;
      });

      // console.log(sendAllReview);
      res.send(sendAllReview);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
