var express = require('express');
var router = express.Router();
const {
  findUser,
  allUsers,
  registerUser,
  loginUser,
  deleteUser,
} = require('../controllers/c_users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    info: 'respond with a resource users'
  });
});

router.get('/all', allUsers);
router.get('/:id', findUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);

module.exports = router;
