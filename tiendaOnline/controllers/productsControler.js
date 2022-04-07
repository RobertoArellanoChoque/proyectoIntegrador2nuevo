const controladorProductos = {
index: function(req, res){
    return res.send ("Esta es la ruta para listar los productos ")
},

info: function(req, res){
    return res.send ("Esta es la ruta para la información de los productos")
},

};

module.exports = controladorProductos;


