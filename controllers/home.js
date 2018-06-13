/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

    // throw new Error('Test Error');

    res.render('home', {
        title: 'Home'
    });
};
