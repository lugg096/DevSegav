'use strict';
var mongoose = require( 'mongoose' );
const DB = require( '../config/config' ).MONGODB;
const HTTP_CODES = require( '../config/config' ).HTTP_CODES;
const HTTP_HEADER = require( '../config/config' ).HEADER;
const ESTADO = require( '../config/config' ).ESTADOS;

const commons = require( '../config/config' ).commons;

var Avance = require('../model/avance');

let conn = null;


module.exports.avan_usu = async function( ev, ctx, cb ) {
    
    ctx.callbackWaitsForEmptyEventLoop = false;

    if( conn == null ){
      conn = await mongoose.connect( DB.URI, DB.OPTS );
    }

    try {
        const tramos = 
        await Avance.find({id_usuario: ev.pathParameters.id})
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
}
