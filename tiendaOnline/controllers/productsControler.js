const data = require("../db/products");

const controladorProductos = {
    index: function (req, res) {
        return res.send("Esta es la ruta para listar los productos ")
    },
    create: function (req, res) {
        return res.render('product',)

    },
    show: function (req, res) {
        return res.send('searchResults',)

    },



};

module.exports = controladorProductos;


