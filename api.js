const express = require('express');
const router = express.Router();
const db = require('./database'); // 导入您的数据库连接

// 获取所有捐款的API
router.get('/donations', (req, res) => {
    db.query('SELECT * FROM DONATION', (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving donations: ' + err.message);
        }
        res.json(results);
    });
});

module.exports = router;
