const express = require('express');
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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

app.post('/text', (req, res) => {
  // 데이터 받는 곳
  const text1 = req.body.name;
  console.log(text1);

  // 데이터 보내는 곳
  /*
  let sendData;
  if (text1 == '호텔1') {
    sendData = {
      data: '호텔1 데이터 test',
    };
  } else if (text1 == '호텔2') {
    sendData = {
      data: '호텔2 데이터 test',
    };
  } else {
    sendData = {
      data: '호텔3 데이터 test',
    };
  }
  res.send(sendData);
  */

  // query문
  connection.query('SELECT * FROM csv', function (err, rows, fields) {
    if (err) {
      console.log('데이터 가져오기 실패');
    } else {
      console.log(rows[0]);
      res.send(rows[0]);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
