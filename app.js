const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
// const User = require('./models/user');

const notFoundController = require('./controllers/notFound');

// const sequelize = require('./util/database');
// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findByPk('68932f15d4ca73d7b862de6c')
//         .then(user => {
//             req.user = new User(user.name, user.email, user.cart, user._id);
//             next();
//         })
//         .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use(notFoundController.get404Error);

mongoose.connect('mongodb+srv://fernando:fernando.29@sandbox.sjuqetg.mongodb.net/shop?retryWrites=true&w=majority&appName=Sandbox')
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));