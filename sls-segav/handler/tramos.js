'use strict';
var mongoose = require( 'mongoose' );
const DB = require( '../config/config' ).MONGODB;
const HTTP_CODES = require( '../config/config' ).HTTP_CODES;
const HTTP_HEADER = require( '../config/config' ).HEADER;
const ESTADO = require( '../config/config' ).ESTADOS;

const commons = require( '../config/config' ).commons;

var Tramo = require('../model/tramo');

let conn = null;

module.exports.list = async function( ev, ctx, cb ) {
    
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
}

module.exports.findOne = async function( ev, ctx, cb ) {
    
    ctx.callbackWaitsForEmptyEventLoop = false;

    if( conn == null ){
      conn = await mongoose.connect( DB.URI, DB.OPTS );
    }

    try {
        const tramos = await Tramo.findOne( { estado: { $ne: ESTADO.ELIMINADO }, numero: ev.pathParameters.tramo } );
        
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