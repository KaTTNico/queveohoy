/*ATENCION: ANTES DE CORRER ESTE SCRIPT POR FAVOR CAMBIAR LOS PATH DE LOS INSERTS POR EL DE SU MAQUINA
INSERTS PELICULA: LINEA 35
INSERTS GENERO: LINEA 51
INSERTS ACTORES: LINEA
*/
/*SE PUEDE CORRER ESTE SCRIPT PARA QUE QUEDE TODA LA BASE HECHA*/

/*HICE ESTE SCRIPT CON TODOS LOS PASOS DE LAS GUIAS HECHAS AL PIE DE LA LETRA
POR ESO NO HICE POR EJEMPLO CREAR LA COLUMNA GENEROS_ID EN PELICULAS CUANDO SE CREA LA TABLA PELICULA
EN VEZ DE HACER UN ALTER TABLE (si hubiese puesto la columna genero_id al momento de crear la tabla pelicula deberia primero crear la tabla genero
porque no se puede hacer referencia a algo que todavia no existe)
*/

/*crear base de datos*/
CREATE DATABASE QueVeoHoy;

/*usar base de datos*/
USE QueVeoHoy;

/*tabla pelicula*/
CREATE TABLE `pelicula`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100),
  `anio` INT(5),
  `duracion` INT(5),
  `director` VARCHAR(400),
  `fecha_lanzamiento` DATE,
  `puntuacion` INT(2),
  `poster` VARCHAR(300),
  `trama` VARCHAR(700),
  PRIMARY KEY(`id`)
);

/*INSERTS DE PELICULA*/
/*pon tu path aqui*/
\. C:/Users/Nicolas/Documents/ACAMICA/gitRep/queVeoHoy/queveohoyRecursos/scripts/script-paso-1-peliculas.sql

/*crear tabla generos*/
CREATE TABLE `genero`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30),
  PRIMARY KEY(`id`)
);

/*agregar generos a pelicula*/
ALTER TABLE pelicula ADD genero_id INT,
ADD FOREIGN KEY(genero_id) REFERENCES genero(id);

/*INSERTS DE GENERO*/
/*pon tu path aqui*/
\. C:/Users/Nicolas/Documents/ACAMICA/gitRep/queVeoHoy/queveohoyRecursos/scripts/script-paso-2-generos.sql

/*crear tabla actor*/
CREATE TABLE actor(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(70),
  PRIMARY KEY(`id`)
);

/*crear tabla de referencias actor pelicula*/
CREATE TABLE actor_pelicula(
  `id` INT NOT NULL AUTO_INCREMENT,
  `actor_id` INT,
  `pelicula_id` INT,
  FOREIGN KEY(actor_id) REFERENCES actor(id),
  FOREIGN KEY(pelicula_id) REFERENCES pelicula(id),
  PRIMARY KEY (`id`)
);

/*INSERTS DE GENERO*/
/*pon tu path aqui*/
\. C:/Users/Nicolas/Documents/ACAMICA/gitRep/queVeoHoy/queveohoyRecursos/scripts/script-paso-3-actores.sql
