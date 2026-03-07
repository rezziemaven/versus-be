# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.3.8-MariaDB)
# Database: versus_dev
# Generation Time: 2018-08-21 11:19:47 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table cities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cities`;

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;

INSERT INTO `cities` (`city_id`, `city_name`)
VALUES
	(1,'Barcelona'),
	(2,'Madrid'),
	(3,'Valencia');

/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table leagues
# ------------------------------------------------------------

DROP TABLE IF EXISTS `leagues`;

CREATE TABLE `leagues` (
  `league_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) NOT NULL,
  `sport_id` int(11) NOT NULL,
  PRIMARY KEY (`league_id`),
  KEY `city_id` (`city_id`),
  KEY `sport_id` (`sport_id`),
  CONSTRAINT `leagues_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `leagues_ibfk_2` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`sport_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `leagues` WRITE;
/*!40000 ALTER TABLE `leagues` DISABLE KEYS */;

INSERT INTO `leagues` (`league_id`, `city_id`, `sport_id`)
VALUES
	(5,1,2),
	(6,1,3),
	(7,1,4),
	(8,1,5),
	(10,1,6),
	(11,1,7),
	(12,1,8),
	(13,1,9),
	(14,2,2);

/*!40000 ALTER TABLE `leagues` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table matches
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matches`;

CREATE TABLE `matches` (
  `match_id` int(11) NOT NULL AUTO_INCREMENT,
  `match_datetime` datetime DEFAULT '0000-00-00 00:00:00',
  `location` text DEFAULT NULL,
  `users_leagues_1_id` int(11) NOT NULL,
  `users_leagues_2_id` int(11) NOT NULL,
  `user1_score` int(11) NOT NULL DEFAULT 0,
  `user2_score` int(11) NOT NULL DEFAULT 0,
  `user1_new_elo` int(11) DEFAULT NULL,
  `user2_new_elo` int(11) DEFAULT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'PENDING',
  `winner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`match_id`),
  KEY `winner_id` (`winner_id`),
  KEY `matches_ibfk_1` (`users_leagues_1_id`),
  KEY `matches_ibfk_2` (`users_leagues_2_id`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`users_leagues_1_id`) REFERENCES `users_leagues` (`users_leagues_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`users_leagues_2_id`) REFERENCES `users_leagues` (`users_leagues_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`winner_id`) REFERENCES `users_leagues` (`users_leagues_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;

INSERT INTO `matches` (`match_id`, `match_datetime`, `location`, `users_leagues_1_id`, `users_leagues_2_id`, `user1_score`, `user2_score`, `user1_new_elo`, `user2_new_elo`, `status`, `winner_id`)
VALUES
	(1,'2018-08-10 10:30:00','Passeig de Sant Joan, 20, Barcelona, Spain',1,2,3,1,1016,984,'FINISHED',1),
	(2,'2018-08-13 17:30:00','Passeig de Sant Joan, 20, Barcelona, Spain',3,4,4,2,1305,995,'FINISHED',3),
	(3,'2018-08-13 17:30:00','Passeig de Sant Joan, 20, Barcelona, Spain',1,3,3,2,1043,1278,'FINISHED',1),
	(4,NULL,NULL,1,4,0,0,NULL,NULL,'DENIED',NULL),
	(5,NULL,NULL,2,4,0,0,NULL,NULL,'ACCEPTED',NULL),
	(6,NULL,NULL,5,6,2,1,NULL,NULL,'FINISHED',5),
	(7,NULL,NULL,8,5,5,3,NULL,NULL,'FINISHED',8);

/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sports
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sports`;

CREATE TABLE `sports` (
  `sport_id` int(11) NOT NULL AUTO_INCREMENT,
  `sport_name` varchar(100) NOT NULL DEFAULT '',
  `sport_image_path` mediumtext NOT NULL,
  PRIMARY KEY (`sport_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;

INSERT INTO `sports` (`sport_id`, `sport_name`, `sport_image_path`)
VALUES
	(2,'Tennis','https://images.unsplash.com/photo-1485908953667-cf6d88997642?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dcc6a29fb8bc02fa69b8a6c1ddb7b7d2&auto=format&fit=crop&w=1920&q=80'),
	(3,'Ping Pong','https://target.scene7.com/is/image/Target/51444339?wid=488&hei=488&fmt=pjpeg'),
	(4,'Tic Tac Toe','https://previews.123rf.com/images/anikasalsera/anikasalsera0809/anikasalsera080900020/3526260-hand-drawn-tic-tac-toe-game-isolated-on-white-.jpg'),
	(5,'Golf','https://www.wttr.com/wp-content/uploads/2018/06/golf_tournament.jpg'),
	(6,'Boxing','https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f5bd26422b6425d05274c92a51e1e16d&auto=format&fit=crop&w=1050&q=80'),
	(7,'Chess','https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=89f7259907bafccabeab5ed40f4c9e84&auto=format&fit=crop&w=1051&q=80'),
	(8,'Billiards','https://images.unsplash.com/photo-1488923566472-4b2d13a4af3b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=075c0f42b882962e88076e264343f2d2&auto=format&fit=crop&w=1050&q=80'),
	(9,'Drag Racing','https://images.unsplash.com/photo-1505955088904-859c5dda4db0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2b226fc8cbb25a053d76077addbcf8fc&auto=format&fit=crop&w=1050&q=80');

/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stats
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stats`;

CREATE TABLE `stats` (
  `stats_id` int(11) NOT NULL AUTO_INCREMENT,
  `users_leagues_id` int(11) NOT NULL,
  `matches_played` int(11) DEFAULT 0,
  `matches_won` int(11) DEFAULT 0,
  `matches_lost` int(11) DEFAULT 0,
  `matches_drawn` int(11) DEFAULT 0,
  PRIMARY KEY (`stats_id`),
  KEY `stats_users_leagues` (`users_leagues_id`),
  CONSTRAINT `stats_users_leagues` FOREIGN KEY (`users_leagues_id`) REFERENCES `users_leagues` (`users_leagues_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;

INSERT INTO `stats` (`stats_id`, `users_leagues_id`, `matches_played`, `matches_won`, `matches_lost`, `matches_drawn`)
VALUES
	(2,1,3,3,0,0),
	(3,2,1,0,1,0),
	(4,3,3,1,2,0),
	(5,4,1,0,1,0),
	(6,22,0,0,0,0),
	(7,24,0,0,0,0),
	(8,25,0,0,0,0),
	(9,26,0,0,0,0),
	(10,28,0,0,0,0),
	(11,5,0,0,0,0),
	(12,29,0,0,0,0),
	(13,31,0,0,0,0);

/*!40000 ALTER TABLE `stats` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(50) DEFAULT NULL,
  `user_image_path` mediumtext NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `AK_UniqueEmail` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `email`, `password`, `user_image_path`)
VALUES
	(3,'Hettie','A','hbranch0','hstive0@dot.gov','1234','http://dummyimage.com/197x176.bmp/ff4444/ffffff'),
	(4,'Murray','B','mdangeli1','mculcheth1@ifeng.com','1234','http://dummyimage.com/228x224.bmp/5fa2dd/ffffff'),
	(5,'Rikki','C','reynald2','rrolinson2@indiegogo.com','1234','http://dummyimage.com/200x214.jpg/dddddd/000000'),
	(6,'Sherry','D','scamplin3','sewells3@vistaprint.com','1234','http://dummyimage.com/172x106.bmp/cc0000/ffffff'),
	(7,'Jackie','E','jscutcheon4','jfrantzeni4@si.edu','1234','http://dummyimage.com/152x218.bmp/cc0000/ffffff'),
	(8,'Winthrop','F','wheggadon5','wdambrogio5@newyorker.com','1234','http://dummyimage.com/218x236.jpg/dddddd/000000'),
	(9,'Phillip','G','pbrind6','pbumpus6@reverbnation.com','1234','http://dummyimage.com/246x223.png/cc0000/ffffff'),
	(10,'Irvin','H','iwhiley7','ihargitt7@whitehouse.gov','1234','http://dummyimage.com/195x146.bmp/ff4444/ffffff'),
	(11,'Barr','I','bmcgarel8','battwooll8@biglobe.ne.jp','1234','http://dummyimage.com/244x200.png/ff4444/ffffff'),
	(12,'Bevon','J','bdendle9','bmairs9@imgur.com','1234','http://dummyimage.com/208x189.bmp/ff4444/ffffff'),
	(72,'Hey','U','heyu5','heyu@hey.com','1234','http://hey.com');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users_leagues
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_leagues`;

CREATE TABLE `users_leagues` (
  `users_leagues_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `league_id` int(11) NOT NULL,
  `date_joined` date NOT NULL,
  `initial_elo` int(11) NOT NULL,
  `current_elo` int(11) NOT NULL,
  PRIMARY KEY (`users_leagues_id`),
  UNIQUE KEY `user_league_unique` (`user_id`,`league_id`),
  KEY `user_id` (`user_id`),
  KEY `league_id` (`league_id`),
  CONSTRAINT `users_leagues_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `users_leagues_ibfk_3` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`league_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users_leagues` WRITE;
/*!40000 ALTER TABLE `users_leagues` DISABLE KEYS */;

INSERT INTO `users_leagues` (`users_leagues_id`, `user_id`, `league_id`, `date_joined`, `initial_elo`, `current_elo`)
VALUES
	(1,3,5,'2018-08-01',1000,1043),
	(2,4,5,'2018-08-01',1000,984),
	(3,5,5,'2018-08-01',1300,1278),
	(4,6,5,'2018-08-01',1000,995),
	(5,3,6,'2018-08-01',1300,1500),
	(6,4,6,'2018-08-01',700,800),
	(7,5,6,'2018-08-01',1000,1100),
	(8,6,6,'2018-08-01',1300,1300),
	(22,12,6,'2018-08-19',1300,1300),
	(24,10,5,'2018-08-19',1000,1000),
	(25,12,5,'2018-08-19',700,700),
	(26,9,5,'2018-08-19',1000,1000),
	(28,11,5,'2018-08-19',1000,1000),
	(29,3,7,'2018-08-21',1300,1300),
	(31,3,8,'2018-08-21',1300,1300);

/*!40000 ALTER TABLE `users_leagues` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
