const products = require("../db/products");
const user = require("../db/user");
const imagen = require("../db/ImagenesExtras");
const controladorProductos = {
    index: function (req, res) {
        return res.render('product', {
            lista: products,
            titulo: products.lista,
            img: products.lista,
            lanzamiento: products.lista,
            usuario: user,
            imag: imagen,
           
        })
    },
    create: function (req, res) {
        return res.render('productAdd', {
            usuario: user,
        })

    },
    show: function (req, res) {
        return res.render('searchResults',)

    },
    detail: function(req, res){
        return res.render('detalle',{
            titulo: products.lista,
            img: products.lista,
            lanzamiento: products.lista,
        })
    }



};

module.exports = controladorProductos;


