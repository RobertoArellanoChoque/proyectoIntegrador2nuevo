const express = require("express");
const router = express.Router();
const productos = require ('../controllers/productsControler')

router.get('/', productos.index);


module.exports = router;