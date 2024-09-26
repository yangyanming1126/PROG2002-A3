var express = require('express');
var cors = require('cors');  // 引入 cors 模块

var app = express();

var crowdfundingAPI = require("./controllerAPI/api-controller");

var bodyparser = require("body-parser");

app.use(cors());  // 启用 CORS，允许所有来源的跨域请求

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/api", crowdfundingAPI);

app.listen(3000, () => {
    console.log("Server up and running on port 3000");
});