var express = require('express');
var cors = require('cors');  // "Import the `cors` module."

var app = express();

var crowdfundingAPI = require("./controllerAPI/api-controller");

var bodyparser = require("body-parser");

app.use(cors());  // "Enable CORS to allow cross-origin requests from all sources."

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/api", crowdfundingAPI);

app.listen(3000, () => {
    console.log("Server up and running on port 3000");
});