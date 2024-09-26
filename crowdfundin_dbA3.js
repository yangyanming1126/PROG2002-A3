const mysql = require('mysql2');

// 创建数据库连接配置
const connection = mysql.createPool({
    host: 'localhost', // 数据库服务器地址
    user: 'root', // 数据库用户名
    password: 'Lunyiyao20030110.', // 数据库密码
    database: 'crowdfunding_db' // 数据库名
});

module.exports = connection;
