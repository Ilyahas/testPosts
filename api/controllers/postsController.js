const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const Post = require('../models/Post');

function getPosts(req, res, next) {
    const perPage = 10,
        page = Math.max(0, req.param('page') - 1);
    Post.find()
        .select()
        .limit(perPage)
        .skip(perPage * page)
        .exec()
        .then(docs => {
            if(docs.length > 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({ message: 'No Posts' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

function getPostById(req, res, next) {
    const postId = req.params.postId;
    Post.findById(postId)
        .select()
        .exec()
        .then(doc => {
            console.log('[database]: ', doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "No object found for provided id"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

function addPost(req, res, next) {
    const postData = req.body;
    if (postData.body.length > 200) {
        res.status(500).json({error: 'The Post\'s content is too long'});
    }
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: req.userData.username,
        body: postData.body
    });
    post.save().then(result => {
        res.status(200).json({id: result._id});
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

function updatePostById(req, res, next) {
    const postId = req.params.postId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Post.update({ _id: postId }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Post updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

function deletePostById(req, res, next) {
    const postId = req.params.postId;
    Post.remove({ _id: postId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

module.exports = {
    getPosts,
    getPostById,
    addPost,
    updatePostById,
    deletePostById
};