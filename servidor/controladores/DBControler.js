var connection = require('../lib/conexionbd.js');

function mostrarTodasLasPeliculas(req,res){
  //consulta sql
  var qy = function(req){
    /*filtro es igual los parametros pasados por query(si es que fueron pasados,concatenando su tabla correspondiente
    y concatenando un and a cada parametro que no sea el primer elemento) joinear eso con un separador de un espacio (' ')*/
    var filtro = [!!req.query.anio? 'anio=' + req.query.anio : null,
    !!req.query.titulo? 'titulo like"%' + req.query.titulo+'%"' : null,
    !!req.query.genero? 'genero_id=' + req.query.genero : null].filter(x=> x!=null).map((x,i,filtro)=> i > 0 ? 'and ' + x : x).join(' ');
    return 'select SQL_CALC_FOUND_ROWS * from pelicula '+(filtro? 'where '+filtro : filtro)+(!!req.query.columna_orden ? 'order by '+req.query.columna_orden+' '+req.query.tipo_orden : '');
  }

  //mandar la consnulta a la base de datos
  connection.query(qy(req)+'; SELECT FOUND_ROWS() AS total',function(error,result,fields){
    //si hubo error notificar
    if(error){
      console.log('hubo un error MOSTRAR TODAS LAS PELICULAS',error)
      return res.status(404).send('hubo un error MOSTRAR TODAS LAS PELICULAS',error)
    }
    //si llegue hasta aca no hubo error
      console.log('REQUEST: ',req)
      //crear objeto response con todas las peliculas obtenidas en la consulta sql
      var response={
        'peliculas':result[0],
        'total':result[1][0].total
      }
      //enviar resultados de la consulta sql
      res.send(JSON.stringify(response));
  })
}

function mostrarPelicula(req,res){
  var qy='select actor.nombre,pelicula.*,genero.nombre as genero from actor_pelicula join actor on actor.id=actor_pelicula.actor_id join pelicula on pelicula.id=actor_pelicula.pelicula_id join genero on genero.id = pelicula.genero_id where pelicula.id='+req.param('id');

  connection.query(qy,function(error,result,fields){
    //if error
    if(error){
      console.log('hubo un error MOSTRAR PELICULA',error);
      return res.status(404).send('hubo un error MOSTRAR PELICULA',error);
    }

    //crear objeto response
    var response={
      pelicula:{
        titulo:result[0].titulo,
        anio:result[0].anio,
        duracion:result[0].duracion,
        director:result[0].director,
        fecha_lanzamiento:result[0].fecha_lanzamiento,
        puntuacion:result[0].puntuacion,
        poster:result[0].poster,
        trama:result[0].trama,
        nombre:result[0].genero
      },
      actores:result.map(x=> ({nombre:x.nombre}))
    }
    res.send(JSON.stringify(response));
  });
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
  cargarGeneros:cargarGeneros,
  mostrarPelicula:mostrarPelicula
};
