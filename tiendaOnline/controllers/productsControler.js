const data = require("../db/products");

const controladorProductos = {
    index: function (req, res) {
        return res.send("Esta es la ruta para listar los productos ")
    },
    create: function (req, res) {
        return res.send("Esta es la ruta para el formulario de creación de producto")

    },
    show: function (req, res) {
        return res.send("Esta es la ruta para mostrat la busqueda de productos")

    },



};

module.exports = controladorProductos;


