var connection = require('../lib/conexionbd.js');

function mostrarTodasLasPeliculas(req,res){
  //consulta sql
  var qy = function(req){
    /*filtro es igual los parametros pasados por query(si es que fueron pasados,concatenando su tabla correspondiente
    y concatenando un and a cada parametro que no sea el primer elemento) joinear eso con un separador de un espacio (' ')*/
    var filtro = [!!req.query.anio? 'anio=' + req.query.anio : null,!!req.query.titulo? 'titulo="' + req.query.titulo+'"' : null,!!req.query.genero? 'genero=' + req.query.genero : null].filter(x=> x!=null).map((x,i,filtro)=> i > 0 ? 'and ' + x : x).join(' ');
    //console.log('BIT CONEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEECT',filtro);
    return 'select * from pelicula '+(filtro? 'where '+filtro : filtro);
  }

  //mandar la consnulta a la base de datos
  connection.query(qy(req),function(error,result,fields){
    //si hubo error notificar
    if(error){
      console.log('hubo un error MOSTRAR TODAS LAS PELICULAS',error)
      return res.status(404).send('hubo un error MOSTRAR TODAS LAS PELICULAS',error)
    }
    //si llegue hasta aca no hubo error
      console.log('REQUEST: ',req)
      //crear objeto response con todas las peliculas obtenidas en la consulta sql
      var response={
        'peliculas':result
      }
      //enviar resultados de la consulta sql
      res.send(JSON.stringify(response));
  })
}

function cargarGeneros(req,res){
  //consulta sql
  var qy = 'select * from genero'

  //mandar la consulta a la base de datos
  connection.query(qy,function(error,result,fields){
    if(error){
      console.log('hubo un error CARGAR GENEROS',error);
      return res.status(404).send('hubo un error CARGAR GENEROS',error);
    }
    //si llegue hasta aca no hubo error
    console.log('REQUES: ',req);
    //crear un objeto response con todos los generos obtenidos en la consulta sql
    var response={
      'generos':result
    }
    res.send(JSON.stringify(response));
  })
}

module.exports = {
  mostrarTodasLasPeliculas:mostrarTodasLasPeliculas,
  cargarGeneros:cargarGeneros
};
