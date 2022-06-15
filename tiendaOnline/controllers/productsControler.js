const db = require('../database/models');

const controladorProductos = {
    index: function (req, res) {
        return res.send('Hola mundo');
    },
    create: function (req, res) {
        return res.send('Hola mundo');

    },
    show: (req, res) => {

        db.Book.findAll()
            .then(function (respuesta) {
                res.send(respuesta)
            })
    },
    detail: function (req, res) {
        return res.send('Hola mund');
    }



};

module.exports = controladorProductos;


