CREATE DATABASE  IF NOT EXISTS `BataBase` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `BataBase`;
-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: BataBase
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-23 23:33:38

CREATE TABLE usuarios (
  id int(10) primary key NOT NULL AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  apellido varchar(50) NOT NULL,
  documento int(10) UNSIGNED NOT NULL,
  fecha_de_nacimiento DATE NOT NULL,
  email varchar(100) NOT NULL,
  clave varchar(200) NOT NULL,
  img varchar(255) DEFAULT NULL,
  created_at date DEFAULT NULL,
  updated_at date DEFAULT NULL
);





CREATE TABLE libros (
  id int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  titulo varchar(50) NOT NULL,
  descripcion varchar(200) NOT NULL,
  img varchar(50) DEFAULT NULL,
  created_at date DEFAULT NULL,
  updated_at  date DEFAULT NULL,
  usuario_id int(10)  NULL,
  
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  
); 



CREATE TABLE comentarios (
  id int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  texto_comentario varchar(200) NOT NULL,
  created_at date DEFAULT NULL,
  updated_at date DEFAULT NULL,
  usuario_id int(10) NOT NULL,
  libro_id int(10) NOT NULL,

 
   FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
   FOREIGN KEY (libro_id) REFERENCES libros (id)
); 



CREATE TABLE seguidores (
id INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
usuario_id  INT(10)  NOT NULL,

FOREIGN KEY (usuario_id) REFERENCES usuarios (id)

)