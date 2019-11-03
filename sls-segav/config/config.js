module.exports.SEED = 'este-es-un-seed-dificil';

module.exports.MONGODB = {
        URI: 'mongodb+srv://segav-khazm.azure.mongodb.net',
        OPTS: {
            user: 'segav-admin',
            pass: 'n4iCZqSkWIxusuh4',
            dbName: 'segavdb',
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        }
    };

module.exports.HTTP_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

module.exports.ESTADOS = {
    ACTIVO: 1,
    ELIMINADO: 0,
    DESHABILITADO: 3
};

module.exports.HEADER = {
    JSON: { 'Content-Type': 'application/json' }
};

module.exports.commons = {
    create_response: create_response
};

function create_response( http_code, header, message, data ){

    header['Access-Control-Allow-Origin'] = '*';
    header['Access-Control-Allow-Credentials'] = true;

    return { 
        statusCode: http_code,
        headers: header,
        body: JSON.stringify({
                message: message,
                data: data
            })
    };
};