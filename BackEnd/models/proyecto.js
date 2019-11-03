var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proyectoSchema = new Schema({
    nombre: String,
    requerimientos:[String],
    estado: { type: Number, required: true, default: 1 },
    id_empresa: { type: Schema.Types.ObjectId, ref: 'Empresa' }
}, { collection: 'proyecto' });

module.exports = mongoose.model('Proyecto', proyectoSchema);