//Application Imports
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const routes = require('./routes/route');
const utils = require('./utils');
//Application Middlewares
app.use(express.json());
app.use(cookieParser())
app.set('trust proxy', 1);
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true
}));
app.use(
    session({
        key: "user_sid",
        secret: "THE_SECRET_KEY",
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 36000000,
            httpOnly: true
        }
    })
);
app.use((req, res, next) => {
    if (req.body.ciphertext) {
        req.body.data = { ...req.body.data, ...utils.decrypt(req.body.ciphertext) };
    }
    next();
});
app.use(routes);
//Running Application
app.listen(port, () => { console.log(`running on http://localhost:${port}`); });
