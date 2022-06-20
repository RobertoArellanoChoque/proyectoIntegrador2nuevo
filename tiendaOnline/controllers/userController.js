


const bcrypt = require('bcryptjs');
let session = require('express-session');
const db = require('../database/models');
const op = db.Sequelize.Op;




let users = db.User // el nombre del alias del modelo
module.exports = {

	create: function (req, res) {
		return res.send('register');
	},
	storeRegister: function (req, res) { //VALIDACIONES: asegurarse que se complete el formulario
		let errors = {} //configuracion de un objeto literal vacio
		if (req.body.email == "") { // si req.body.email es vacio señalar que es obligatorio qu este completo
			errors.messaje = "El email es obligatorio";
			console.log(errors) //guarda errors en locals
			return res.render('register')
		} else if (req.body.password == "") {
			errors.messaje = "La contrasena es obligatorio";
			console.log(errors) //guarda errors en locals
			return res.render('register')
		} else if (req.body.retypePassword == "") {
			errors.messaje = "La contrasena es obligatorio";
			console.log(errors) //guarda errors en locals
			return res.render('register')
		} else if (req.password != req.retypePassword) {
			errors.messaje = "Las contrasena no coinciden";
			console.log(errors) //guarda errors en locals
			return res.render('register')
			//Los return register te devulven a la pagina para que se complete lo que no se lleno previamente
		} else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
			errors.messaje = "Las extensiones no coinciden";
			console.log(errors)
			return res.render('register')
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
						db.User.create(users)
							.then(userGuardado => {
								return res.redirect('/login')
							})
							.catch(error => console.log(error))
					}
				})
		}
	},
	
	edit: function (req, res) {
		const id = req.params.id

		if (req.session.user) {
			if (id != req.session.user.id) {
				return res.redirect(`profileEdit/${req.session.user.id}`) /* Forma hacer que solo el duenio del perfil pueda editar sus datos */
			} else {
				db.User.findByPk(id, {
					include: [
						{ association: 'products' },/* Relacion de productos con usuarios */
						{ association: 'comments' } /* Relacion de productos con comentarios */
					]
				})
					.then((data) => {
						if (data == null) {
							return res.redirect('/')
						} else {
							return res.render('profileEdit.ejs', { data: data })
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
		} else {
			res.redirect('/login')
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

	},
	profile: function (req, res) {
		return res.send('profile');
	},
		profileStore: function(req, res) {
			const user = {
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				username: req.body.username,
				email: req.body.email,
				clave: bcypyt.hashSync(req.body.clave, 10), // se le debe hacer el hasheo
				img: req.file.filename,
				fechaDeNacimiento: req.body.fecha_de_nacimiento

			}

			if (req.file == undefined) {
				user.img = req.session.user.img;
			} else {
				user.img = req.file.filename;
			}

			db.User.update(user, {
				where: {
					id: req.session.user.id
				}
			})
				.then(function () {

					user.id = req.session.user.id

					req.session.user = user /* Probar sin esto o usando abajo el req.session.usser.id */

					return res.redirect(`/profile/${user.id}`)
				})
				.catch(error => {
					console.log(error)
				})
		},
		logout: function(req,res) {
			req.session.destroy()
			res.clearCookie('userId')
			res.redirect('/')
		},

	}
	



















