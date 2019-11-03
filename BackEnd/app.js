// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser
app.use('/public', express.static('./assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar rutas
var appRoutes = require('./routes/app');;
var loginRoutes = require('./routes/login');

var proyectoRoutes = require('./routes/proyecto');

var usuarioRoutes = require('./routes/usuario');
var avanceRoutes = require('./routes/avance');
var empresaRoutes = require('./routes/empresa');
var db = require('./config/config').MONGODB;

// Conexión a la base de datos
mongoose.connect(db.MONGODB_URI, db.MONGOOSE_OPTS, (err) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

app.use('/', appRoutes); 
app.use('/login', loginRoutes);

app.use('/proyecto', proyectoRoutes);


app.use('/usuario', usuarioRoutes);
app.use('/avance', avanceRoutes);
app.use('/empresa', empresaRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});