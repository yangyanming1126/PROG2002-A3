const express = require('express');
const app = express();
const donationsRouter = require('./api'); // 导入API路由

app.use('/api', donationsRouter); // 使用API路由

const PORT = process.env.PORT || 0110;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
