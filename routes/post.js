const express = require('express');
const router = express.Router();
const { createPost, updatePost, deletePost, getAllPosts } = require('../controllers/postController');

router.get('/', getAllPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
