var express = require('express');
var app = express();
var Proyecto = require('../models/proyecto');
var Avance = require('../models/avance_proyecto');

app.post('/', (req, res) => {
    var body = req.body;

    var emp = new Proyecto({
        nombre: body.nombre,
        requerimientos: body.requerimientos,
        id_empresa: body.id_empresa,
    });
    emp.save((err, empGuardado) => {

    if (err) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear avc',
            errors: err
        });
    }

    res.status(201).json({
        ok: true,
        Proyecto: empGuardado,
        
        });
    });
});

app.get('/', (req, res) => {
    Proyecto.findById(req.query.id, (err, proyecto) => {
        if (err) return res.status(500).json({ msg: '' });
        return res.status(200).json(proyecto);
    });
});

app.delete('/', (req, res) => {

    Proyecto.findByIdAndRemove(req.query.id, (err, ProyectoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar Proyecto',
                errors: err
            });
        }

        if (!ProyectoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Proyecto con ese id',
                errors: { message: 'No existe un Proyecto con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            Proyecto: ProyectoBorrado
        });

    });

});

app.get('/avance', (req, res) => {
    Avance.find({proyecto:req.query.id}, (err, proyecto) => {
        if (err) return res.status(500).json({ msg: '' });
        return res.status(200).json(proyecto);
    });
}); 

app.get('/list', (req, res) => {
    Proyecto.find( (err, proyecto) => {
        if (err) return res.status(500).json({ msg: '' });
        return res.status(200).json(proyecto);
    });
}); 


module.exports = app;

