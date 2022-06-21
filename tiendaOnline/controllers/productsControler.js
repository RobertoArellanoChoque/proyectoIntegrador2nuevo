const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports = {
    index: function (req, res) {
        return res.send('Hola mundo');
    },
    create: function (req, res) {
        return res.send('Hola mundo');

    },
    show: (req, res) => {
        let product = req.query.search;
        let errors = {}

        if (product == "") {
            errors.message = "No completaste este campo";
            res.locals.errors = errors;
            return res.render('searchResults.ejs' )
        } else {
            db.Book.findAll({
                where: {
                    [Op.or]: [
                        { titulo: { [Op.like]: "%" + product + "%", } },
                    ]
                },
                order: [
                    ['titulo', 'ASC']
                ],
                include: [
                    { association: 'usuarios' },
                    { association: 'comentarios' }
                ],
            })
                .then((data) => {

                    if (data != '') {
                        return res.render('searchResults.ejs', { libros: data })
                    } else {
                        errors.message = "No hay resultados para su criterio de búsqueda";
                        res.locals.errors = errors;
                        return res.render('searchResults.ejs')
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    },

};





