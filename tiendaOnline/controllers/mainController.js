let db = require ("../database/models");



const controladorUsuarios = {
    index: (req, res) => {
        db.Book.findAll({
            order: [
                ['titulo', 'ASC']
            ]
        }).then ((data) => {
            return res.render("index", { libro: data })
        })
    },
};

module.exports = controladorUsuarios;





