var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    username: String,
    password: String,
    name: String,
    estado: { type: Number, required: true, default: 1 },
}, { collection: 'usuario',timestamps: true });

usuarioSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;                                           