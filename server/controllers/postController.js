const Post = require("../model/post");

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Posts fetched successfully.',
            data: posts,
            success: true
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts.', success: false });
    }
};

const createPost = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ message: 'Title and body are required.', success: false });
        }

        const newPost = new Post({ title, body });
        await newPost.save();

        res.status(201).json({ data: newPost, message: 'Post created successfully.', success: true });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post.', success: false });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, body },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }

        res.status(200).json({ data: updatedPost, message: 'Post updated successfully.', success: true });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Failed to update post.', success: false });
    }
};


const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }

        res.status(200).json({ message: 'Post deleted successfully.', success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post.', success: false });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
};
