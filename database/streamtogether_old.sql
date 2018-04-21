-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2018 at 02:37 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `streamtogether`
--
CREATE DATABASE IF NOT EXISTS `streamtogether` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `streamtogether`;

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `room_ID` int(11) NOT NULL,
  `video_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`room_ID`, `video_ID`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `ID` int(11) NOT NULL,
  `title` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `thumbnail` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'room_default.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`ID`, `title`, `description`, `password`, `thumbnail`) VALUES
(1, 'Test-title', 'test-description', 'test-password', 'room_default.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Table for all users ';

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `username`, `email`, `password`, `room_id`, `active`) VALUES
(1, 'Alex', 'test@web.de', 'aidwha?jdawidh', NULL, 0),
(2, 'test', 'test', '$2a$11$vfbVtZJTu939uig4I10HveA/fL.zOmk1U5wTW/k9wPx3ZEPtT03t.', 1, 0),
(3, 'test123', 'test123', '$2a$11$ITRzdbT0FlLK9qcvF1uYceAo9iDgEKp9FD8/PVrI4aKfXErkUjkai', NULL, 0),
(4, '1', '1', '$2a$11$QCyVV.WEBgm9qmV11vaN3eQ6tu0pAaH1nRVqn7PXgQHXdNiwPdN5G', NULL, 0),
(5, '2', '2', '$2a$11$KdvYVEGu/sDOSKUekKBFb.Mgmb8SicvJtpfqD8Z9zTugKKVb0XgoS', NULL, 0),
(6, '12', '12', '$2a$11$EQAnKaSQYwaFhmzw1qioze97S/g6mS22.AoFZNn7j.TQbpFiuvd.K', NULL, 0),
(7, '13', '13', '$2a$11$OvRuUUza9I/VV35Ircr6cuKqrUfWtFkf4TS29hon/Kj1dpzZiLElW', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `ID` int(11) NOT NULL,
  `title` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `user-id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`ID`, `title`, `description`, `user-id`) VALUES
(1, 'test-title-1', 'test-desc-1', 0),
(2, 'test-title-2', 'test-desc-2', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`room_ID`,`video_ID`),
  ADD KEY `videoID` (`video_ID`),
  ADD KEY `roomID` (`room_ID`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD KEY `ID_2` (`ID`),
  ADD KEY `ID_3` (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `room-id` (`room_id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `FkRoomID` FOREIGN KEY (`room_ID`) REFERENCES `room` (`ID`),
  ADD CONSTRAINT `FkVideoID` FOREIGN KEY (`video_ID`) REFERENCES `video` (`ID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FkRoomIDFromUser` FOREIGN KEY (`room_id`) REFERENCES `room` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
