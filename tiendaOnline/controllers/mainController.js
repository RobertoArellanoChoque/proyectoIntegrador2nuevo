const products = require("../db/products")


const controlador = {
    index: function(req, res){
        return res.render('index',{
            titulo: products.lista,
            img: products.lista,
            lanzamiento: products.lista
        
        
        })
    },
    show: function(req, res){
        return res.render('indexLogin')
    }


};




module.exports = controlador