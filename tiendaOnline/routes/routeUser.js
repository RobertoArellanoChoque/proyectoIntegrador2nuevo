const express = require("express");
const router = express.Router();
const usuarios = require('../controllers/userController')
let path = require('path');
let multer = require('multer');



router.get('/', usuarios.index);
router.post('/profile-edit', usuarios.edit )
router.get('/login', usuarios.login)

let storage = multer.diskStorage({ //objeto literal dividido en dos partes
	destination: (req, file, cb) => { //parte 1
		  cb(null, path.join(__dirname, './public/imges/users'));
	},
	filename: (req, file, cb) => { //parte 2
		  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
  })
  let upload = multer({ storage: storage });
 router.post('/register', upload.single('profilePhoto'),  usuarios.create);
module.exports = router;
