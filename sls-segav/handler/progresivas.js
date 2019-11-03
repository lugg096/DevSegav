'use strict';
var mongoose = require( 'mongoose' );
const HTTP_CODES = require( '../config/config' ).HTTP_CODES;
const HTTP_HEADER = require( '../config/config' ).HEADER;
const DB = require( '../config/config' ).MONGODB;

const _commons = require( '../config/config' ).commons;
const _progresiva = require( '../service/progresivaService' );

let conn = null;

module.exports.list = async function ( ev, ctx, cb ){
    
    ctx.callbackWaitsForEmptyEventLoop = false;
    
    if( conn == null ){
        conn = await mongoose.connect( DB.URI, DB.OPTS );
    }

    try{
        const pgs = await _progresiva.listByTramo( ev.pathParameters.tramo );
        cb( null, _commons.create_response( HTTP_CODES.SUCCESS, HTTP_HEADER.JSON,  '', pgs ) );
    } catch( e ) {
        console.log( e );
        cb( null, _commons.create_response( HTTP_CODES.SERVER_ERROR, HTTP_HEADER.JSON, '', e ) );
    }

}