-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdfunding_db
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Medical'),(2,'Education'),(3,'Disaster Relief'),(4,'Social Services'),(5,'Environmental Protection');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `DONATION_ID` int NOT NULL AUTO_INCREMENT,
  `DATE` datetime NOT NULL,
  `AMOUNT` decimal(10,2) NOT NULL,
  `GIVER` varchar(255) NOT NULL,
  `FUNDRAISER_ID` int NOT NULL,
  PRIMARY KEY (`DONATION_ID`),
  KEY `FUNDRAISER_ID` (`FUNDRAISER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (1,'2023-09-01 00:00:00',50.00,'John Doe',1),(2,'2023-09-02 00:00:00',75.50,'Jane Smith',2),(3,'2023-09-02 00:00:00',20.00,'Alice Johnson',3),(4,'2023-09-03 00:00:00',150.00,'Mike Brown',4),(5,'2023-09-03 00:00:00',130.00,'Chris Davis',5),(6,'2023-09-04 00:00:00',250.00,'Patricia Wilson',6),(7,'2023-09-05 00:00:00',45.00,'Linda Martinez',7),(8,'2023-09-06 00:00:00',100.00,'Barbara Rodriguez',8),(9,'2023-09-07 00:00:00',80.00,'Elizabeth Garcia',9),(10,'2023-09-08 00:00:00',60.00,'James Hernandez',10);
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundraiser`
--

DROP TABLE IF EXISTS `fundraiser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundraiser` (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(255) NOT NULL,
  `CAPTION` varchar(255) NOT NULL,
  `TARGET_FUNDING` decimal(10,2) DEFAULT NULL,
  `CURRENT_FUNDING` decimal(10,2) DEFAULT NULL,
  `CITY` varchar(100) DEFAULT NULL,
  `ACTIVE` tinyint(1) DEFAULT NULL,
  `CATEGORY_ID` int DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`),
  KEY `CATEGORY_ID` (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundraiser`
--

LOCK TABLES `fundraiser` WRITE;
/*!40000 ALTER TABLE `fundraiser` DISABLE KEYS */;
INSERT INTO `fundraiser` VALUES (1,'Yanming Yang','Help Children',5000.00,1500.00,'New York',1,1),(2,'Ziqian Gu','School Support',10000.00,4000.00,'Los Angeles',1,2),(3,'Yihan Fu','Flood Relief',20000.00,5000.00,'Miami',1,3),(4,'Nehemia Sugianto','Hospital Funds',30000.00,12000.00,'Chicago',1,1),(5,'Fuyao Shen','Community Support',25000.00,7000.00,'San Francisco',1,2),(6,'Qi Yan','Help Children',5000.00,1500.00,'Changchun',1,3),(7,'Zhenming Shi','School Support',10000.00,4000.00,'Beijing',1,1),(8,'Boyan Li','Flood Relief',20000.00,5000.00,'Shanghai',1,2),(9,'Boao Jia','Elderly Care and Support Programs',30000.00,12000.00,'Shenzhen',1,4),(10,'Xiangjun Gu','Wildlife Conservation',25000.00,7000.00,'Guangzhou',1,5);
/*!40000 ALTER TABLE `fundraiser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 20:10:34
