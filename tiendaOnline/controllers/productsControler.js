const data = require("../db/products");
const user = require("../db/user");
const controladorProductos = {
    index: function (req, res) {
        return res.render('product', {
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


