const express = require("express");
const router = express.Router();
const menuControlaor = require('../controllers/mainController')


router.get('/', menuControlaor.index);
router.get('/loged', menuControlaor.show);



module.exports = router;