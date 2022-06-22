const express = require("express");
const router = express.Router();
const menuControlaor = require('../controllers/mainController')


router.get('/', menuControlaor.index);
router.get('/info/:id?', menuControlaor.show);
router.get('/edit/:id?', menuControlaor.edit);


module.exports = router;

