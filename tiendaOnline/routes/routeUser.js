const express = require("express");
const router = express.Router();
const usuarios = require('../controllers/userController')
const path = require('path');
const multer = require('multer');
let upload = multer({ dest: '/usuarios' })


router.get('/', usuarios.index);
router.get('/profile-edit', usuarios.edit )
router.get('/register', upload.single('profilePhoto'), usuarios.create)
router.get('/login', usuarios.login)
router.post('/register', upload.single('profilePhoto'),  usuarios.create);

module.exports = router;
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, path.join(__dirname, './public/imges/users'));
	},
	filename: (req, file, cb) => {
		  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
  })
   upload = multer({ storage: storage });
