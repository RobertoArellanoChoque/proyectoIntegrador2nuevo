const db = require('../database/models');
const op = db.Sequelize.Op;

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




