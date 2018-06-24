const express = require('express');
const router = express.Router();

const {
  createComment,
  readAllUsersComments,
  deleteCommentById,
} = require('../controllers/c_comments');

router.get('/', (req, res) => {
  res.status(200).json({
    info: 'Ini router main dari comments!'
  })
})

router.get('/all', readAllUsersComments);
router.post('/:id', createComment);
router.delete('/:id', deleteCommentById);

module.exports = router;