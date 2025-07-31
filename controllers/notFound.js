const path = require("../util/path");

exports.get404Error = (req, res, next) => {
    res.status(404).render('not-found', { pageTitle: 'Page Not Found', path: '/404' });
}