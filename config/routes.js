const auth = require('../api/routes/auth');
const posts = require('../api/routes/posts');
const swagerPath = require('../api/routes/swagger');

module.exports = (app, swagger) => {
    app.use('/auth', auth);
    app.use('/posts', posts);

    app.use((req, res, next) => {
       const error = new Error('Not found');
       error.status = 404;
       next(error);
    });
    app.use((error, req, res, next) => {
       res.status(error.status || 500);
       res.json({
          error: { message: error.message }
       });
    });
};