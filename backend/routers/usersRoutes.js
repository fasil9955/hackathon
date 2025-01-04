const express = require('express');
const { register, login, getAllUsers, deleteUser } = require('../controllers/usersController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;
