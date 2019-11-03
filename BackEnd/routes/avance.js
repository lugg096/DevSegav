var express = require('express');

var app = express();

var AvanceProyecto = require('../models/avance_proyecto');
var Proyecto = require('../models/proyecto');

app.post('/', (req, res) => {
    var body = req.body;
                /* {
                    id_usuario,
                    id_proyecto,
                    requerimiento,
                    avances,
                    horas
                  } */
  
        Proyecto.findById(body.id_proyecto, (err, proyecto) => {
            if (err) return res.status(500).json({ msg: 'Error al buscar proyecto' });
            var emp = new AvanceProyecto({
                id_usuario:body.id_usuario,
                id_proyecto:body.id_proyecto,
                nom_proyecto: proyecto.nombre,
                requerimiento: body.requerimiento,
                avances: body.avances,
                horas: body.horas
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
                empresa: empGuardado,
                
                });
            });
        });
});

app.get('/', (req, res) => {
    AvanceProyecto.findById(req.query.id, (err, proyecto) => {
        if (err) return res.status(500).json({ msg: '' });
        return res.status(200).json(proyecto);
    });
});

app.get('/list', (req, res) => {
    AvanceProyecto.find( (err, proyecto) => {
        if (err) return res.status(500).json({ msg: '' });
        return res.status(200).json(proyecto);
    });
});

app.get('/pro_av', (req, res) => {//si no hay avanc con id_usu,id_pro y requer devolvera [] 
    var body = req.body;
    AvanceProyecto.find({id_usuario:body.id_usuario,id_proyecto:body.id_proyecto,requerimiento:body.requerimiento}, (err, proyecto) => {
        if (err) return res.status(500).json([] );
        return res.status(200).json(proyecto);
    });
});

app.get('/usuario', (req, res) => {
    AvanceProyecto.find({id_usuario: req.query.id}, (err, proyecto) => {
        if (err) return res.status(500).json({ msg: '' });
        return res.status(200).json(proyecto);
    });
});

app.put('/', (req, res) => {

    var body = req.body;
    AvanceProyecto.findById(req.query.id, (err, avance) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar avance',
                errors: err
            });
        }

        if (!avance) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El avance con el id ' + id + ' no existe',
                errors: { message: 'No existe un avance con ese ID' }
            });
        }


        avance.requerimientos = body.requerimientos;
        avance.avances = body.avances;
        avance.horas = body.horas;

        avance.save((err, avanceGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar avance',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                avance: avanceGuardado
            });

        });

    });

});

app.delete('/', (req, res) => {
    AvanceProyecto.findByIdAndRemove(req.query.id, (err, AvanceBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar Avance',
                errors: err
            });
        }

        if (!AvanceBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Avance con ese id',
                errors: { message: 'No existe un Avance con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            Avance: AvanceBorrado
        });
    });
});


module.exports = app;