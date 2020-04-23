const express = require("express");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("",checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        topic: req.body.topic,
        publisher: req.body.publisher
    });
    post.save().then(createdpost => {
        res.status(201).json({
            message: 'post added successfully',
            postId: createdpost._id
        });
    });
});

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        comment : req.body.comment
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "Update successful!" });
    });
});

router.get("", (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'posts sent succefully',
            posts: documents
        });
    });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    });
});

module.exports = router;