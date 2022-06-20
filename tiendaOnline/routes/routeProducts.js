const express = require("express");
const router = express.Router();
const productos = require ('../controllers/productsControler');
const multer = require('multer');
const path = require('path');
let upload = multer({ dest: '/productos' });


router.get('/detalle', productos.detail);
router.get('/', productos.index);
router.get('/product-add', upload.single('imageProduct'), productos.create);
router.post('/product-add',upload.single('imageProduct'), productos.create);
router.get('/search-results', productos.show);


module.exports = router;


var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, path.join(__dirname, './public/imges/products'));
	},
	filename: (req, file, cb) => {
		  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
  })
    upload = multer({ storage: storage })