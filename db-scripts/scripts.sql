CREATE DATABASE IF NOT EXISTS `quiz`;
USE `quiz`;
CREATE TABLE `user` (
	`userId` INT(11) NOT NULL AUTO_INCREMENT,
	`fname` VARCHAR(225) NOT NULL COLLATE 'latin1_swedish_ci',
	`lname` VARCHAR(225) NOT NULL COLLATE 'latin1_swedish_ci',
	`mobile` VARCHAR(45) NOT NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(225) NOT NULL COLLATE 'latin1_swedish_ci',
	`isActive` TINYINT(4) NOT NULL,
	`role_id` INT(11) NOT NULL,
	`created_on` DATETIME NULL DEFAULT NULL,
	`updated_on` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`userId`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;


CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) 

CREATE TABLE IF NOT EXISTS `token` (
  `tokenId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `token` varchar(250) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`tokenId`),
  KEY `fk_token_table_user_id` (`userId`),
  CONSTRAINT `fk_token_table_user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) 




CREATE TABLE IF NOT EXISTS `audit_log` (
  `audit_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL DEFAULT '',
  `request` longtext NOT NULL DEFAULT '',
  `created_on` datetime,
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`audit_log_id`)
) 

CREATE TABLE `device_info` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`userId` INT(11) NULL DEFAULT NULL,
	`device_type` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`device_name` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`model` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`os version` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`device_token` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`ip` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`app version` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`created_on` DATETIME NULL DEFAULT current_timestamp(),
	`updated_on` DATETIME NULL DEFAULT NULL ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `fk_device_info_table_user_id` (`userId`) USING BTREE,
	CONSTRAINT `fk_deviceInfo_table_user_id` FOREIGN KEY (`userId`) REFERENCES `quiz`.`user` (`userId`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

