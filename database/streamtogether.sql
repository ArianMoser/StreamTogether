-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 03. Mai 2018 um 14:27
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
  `Timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `started` bigint(13) NOT NULL DEFAULT '0',
  `Upvotes` int(11) NOT NULL DEFAULT '0',
  `status` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'play'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(0, '', '', '', '', 'room_default.png', 11, '2018-04-29 15:36:44.368754');

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
(11, '1', '1@1.de', '$2a$11$OrcNLHTZ4JZ2HZVTbX9/xOW1kno.5RMBrQ3T1Q0TrVpOK3OhkDviO', NULL),
(12, 'PenisPenis', 'penis@penis.de', '$2a$11$PLmr1p3MnCmi.KX0cLrgM.gHS0NofIpEtthqBleraQxQ3Uxgy4Mya', NULL);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `video`
--
ALTER TABLE `video`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
