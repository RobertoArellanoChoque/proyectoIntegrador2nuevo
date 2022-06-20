const db = require('../database/models');
const op = db.Sequelize.Op;


const productos = {
    index: function (req, res) {
        return res.send('Hola mundo');
    },
    create: function (req, res) {
        return res.send('Hola mundo');

    },
    show: (req, res) => {
        const id = req.query.search;
        db.Book.findAll()
         .then((resultado) => {
            res.render('searchResults', { libros: resultado })
         });

    },
    detail: function (req, res) {
        return res.send('Hola mundo');
    }



};

module.exports= productos



