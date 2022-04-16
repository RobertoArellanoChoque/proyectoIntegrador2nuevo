const products = require("../db/products");
const user = require("../db/user");
const comentarios = require("../db/comments")


const controlador = {
    index: function(req, res){
        return res.render('index',{
            titulo: products.lista,
            img: products.lista,
            lanzamiento: products.lista,
            usuario: user,
            
        
        
        })
    },
    show: function(req, res){
        return res.render('indexLogin', {
            usuario: user,
            titulo: products.lista,
            img: products.lista,
            lanzamiento: products.lista,
            descripcion: products.lista,
            comentador: comentarios.lista,
            comentario: comentarios.lista,
        
        
        })
    }


};




module.exports = controlador