const router = require('express').Router();

const { get } = require('express/lib/response');
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend

} = require('../../controllers/userController');

router

.route('/')
.get()
.post();