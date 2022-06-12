const db = require('../database/models/User');




module.exports = {
    index: (req, res) => {
        db.Users.findAll()
            .then(resultado => {
                return res.send(resultado)
            })
    },

    show: function (req, res) {
        return res.send('Hola mundo');
    }


};





