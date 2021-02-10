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
                maxAge: 3600000 // 1 hour
            },
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                // time to live = 1 day
                ttl: 24 * 60 * 60
            })
        })
    );
};
