const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lunyiyao20030110.',
  database: 'crowdfunding_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database!');
});

// 在这里添加您的数据库交互代码

connection.end();