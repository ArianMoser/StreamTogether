-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2018 at 06:35 PM
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
  `video_ID` int(11) NOT NULL,
  `Timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `started` bigint(13) NOT NULL DEFAULT '0',
  `Upvotes` int(11) NOT NULL DEFAULT '0',
  `status` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'play'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`room_ID`, `video_ID`, `Timestamp`, `started`, `Upvotes`, `status`) VALUES
(5, 18, '2018-04-29 16:20:59', 0, 0, 'play'),
(5, 20, '2018-04-29 15:43:44', 1525001651695, 0, 'play');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `ID` int(11) NOT NULL,
  `hashedValue` varchar(200) COLLATE utf8_bin NOT NULL,
  `title` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(200) COLLATE utf8_bin NOT NULL DEFAULT '',
  `thumbnail` varchar(200) COLLATE utf8_bin NOT NULL DEFAULT 'room_default.png',
  `creator` int(11) NOT NULL,
  `CreationDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`ID`, `hashedValue`, `title`, `description`, `password`, `thumbnail`, `creator`, `CreationDate`) VALUES
(5, '$2a$11$/4KEmMJmucQESO5KzPo1V.gn4LtvzoSDIxkNDjqAVYx9DUQoghS2y', 'dfsdf', 'dfsdf', '', 'room_default.png', 11, '2018-04-29 15:36:44.368754');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `current_room_id` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Table for all users ';

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `username`, `email`, `password`, `current_room_id`) VALUES
(2, 'test', 'test', '$2a$11$vfbVtZJTu939uig4I10HveA/fL.zOmk1U5wTW/k9wPx3ZEPtT03t.', NULL),
(3, 'test123', 'test123', '$2a$11$ITRzdbT0FlLK9qcvF1uYceAo9iDgEKp9FD8/PVrI4aKfXErkUjkai', NULL),
(5, '2', '2', '$2a$11$KdvYVEGu/sDOSKUekKBFb.Mgmb8SicvJtpfqD8Z9zTugKKVb0XgoS', 5),
(6, '12', '12', '$2a$11$EQAnKaSQYwaFhmzw1qioze97S/g6mS22.AoFZNn7j.TQbpFiuvd.K', NULL),
(7, '13', '13', '$2a$11$OvRuUUza9I/VV35Ircr6cuKqrUfWtFkf4TS29hon/Kj1dpzZiLElW', NULL),
(8, '123', 'test@test.de', '$2a$11$Sj/6h2UEQy5ljwVkqtZahOev27XrKN/eulSmoUfw2BSJuhWXYrlO2', NULL),
(11, '1', '1@1.de', '$2a$11$OrcNLHTZ4JZ2HZVTbX9/xOW1kno.5RMBrQ3T1Q0TrVpOK3OhkDviO', 5),
(12, 'PenisPenis', 'penis@penis.de', '$2a$11$PLmr1p3MnCmi.KX0cLrgM.gHS0NofIpEtthqBleraQxQ3Uxgy4Mya', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `ID` int(11) NOT NULL,
  `youtube_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(5000) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `thumbnail_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `channel_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `channel_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`ID`, `youtube_id`, `title`, `description`, `thumbnail_url`, `channel_id`, `channel_name`) VALUES
(17, 'OnGyqdzY3-Y', '進撃の巨人SS【約束－１９－】エレン「お前が俺を嫌っても！！俺はお前を守り続ける！！」ミカサ「」', 'チャンネル登録はコチラ⇒ https://goo.gl/y5tTnK ○人気アニメSSメイト最新動画はコチラ ⇒ https://goo.gl/4A17vK 劇場版「進撃の巨人」Season 2～覚醒の咆...', 'https://i.ytimg.com/vi/OnGyqdzY3-Y/default.jpg', 'UCtbyvfp_uqIqVCLzOqW-k8w', '人気アニメSSメイト'),
(18, '6ZfuNTqbHE8', 'Marvel Studios\' Avengers: Infinity War Official Trailer', '\"There was an idea…\" Avengers: Infinity War. In theaters April 27. ▻ Subscribe to Marvel: http://bit.ly/WeO3YJ Follow Marvel on Twitter:   https://twitter.com/marvel Like Marvel on FaceBook:...', 'https://i.ytimg.com/vi/6ZfuNTqbHE8/default.jpg', 'UCvC4D8onUfXzvjTOM-dBfEA', 'Marvel Entertainment'),
(19, 'wZZ7oFKsKzY', 'Nyan Cat 10 hours (original)', 'First and best edition of longest Nyan Cat video on Youtube. Feel free to watch whole video.. Original video: http://www.youtube.com/watch?v=QH2-TGUlwu4 Creators website: http://www.prguitarman.c...', 'https://i.ytimg.com/vi/wZZ7oFKsKzY/default.jpg', 'UCxHoFjiQvDUvFXJTpXzKYQw', 'TehN1ppe'),
(20, 'QASbw8_0meM', '10 hour timer', 'Books and art blog: https://www.thefloatinghog.com/ 10 hour timer (with 5 beeps at the end).', 'https://i.ytimg.com/vi/QASbw8_0meM/default.jpg', 'UC7xn0Z8A6pdtvMqz9Ru11uQ', 'The 16th Cavern');

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
  ADD KEY `creator` (`creator`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `room-id` (`current_room_id`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`room_ID`) REFERENCES `room` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playlist_ibfk_2` FOREIGN KEY (`video_ID`) REFERENCES `video` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`current_room_id`) REFERENCES `room` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `dropRoom5` ON SCHEDULE AT '2018-04-29 19:20:59' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM room WHERE room.id=5$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
