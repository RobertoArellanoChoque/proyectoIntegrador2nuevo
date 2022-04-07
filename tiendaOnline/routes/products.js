const express = require("express");
const router = express.Router();
const productos = require ('../controllers/productsControler')

router.get('/', productos.index);
router.get('/product-add', productos.create)



module.exports = router;