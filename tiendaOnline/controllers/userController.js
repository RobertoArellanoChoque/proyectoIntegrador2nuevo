
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Op = db.Sequelize.Op;

let userController = {
	index: function (req, res) {
			const id = req.params.id
			db.User.findByPk(id)
			.then( (data) => {
				res.send(data)
			})
			.catch((err)=>{
				console.log(err)
			})
	},

	register: function (req, res) {
		return res.render('register');
	},
	storeRegister: function (req, res) { //VALIDACIONES: asegurarse que se complete el formulario
		let errors = {} //configuracion de un objeto literal vacio
		if (req.body.email == "") { // si req.body.email es vacio señalar que es obligatorio qu este completo
			errors.message = "El email es obligatorio";
			res.locals.errors = errors;//guarda errors en locals
			return res.render('register.ejs', {title: 'create una cuenta'})
		} else if (req.body.apellido == "") {
			errors.message = "El apellido es obligatorio";
			res.locals.errors = errors;
			return res.render('register', {title: 'create una cuenta'})

		} else if (req.body.nombre == "") {
			errors.message = "El nombre es obligatorio.";
			res.locals.errors = errors;
			return res.render('register', {title: 'create una cuenta'})
		} else if (req.body.clave == "") {
			errors.message = "La contrasena es obligatoria";
			return res.render('register', {title: 'create una cuenta'})

		} else if (req.body.reclave == "") {
			errors.message = "La contrasena es obligatorio";
			return res.render('register', {
				title: 'create una cuenta'
			})
		} else if (req.body.clave != req.body.reclave) {
			errors.message = "Las contrasena no coinciden";
			return res.render('register', {title: 'create una cuenta'})
			//Los return register te devulven a la pagina para que se complete lo que no se lleno previamente
		} else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
			errors.message = "Las extensiones no coinciden";
			return res.render('register', {title: 'create una cuenta'})
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
							documento: req.body.documento,
							fecha_de_nacimiento: req.body.fecha_de_nacimiento,
							email: req.body.email,
							clave: bcrypt.hashSync(req.body.clave, 10), // se le debe hacer el hasheo
							img: req.file.filename
						}
						db.User.create(users) // raro, no convence
							.then((userGuardado) => {
								return res.redirect('/')
							})
							.catch(error => console.log(error))
					}
				}).catch(error => console.log(error))
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
						{ association: 'Book' },/* Relacion de productos con usuarios */
						{ association: 'Comment' } /* Relacion de productos con comentarios */
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
		return res.render('login');
	},
	storeLogin: function (req, res) {
		let errors = {}
		db.User.findOne({
			where: [{
				email: req.body.email
				}]
		})
			.then(function (users) {
				if (users == null) {
					errors.message = "El usuario no existe";
					res.locals.errors = errors;
					return res.render('login')
				} else if (bcrypt.compareSync(req.body.clave, users.clave) == false) {
					errors.message = "La contraseña es incorrecta"
					res.locals.errors = errors;
					return res.render('login')
				} else {
					req.session.user = users;

					if (req.body.rememberme !== undefined) { 
						res.cookie('userId', users.id, { maxAge: 1000 * 60 * 5 }) 
					}
					return res.redirect('/')
				}
			})

	},
	profile: function (req, res) {
		return res.render('profile');
	},
	profileStore: function (req, res) {
		const user = {
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			documento: req.body.documento,
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
	logout: function (req, res) {
		req.session.destroy()
		
		res.clearCookie('userId')

		res.redirect('/')
	},

}

module.exports = userController


















