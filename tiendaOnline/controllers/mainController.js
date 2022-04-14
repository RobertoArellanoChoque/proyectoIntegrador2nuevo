const products = require("../db/products")


const controlador = {
    index: function(req, res){
        return res.render('index',)
    },
    show: function(req, res){
        return res.send("Aqui va el menu ya logeado")
    }


};



module.exports = controlador