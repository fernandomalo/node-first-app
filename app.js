const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRouter);

app.use((req, res, next) => {
    res.status(404).render('not-found', { pageTitle: 'Page Not Found' });
})

app.listen(3000);