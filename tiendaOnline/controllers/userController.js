const controladorUsuarios = {

    index: function (req, res) {
        return res.send("Ruta para mostrar datos del usuario")
    },
    edit: function (req, res) {
        return res.send("Ruta para editar el perfil")
    },
    create: function (req, res) {
        return res.send("Ruta para crear perfil")
    },
    login: function(req, res) {
        return res.render("login")
    }

}


module.exports = controladorUsuarios