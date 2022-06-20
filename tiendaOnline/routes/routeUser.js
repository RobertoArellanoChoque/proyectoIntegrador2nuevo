const express = require("express");
const router = express.Router();
const usuarios = require('../controllers/userController');
let path = require('path');
let multer = require('multer');
//configuracion multer
let storage = multer.diskStorage({ //objeto literal dividido en dos partes
	destination: (req, file, cb) => { //parte 1
		  cb(null, path.join(__dirname, './public/imges/users'));
	},
	filename: (req, file, cb) => { //parte 2
		  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
  })
  let upload = multer({ storage: storage });


router.get('/register', usuarios.register);
router.post('/register', upload.single('profilePhoto'), usuarios.register );

router.get('/', usuarios.index);

router.get('/profile-edit', usuarios.edit);
router.post('/profile-edit',upload.single('profilePhoto'), usuarios.edit ),


router.get('/login', usuarios.login);
router.post('/login', usuarios.login);


router.get('/profile', usuarios.profile);


router.get('/logout', usuarios.logout)



module.exports = router;
