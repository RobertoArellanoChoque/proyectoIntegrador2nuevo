
const user = require("../db/user")

const controladorUsuarios = {

    index: function (req, res) {
        return res.render('profile', {titulo: user}) //sancho
    },
    edit: function (req, res) {
        return res.send('profileEdit')//sancho
    },
    create: function (req, res) {
        return res.send('register')//sancho
    },
    login: function(req, res) {
        return res.send("ruta para el login del usuario")//rober
    }

}


module.exports = controladorUsuarios
