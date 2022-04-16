
const user = require("../db/user")

const controladorUsuarios = {

    index: function (req, res) {
        return res.render('profile', {
            titulo: user,
            img: user,

        }) //sancho
    },
    edit: function (req, res) {
        return res.render('profileEdit', {
            info: user,
            img: user,
        }//sancho
        )
    },
    create: function (req, res) {
        return res.render('register')//sancho
    },
    login: function (req, res) {
        return res.render('login')//rober
    }

}


module.exports = controladorUsuarios
