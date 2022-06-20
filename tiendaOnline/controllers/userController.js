


const bcrypt = require('bcryptjs');
let session = require('express-session');
const db = require('../database/models');
const op = db.Sequelize.Op;
let users = db.User // el nombre del alias del modelo
module.exports = {
	index: function (req, res) {
		return res.send('Hola mundo');
	},
	edit: function (req, res) {
		let userId = req.params.uderId;
		users.findByPk(userId)
			.then(function (user) {
				return res.render('profileEdit', { userEdit: user }) //me devuelve todos los datos en un objeto literal

			})
			.catch
	},


	index2: function (req, res) {
		res.render('register')
	},


	create: function (req, res) {
		return res.send('register');
	},
	storeRegister: function (req, res) { //VALIDACIONES: asegurarse que se complete el formulario
		let errors = {} //configuracion de un objeto literal vacio
		if (req.body.email == "") { // si req.body.email es vacio señalar que es obligatorio qu este completo
			errors.messaje = "El email es obligatorio";
			res.locals.errors = errors;//guarda errors en locals
			return res.render('register'{
				title: 'create una cuenta'
			})
		} else if (req.body.apellido == "") {
            errors.message = "El apellido es obligatorio.";
            res.locals.errors = errors;
            return res.render('register', {
                title: 'create una cuenta'
            })

        } else if (req.body.username == "") {
            errors.message = "El username es obligatorio.";
            res.locals.errors = errors;
            return res.render('register', {
                title: 'create una cuenta'
            })
		} else if (req.body.password == "") {
			errors.messaje = "La contrasena es obligatorio";
			return res.render('register', {
                title: 'create una cuenta'
            })

		} else if (req.body.retypePassword == "") {
			errors.messaje = "La contrasena es obligatorio";
			return res.render('register', {
                title: 'create una cuenta'
            })
		} else if (req.password != req.retypePassword) {
			errors.messaje = "Las contrasena no coinciden";
			return res.render('register', {
                title: 'create una cuenta'
            })
			//Los return register te devulven a la pagina para que se complete lo que no se lleno previamente
		} else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
			errors.messaje = "Las extensiones no coinciden";
			return res.render('register', {
                title: 'create una cuenta'
            })
		} else {
			db.User.findOne({
				where: [{ email: req.body.email }]
			})
				.then(function (users) {
					if (users != null) {
						errors.message = "El email ya esta registrado, por favor elija otro.";
						console.log(errors) //guarda errors en locals
						return res.render('register')
					} else {
						let users = { // creo un objeto literal colecciono los datos del formulario para enviarle a la base de datos
							nombre: req.body.nombre,
							apellido: req.body.apellido,
							username: req.body.username,
							email: req.body.email,
							clave: bcypyt.hashSync(req.body.clave, 10), // se le debe hacer el hasheo
							img: req.file.filename,
							fechaDeNacimiento: req.body.fecha_de_nacimiento

						}
						db.users.create(users)
							.then(users => {
								return res.redirect('/')
							})
							.catch(e => { console.log(e) })
					}
				})
		}
	},

	login: function (req, res) {
		return res.send('login');
	},
	storeLogin: function (req, res) {
		let errors = {}
		db.users.findOne({
			where: [{ email: req.body.email }]
		})
			.then(function (users) {
				if (users == null) {
					errors.message = "El usuario no existe";
					res.Locals.errors = errors;
					return res.render('login')
				} else if (bcypt.compareSync(req.body.password, users.password == false)) {
					errors.message = "La contraseña es incorrecta"
					res.Locals.errors = errors;
					return res.render('login')
				} else {
					if (req.body.created_at !== undefined) {
						res.cookie('userId', users.id, { maxAge: 1000 * 60 * 5 })
					}
					req.session.users = users;
					return res.redirect('/')
				}
			})
		}
	}