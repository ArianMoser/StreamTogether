-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 27. Apr 2018 um 15:59
-- Server-Version: 10.1.31-MariaDB
-- PHP-Version: 5.6.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `streamtogether`
--
CREATE DATABASE IF NOT EXISTS `streamtogether` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `streamtogether`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `playlist`
--

CREATE TABLE `playlist` (
  `room_ID` int(11) NOT NULL,
  `video_ID` int(11) NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Upvotes` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playlist`
--

INSERT INTO `playlist` (`room_ID`, `video_ID`, `Timestamp`, `Upvotes`) VALUES
(32, 4, '2018-04-26 15:57:51', 1),
(32, 5, '2018-04-26 15:58:03', 1),
(32, 6, '2018-04-26 15:58:08', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `room`
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
-- Daten für Tabelle `room`
--

INSERT INTO `room` (`ID`, `hashedValue`, `title`, `description`, `password`, `thumbnail`, `creator`, `CreationDate`) VALUES
(0, '', NULL, NULL, '', 'room_default.png', 11, '0000-00-00 00:00:00.000000'),
(32, '$2a$11$7FYUeQzV0T66GS7S7YLRt.DKEtdKeiaL816f93xihU.4wsY/.dLnG', 'Hadawd2', 'gasdfawda', '', 'room_default.png', 11, '2018-04-26 15:57:22.774853'),
(34, '$2a$11$ehlO6SRvKuFoXAjD0dU3M.8krIB9g0wZJ1KtCvBdxjTEtEfapc9jy', '1', '1', '', 'room_default.png', 11, '2018-04-27 13:42:23.841649'),
(35, '$2a$11$cZo/8uBG3xeaBw65MfHCjupb1WbwWz4Jq63fiIWDZzwKnwaSDGpyu', '11', '11', '', 'room_default.png', 11, '2018-04-27 13:43:25.576970'),
(36, '$2a$11$LOkQX4/OodXFnlx1YibeFua1FFs46rGI/dWs1YWP3c5gSKqxli61C', '111', '', '', 'room_default.png', 11, '2018-04-27 13:52:05.532699');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `current_room_id` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Table for all users ';

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`ID`, `username`, `email`, `password`, `current_room_id`) VALUES
(2, 'test', 'test', '$2a$11$vfbVtZJTu939uig4I10HveA/fL.zOmk1U5wTW/k9wPx3ZEPtT03t.', NULL),
(3, 'test123', 'test123', '$2a$11$ITRzdbT0FlLK9qcvF1uYceAo9iDgEKp9FD8/PVrI4aKfXErkUjkai', NULL),
(5, '2', '2', '$2a$11$KdvYVEGu/sDOSKUekKBFb.Mgmb8SicvJtpfqD8Z9zTugKKVb0XgoS', NULL),
(6, '12', '12', '$2a$11$EQAnKaSQYwaFhmzw1qioze97S/g6mS22.AoFZNn7j.TQbpFiuvd.K', NULL),
(7, '13', '13', '$2a$11$OvRuUUza9I/VV35Ircr6cuKqrUfWtFkf4TS29hon/Kj1dpzZiLElW', NULL),
(8, '123', 'test@test.de', '$2a$11$Sj/6h2UEQy5ljwVkqtZahOev27XrKN/eulSmoUfw2BSJuhWXYrlO2', NULL),
(11, '1', '1@1.de', '$2a$11$OrcNLHTZ4JZ2HZVTbX9/xOW1kno.5RMBrQ3T1Q0TrVpOK3OhkDviO', 36),
(13, 'peter', 'd@d.de', '$2a$11$MKyfPguQsBsKgkIf/n11C..TMre4YsRFJ0ZuNgTMKxXkrpBcxdk0G', 0),
(14, 'll', 'll@ll.de', '$2a$11$mn/MDm7iTpIGQhlw6qWbC.BXRP2Bi/aZQU.04fjd3u6bujXJEfXRS', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `video`
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
-- Daten für Tabelle `video`
--

INSERT INTO `video` (`ID`, `youtube_id`, `title`, `description`, `thumbnail_url`, `channel_id`, `channel_name`) VALUES
(4, 'aa_mgxO5v-A', 'DJ Lari Luke beim Dosenbeatz 2016', 'Larissa Rieß aka. Lari Luke beim Dosenbeatz 2016 in Köln Dj Booking: ilke@der-bomber-der-herzen.de.', 'https://i.ytimg.com/vi/aa_mgxO5v-A/default.jpg', 'UCgu3zpNiGmnEvQG_erWcsHg', 'Larissa White'),
(5, 'Oe3FG4EOgyU', 'Schnappi Das Kleine Krokodil', 'Schnappi The Small Crocodile.', 'https://i.ytimg.com/vi/Oe3FG4EOgyU/default.jpg', 'UCgfF-gIiVz_GSCrIRpzZdmg', 'Sentinel79'),
(6, '7t3Re2VIbHE', 'Ed Sheeran - Bibia Be Ye Ye', 'Out Now: https://atlanti.cr/yt-album Subscribe to Ed\'s channel: http://bit.ly/SubscribeToEdSheeran Follow Ed on... Facebook: http://www.facebook.com/EdSheeranMusic Twitter: http://twitter.com/...', 'https://i.ytimg.com/vi/7t3Re2VIbHE/default.jpg', 'UC0C-w0YjGpqDXGB8IHb662A', 'Ed Sheeran'),
(7, 'T2JVCoLZ6r0', 'DASD', 'dsad.', 'https://i.ytimg.com/vi/T2JVCoLZ6r0/default.jpg', 'UCyt65rRaLFWm5Hfw5ghgmUA', 'fuckingfranko');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`room_ID`,`video_ID`),
  ADD KEY `videoID` (`video_ID`),
  ADD KEY `roomID` (`room_ID`);

--
-- Indizes für die Tabelle `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `creator` (`creator`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `room-id` (`current_room_id`);

--
-- Indizes für die Tabelle `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `room`
--
ALTER TABLE `room`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT für Tabelle `video`
--
ALTER TABLE `video`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`room_ID`) REFERENCES `room` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playlist_ibfk_2` FOREIGN KEY (`video_ID`) REFERENCES `video` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`current_room_id`) REFERENCES `room` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL;

DELIMITER $$
--
-- Ereignisse
--
CREATE DEFINER=`root`@`localhost` EVENT `dropRoom35` ON SCHEDULE AT '2018-04-27 16:43:25' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM room WHERE room.id=35$$

CREATE DEFINER=`root`@`localhost` EVENT `dropRoom36` ON SCHEDULE AT '2018-04-27 16:52:05' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM room WHERE room.id=36$$

CREATE DEFINER=`root`@`localhost` EVENT `dropRoom34` ON SCHEDULE AT '2018-04-27 16:42:23' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM room WHERE room.id=34$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
