const express = require("express");
const router = express.Router();
const menuControlaor = require('../controllers/mainController')


router.get('/', menuControlaor.index);



module.exports = router;

