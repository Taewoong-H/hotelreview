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
  database: 'hello',
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/text', (req, res) => {
  const user_id = req.body.inText;
  console.log(user_id);
  // query문 추가
  connection.query('INSERT INTO new_table (user_id) values(?)', [user_id]),
    function (err, rows, fields) {
      if (err) {
        console.log('DB저장 실패');
      } else {
        console.log('DB저장 성공');
      }
    };
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
