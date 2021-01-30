const session = require(`express-session`);


const MongoStore = require(`connect-mongo`)(session);

const mongoose = require(`mongoose`);


module.exports = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 300000 // 300  * 1000 ms  => 5 mins
            },
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                // time to live = 1 day
                ttl: 24 * 60 * 60
            })
        })
    );
};
