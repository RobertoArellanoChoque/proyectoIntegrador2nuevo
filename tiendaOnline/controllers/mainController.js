let db = require("../database/models");



const controladorUsuarios = {
    index: (req, res) => {
        db.Book.findAll({
            order: [
                ['titulo', 'ASC']
            ]
        }).then((data) => {
            return res.render("index", { libro: data })
        })
    },
    show: function (req, res) {
        const id = req.params.id
        db.User.findByPk(id)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    edit: function (req, res) {
        const id = req.params.id
        db.User.findByPk(id)
            .then((data) => {
                res.render('profileEdit', {user: data}),{

                }


                
            })
            .catch((err) => {
                console.log(err)
            })



    }
}

    module.exports = controladorUsuarios;





