

//const upload = multer({ dest: '/usuarios' })
const path = require('path');
const bcrypt = require('bcryptjs'); 
const db = require('../database/models');
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
    },
    index2: function(req, res){
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

	},
     store: function(req, res) {
        console.log(req.body);
        },

}


module.exports = controladorUsuarios

//var storage = multer.diskStorage({
	//destination: (req, file, cb) => {
	//	  cb(null, path.join(__dirname, './public/imges/products'));
	//},
	//filename: (req, file, cb) => {
	//	  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	//}
  //})
   //upload = multer({ storage: storage });

