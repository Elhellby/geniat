const router = require('express-promise-router')();

const {
    getAllPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

router.get('/', getAllPost);
router.post('/', createPost);
router.put('/', updatePost);
router.delete('/:id', deletePost);

module.exports = router;