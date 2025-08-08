const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const authRouter = require('./routes/auth');

const User = require('./models/user');

const notFoundController = require('./controllers/notFound');

// const sequelize = require('./util/database');
// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

const MONGODB_URI = 'mongodb+srv://fernando:fernando.29@sandbox.sjuqetg.mongodb.net/shop?retryWrites=true&w=majority&appName=Sandbox'

const store = new MongoDBSession({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }));

app.use((req, res, next) => {
    User.findById('6894c22047b7b3e1d6526aa2')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRouter);
app.use(authRouter);

app.use(notFoundController.get404Error);

mongoose.connect(MONGODB_URI)
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Fernando',
                        email: 'fernando@example.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            })
        app.listen(3000);
    })
    .catch(err => console.log(err));