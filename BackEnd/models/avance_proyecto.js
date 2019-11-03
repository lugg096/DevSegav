var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var avanceProyectoSchema = new Schema({
    nom_proyecto : String ,
    requerimiento:  String ,
    avances: Number,
    horas: Number,
    id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    id_proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto' },
    estado: { type: Number, required: true, default: 1 }
}, { collection: 'avance_proyecto', timestamps: true });

module.exports = mongoose.model('AvanceProyecto', avanceProyectoSchema);