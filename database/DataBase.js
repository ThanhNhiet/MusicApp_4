const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Cấu hình CORS
app.use(cors());
app.use(bodyParser.json());

// Kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sa123',
  database: 'AppNhac',
  port: 3306
});

// Kiểm tra kết nối
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err.stack);
    return;
  }
  console.log('Đã kết nối MySQL với id ' + connection.threadId);
});

// Lấy danh sách bài hát từ MySQL
app.get('/songs', (req, res) => {
  connection.query('SELECT * FROM songs', (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
    }
    res.json(results);  // Trả về dữ liệu dưới dạng JSON
  });
});

app.get('/artists', (req, res) => {
    connection.query('SELECT * FROM Artists', (err, results) => {
        if (err) {
        console.error('Lỗi truy vấn:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        }
        res.json(results);  // Trả về dữ liệu dưới dạng JSON
    });
});

app.get('/albums', (req, res) => {
    connection.query('SELECT * FROM Albums', (err, results) => {
        if (err) {
        console.error('Lỗi truy vấn:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        }
        res.json(results);  // Trả về dữ liệu dưới dạng JSON
    });
});

app.get('/recommends', (req, res) => {
    connection.query('SELECT * FROM Recommends', (err, results) => {
        if (err) {
        console.error('Lỗi truy vấn:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
        }
        res.json(results);  // Trả về dữ liệu dưới dạng JSON
    });
});

app.get('/suggestions', (req, res) => {
  connection.query('SELECT * FROM Suggestions', (err, results) => {
      if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
      }
      res.json(results);  // Trả về dữ liệu dưới dạng JSON
  });
});

app.get('/charts', (req, res) => {
  connection.query('SELECT * FROM Charts', (err, results) => {
      if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
      }
      res.json(results);  // Trả về dữ liệu dưới dạng JSON
  });
});

app.get('/comments', (req, res) => {
  connection.query('SELECT C.*, R.* FROM comments C JOIN replies R ON C.id = R.comment_id', (err, results) => {
      if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
      }
      res.json(results);  // Trả về dữ liệu dưới dạng JSON
  });
});

app.get('/posts', (req, res) => {
  connection.query('SELECT * FROM Posts', (err, results) => {
      if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
      }
      res.json(results);  // Trả về dữ liệu dưới dạng JSON
  });
});
// Lắng nghe trên cổng 5000 và IP 192.168.1.18
app.listen(5000, '192.168.101.7', () => {
  console.log('Server đang chạy trên cổng 5000');
});
