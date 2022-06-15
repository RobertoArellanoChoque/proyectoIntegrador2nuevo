const express = require("express");
const router = express.Router();
const productos = require ('../controllers/productsControler')

router.get('/detalle', productos.detail);
router.get('/', productos.index);
//router.get('/product-add', upload.single('imageProduct'), productos.create);
//router.post('/product-add',upload.single('imageProduct'), productos.create);
router.get('/search-results', productos.show);


module.exports = router;