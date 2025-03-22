-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: mohaa
-- ------------------------------------------------------
-- Server version	8.0.38

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

--
-- Table structure for table `clan`
--

DROP TABLE IF EXISTS `clan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tag` varchar(20) NOT NULL,
  `id_etapa` int DEFAULT NULL,
  `ranking_actual` int DEFAULT '0',
  `ultimo_ranking` int DEFAULT '0',
  `mejor_ranking` int DEFAULT '0',
  `triunfos` int DEFAULT '0',
  `derrotas` int DEFAULT '0',
  `juegos` int DEFAULT '0',
  `porcentaje_triunfos` int DEFAULT '0',
  `racha_actual` int DEFAULT '0',
  `mejor_racha` int DEFAULT '0',
  `peor_racha` int DEFAULT '0',
  `dias_inactivos` int DEFAULT '0',
  `ultimo_registro` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `imagen` varchar(255) DEFAULT 'https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',
  `fecha_ultima_actividad` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_etapa` (`id_etapa`),
  CONSTRAINT `clan_ibfk_1` FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clan`
--

LOCK TABLES `clan` WRITE;
/*!40000 ALTER TABLE `clan` DISABLE KEYS */;
INSERT INTO `clan` VALUES (1,'Death Bulletss','-DB',1,8,4,0,4,42,46,0,-14,0,0,0,'Perdió Contra death bullets','2024-12-21 01:05:32','https://www.shutterstock.com/image-vector/vector-illustration-red-black-spider-600nw-2425487265.jpg','2025-01-26 00:48:56'),(2,'Warzone Online','WzO',1,3,2,0,7,8,15,0,4,0,0,0,'Derrotó a death bullets','2024-12-21 01:05:32','https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL),(3,'Quibus Skulls','QS',1,4,3,0,3,1,4,0,1,0,0,0,NULL,'2024-12-21 01:05:32','https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL),(4,'In The Head','ITH',1,1,5,0,6,0,6,0,6,0,0,0,'Derrotó a Death Bulletss','2024-12-21 01:05:32','https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL),(5,'Bgod','Bgod',1,5,4,0,5,2,7,0,1,0,0,0,'Derrotó a Death Bullets','2024-12-21 01:05:32','https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL),(6,'Addict','Addict',1,6,5,0,15,0,15,0,15,0,0,0,'Derrotó a Death Bullets','2024-12-21 01:05:32','https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL),(7,'Death','Death',1,7,6,0,2,0,2,0,2,0,0,0,'Derrotó a Death Bullets','2024-12-21 01:05:32','https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL),(12,'Clan Spider','SpideR',1,2,0,0,14,0,14,0,14,0,0,0,'Derrotó a Death Bulletss','2025-01-13 22:41:54','https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL),(15,'death bullets','db',1,9,0,0,1,5,6,0,1,0,0,0,'Derrotó a Death Bulletss','2025-01-19 00:13:53','https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg','2025-01-26 00:48:56'),(23,'Death Bullets2','db',1,0,0,0,0,0,0,0,0,0,0,0,NULL,'2025-02-24 17:12:07','','2025-02-24 17:12:07');
/*!40000 ALTER TABLE `clan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etapa`
--

DROP TABLE IF EXISTS `etapa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etapa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `id_juego` int NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `fecha_creacion` datetime DEFAULT NULL,
  `multijugador` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_juego` (`id_juego`),
  CONSTRAINT `etapa_ibfk_1` FOREIGN KEY (`id_juego`) REFERENCES `juego` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etapa`
--

LOCK TABLES `etapa` WRITE;
/*!40000 ALTER TABLE `etapa` DISABLE KEYS */;
INSERT INTO `etapa` VALUES (1,'Etapa I 2025',1,1,'2024-12-07 16:43:43',1),(2,'Etapa II 2025',1,1,'2025-01-05 19:13:31',1),(3,'Etapa I 2025',2,1,'2025-06-05 16:13:31',0);
/*!40000 ALTER TABLE `etapa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitaciones`
--

DROP TABLE IF EXISTS `invitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_etapa` int NOT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'pendiente',
  `fecha_envio` datetime DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `clan_id` int DEFAULT NULL,
  `fecha_respuesta` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_etapa` (`id_etapa`),
  KEY `player_id` (`player_id`),
  KEY `clan_id` (`clan_id`),
  CONSTRAINT `invitaciones_ibfk_36` FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invitaciones_ibfk_37` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invitaciones_ibfk_38` FOREIGN KEY (`clan_id`) REFERENCES `clan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitaciones`
--

LOCK TABLES `invitaciones` WRITE;
/*!40000 ALTER TABLE `invitaciones` DISABLE KEYS */;
INSERT INTO `invitaciones` VALUES (1,1,'rechazada','2025-01-05 21:08:26',4,7,NULL),(4,1,'rechazada','2025-01-08 21:19:12',2,1,NULL),(5,1,'aceptada','2025-01-13 21:31:42',2,1,NULL),(8,1,'pendiente','2025-02-24 17:13:13',17,23,NULL);
/*!40000 ALTER TABLE `invitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juego`
--

DROP TABLE IF EXISTS `juego`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juego` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juego`
--

LOCK TABLES `juego` WRITE;
/*!40000 ALTER TABLE `juego` DISABLE KEYS */;
INSERT INTO `juego` VALUES (1,'Medal Of Honor Allied Assault'),(2,'Fifa 25');
/*!40000 ALTER TABLE `juego` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ladder`
--

DROP TABLE IF EXISTS `ladder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ladder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comentario` text,
  `fecha` datetime DEFAULT NULL,
  `id_clan_ganador` int NOT NULL,
  `id_clan_perdedor` int NOT NULL,
  `id_etapa` int NOT NULL,
  `id_juego` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_clan_ganador` (`id_clan_ganador`),
  KEY `id_clan_perdedor` (`id_clan_perdedor`),
  KEY `id_etapa` (`id_etapa`),
  KEY `id_juego` (`id_juego`),
  CONSTRAINT `ladder_ibfk_68` FOREIGN KEY (`id_clan_ganador`) REFERENCES `clan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ladder_ibfk_69` FOREIGN KEY (`id_clan_perdedor`) REFERENCES `clan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ladder_ibfk_70` FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ladder_ibfk_71` FOREIGN KEY (`id_juego`) REFERENCES `juego` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ladder`
--

LOCK TABLES `ladder` WRITE;
/*!40000 ALTER TABLE `ladder` DISABLE KEYS */;
INSERT INTO `ladder` VALUES (1,'Facilito niubis culiaos','2025-01-04 20:00:28',6,1,1,1),(2,'Facilito niubis culiaos','2025-01-04 20:02:26',6,1,1,1),(3,'Facilito niubis culiaos','2025-01-04 20:02:27',6,1,1,1),(4,'Facilito niubis culiaos','2025-01-04 20:02:28',6,1,1,1),(5,'','2025-01-04 20:36:14',6,1,1,1),(6,'','2025-01-04 20:36:49',5,1,1,1),(7,'','2025-01-04 20:37:31',4,1,1,1),(8,'','2025-01-04 20:38:16',4,1,1,1),(9,'','2025-01-04 20:41:23',6,1,1,1),(10,'','2025-01-04 20:56:26',6,1,1,1),(11,'','2025-01-04 20:56:37',6,1,1,1),(12,'','2025-01-05 17:29:52',7,1,1,1),(13,'malos culiaos','2025-01-06 20:18:31',2,1,1,1),(14,'malos qls','2025-01-09 01:47:43',7,1,1,1),(15,'','2025-01-13 22:46:25',12,1,1,1),(16,'','2025-01-14 21:48:40',2,1,1,1),(17,'','2025-01-14 21:49:42',4,1,1,1),(18,'','2025-01-14 21:50:24',2,1,1,1),(19,'','2025-01-19 00:24:16',4,1,1,1),(20,'','2025-01-19 00:25:37',2,15,1,1),(21,'','2025-01-19 00:25:47',1,15,1,1),(22,'','2025-01-19 00:26:33',1,15,1,1),(23,'','2025-01-19 00:30:44',1,15,1,1),(24,'','2025-01-19 00:30:54',1,15,1,1),(25,'','2025-01-20 22:21:44',12,1,1,1),(26,'','2025-01-20 22:22:16',12,1,1,1),(27,'','2025-01-20 22:24:40',12,1,1,1),(28,'','2025-01-20 22:25:01',12,1,1,1),(29,'','2025-01-20 22:25:59',12,1,1,1),(30,'','2025-01-20 22:26:08',12,1,1,1),(31,'','2025-01-20 22:31:36',12,1,1,1),(32,'','2025-01-20 22:32:38',12,1,1,1),(33,'','2025-01-20 22:33:16',12,1,1,1),(34,'','2025-01-20 22:34:33',12,1,1,1),(35,'','2025-01-20 22:35:59',12,1,1,1),(36,'','2025-01-20 22:36:15',12,1,1,1),(37,'','2025-01-20 22:41:19',12,1,1,1),(39,'','2025-01-26 00:47:47',3,1,1,1),(40,'','2025-01-26 00:48:06',3,1,1,1),(41,'','2025-01-26 00:48:56',15,1,1,1);
/*!40000 ALTER TABLE `ladder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `victorias` int DEFAULT '0',
  `derrotas` int DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `volute` varchar(150) NOT NULL,
  `validado` tinyint(1) DEFAULT '0',
  `imagen` varchar(255) DEFAULT 'https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',
  `twitch` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'SpideRRojO.db','alejandro_beristain@hotmail.com',1,4,'2024-12-21 01:05:32','$2b$10$UA/oZO2WENHGDFMR7Gibre6/2YbZi/fOmYCTBaWqUMoQdnUA4LVwm',0,'6408',1,'https://static-cdn.jtvnw.net/jtv_user_pictures/bd409e78-b2e0-46a9-b17e-4daaecbad896-profile_banner-480.jpeg','https://www.twitch.tv/spiderrojos','https://www.youtube.com/@alejandroberistain7760'),(2,'GxAxBxA.db','ga_beristainn@hotmail.com',0,3,'2024-12-21 01:13:49','$2b$10$kYaNK9MMhYrKo74yULs81em/yku6OxqGkHAI3M48GifwRaz8MgpOS',0,'4567',1,'https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL,NULL),(4,'SpideRRojO','contacto@cosmetichile.cl',4,0,'2025-01-04 22:02:51','$2b$10$2aKd8lqqIfxVVUUrQF3cjOvhwEc5FQoVDJ5HXgPg1LfahqiV2V7wq',0,'2145',1,'https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL,NULL),(16,'spider','beristain.alejandro@gmail.com',1,0,'2025-01-16 00:28:38','$2b$10$ZyD193pXZl0XMAgt9mlu1.pw9B33krmUSBkJQiD3tkjlFZMF1WXm.',0,'1111',1,'https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL,NULL),(17,'hola','beristain@hotmail.com',0,0,'2025-02-24 17:13:02','$2b$10$2Tk26CRVKQvf9SlEDbK5K./FxdTAhecx1PypwppBSiZspM3JWDniu',0,'1111',0,'https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg',NULL,NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_clan`
--

DROP TABLE IF EXISTS `player_clan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_clan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `joined_at` datetime DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `clan_id` int DEFAULT NULL,
  `rango` varchar(50) NOT NULL,
  `id_etapa` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `player_clan_clan_id_player_id_unique` (`player_id`,`clan_id`),
  KEY `clan_id` (`clan_id`),
  CONSTRAINT `player_clan_ibfk_40` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `player_clan_ibfk_41` FOREIGN KEY (`clan_id`) REFERENCES `clan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_clan`
--

LOCK TABLES `player_clan` WRITE;
/*!40000 ALTER TABLE `player_clan` DISABLE KEYS */;
INSERT INTO `player_clan` VALUES (19,'2025-01-13 22:41:54',4,12,'Lider',1),(22,'2025-01-19 00:13:53',16,12,'Lider',1),(23,'2025-01-19 00:13:53',2,1,'Lider',1),(28,'2025-02-24 17:12:07',1,23,'Lider',1),(31,'2025-02-24 17:12:07',16,23,'Capitan',1),(32,'2025-02-24 17:12:07',17,23,'Co-Lider',1);
/*!40000 ALTER TABLE `player_clan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rango`
--

DROP TABLE IF EXISTS `rango`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rango` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rango`
--

LOCK TABLES `rango` WRITE;
/*!40000 ALTER TABLE `rango` DISABLE KEYS */;
INSERT INTO `rango` VALUES (1,'Lider','Lider del clan');
/*!40000 ALTER TABLE `rango` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rangos`
--

DROP TABLE IF EXISTS `rangos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rangos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rangos`
--

LOCK TABLES `rangos` WRITE;
/*!40000 ALTER TABLE `rangos` DISABLE KEYS */;
/*!40000 ALTER TABLE `rangos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-08 19:45:02
