const db = require('../database/models');
const Op = db.Sequelize.Op;


const controladorProudctos = {
    index: function (req, res) {
        return res.send('Hola mundo');
    },
    create: function (req, res) {
        return res.send('Hola mundo');

    },
    show: function (req, res) {
        let product = req.query.search;
        let errors = {}

        if (product == "") {
            errors.message = "No se encontro tu busqueda";
            res.locals.errors = errors;
            return res.render('searchResults', { error: errors })
        } else {
            db.Book.findAll({
                where: {
                    [Op.or]: [
                        { titulo: { [Op.like]: "%" + product + "%", } },
                        { descripcion: { [Op.like]: "%" + product + "%", } },
                    ]
                },
                order: [
                    ['titulo', 'ASC']
                ],
                limit: 1,
                include: [
                    { association: 'usuarios' },
                    { association: 'comentarios' },
                ],
            })
                .then((data) => {
                    if (data != '') {
                        return res.render('searchResults', { libro: data })
                    } else (data == product); {
                        errors.message = "No se encontro el libro que buscas";
                        res.locals.errors = errors;
                        return res.render('searchResults',)
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    },
    detail: function (req, res) {
        db.Book.findByPk(req.params.id)
            .then((function(data) {
                console.log(data)
            }))
            .catch((err) => {
                console.log(err)
            })

    }

};

module.exports = controladorProudctos;





