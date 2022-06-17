const db = require('../database/models');



module.exports = {
    index: (req, res) => {
        res.render('index')
    },



    show: function (req, res) {
        return res.send('Hola mundo');
    }


};





