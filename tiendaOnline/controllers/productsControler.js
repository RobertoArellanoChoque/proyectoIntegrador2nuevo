const products = require("../db/products");
const user = require("../db/user");
const controladorProductos = {
    index: function (req, res) {
        return res.render('product', {
            titulo: products.lista,
            img: products.lista,
            lanzamiento: products.lista,
            usuario: user,
           
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



};

module.exports = controladorProductos;


