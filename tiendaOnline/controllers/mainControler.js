const data = require("../db/products");
const detalleControler = {
  index: function (req, res) {
    return res.render('index', {lista: data.lista});
  },
  show: function (req, res) {
       id = req.params.id;
    let resultado = "";

    if (id > data.lista.length) {
      resultado = "No se encontro el id solicitado";
      return res.render("error", {message: resultado});
    }
    for (let i = 0; i < data.lista.length; i += 1) {
      if (data.lista[i].id == id) {
        resultado = `Libros Solicitados <strong>${data.lista[i].nombre}</strong>`;
        return res.render("libro", {libro: resultado});
      }
    }

    return res.send(resultado);
  },
}
module.exports = detalleControler;


