const express = require('express');
const router = express.Router();
const { login, getUserList } = require('./../controllers/user.controller');


router.get('/', getUserList);

router.post('/login', login);
 
module.exports = router;