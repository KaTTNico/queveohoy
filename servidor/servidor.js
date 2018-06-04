//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var DBControler = require('./controladores/DBControler.js')

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//get peliculas
app.get('/peliculas',DBControler.mostrarTodasLasPeliculas);

//get pelicula por id
app.get('/peliculas/:id',DBControler.mostrarPelicula);

//get generos
app.get('/generos', DBControler.cargarGeneros);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';


app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
