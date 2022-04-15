const data = require("../db/products");

const controladorProductos = {
    index: function (req, res) {
        return res.render('product')
    },
    create: function (req, res) {
        return res.render('productAdd',)

    },
    show: function (req, res) {
        return res.render('searchResults',)

    },



};

module.exports = controladorProductos;


