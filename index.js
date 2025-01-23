require("dotenv").config();
require("./server/config/db_connect");

const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});


require("./server/routers/personnels/personnel_profile")(app);
require("./server/routers/auth/auth")(app);


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});




