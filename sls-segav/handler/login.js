'use strict';
var mongoose = require( 'mongoose' );
var jwt = require('jsonwebtoken');
var mongoose = require( 'mongoose' );
const DB = require( '../config/config' ).MONGODB;
const HTTP_CODES = require( '../config/config' ).HTTP_CODES;
const HTTP_HEADER = require( '../config/config' ).HEADER;
var SEED = require('../config/config').SEED;
const ESTADO = require( '../config/config' ).ESTADOS;
const commons = require( '../config/config' ).commons;
var Usuario = require('../model/usuario');

let conn = null;
module.exports.loginUsuario = async function ( ev, ctx, cb ){
    
    ctx.callbackWaitsForEmptyEventLoop = false;
    if( conn == null ){
        conn = await mongoose.connect( DB.URI, DB.OPTS );
      }

    try {
    var body = JSON.parse(ev.body);
    const log = Usuario.findOne({ username: body.username ,estado :{$ne: ESTADO.ELIMINADO}}, (err, usuarioDB) => {

        if (err) {
            cb( null,  commons.create_response( HTTP_CODES.SERVER_ERROR, 
                HTTP_HEADER.JSON, 
                '',
                {
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                } ) );
            
        }

        if (!usuarioDB) {
            cb( null,  commons.create_response( HTTP_CODES.SERVER_ERROR, 
                HTTP_HEADER.JSON, 
                '',
                {
                    ok: false,
                    mensaje: 'Credenciales incorrectas - username',
                    errors: err
                } ) );
           
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            cb( null,  commons.create_response( HTTP_CODES.SERVER_ERROR, 
                HTTP_HEADER.JSON, 
                '',
                {
                    ok: false,
                    mensaje: 'Credenciales incorrectas - password',
                    errors: err
                }) );
           
        }

        // Crear un token!!!
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas
        cb( null,  commons.create_response( HTTP_CODES.SUCCESS, 
            HTTP_HEADER.JSON, 
            '',
            {
                ok: true,
                usuario: usuarioDB,
                token: token
            } ) );
       

    })
       

    } catch( e ){
        cb( null,  commons.create_response( HTTP_CODES.SERVER_ERROR, 
            HTTP_HEADER.JSON, 
            '',
            e ) );
    }

}














/* module.exports.loginUsuario = async function ( ev, ctx, cb ){
    
    ctx.callbackWaitsForEmptyEventLoop = false;

    if( conn == null ){
      conn = await mongoose.connect( DB.URI, DB.OPTS );
    }

    try {
        const tramos = 
        await Tramo
                .find( { estado: { $ne: ESTADO.ELIMINADO } } )
                .sort( '-numero' );
        
        cb( null,  commons.create_response( HTTP_CODES.SUCCESS, 
            HTTP_HEADER.JSON, 
            '',
            tramos ) );

    } catch( e ){
        cb( null,  commons.create_response( HTTP_CODES.SERVER_ERROR, 
            HTTP_HEADER.JSON, 
            '',
            e ) );
    }
} */