const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const notFoundController = require('./controllers/notFound');

const sequelize = require('./util/database');
const mongoConnect = require('./util/database');

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use(notFoundController.get404Error);

mongoConnect(client => {
    console.log(client);
    app.listen(3000);
})
