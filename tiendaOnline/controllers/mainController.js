const products = require("../db/products")


const controlador = {
    index: function(req, res){
        return res.render("index", {libros: products.lista})
    },

};

module.exports = controlador