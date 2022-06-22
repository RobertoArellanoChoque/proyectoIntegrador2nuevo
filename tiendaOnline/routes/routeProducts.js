const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
let productos = require ('../controllers/productsControler');

//let upload = multer({ dest: '/productos' });
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		  cb(null, path.join(__dirname, '../public/imges/products'));
	},
	filename: (req, file, cb) => {
		  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
  })
    upload = multer({ storage: storage })


router.get('/detalle/:id?', productos.detail);
router.post('/detalle/:id?', productos.detailEdit);
router.get('/', productos.index);
//router.get('/product-add', upload.single('imageProduct'), productos.create);
//router.post('/product-add',upload.single('imageProduct'), productos.create);
router.get('/search-results', productos.show);
///productos/product-add
router.get('/product-add', productos.addProducts)
router.post('/product-add', upload.single('img-producto'), productos.store)
router.post('/destroy/:id', productos.destroy)

router.get('/edit/:id', productos.editProducts)
//router.post('/edit/editProducts', upload.single('img-producto'), productos.update);

/*router.post('/product-add', (req, res, next)=> {
	console.log('guardar producto...');
	console.log(req.body);
	res.send('guardado completo');
});*/

module.exports = router;

