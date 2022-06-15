const controladorUsuarios = {

    index: function (req, res) {
        return res.send('Hola mundo');
    },
    edit: function (req, res) {
        return res.send('Hola mundo');
    },
    create: function (req, res) {
        return res.send('Hola mundo');
    },
    login: function (req, res) {
        return res.send('Hola mundo');
    }

}


module.exports = controladorUsuarios

let registerController ={
	index: function(req, res){
		res.render('register')
	},
	store: function(req, res){
		let errors ={}
		if(req.body.email == ""){
			errors.messaje = "el email es obligatorio";
			console.log(errors) //guarda errors en locals
			return res.render('register')
		} else if(req.body.password == ""){
			errors.messaje = "la contrasena es obligatorio";
			console.log(errors) //guarda errors en locals
			return res.render('register')
		} else if(req.body.retyprPassword == ""){
			errors.messaje = "la contrasena es obligatorio";
			console.log(errors) //guarda errors en locals
			return res.render('register')
		} else if(req.password != req.retyprPassword){
			errors.messaje = "las contrasena no coinciden";
			console.log(errors) //guarda errors en locals
			return res.render('register')
		}

	}
}
module.exports = registerController

const bcrypt = require('bcryptjs'); 
const db = require('../database/user.js');

let passEncriptada = bcrypt.hashSync('1234', 10);

db.Usuario.create({
	name: "Manuel",
	username: "manolito",
	password: passEncriptada
});

