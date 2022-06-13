const db = require('../database/models');



module.exports = {
    index: (req, res) => {

        db.User.findAll()
        .then(function(respuesta){
            res.send(respuesta)
        })
        },
            
    

    show: function (req, res) {
        return res.send('Hola mundo');
    }


};





