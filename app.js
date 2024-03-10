const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
//=====security measures=====//
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(bodyParser.json());

// ===Request Rate Limiting===//
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20
});
app.use(limiter);

//====Mongo DB connection====//
let uri = "mongodb://127.0.0.1:27017/demoShop";
let options = { user: "", pass: "", autoIndex: true };
mongoose.connect(uri, options)
    .then(() => console.log('Mongo DB Connected Successfully!'));

app.use('/api/v1', router);
//===undefined routes===//
app.use('*', (req, res) => {
    res.status(404).json({
        status: "Fail",
        data: "Undefined url"
    });
});

module.exports = app