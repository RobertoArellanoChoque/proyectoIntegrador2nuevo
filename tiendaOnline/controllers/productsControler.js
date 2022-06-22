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
                    { association: 'comentarios' },
                    { association: 'usuarios' }
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
let id = req.params.id

        db.Book.findByPk(id, {
            include: [
                { association: 'comentarios',
                include: {association: 'usuarios'}
             },
                { association: 'usuarios' }
            ],
        })
            .then((function(data) {
                res.render('product', {libro : data})
            }))
            .catch((err) => {
                console.log(err)
            })

    }

};

module.exports = controladorProudctos;





