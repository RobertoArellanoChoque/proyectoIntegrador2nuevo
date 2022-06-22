const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
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

// rutas de usuario register
router.get('/register', userController.register);
router.post('/register', upload.single('profilePhoto'), userController.storeRegister );

router.get('/', userController.index);

//ruta de usuario profile edit 
router.get('/profile-edit/user:Id', userController.edit);//preguntar
router.post('/profile-edit',upload.single('profilePhoto'), userController.edit ),

//ruta de usuario login
router.get('/login', userController.login);
router.post('/login', userController.storeLogin);


router.get('/profile', userController.profile);

//ruta de logout
router.get('/logout', userController.logout)



module.exports = router;
