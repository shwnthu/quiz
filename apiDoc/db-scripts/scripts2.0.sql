CREATE DATABASE IF NOT EXISTS `quiz` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `quiz`;

-- Dumping structure for table quiz.audit_log
CREATE TABLE IF NOT EXISTS `audit_log` (
  `audit_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL DEFAULT '',
  `request` longtext NOT NULL DEFAULT '',
  `request_path` varchar(225) NOT NULL DEFAULT '',
  `requested_method` varchar(225) NOT NULL DEFAULT '',
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`audit_log_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;



-- Dumping structure for table quiz.user
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(225) DEFAULT NULL,
  `lname` varchar(225) DEFAULT NULL,
  `city` varchar(225) DEFAULT NULL,
  `state` varchar(225) DEFAULT NULL,
  `gender` varchar(225) DEFAULT NULL,
  `profile_pic` varchar(225) DEFAULT NULL,
  `mobile` varchar(45) NOT NULL,
  `email` varchar(225) DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL,
  `role_id` int(11) NOT NULL,
  	`created_on` DATETIME NULL DEFAULT current_timestamp(),
	`updated_on` DATETIME NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.audit_log: ~0 rows (approximately)
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;

-- Dumping structure for table quiz.device_info
CREATE TABLE IF NOT EXISTS `device_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `device_type` varchar(250) DEFAULT NULL,
  `device_name` varchar(250) DEFAULT NULL,
  `model` varchar(250) DEFAULT NULL,
  `os_version` varchar(250) DEFAULT NULL,
  `device_token` varchar(250) DEFAULT NULL,
  `ip` varchar(250) DEFAULT NULL,
  `app_version` varchar(250) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_device_info_table_user_id` (`userId`),
  CONSTRAINT `fk_deviceInfo_table_user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.device_info: ~0 rows (approximately)
/*!40000 ALTER TABLE `device_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_info` ENABLE KEYS */;

-- Dumping structure for table quiz.otpvalidator
CREATE TABLE IF NOT EXISTS `otpvalidator` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `emailOrMobile` varchar(25) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `isVerified` tinyint(4) DEFAULT 0,
  `isExpired` tinyint(4) DEFAULT 0,
  	`created_on` DATETIME NULL DEFAULT current_timestamp(),
	`updated_on` DATETIME NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.otpvalidator: ~0 rows (approximately)
/*!40000 ALTER TABLE `otpvalidator` DISABLE KEYS */;
/*!40000 ALTER TABLE `otpvalidator` ENABLE KEYS */;

-- Dumping structure for table quiz.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT 0,
  `question` longtext NOT NULL DEFAULT '0',
  `option1` longtext NOT NULL DEFAULT '0',
  `option2` longtext NOT NULL DEFAULT '0',
  `option3` longtext NOT NULL DEFAULT '0',
  `option4` longtext NOT NULL DEFAULT '0',
  `answer` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.questions: ~0 rows (approximately)
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

-- Dumping structure for table quiz.role
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.role: ~2 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`role_id`, `role_name`) VALUES
	(1, 'ADMIN'),
	(2, 'USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for table quiz.token
CREATE TABLE IF NOT EXISTS `token` (
  `tokenId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(250) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`tokenId`),
  KEY `fk_token_table_user_id` (`userId`),
  CONSTRAINT `fk_token_table_user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `quiz` (
  `quiz_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by` int(11) DEFAULT NULL,
  `questions` varchar(250) DEFAULT NULL,
  `start_time` datetime DEFAULT current_timestamp(),
  `end_time` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`quiz_id`),
  FOREIGN KEY (`created_by`) REFERENCES `user` (`userId`)
);



CREATE TABLE `balance` (
	`balance_id` INT(11) NOT NULL AUTO_INCREMENT,
	`userId` INT(11) NOT NULL,
	`cash_balance` INT(250) NULL DEFAULT NULL,
	`token_balance` INT(250) NULL DEFAULT NULL,
	`total_balance` INT(250) AS (`cash_balance` + `token_balance`),
	PRIMARY KEY (`balance_id`) USING BTREE,
	INDEX `userId` (`userId`) USING BTREE,
	CONSTRAINT `balance_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `quiz`.`user` (`userId`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;



CREATE TABLE `rooms` (
	`room_id` INT(11) NOT NULL AUTO_INCREMENT,
	`room_type` ENUM('SINGLE','GROUP') NOT NULL DEFAULT 'SINGLE' COLLATE 'latin1_swedish_ci',
	`room_name` VARCHAR(225) NOT NULL COLLATE 'latin1_swedish_ci',
	`entry_token` INT(11) NOT NULL DEFAULT '0',
	`player_limit` INT(11) NOT NULL DEFAULT '0',
	`time_limit` INT(11) NOT NULL DEFAULT '0',
	`prize_token` INT(11) NOT NULL DEFAULT '0',
	`created_by` INT(11) NOT NULL DEFAULT '0',
	`created_on` DATETIME NULL DEFAULT current_timestamp(),
	`updated_on` DATETIME NULL DEFAULT NULL ON UPDATE current_timestamp(),
	PRIMARY KEY (`room_id`) USING BTREE,
	INDEX `created_by` (`created_by`) USING BTREE,
	CONSTRAINT `created_by` FOREIGN KEY (`created_by`) REFERENCES `quiz`.`user` (`userId`) ON UPDATE RESTRICT ON DELETE RESTRICT
);


CREATE TABLE `joined_rooms` (
	`joined_room_id` INT(11) NOT NULL AUTO_INCREMENT,
	`userId` INT(11) NOT NULL,
	`room_id` INT(11) NOT NULL,
	`created_on` DATETIME NULL DEFAULT current_timestamp(),
	`updated_on` DATETIME NULL DEFAULT NULL ON UPDATE current_timestamp(),
	PRIMARY KEY (`joined_room_id`) USING BTREE,
	INDEX `userId` (`userId`) USING BTREE,
	CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `quiz`.`user` (`userId`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	INDEX `room_id` (`room_id`) USING BTREE,
	CONSTRAINT `room_id` FOREIGN KEY (`room_id`) REFERENCES `quiz`.`rooms` (`room_id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

