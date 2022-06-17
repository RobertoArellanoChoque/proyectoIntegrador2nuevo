const db = require('../database/models');
<<<<<<< HEAD
const op = db.Sequelize.Op;

=======
//const upload = multer({ dest: '/usuarios' })
const path = require('path');
>>>>>>> 610dbbd0305f3097f54fb63e17d7cf8db334fdd9
module.exports = {
    index: function (req, res) {
        return res.send('Hola mundo');
    },
    create: function (req, res) {
        return res.send('Hola mundo');

    },
    show: (req, res) => {   
        db.Book.findAll( {
            where: [
                {titulo: {[op.like]: "%Ocean%"} }
            ]
        })
        .then(function(respuesta){
            res.send(respuesta)
        })
        },
    detail: function (req, res) {
        return res.send('Hola mundo');
    }



};
//var storage = multer.diskStorage({
//	destination: (req, file, cb) => {
//		  cb(null, path.join(__dirname, './public/imges/products'));
//	},
//	filename: (req, file, cb) => {
//		  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//	}
  //})
   //upload = multer({ storage: storage });




