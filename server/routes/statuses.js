var express = require('express');
var router = express.Router();
const { cekToken } = require('../middleware/auth')

const {
    createStatus,
    statusById,
    statusList,
    allStatusByUserId,
    deleteStatusByUserId,
} = require('../controllers/c_statuses');

/* GET statuses listing. */
router.get('/allusers', cekToken, statusList); // status all users
router.post('/', cekToken, createStatus); // create status by user token in middleware
router.get('/:id', cekToken, statusById) // detail status by ID
router.get('/user/:id', cekToken, allStatusByUserId) // all status by user ID
router.delete('/:id', cekToken, deleteStatusByUserId) // delete by id status, access by id in token

module.exports = router;
