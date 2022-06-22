const db = require('../database/models');
const Op = db.Sequelize.Op;


const controladorProudctos = {
    index: function (req, res) {
        return res.send('Hola mundo');
    },
    addProducts: function (req, res) {
        // Control de acceso 
        if (req.session.user == undefined) {
            return res.redirect('/users/login')
        }
        else {
            db.Book.findAll()
                .then(data => {
                    return res.render('productAdd', {})
                })
                .catch(error => {
                    console.log(error)
                })
        }

    },
    store: function (req, res) { 

        let errors = {}

        if (req.body.nombre == "") {
            errors.message = "El nombre es obligatorio.";
            res.locals.errors = errors;
            return res.render('productAdd', { title: 'Agregar productos' })

        } else if (req.file == undefined) {
            errors.message = "La imagen es obligatoria.";
            res.locals.errors = errors;
            return res.render('addProducts', { title: 'Agregar productos' })

        } else if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
            errors.message = "Debe subir una imagen en formato jpg, jpeg o png.";
            res.locals.errors = errors;
            return res.render('register', { title: 'Agregar productos' })

        } else {
            //1) Obtener datos del formulario
            let data = req.body;

            let libro = {
                usuario_id: req.session.users.id,
                titulo: data.titulo,
                img: req.file.filename,
                descripcion: data.descripcion,
            }

            // 3) Guardar libro
            Producto.create(libro)
            return res.redirect('/')
        }

    }, //Store
    destroy: function (req, res) {
        let productoABorrar = req.params.id;
        
        Producto.findByPk(productoABorrar)
        .then(data =>{
            if(req.session.user.id == data.idUsuario){ 
                Comentario.destroy({
                    where: [
                        {idProducto: productoABorrar}
                    ] //where
                })
                .then( function(){
                    Producto.destroy({
                        where: [
                            { id: productoABorrar },
                        ],
                        include: [{association: 'comentario'}]
                    }) //Destroy
                }) // Then
                .then(function(){
                    return res.redirect('/');
                })
                .catch(error =>{
                    console.log(error)
                })
                
             } else {
                return res.redirect('/users/login')
            } // Else 
        }) // Then grande
        .catch(error =>{
            console.log(error)
        })
    

    },
    editProducts: function (req, res) {
        let productId = req.params.id;

        if(req.session.user){
            Producto.findByPk(productId)
                .then(data=>{
                    if(req.session.user.id == data.idUsuario){
                        return res.render('editProducts', { title: "Editar producto", resultado: data })
                    } else {
                        return res.redirect('/')
                    }
                })
                .catch(e => { console.log(e)
                    })
        } else {
            return res.redirect ('/users/login')
        }

    },
    show: function (req, res) {
        let product = req.query.search;
        let errors = {}

        if (product == "") {
            errors.message = "No se encontro tu busqueda";
            res.locals.errors = errors;
            return res.render('searchResults', { error: errors })
        } else {
            db.Book.findAll({
                where: {
                    [Op.or]: [
                        { titulo: { [Op.like]: "%" + product + "%", } },
                        { descripcion: { [Op.like]: "%" + product + "%", } },
                    ]
                },
                order: [
                    ['titulo', 'ASC']
                ],
                limit: 1,
                include: [
                    { association: 'comentarios' },
                    { association: 'usuarios' }
                ],
            })
                .then((data) => {
                    if (data != '') {
                        return res.render('searchResults', { libro: data })
                    } else (data == product); {
                        errors.message = "No se encontro el libro que buscas";
                        res.locals.errors = errors;
                        return res.render('searchResults',)
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    },
    detail: function (req, res) {
let id = req.params.id

        db.Book.findByPk(id, {
            include: [
                { association: 'comentarios',
                include: {association: 'usuarios'}
             },
                { association: 'usuarios' }
            ],
        })
            .then((function(data) {
                res.render('product', {libro : data})
            }))
            .catch((err) => {
                console.log(err)
            })

    }

};

module.exports = controladorProudctos;





