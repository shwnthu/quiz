-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.23-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for quiz
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.audit_log: ~2 rows (approximately)
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` (`audit_log_id`, `token`, `request`, `request_path`, `requested_method`, `created_on`, `updated_on`, `ip`) VALUES
	(23, '', '{"body":{"fname":"yash","lname":"uppu","mobile":"8333965045","email":"shwnthu@gmail.com","device_type":"mobile","device_name":"Mi Note 7","device_model":"Handset","os_version":"8.0","ip_address":"127.0.0.1","app_version":"4.0"},"headers":{"host":"127.0.0.1:5000","connection":"keep-alive","content-length":"231","postman-token":"f16c263a-5940-0355-ed82-801479ea6e7f","cache-control":"no-cache","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","content-type":"application/json","accept":"*/*","origin":"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","sec-fetch-site":"none","sec-fetch-mode":"cors","sec-fetch-dest":"empty","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/user/registration","params":{},"rawHeaders":["Host","127.0.0.1:5000","Connection","keep-alive","Content-Length","231","Postman-Token","f16c263a-5940-0355-ed82-801479ea6e7f","Cache-Control","no-cache","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","Content-Type","application/json","Accept","*/*","Origin","chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","Sec-Fetch-Site","none","Sec-Fetch-Mode","cors","Sec-Fetch-Dest","empty","Accept-Encoding","gzip, deflate, br","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/user/registration","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"registerUser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}},"path":"/service/user/registration","method":"post","ip":"::ffff:127.0.0.1"}', '/service/user/registration', 'POST', '2020-05-24 10:31:26', NULL, '127.0.0.1'),
	(24, '', '{"body":{"fname":"yash","lname":"uppu","mobile":"8333965045","email":"shwnthu@gmail.com","device_type":"mobile","device_name":"Mi Note 7","device_model":"Handset","os_version":"8.0","ip_address":"127.0.0.1","app_version":"4.0"},"headers":{"host":"127.0.0.1:5000","connection":"keep-alive","content-length":"231","postman-token":"d0325459-cb6c-98bf-88af-ba862ddef7ee","cache-control":"no-cache","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","content-type":"application/json","accept":"*/*","origin":"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","sec-fetch-site":"none","sec-fetch-mode":"cors","sec-fetch-dest":"empty","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/user/registration","params":{},"rawHeaders":["Host","127.0.0.1:5000","Connection","keep-alive","Content-Length","231","Postman-Token","d0325459-cb6c-98bf-88af-ba862ddef7ee","Cache-Control","no-cache","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","Content-Type","application/json","Accept","*/*","Origin","chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","Sec-Fetch-Site","none","Sec-Fetch-Mode","cors","Sec-Fetch-Dest","empty","Accept-Encoding","gzip, deflate, br","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/user/registration","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"registerUser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}},"path":"/service/user/registration","method":"post","ip":"::ffff:127.0.0.1"}', '/service/user/registration', 'POST', '2020-05-24 10:33:00', NULL, '127.0.0.1'),
	(25, '', '{"body":{"fname":"yash","lname":"uppu","mobile":"8333965045","email":"shwnthu@gmail.com","device_type":"mobile","device_name":"Mi Note 7","device_model":"Handset","os_version":"8.0","ip_address":"127.0.0.1","app_version":"4.0"},"headers":{"host":"127.0.0.1:5000","connection":"keep-alive","content-length":"231","postman-token":"9fd399cb-11bc-c52f-6d65-fc0fd6e7c3fd","cache-control":"no-cache","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","content-type":"application/json","accept":"*/*","origin":"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","sec-fetch-site":"none","sec-fetch-mode":"cors","sec-fetch-dest":"empty","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/user/registration","params":{},"rawHeaders":["Host","127.0.0.1:5000","Connection","keep-alive","Content-Length","231","Postman-Token","9fd399cb-11bc-c52f-6d65-fc0fd6e7c3fd","Cache-Control","no-cache","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","Content-Type","application/json","Accept","*/*","Origin","chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","Sec-Fetch-Site","none","Sec-Fetch-Mode","cors","Sec-Fetch-Dest","empty","Accept-Encoding","gzip, deflate, br","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/user/registration","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"registerUser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}},"path":"/service/user/registration","method":"post","ip":"::ffff:127.0.0.1"}', '/service/user/registration', 'POST', '2020-05-24 10:36:12', NULL, '127.0.0.1'),
	(26, '', '{"body":{"fname":"yash","lname":"uppu","mobile":"8333965045","email":"shwnthu@gmail.com","device_type":"mobile","device_name":"Mi Note 7","device_model":"Handset","os_version":"8.0","ip_address":"127.0.0.1","app_version":"4.0"},"headers":{"host":"127.0.0.1:5000","connection":"keep-alive","content-length":"231","postman-token":"7125a9e3-98b8-208a-da21-79cb2b286689","cache-control":"no-cache","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","content-type":"application/json","accept":"*/*","origin":"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","sec-fetch-site":"none","sec-fetch-mode":"cors","sec-fetch-dest":"empty","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/user/registration","params":{},"rawHeaders":["Host","127.0.0.1:5000","Connection","keep-alive","Content-Length","231","Postman-Token","7125a9e3-98b8-208a-da21-79cb2b286689","Cache-Control","no-cache","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","Content-Type","application/json","Accept","*/*","Origin","chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","Sec-Fetch-Site","none","Sec-Fetch-Mode","cors","Sec-Fetch-Dest","empty","Accept-Encoding","gzip, deflate, br","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/user/registration","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"registerUser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}},"path":"/service/user/registration","method":"post","ip":"::ffff:127.0.0.1"}', '/service/user/registration', 'POST', '2020-05-24 11:46:20', NULL, '127.0.0.1'),
	(27, '', '{"body":{"fname":"yash","lname":"uppu","mobile":"8333965045","email":"shwnthu@gmail.com","device_type":"mobile","device_name":"Mi Note 7","device_model":"Handset","os_version":"8.0","ip_address":"127.0.0.1","app_version":"4.0"},"headers":{"host":"127.0.0.1:5000","connection":"keep-alive","content-length":"231","postman-token":"2a9108d9-e9cb-2864-bb70-111452263a6c","cache-control":"no-cache","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","content-type":"application/json","accept":"*/*","origin":"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","sec-fetch-site":"none","sec-fetch-mode":"cors","sec-fetch-dest":"empty","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/user/registration","params":{},"rawHeaders":["Host","127.0.0.1:5000","Connection","keep-alive","Content-Length","231","Postman-Token","2a9108d9-e9cb-2864-bb70-111452263a6c","Cache-Control","no-cache","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","Content-Type","application/json","Accept","*/*","Origin","chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","Sec-Fetch-Site","none","Sec-Fetch-Mode","cors","Sec-Fetch-Dest","empty","Accept-Encoding","gzip, deflate, br","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/user/registration","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"registerUser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}},"path":"/service/user/registration","method":"post","ip":"::ffff:127.0.0.1"}', '/service/user/registration', 'POST', '2020-05-24 11:53:27', NULL, '127.0.0.1'),
	(28, '', '{"body":{"fname":"yash","lname":"uppu","mobile":"8333965045","email":"shwnthu@gmail.com","device_type":"mobile","device_name":"Mi Note 7","device_model":"Handset","os_version":"8.0","ip_address":"127.0.0.1","app_version":"4.0"},"headers":{"host":"127.0.0.1:5000","connection":"keep-alive","content-length":"231","postman-token":"e098c4fc-3482-c9a6-5777-122b67559401","cache-control":"no-cache","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","content-type":"application/json","accept":"*/*","origin":"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","sec-fetch-site":"none","sec-fetch-mode":"cors","sec-fetch-dest":"empty","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/user/registration","params":{},"rawHeaders":["Host","127.0.0.1:5000","Connection","keep-alive","Content-Length","231","Postman-Token","e098c4fc-3482-c9a6-5777-122b67559401","Cache-Control","no-cache","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","Content-Type","application/json","Accept","*/*","Origin","chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","Sec-Fetch-Site","none","Sec-Fetch-Mode","cors","Sec-Fetch-Dest","empty","Accept-Encoding","gzip, deflate, br","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/user/registration","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"registerUser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}},"path":"/service/user/registration","method":"post","ip":"::ffff:127.0.0.1"}', '/service/user/registration', 'POST', '2020-05-24 12:06:52', NULL, '127.0.0.1'),
	(29, '', '{"body":{"fname":"yash","lname":"uppu","mobile":"8333965045","email":"shwnthu@gmail.com","device_type":"mobile","device_name":"Mi Note 7","device_model":"Handset","os_version":"8.0","ip_address":"127.0.0.1","app_version":"4.0"},"headers":{"host":"127.0.0.1:5000","connection":"keep-alive","content-length":"231","postman-token":"2e327da0-d777-6c20-57f5-18e81255c3c4","cache-control":"no-cache","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","content-type":"application/json","accept":"*/*","origin":"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","sec-fetch-site":"none","sec-fetch-mode":"cors","sec-fetch-dest":"empty","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/user/registration","params":{},"rawHeaders":["Host","127.0.0.1:5000","Connection","keep-alive","Content-Length","231","Postman-Token","2e327da0-d777-6c20-57f5-18e81255c3c4","Cache-Control","no-cache","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","Content-Type","application/json","Accept","*/*","Origin","chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop","Sec-Fetch-Site","none","Sec-Fetch-Mode","cors","Sec-Fetch-Dest","empty","Accept-Encoding","gzip, deflate, br","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/user/registration","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"registerUser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}},"path":"/service/user/registration","method":"post","ip":"::ffff:127.0.0.1"}', '/service/user/registration', 'POST', '2020-05-24 13:16:57', NULL, '127.0.0.1');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.device_info: ~0 rows (approximately)
/*!40000 ALTER TABLE `device_info` DISABLE KEYS */;
INSERT INTO `device_info` (`id`, `userId`, `device_type`, `device_name`, `model`, `os_version`, `device_token`, `ip`, `app_version`, `created_on`, `updated_on`) VALUES
	(5, 21, 'mobile', 'Mi Note 7', 'Handset', '8.0', 'bea630d0-9d92-11ea-8184-abf192f896961590306417', '127.0.0.1', '4.0', '2020-05-24 13:16:57', NULL),
	(6, 21, 'mobile', 'Mi Note 7', 'Handset', '8.0', 'da244ea0-9d92-11ea-8db9-29c99de5ab8b1590306463', '127.0.0.1', '4.0', '2020-05-24 13:18:14', NULL),
	(7, 21, 'mobile', 'Mi Note 7', 'Handset', '8.0', '74e90e60-9d95-11ea-8bde-9d9bcd32d4d81590307582', '127.0.0.1', '4.0', '2020-05-24 13:36:28', NULL);
/*!40000 ALTER TABLE `device_info` ENABLE KEYS */;

-- Dumping structure for table quiz.otpvalidator
CREATE TABLE IF NOT EXISTS `otpvalidator` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `emailOrMobile` varchar(25) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `isVerified` tinyint(4) DEFAULT 0,
  `isExpired` tinyint(4) DEFAULT 0,
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.otpvalidator: ~1 rows (approximately)
/*!40000 ALTER TABLE `otpvalidator` DISABLE KEYS */;
INSERT INTO `otpvalidator` (`id`, `emailOrMobile`, `otp`, `isVerified`, `isExpired`, `created_on`, `updated_on`) VALUES
	(9, '8333965045', '064672', 1, 0, '2020-05-24 13:36:28', '2020-05-24 13:36:46');
/*!40000 ALTER TABLE `otpvalidator` ENABLE KEYS */;

-- Dumping structure for table quiz.role
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.token: ~0 rows (approximately)
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` (`tokenId`, `userId`, `token`, `created_on`, `updated_on`) VALUES
	(19, 21, 'bea630d0-9d92-11ea-8184-abf192f896961590306417', '2020-05-24 13:16:58', NULL),
	(20, 21, 'da244ea0-9d92-11ea-8db9-29c99de5ab8b1590306463', '2020-05-24 13:18:15', NULL),
	(21, 21, '74e90e60-9d95-11ea-8bde-9d9bcd32d4d81590307582', '2020-05-24 13:36:29', NULL);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;

-- Dumping structure for table quiz.user
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(225) NOT NULL,
  `lname` varchar(225) NOT NULL,
  `mobile` varchar(45) NOT NULL,
  `email` varchar(225) NOT NULL,
  `isActive` tinyint(4) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- Dumping data for table quiz.user: ~1 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userId`, `fname`, `lname`, `mobile`, `email`, `isActive`, `role_id`, `created_on`, `updated_on`) VALUES
	(21, 'yash', 'uppu', '8333965045', 'shwnthu@gmail.com', 1, 2, '2020-05-24 13:16:57', NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
