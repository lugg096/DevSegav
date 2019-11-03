var express = require('express');

var app = express();

var Empresa = require('../models/Empresa');


app.post('/', (req, res) => {
    var body = req.body;

    var emp = new Empresa({
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: body.estado
    });
    emp.save((err, empGuardado) => {

    if (err) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear empresa',
            errors: err
        });
    }

    res.status(201).json({
        ok: true,
        empresa: empGuardado,
        
    });
    });
});

app.get('/', (req, res) => {
    Empresa.findById(req.query.id, (err, empresa) => {
        if (err) return res.status(500).json({ msg: '' });
        return res.status(200).json(empresa);
    });
});

app.get('/list', (req, res) => {
    Empresa.find((err, empresa) => {
        if (err) return res.status(500).json({ msg: '' });
        return res.status(200).json(empresa);
    });
});


module.exports = app;