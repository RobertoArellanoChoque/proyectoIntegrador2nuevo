const express = require("express");
const router = express.Router();
const usuarios = require('../controllers/userController')

router.get('/', usuarios.index);
router.get('/profile-edit', usuarios.edit )
router.get('/register', usuarios.create)
router.get('/login', usuarios.login)

module.exports = router;