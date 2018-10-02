const express = require('express');
const postsController = require('../controllers/postsController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.get('/page/:page', postsController.getPosts);

router.get('/:postId', postsController.getPostById);

router.post('/', checkAuth, postsController.addPost);

router.patch('/:postId', checkAuth, postsController.updatePostById);

router.delete('/:postId', checkAuth, postsController.deletePostById);

module.exports = router;