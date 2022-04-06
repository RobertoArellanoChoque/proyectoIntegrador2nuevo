var express = require('express');
var router = express.Router();
const mainControler =  require("../controllers/mainControler")

/* GET home page. */
router.get("/", mainControler.index);
router.get("/")



module.exports= router

