var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parametroSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: Number, required: true, default: 1 },
}, { collection: 'empresa'  });

var Parametro = mongoose.model('Empresa', parametroSchema);
module.exports = Parametro;



