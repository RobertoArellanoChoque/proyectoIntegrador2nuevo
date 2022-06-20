const db = require('../database/models');
const Op = db.Sequelize.Op;


const productos = {
    index: function (req, res) {
        return res.send('Hola mundo');
    },
    create: function (req, res) {
        return res.send('Hola mundo');

    },
    show: (req, res) => {
        const productSearch = req.query.search;
        const errors = {}
        if (productSearch == "") {
            errors.messege = "Este campo no puede estar vacio";
            res.locals.errors = errors;
            return res.render('searchResults', { resultado: errors })
        } else {
            db.Book.findAll({
                where: {
                    [Op.or]: [
                        { titulo: { [Op.like]: "%" + productSearch + "%", } },
                        { descripción: { [Op.like]: "%" + productSearch + "%", } },
                    ],
                },
                order: [
                    ['titulo', 'ASC'],
                ],
                limit: 5,
                include: [
                    {association: "generos"},
                    {association: "usuarios"}
                   
                ]
            }
            ).then (resultado => {
                if (resultado == "") {
                    errors.message = "No hay resultado para tu busqueda";
                    res.local.errors = error;
                    return res.render('searchResults', { error: errors })
                }
                else {
                    return res.render('searchResults', { libros: resultado })
                }
            })
                .catch(error => {
                    console.log(error)
                })
        }

    },
    detail: function (req, res) {
        return res.send('Hola mundo');
    }



};

module.exports= productos



