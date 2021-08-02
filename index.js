const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
const cors = require('cors')
require('./models/User');
require('./models/Air')
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

require('./routes/authRoutes')(app)
require('./routes/airRoutes')(app)

if (process.env.NODE_ENV = 'production') {
    /*
    Express will server up production assets
    like our main.js or main.css files
    */
    app.use(express.static('client/build'));

    // Express will serve up index.html file
    // if it doen't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The app is running on ${PORT}`)
});